import { Table, Space, Button, Badge, message, Image, Spin } from 'antd'
import type { TableProps } from 'antd'
import { getSealApplyList } from '@/api/sealApply'
import { SealApplyListItem } from '@/api/sealApply/type'
import { approvalSealApply } from '@/api/sealApply/index'
import { useState, useEffect } from 'react'
const SealApproval = () => {
  // DATA
  // 消息提示
  const [messageApi, contextHolder] = message.useMessage()
  // 表格数据
  const [dataSource, setDataSource] = useState<SealApplyListItem[]>([])
  // 表格数据页码
  const [current, setCurrent] = useState<number>(1)
  // 表格数据每页条数
  const [limit, setLimit] = useState<number>(10)
  // 表格数据总数
  const [total, setTotal] = useState<number>(0)
  // 加载状态
  const [loading, setLoading] = useState<boolean>(false)
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
  useEffect(() => {
    // 获取印章申请列表
    getSealApplyListReq(1, 10)
  }, [])
  // 获取印章申请列表
  const getSealApplyListReq = async (current: number, limit: number) => {
    setLoading(true)
    const params = {
      limit: limit,
      current: current
    }
    const data = await getSealApplyList(params)
    setDataSource(data.content.map((el, index: number) => ({ index, ...el })))
    setCurrent(data.pageable.pageNumber)
    setLimit(data.pageable.pageSize)
    setTotal(data.pageable.totalElements)
    setLoading(false)
  }
  // 监听页码和每页条数的变化
  const changePage = (current: number, pageSize: number) => {
    getSealApplyListReq(current, pageSize)
  }
  // 审批接口
  const approval = async (type: number, record: SealApplyListItem) => {
    await approvalSealApply({
      status: type,
      sealApplyCode: record.sealApplyCode
    })
    messageApi
      .open({
        type: 'success',
        content: '审批完成!',
        duration: 1
      })
      .then(() => {
        getSealApplyListReq(current, limit)
      })
  }
  // 渲染表格数据配置
  const columns: TableProps<SealApplyListItem>['columns'] = [
    {
      title: '#',
      align: 'center',
      dataIndex: 'index',
      width: 70,
      render: (_text, _record, index) => `${index + 1}`
    },
    {
      title: '印章申请编号',
      align: 'center',
      width: 300,
      dataIndex: 'sealApplyCode',
      key: 'sealApplyCode'
    },
    {
      title: '印章名称',
      align: 'center',
      dataIndex: 'sealName',
      key: 'sealName'
    },
    {
      title: '印章类型名称',
      align: 'center',
      dataIndex: 'sealTypeName',
      key: 'sealTypeName'
    },
    {
      title: '申请状态',
      align: 'center',
      dataIndex: 'status',
      key: 'status',
      render: (_, record) => {
        switch (record.status) {
          case 0:
            return <Badge status="default" text="待审批" />
          case 1:
            return <Badge status="success" text="通过" />
          case 2:
            return <Badge status="error" text="未通过" />
        }
      }
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
      title: '申请时间',
      align: 'center',
      width: 250,
      dataIndex: 'applyTime',
      key: 'applyTime'
    },
    {
      title: '审批时间',
      align: 'center',
      width: 250,
      dataIndex: 'approvalTime',
      key: 'approvalTime'
    },
    {
      title: '操作',
      align: 'center',
      width: 180,
      fixed: 'right',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button disabled={record.status !== 0} onClick={() => approval(1, record)} type="link">
            同意
          </Button>
          <Button disabled={record.status !== 0} onClick={() => approval(2, record)} type="link">
            拒绝
          </Button>
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
          rowKey={(record) => record.id}
          scroll={{ x: 1800, y: 560 }}
        />
      </Spin>
    </div>
  )
}

export default SealApproval
