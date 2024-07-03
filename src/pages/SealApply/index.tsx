import {
  Table,
  Space,
  Button,
  Badge,
  message,
  Modal,
  Form,
  Input,
  Image,
  Select,
  Upload,
  Row,
  Col,
  Popconfirm,
  Spin
} from 'antd'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
import type { TableProps } from 'antd'
import { getSealApplyList, sealApply, deleteSealApply } from '@/api/sealApply'
import { getSealTypeListNoPage } from '@/api/sealType'
import { SealApplyListItem } from '@/api/sealApply/type'
import { SealTypeItem } from '@/api/sealType/type'
import { UserListItem } from '@/api/user/type'
import { getUserList } from '@/api/user/index'
import { useState, useEffect } from 'react'
const SealApply = () => {
  // DATA
  // 表单数据
  const [form] = Form.useForm()
  // 消息提示
  const [messageApi, contextHolder] = message.useMessage()
  // 控制弹框是否显示
  const [isModalOpen, setIsModalOpen] = useState(false)
  // 控制选择印章持有人弹框是否显示
  const [isCheckedModalOpen, setIsCheckedModalOpen] = useState(false)
  // 控制弹框显示标题
  const [titleText, setTitleText] = useState('印章申请')
  // 表格数据
  const [dataSource, setDataSource] = useState<SealApplyListItem[]>([])
  // 印章类型列表
  const [sealTypeList, setSealTypeList] = useState<SealTypeItem[]>([])
  // 根据用户类型 生成不同的印章类型列表
  const [activeSealTypeList, setActiveSealTypeList] = useState<SealTypeItem[]>([])
  // 用户列表
  const [userList, setUserList] = useState<UserListItem[]>([])
  // 当前行ID
  // const [rowId, setRowId] = useState<number>(0)
  // 印章持有人
  const [activeUser, setActiveUser] = useState<any>()
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
    sealTypeName: ''
  }
  interface FormInterFace {
    sealTypeCode: string
    sealName: string
    userId: string
    file: any[]
  }
  // Function
  useEffect(() => {
    // 获取印章类型列表
    getSealTypeListReq()
    // 获取印章申请列表
    getSealApplyListReq(1, 10)
  }, [])
  // 获取印章类型列表
  const getSealTypeListReq = async () => {
    const data = await getSealTypeListNoPage({ limit: 1000, current: 1 })
    setSealTypeList(data)
    setActiveSealTypeList(data)
  }
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
  // 打开弹框
  const openDialog = (
    type: string
    // row: SealApplyListItem | null
  ) => {
    if (type === 'add') {
      setTitleText('印章申请')
      form.resetFields()
    } else {
      setTitleText('编辑印章申请信息')
      // setRowId(row.id);
    }
    setIsModalOpen(true)
  }
  // 关闭弹框
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  // 检测文件格式
  const handlePreview = (file: any) => {
    const isValidType =
      file.file.type === 'image/gif' ||
      file.file.type === 'image/bmp' ||
      file.file.type === 'image/jpeg' ||
      file.file.type === 'image/png' ||
      file.file.type === 'image/svg'
    if (!isValidType) {
      messageApi.open({
        type: 'error',
        content: '上传图片格式错误!',
        duration: 1
      })
    }
  }
  // 打开选择印章持有人弹框 获取用户列表
  const openCheckModal = async () => {
    setIsCheckedModalOpen(true)
    const data = await getUserList({})
    setUserList(data)
  }
  // 处理上传文件
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e
    }
    return e?.fileList
  }
  // 选择印章持有人
  const rowSelection = {
    onChange: (_: any, selectedRows: any) => {
      setActiveUser(selectedRows[0])
    }
  }
  // 提交表单
  const handleSubmit = () => {
    form.validateFields().then(async (values: FormInterFace) => {
      if (typeof values.file === 'undefined' || values.file.length === 0) {
        return messageApi.open({
          type: 'error',
          content: '请上传图片!',
          duration: 1
        })
      }
      if (titleText === '印章申请') {
        await sealApply({
          sealTypeCode: values.sealTypeCode,
          sealName: values.sealName,
          userId: activeUser?.id,
          sealData: values.file[0].thumbUrl.split(',')[1]
        })
        setIsModalOpen(false)
        messageApi
          .open({
            type: 'success',
            content: '申请成功!',
            duration: 1
          })
          .then(() => {
            form.resetFields()
            getSealApplyListReq(current, limit)
          })
      }
    })
  }
  // 删除印章申请
  const confirm = async (record: SealApplyListItem) => {
    await deleteSealApply({ sealApplyCode: record.sealApplyCode })
    messageApi
      .open({
        type: 'success',
        content: '删除成功!',
        duration: 1
      })
      .then(() => {
        getSealApplyListReq(current, limit)
      })
  }
  // 确认选择
  const checkUserOk = () => {
    if (activeUser !== null) {
      form.setFieldValue('userId', activeUser?.userName)
      setActiveSealTypeList(sealTypeList.filter((el) => el.userType === activeUser?.userType))
      setIsCheckedModalOpen(false)
    } else {
      messageApi.open({
        type: 'error',
        content: '请选择用户!',
        duration: 1
      })
    }
  }
  // 取消选择
  const checkUserCancel = () => {
    setIsCheckedModalOpen(false)
    setUserList([])
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
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            cancelText="否"
            description="您确定要删除这条印章申请吗?"
            okText="是"
            onConfirm={() => confirm(record)}
            title="提示">
            <a>删除</a>
          </Popconfirm>
        </Space>
      )
    }
  ]
  const userColumns: TableProps<UserListItem>['columns'] = [
    {
      title: '#',
      align: 'center',
      dataIndex: 'index',
      width: 70,
      render: (_text, _record, index) => `${index + 1}`
    },
    {
      title: '用户名',
      align: 'center',
      dataIndex: 'userName',
      key: 'userName'
    },
    {
      title: '用户编码',
      align: 'center',
      dataIndex: 'userCode',
      key: 'userCode'
    },
    {
      title: '身份证号/统一社会信用代码',
      align: 'center',
      dataIndex: 'userIdCard',
      key: 'userIdCard'
    },
    {
      title: '用户类型',
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
    }
  ]
  return (
    <div className="bg">
      {contextHolder}
      <div className="headers">
        <Button
          icon={<PlusOutlined />}
          onClick={() =>
            openDialog(
              'add'
              // null
            )
          }
          type="primary">
          印章申请
        </Button>
      </div>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={pagination}
          rowKey={(record) => record.id}
          scroll={{ x: 1800, y: 560 }}
        />
      </Spin>
      <Modal onCancel={handleCancel} onOk={handleSubmit} open={isModalOpen} title={titleText}>
        <Form
          autoComplete="off"
          className="pt-[20px]"
          form={form}
          initialValues={initialValues}
          layout="vertical">
          <Form.Item extra="请点击浏览按钮,选择印章持有人" label="印章持有人:">
            <Row gutter={8}>
              <Col span={12}>
                <Form.Item
                  name="userId"
                  noStyle
                  rules={[{ required: true, message: '当前印章持有人不能为空!' }]}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button onClick={openCheckModal}>浏览</Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item
            label="印章类型:"
            name="sealTypeCode"
            rules={[{ required: true, message: '印章类型为必选项!' }]}>
            <Select placeholder="请选择印章类型">
              {activeSealTypeList.map((el) => (
                <Select.Option key={el.id} value={el.sealTypeCode}>
                  {el.sealTypeName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="印章名称:"
            name="sealName"
            rules={[{ required: true, message: '当前印章名称不能为空!' }]}>
            <Input placeholder="请输入印章名称" />
          </Form.Item>
          <Form.Item
            extra="上传图片支持GIF,BMP,JPG,PNG,SVG"
            getValueFromEvent={normFile}
            label="印章图片:"
            name="file"
            valuePropName="fileList">
            <Upload
              action="/image/*"
              beforeUpload={() => false}
              customRequest={handlePreview}
              listType="picture"
              maxCount={1}
              name="logo">
              <Button icon={<UploadOutlined />}>点击上传</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        onCancel={checkUserCancel}
        onOk={checkUserOk}
        open={isCheckedModalOpen}
        title="选择印章持有人"
        width={800}>
        <Table
          columns={userColumns}
          dataSource={userList}
          pagination={false}
          rowKey={(record) => record.id}
          rowSelection={{ type: 'radio', ...rowSelection }}
        />
      </Modal>
    </div>
  )
}

export default SealApply
