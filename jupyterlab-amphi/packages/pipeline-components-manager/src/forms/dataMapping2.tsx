import React, { Key, useEffect, useState } from "react";
import { Form, Table, Input, Row, Col, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { isEmpty } from "lodash";

export const DataMapping2: React.FC<any> = ({}) => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState<
    { standardCode: string; valueRange: string }[]
  >([]); //表格数据
  const [loading, setloading] = useState(false);
  const [tableTotal, setTableTotal] = useState(0); //表格总数
  const [selectedRowKeys, setSelectRowKeys] = useState<Key[]>([]); //表格勾选的key
  //勾选
  const changeSelect = (selectedRowKeys) => {
    setSelectRowKeys(selectedRowKeys);
  };
  const getTableData = async () => {
    try {
      setloading(true);
      const { data } = await axios.post(
        "http://10.151.40.16/api/dataQuality/standardRef/getStandardsApi",
        // { ...searchValue, ...params },
        {},
      );
      if (data.code === 200) {
        setTableData(data.data);
        setTableTotal(data.data.length);
      } else {
        setTableData([]);
        setTableTotal(0);
      }
    } catch (error) {
      message.error((error as Error).message);
    } finally {
      setloading(false);
    }
  };
  const columns = [
    { title: "标准编码", dataIndex: "standardCode", width: 200 },
    { title: "标准名称", dataIndex: "chineseName", width: 200 },
    { title: "规则类型", dataIndex: "typeCode", width: 150 },

    { title: "描述说明", dataIndex: "description", width: 150 },
    { title: "值域范围", dataIndex: "valueRange", width: 150 },
    {
      title: "创建日期",
      dataIndex: "createdDate",
      width: 200,
      render: (text: string) => {
        return text ? dayjs(text).format("YYYY-MM-DD HH:mm:ss") : "";
      },
    },
  ];
  useEffect(() => {
    getTableData();
  }, []);
  useEffect(() => {
    if (!isEmpty(selectedRowKeys)) {
      const filterData = tableData.filter(
        (item) => item.standardCode === selectedRowKeys[0],
      );
      if (!isEmpty(filterData)) {
        if (!isEmpty(filterData[0]?.valueRange)) {
          const mapData = filterData[0]?.valueRange.split("-");
          form.setFieldsValue({ min: mapData[0], max: mapData[1] });
        } else {
          form.setFieldsValue({ min: undefined, max: undefined });
        }
      }
    } else {
      form.setFieldsValue({ min: undefined, max: undefined });
    }
  }, [JSON.stringify(selectedRowKeys), JSON.stringify(tableData)]);
  return (
    <>
      <Table
        rowKey="standardCode"
        columns={columns}
        dataSource={tableData}
        loading={loading}
        rowSelection={{
          selectedRowKeys,
          onChange: changeSelect,
          type: "radio",
        }}
      />
      <Form form={form}>
        <Row>
          <Col span={4}>
            <Form.Item label="最小值" name="min" rules={[{ required: true }]}>
              <Input disabled />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item label="最大值" name="max" rules={[{ required: true }]}>
              <Input disabled />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default DataMapping2;
