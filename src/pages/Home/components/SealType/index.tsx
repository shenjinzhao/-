import './index.scss';
import { Table,Space,Button } from "antd";
import { PlusOutlined } from '@ant-design/icons';
import type { TableProps } from 'antd';
interface DataType {
  id: number;
  sealTypeCode: string;
  sealTypeName: string;
  status: number;
}

const SealType = () => {
  const dataSource: DataType[] = [
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
  const columns: TableProps<DataType>['columns'] = [
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


  return (
    <div className="bg">
      <div className="headers">
        <Button type="primary" icon={<PlusOutlined />}>新增</Button>
      </div>
    <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default SealType;
