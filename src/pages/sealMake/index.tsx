import { Table, Space, Button, Badge, message, Image, Modal, Spin } from 'antd'
import type { TableProps } from 'antd'
import { HighlightOutlined } from '@ant-design/icons'
import { getSealApplyList } from '@/api/sealApply'
import { SealApplyListItem } from '@/api/sealApply/type'
import { useState, useEffect } from 'react'
const SealMake = () => {
  // DATA
  // 消息提示
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_messageApi, contextHolder] = message.useMessage()
  // 表格数据
  const [dataSource, setDataSource] = useState<SealApplyListItem[]>([])
  // 证书列表
  const [certList] = useState<SealApplyListItem[]>([])
  // 控制弹框是否显示
  const [isCheckedModalOpen, setIsCheckedModalOpen] = useState<boolean>(false)
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
  const changePage = (current: number, pageSize: number) => {
    getSealApplyListReq(current, pageSize)
  }
  const openDialog = (record: any) => {
    console.log(record)
    setIsCheckedModalOpen(true)
  }
  const makeSealOK = () => {}
  const makeSealCancel = () => {
    setIsCheckedModalOpen(false)
  }
  // 渲染表格数据配置
  const columns: TableProps<SealApplyListItem>['columns'] = [
    {
      title: '#',
      dataIndex: 'index',
      width: 70,
      align: 'center',
      render: (_text, _record, index) => `${index + 1}`
    },
    {
      title: '印章申请编号',
      width: 300,
      dataIndex: 'sealApplyCode',
      align: 'center',
      key: 'sealApplyCode'
    },
    {
      title: '印章名称',
      dataIndex: 'sealName',
      align: 'center',
      key: 'sealName'
    },
    {
      title: '印章类型名称',
      dataIndex: 'sealTypeName',
      align: 'center',
      key: 'sealTypeName'
    },
    {
      title: '申请状态',
      dataIndex: 'status',
      align: 'center',
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
      dataIndex: 'sealImage',
      align: 'center',
      key: 'sealImage',
      render: (_, record) => {
        return <Image className="h-[60px]" src={'data:image/png;base64,' + record.sealImage} />
      }
    },
    {
      title: '申请时间',
      width: 250,
      align: 'center',
      dataIndex: 'applyTime',
      key: 'applyTime'
    },
    {
      title: '审批时间',
      width: 250,
      align: 'center',
      dataIndex: 'approvalTime',
      key: 'approvalTime'
    },
    {
      title: '操作',
      width: 120,
      fixed: 'right',
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<HighlightOutlined />} onClick={() => openDialog(record)} type="link">
            制作
          </Button>
        </Space>
      )
    }
  ]
  const certColumns: TableProps<SealApplyListItem>['columns'] = [
    {
      title: '#',
      dataIndex: 'index',
      width: 70,
      render: (_text, _record, index) => `${index + 1}`
    },
    {
      title: '证书性质',
      dataIndex: 'certNature',
      key: 'certNature'
    },
    {
      title: '证书类型',
      dataIndex: 'certType',
      key: 'certType'
    },
    {
      title: '使用人',
      dataIndex: 'usePerson',
      key: 'usePerson'
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: '开始时间',
      width: 250,
      dataIndex: 'startTime',
      key: 'startTime'
    },
    {
      title: '结束时间',
      width: 250,
      dataIndex: 'endTime',
      key: 'endTime'
    }
  ]
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
  const rowSelection = {
    // onChange: (_: any, selectedRows: any) => {}
  }
  useEffect(() => {
    getSealApplyListReq(1, 10)
  }, [])
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
      <Modal
        onCancel={makeSealCancel}
        onOk={makeSealOK}
        open={isCheckedModalOpen}
        title="制作印章"
        width={1500}>
        <Table
          columns={certColumns}
          dataSource={certList}
          pagination={false}
          rowKey={(record) => record.id}
          rowSelection={{ type: 'radio', ...rowSelection }}
        />
      </Modal>
    </div>
  )
}

export default SealMake
