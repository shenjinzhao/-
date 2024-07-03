import { Table, message, Button, Space } from 'antd'
import type { TableProps } from 'antd'
import { PlusOutlined, CopyOutlined } from '@ant-design/icons'
import { useState } from 'react'
const Cert = () => {
  const [dataSource] = useState([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_messageApi, contextHolder] = message.useMessage()
  const [current] = useState<number>(1)
  const [limit] = useState<number>(10)
  const [total] = useState<number>(0)
  const pagination = {
    showSizeChanger: true, // 是否可以改变 pageSize
    showQuickJumper: false, // 是否可以快速跳转至某页
    total: total,
    pageSize: limit,
    current: current,
    showTotal: (total: number, range: Array<number>) =>
      `第 ${range[0]}-${range[1]} 条 共 ${total} 条`
    // onChange: (current: number, pageSize: number) => changePage(current, pageSize)
  }
  // const confirm = async (record: any) => {}
  // const changePage = (current: number, pageSize: number) => {
  //   // getSealApplyListReq(current, pageSize);
  // }
  const columns: TableProps['columns'] = [
    {
      title: '#',
      align: 'center',
      dataIndex: 'index',
      width: 70,
      render: (_text, _record, index) => `${index + 1}`
    },
    {
      title: '证书序列号',
      align: 'center',
      dataIndex: 'certSerialNumber',
      key: 'certSerialNumber'
    },
    {
      title: '用户名',
      align: 'center',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户账号',
      align: 'center',
      dataIndex: 'userCode',
      key: 'userCode'
    },
    {
      title: '证书开始时间',
      align: 'center',
      dataIndex: 'certStartTime',
      key: 'certStartTime'
    },
    {
      title: '证书结束时间',
      align: 'center',
      dataIndex: 'certEndTime',
      key: 'certEndTime'
    },
    {
      title: '认证方式',
      align: 'center',
      dataIndex: 'certTypeName',
      key: 'certTypeName'
    },
    {
      title: '剩余天数',
      align: 'center',
      dataIndex: 'validityDay',
      key: 'validityDay'
    },
    {
      title: '操作',
      align: 'center',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button icon={<CopyOutlined />} type="text" />
        </Space>
      )
    }
  ]
  return (
    <div className="bg">
      {contextHolder}
      <div className="headers mb-[20px]">
        <Space size="middle">
          <Button icon={<PlusOutlined />} type="primary">
            申请UKEY证书
          </Button>
          <Button icon={<PlusOutlined />} type="primary">
            申请PFX证书
          </Button>
          <Button icon={<PlusOutlined />} type="primary">
            申请加密机证书
          </Button>
        </Space>
      </div>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
        rowKey={(record) => record.id}
      />
    </div>
  )
}

export default Cert
