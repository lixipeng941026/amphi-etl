import { BaseCoreComponent } from "../../BaseCoreComponent";

export class HelloDate extends BaseCoreComponent {
   constructor() {
      const description = "Takes a date and outputs a pandas DataFrame with a message including that date.";
      const defaultConfig = { selectedDate: "" };

      const form = {
         idPrefix: "component__form",
         fields: [
            {
               type: "date",
               id: "selectedDate",
               label: "Select a Date",
               placeholder: "Choose a date",
            },
         ],
      };

      const icon = {
         name: "amphi-date-input-hello",
         svgstr:
            '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 16H5V9h14v11Z"/><path d="M12 11h2v2h-2zM8 11h2v2H8zM16 11h2v2H8zM8 15h2v2H8zM12 15h2v2h-2zM16 15h2v2h-2z"/></svg>',
      };

      super("Hello Date", "helloDate", description, "pandas_df_input", [], "inputs", icon, defaultConfig, form);
   }

   provideImports() {
      return ["import pandas as pd"];
   }

   generateComponentCode({ config, outputName }) {
      const date = String(config?.selectedDate ?? "").trim() || "No Date Selected";

      return `
data = {
    'event': ['Date Selection'],
    'selected_date': ['${date}'],
    'message': ['The user selected the date: ${date}']
}
${outputName} = pd.DataFrame(data)
`;
   }
}

const component = new HelloDate();
export { component as default };
