import './index.scss';
import { Table,Space,Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
import { getSealTypeList } from "@/api/sealType";
import { sealTypeParams } from "@/api/sealType/type";
import { Component } from 'react';
interface DataType {
  id: number;
  sealTypeCode: string;
  sealTypeName: string;
  status: number;
}
class SealType extends Component {

  componentDidMount() {
    this.getSealTypeList();
  }

  async getSealTypeList() {
    const data: sealTypeParams = {
      // limit: this.limit,
      // current: this.current
    }
    const res = await getSealTypeList(data);
    console.log(res);
    
  }
  limit: number = 10;
  current: number = 1;
  dataSource: DataType[] = [
    {
      id: 1,
      sealTypeCode: '0001',
      sealTypeName: '单位公章',
      status: 1,
    },
    {
      id: 2,
      sealTypeCode: '0002',
      sealTypeName: '合同专用章',
      status: 1,
    },
  ];
  columns: TableProps<DataType>['columns'] = [
    {
      title: '印章类型编码',
      dataIndex: 'sealTypeCode',
      key: 'sealTypeCode',
    },
    {
      title: '印章类型名称',
      dataIndex: 'sealTypeName',
      key: 'sealTypeName',
    },
    {
      title: '状态',
      // 0:禁用 1:启用
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];


  render() {
    return (
      <div className="bg">
        <div className="headers">
          <Button type="primary" icon={<PlusOutlined />}>新增</Button>
        </div>
      <Table dataSource={this.dataSource} columns={this.columns} />
      </div>
    );
  }
};

export default SealType;
