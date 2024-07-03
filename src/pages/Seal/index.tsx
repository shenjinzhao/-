import { Table, message, Button, Space, Popconfirm, Image, Spin } from 'antd'
import type { TableProps } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { useState, useEffect } from 'react'
import { getSealList, deleteSeal } from '@/api/seal'
import { SealListItem } from '@/api/seal/type'
const Seal = () => {
  // DATA
  // 表格数据
  const [dataSource, setDataSource] = useState<SealListItem[]>([])
  // 消息提示
  const [messageApi, contextHolder] = message.useMessage()
  // 表格数据页码
  const [current, setCurrent] = useState(1)
  // 表格数据每页条数
  const [limit, setLimit] = useState(10)
  // 表格数据总数
  const [total, setTotal] = useState(0)
  // 加载状态
  const [loading, setLoading] = useState(false)
  // 分页功能配置
  const pagination = {
    showSizeChanger: true, // 是否可以改变 pageSize
    showQuickJumper: false, // 是否可以快速跳转至某页
    total: total,
    pageSize: limit,
    current: current,
    showTotal: (total: number, range: Array<number>) =>
      `第 ${range[0]}-${range[1]} 条 共 ${total} 条`,
    onChange: (current: number, pageSize: number) => changePage(current, pageSize)
  }

  // Function
  useEffect(() => {
    // 获取印章列表
    getSealListReq(1, 10)
  }, [])
  // 获取印章列表
  const getSealListReq = async (current: number, limit: number) => {
    setLoading(true)
    const params = {
      limit: limit,
      current: current
    }
    const data = await getSealList(params)
    setDataSource(data.content.map((el, index: number) => ({ index, ...el })))
    setCurrent(data.pageable.pageNumber)
    setLimit(data.pageable.pageSize)
    setTotal(data.pageable.totalElements)
    setLoading(false)
  }
  // 监听页码和每页条数的变化
  const changePage = (current: number, pageSize: number) => {
    getSealListReq(current, pageSize)
  }
  const confirm = async (record: SealListItem) => {
    await deleteSeal({ sealCode: record.sealCode })
    messageApi
      .open({
        type: 'success',
        content: '删除成功!',
        duration: 1
      })
      .then(() => {
        getSealListReq(current, limit)
      })
  }
  // 渲染表格数据配置
  const columns: TableProps['columns'] = [
    {
      title: '#',
      align: 'center',
      dataIndex: 'index',
      width: 70,
      render: (_text, _record, index) => `${index + 1}`
    },
    {
      title: '印章名称',
      align: 'center',
      dataIndex: 'sealName',
      key: 'userName'
    },
    {
      title: '印章编码',
      align: 'center',
      dataIndex: 'sealCode',
      key: 'userCode'
    },
    {
      title: '印章类型',
      align: 'center',
      dataIndex: 'sealTypeName',
      key: 'sealTypeName'
    },
    {
      title: '印章图片',
      align: 'center',
      dataIndex: 'sealImage',
      key: 'sealImage',
      render: (_, record) => {
        return <Image className="h-[60px]" src={'data:image/png;base64,' + record.sealImage} />
      }
    },
    {
      title: '操作',
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            cancelText="否"
            description="您确定要删除该印章吗?"
            okText="是"
            onConfirm={() => confirm(record)}
            title="提示">
            <Button icon={<DeleteOutlined />} type="link">
              删除
            </Button>
          </Popconfirm>
        </Space>
      )
    }
  ]
  return (
    <div className="bg">
      {contextHolder}
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          rowKey={(record) => record.sealCode}
          scroll={{ y: 560 }}
        />
      </Spin>
    </div>
  )
}

export default Seal
