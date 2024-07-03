import './index.scss'
import { Table, Space, Button, Switch, message, Modal, Form, Input, Badge, Radio, Spin } from 'antd'
import { PlusOutlined, EditOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { getSealTypeList, addSealType, editSealType, changeSealTypeStatus } from '@/api/sealType'
import { SealTypeItem } from '@/api/sealType/type'
import { useState, useEffect } from 'react'
const SealType = () => {
  // DATA
  // 表单数据
  const [form] = Form.useForm()
  // 消息提示
  const [messageApi, contextHolder] = message.useMessage()
  // 控制弹框是否显示
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 控制弹框显示标题
  const [titleText, setTitleText] = useState('新增印章类型')
  // 印章类型列表
  const [dataSource, setDataSource] = useState<SealTypeItem[]>([])
  // 当前行ID
  const [rowId, setRowId] = useState<number>(0)
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
  // 表单默认数据
  const initialValues = {
    sealTypeCode: '',
    sealTypeName: '',
    userType: '1'
  }
  // 当前行数据 类型声明
  interface Row {
    readonly id: number
    sealTypeCode?: string
    sealTypeName?: string
    userType?: number
  }
  // Function
  useEffect(() => {
    // 获取印章类型列表
    getSealTypeListReq(1, 10)
  }, [])
  // 获取印章类型列表
  const getSealTypeListReq = async (current: number, limit: number) => {
    setLoading(true)
    const params = {
      limit: limit,
      current: current
    }
    const data = await getSealTypeList(params)
    setDataSource(data.content.map((el, index) => ({ index, ...el })))
    setCurrent(data.pageable.pageNumber)
    setLimit(data.pageable.pageSize)
    setTotal(data.pageable.totalElements)
    setLoading(false)
  }
  // 监听页码和每页条数改变
  const changePage = (current: number, pageSize: number) => {
    getSealTypeListReq(current, pageSize)
  }
  // 打开弹框
  const openDialog = (type: string, row: Row) => {
    if (type === 'add') {
      setTitleText('新增印章类型')
      form.resetFields()
    } else {
      setTitleText('编辑印章类型')
      setRowId(row.id)
      form.setFieldsValue({
        sealTypeCode: row.sealTypeCode,
        sealTypeName: row.sealTypeName,
        userType: row.userType?.toString()
      })
    }
    setIsModalOpen(true)
  }
  // 关闭弹框
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  // 提交表单
  const handleSubmit = () => {
    form.validateFields().then(async (values) => {
      if (titleText === '新增印章类型') {
        await addSealType({
          sealTypeCode: values.sealTypeCode,
          sealTypeName: values.sealTypeName,
          userType: Number(values.userType)
        })
        setIsModalOpen(false)
        messageApi
          .open({
            type: 'success',
            content: '新增成功!',
            duration: 1
          })
          .then(() => {
            getSealTypeListReq(current, limit)
          })
      } else {
        await editSealType({
          sealTypeCode: values.sealTypeCode,
          sealTypeName: values.sealTypeName,
          userType: Number(values.userType),
          sealTypeId: rowId
        })
        setIsModalOpen(false)
        form.resetFields()
        messageApi
          .open({
            type: 'success',
            content: '编辑成功!',
            duration: 1
          })
          .then(() => {
            getSealTypeListReq(current, limit)
          })
      }
    })
  }
  // 修改印章类型状态
  const handleStatusChange = async (checked: boolean, record: SealTypeItem) => {
    setDataSource(
      dataSource.map((item) =>
        item.id === record.id ? { ...item, status: checked ? 1 : 0 } : item
      )
    )
    await changeSealTypeStatus({ sealTypeId: record.id })
    if (checked) {
      messageApi.open({
        type: 'success',
        content: '启用成功!',
        duration: 1
      })
    } else {
      messageApi.open({
        type: 'success',
        content: '禁用成功!',
        duration: 1
      })
    }
  }
  // 渲染表格数据配置
  const columns: TableProps<SealTypeItem>['columns'] = [
    {
      title: '#',
      align: 'center',
      dataIndex: 'index',
      width: 70,
      render: (_text, _record, index) => `${index + 1}`
    },
    {
      title: '印章类型编码',
      align: 'center',
      dataIndex: 'sealTypeCode',
      key: 'sealTypeCode'
    },
    {
      title: '印章类型名称',
      align: 'center',
      dataIndex: 'sealTypeName',
      key: 'sealTypeName'
    },
    {
      title: '对应用户类型',
      align: 'center',
      dataIndex: 'userType',
      key: 'userType',
      render: (_, record) => {
        switch (record.userType) {
          case 1:
            return <Badge status="processing" text="机构" />
          case 2:
            return <Badge status="success" text="个人" />
        }
      }
    },
    {
      title: '状态',
      align: 'center',
      // 0:禁用 1:启用
      dataIndex: 'status',
      key: 'status',
      render: (_text, record) => {
        return (
          <Switch
            checked={record.status === 1 ? true : false}
            checkedChildren="启用"
            onChange={(check) => handleStatusChange(check, record)}
            unCheckedChildren="禁用"
          />
        )
      }
    },
    {
      title: '操作',
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => openDialog('set', record)} type="link">
            编辑
          </Button>
        </Space>
      )
    }
  ]
  return (
    <div className="bg">
      {contextHolder}
      <div className="headers">
        <Button icon={<PlusOutlined />} onClick={() => openDialog('add', { id: 0 })} type="primary">
          新增
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          rowKey={(record) => record.id}
        />
      </Spin>
      <Modal onCancel={handleCancel} onOk={handleSubmit} open={isModalOpen} title={titleText}>
        <Form
          autoComplete="off"
          className="pt-[20px]"
          form={form}
          initialValues={initialValues}
          layout="vertical">
          <Form.Item
            label="印章类型编码:"
            name="sealTypeCode"
            rules={[{ required: true, message: '当前印章类型编码不能为空!' }]}>
            <Input placeholder="请输入印章类型编码" />
          </Form.Item>
          <Form.Item
            label="印章类型名称:"
            name="sealTypeName"
            rules={[{ required: true, message: '当前印章类型名称不能为空!' }]}>
            <Input placeholder="请输入印章类型名称" />
          </Form.Item>
          <Form.Item label="用户类型:" name="userType">
            <Radio.Group>
              <Radio value="1">机构</Radio>
              <Radio value="2">个人</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default SealType
