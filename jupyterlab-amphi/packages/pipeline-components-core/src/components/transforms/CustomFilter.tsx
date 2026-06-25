import { filterIcon } from "../../icons";
import { BaseCoreComponent } from "../BaseCoreComponent";
import { chineseLabel } from "../inputs/label";

export class CustomFilter extends BaseCoreComponent {
  constructor() {
    const defaultConfig = { filterType: "basic", condition: "==" };
    const form = {
      idPrefix: "component__form",
      fields: [
        {
          type: "dataMapping2",
          id: "mapping2",
          advanced: true,
        },
      ],
    };
    // const description = "Use Filter Rows to select and output data that meets a specified condition.";
    const description = "";

    super(
      // "Filter Rows",
      "标准",
      "标准id",
      description,
      "pandas_df_processor",
      [],
      chineseLabel[1],
      filterIcon,
      defaultConfig,
      form,
    );
  }

  public provideImports({ config }): string[] {
    return [];
  }

  public generateComponentCode({
    config,
    inputName,
    outputName,
  }: {
    config: any;
    inputName: string;
    outputName: string;
  }): string {
    /* ---------- advanced mode ---------- */
    if (config.filterType === "advanced") {
      const expr = String(config.pythonExpression || "").replace(/"/g, '\\"');
      return `
# Advanced filter using pandas.DataFrame.query
${outputName} = ${inputName}.query("${expr}")
`;
    }

    /* ---------- basic mode ---------- */
    const columnName = config.column.value;
    const columnType = config.column.type;
    const columnIsNamed = config.column.named;
    const condition = config.condition;
    const conditionValue = config.conditionValue;
    const enforceString = config.enforceString;

    let code = `
# Filter rows based on condition
`;
    let queryExpression: string;
    let conditionValueReference: string;
    let columnReference: string;

    switch (condition) {
      case "==":
      case "!=":
      case ">":
      case "<":
      case ">=":
      case "<=":
        columnReference = `'${columnName}'`;
        conditionValueReference =
          enforceString || ["string", "category", "object"].includes(columnType)
            ? `'${conditionValue}'`
            : `${conditionValue}`;

        code += `${outputName} = ${inputName}[${inputName}[${columnReference}] ${condition} ${conditionValueReference}]`;
        break;

      case "contains":
      case "not contains":
        columnReference = columnIsNamed ? `'${columnName}'` : columnName;
        if (["string", "object", "category"].includes(columnType)) {
          const neg = condition === "not contains" ? "~" : "";
          code += `${outputName} = ${inputName}[${neg}${inputName}[${columnReference}].str.contains("${conditionValue}", na=False)]`;
        } else {
          throw new Error("Invalid operation for the data type");
        }
        break;

      case "startswith":
      case "endswith":
        columnReference = columnIsNamed ? `'${columnName}'` : columnName;
        if (["string", "object", "category"].includes(columnType)) {
          code += `${outputName} = ${inputName}[${inputName}[${columnReference}].str.${condition}("${conditionValue}", na=False)]`;
        } else {
          throw new Error("Invalid operation for the data type");
        }
        break;

      case "notnull":
        columnReference = columnIsNamed ? `'${columnName}'` : columnName;
        code += `${outputName} = ${inputName}.dropna(subset=[${columnReference}])`;
        break;

      case "isnull":
        columnReference = columnIsNamed ? `'${columnName}'` : columnName;
        code += `${outputName} = ${inputName}[${inputName}[${columnReference}].isna()]`;
        break;

      default: {
        // Quote column name with back‑ticks only if it contains non‑alphanumeric chars
        const needsBackticks = /[^a-zA-Z0-9_]/.test(columnName);
        columnReference = needsBackticks ? `\`${columnName}\`` : columnName;

        queryExpression = `${columnReference} ${condition} '${conditionValue}'`;
        code += `${outputName} = ${inputName}.query("${queryExpression}")`;
        break;
      }
    }
    console.log("====================================");
    console.log(code, "code111");
    console.log("====================================");
    return code + "\n";
  }
}
