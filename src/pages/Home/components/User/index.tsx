import "./index.scss";
import {
  Table,
  message,
  Button,
  Space,
  Popconfirm,
  Badge,
  Form,
  Input,
  Radio,
  Modal,
  Select,
  Spin,
} from "antd";
import type { TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { addUser, getUserListPage, deleteUser,editUser } from "@/api/user/index";
import { getRoleList } from "@/api/common/index";
import { Role } from "@/api/common/type";
import { User } from "@/api/user/type";
const UserPage = () => {
  // DATA
  // 表单数据
  const [form] = Form.useForm();
  // 用户列表
  const [dataSource, setDataSource] = useState<Array<User>>([]);
  // 角色列表
  const [roleList, setRoleList] = useState<Array<Role>>([]);
  // 弹框标题
  const [titleText, setTitleText] = useState("新增用户");
  // 控制弹框是否显示
  const [isModalOpen, setIsModalOpen] = useState(false);
  // 新增 or 编辑
  const [type, setType] = useState<string>("add");
  // 编辑行的ID
  const [rowId, setRowId] = useState<number>(0);
  // 消息提示
  const [messageApi, contextHolder] = message.useMessage();
  // 表格数据页码
  const [current, setCurrent] = useState<number>(1);
  // 表格数据每页条数
  const [limit, setLimit] = useState<number>(10);
  // 表格数据总数
  const [total, setTotal] = useState<number>(0);
  // 加载状态
  const [loading, setLoading] = useState<boolean>(false);
  // 分页功能配置
  const pageination = {
    showSizeChanger: true, // 是否可以改变 pageSize
    showQuickJumper: false, // 是否可以快速跳转至某页
    total: total,
    pageSize: limit,
    current: current,
    showTotal: (total: number, range: Array<number>) =>
      `第 ${range[0]}-${range[1]} 条 共 ${total} 条`,
    onChange: (current: number, pageSize: number) =>
      changePage(current, pageSize),
  };
  // 表单默认数据
  const initialValues = {
    userName: "",
    userCode: "",
    userIdCard: "",
    userType: "1",
    password: "",
    roleCode: "",
  };
  // 当前行数据 类型声明
  interface Row {
    readonly id: number;
    userName?: string;
    userCode?: string;
    userIdCard?: string;
    userType?: number;
    password?: string;
    roleCode?: number;
  }

  // Function
  useEffect(() => {
    // 获取用户列表
    getUserLstReq(1, 10);
    // 获取角色列表
    getRoleListReq();
  }, []);
    // 获取用户列表
  const getUserLstReq = async (current: number, limit: number) => {
    setLoading(true);
    const data = {
      limit: limit,
      current: current,
    };
    const res = await getUserListPage(data);
    if (res.code === 0) {
      setDataSource(
        res.data.content.map((el, index: number) => ({ index, ...el }))
      );
      setCurrent(res.data.pageable.pageNumber);
      setLimit(res.data.pageable.pageSize);
      setTotal(res.data.pageable.totalElements);
    }
    setLoading(false);
  };
    // 获取角色列表
  const getRoleListReq = async () => {
    const res = await getRoleList({});
    if (res.code === 0) {
      setRoleList(res.data);
    }
  };
  // 监听页码和每页条数改变
  const changePage = (current: number, pageSize: number) => {
    getUserLstReq(current, pageSize);
  };
  // 点击确认删除
  const confirm = async (record: any) => {
    const res = await deleteUser({ userId: record.id });
    if (res.code === 0) {
      messageApi
        .open({
          type: "success",
          content: "删除成功!",
          duration: 1,
        })
        .then(() => {
          getUserLstReq(current, limit);
        });
    }
  };
  // 打开弹框
  const openDialog = (type: string, row: Row) => {
    setType(type);
    if (type === "add") {
      setTitleText("新增用户");
      form.resetFields();
    } else {
      setTitleText("编辑用户");
      setRowId(row.id);
      form.setFieldsValue({
        userType: row.userType?.toString(),
        userName: row.userName,
        userCode: row.userCode,
        userIdCard: row.userIdCard,
        password: "",
        roleCode: row.roleCode,
      });
    }
    setIsModalOpen(true);
  };
  // 关闭弹框
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  // 提交表单
  const handleSumbit = () => {
    form.validateFields().then(async (values) => {
      if (titleText === "新增用户") {
        const res = await addUser({
          userName: values.userName,
          userCode: values.userCode,
          userIdCard: values.userIdCard,
          userType: Number(values.userType),
          password: values.password,
          roleCode: values.roleCode,
        });
        if (res.code === 0) {
          setIsModalOpen(false);
          messageApi
            .open({
              type: "success",
              content: "新增成功!",
              duration: 1,
            })
            .then(() => {
              getUserLstReq(current, limit);
            });
        }
      } else {
        const res = await editUser({
          userId: rowId,
          userName: values.userName,
          userCode: values.userCode,
          userIdCard: values.userIdCard,
          userType: Number(values.userType),
          password: values.password,
          roleCode: values.roleCode,
        });
        if (res.code === 0) {
          setIsModalOpen(false);
          messageApi
            .open({
              type: "success",
              content: "新增成功!",
              duration: 1,
            })
            .then(() => {
              getUserLstReq(current, limit);
            });
        }
      }
    });
  };
  // 渲染表格数据配置
  const columns: TableProps["columns"] = [
    {
      title: "#",
      dataIndex: "index",
      width: 70,
      align: "center",
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: "用户名称",
      align: "center",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "用户编码",
      align: "center",
      dataIndex: "userCode",
      key: "userCode",
    },
    {
      title: "身份证号/统一社会信用代码",
      align: "center",
      dataIndex: "userIdCard",
      key: "userIdCard",
    },
    {
      title: "用户类型",
      align: "center",
      dataIndex: "userType",
      key: "userType",
      render: (_, record) => {
        switch (record.userType) {
          case 1:
            return <Badge status="processing" text="机构"></Badge>;
          case 2:
            return <Badge status="success" text="个人"></Badge>;
        }
      },
    },
    {
      title: "用户角色",
      align: "center",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "操作",
      align: "center",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button type="link" onClick={() => openDialog("set", record)}>编辑</Button>
          <Popconfirm
            title="提示"
            description="您确定要删除该用户吗?"
            onConfirm={() => confirm(record)}
            okText="是"
            cancelText="否"
          >
            <Button type="link">删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className="bg">
      {/* 消息提示 */}
      {contextHolder}
      {/* 头部 */}
      <div className="headers">
        {/* 新增按钮 */}
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openDialog("add", { id: 0 })}
        >
          新增
        </Button>
      </div>
      {/* loading容器 */}
      <Spin spinning={loading}>
        {/* 表格 */}
        <Table
          dataSource={dataSource}
          pagination={pageination}
          columns={columns}
          scroll={{ y: 560 }}
          rowKey={(record) => record.id}
        />
      </Spin>
      {/* 弹框 */}
      <Modal
        title={titleText}
        open={isModalOpen}
        onOk={handleSumbit}
        onCancel={handleCancel}
      >
        <Form
          style={{ paddingTop: "20px" }}
          autoComplete="off"
          layout="vertical"
          form={form}
          initialValues={initialValues}
        >
          <Form.Item label="用户类型:" name="userType">
            <Radio.Group>
              <Radio value="1">机构</Radio>
              <Radio value="2">个人</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="用户名称:"
            name="userName"
            rules={[{ required: true, message: "当前用户名称不能为空!" }]}
          >
            <Input placeholder="请输入用户名称" />
          </Form.Item>
          <Form.Item
            label="用户账号:"
            name="userCode"
            rules={[{ required: true, message: "当前用户账号不能为空!" }]}
          >
            <Input placeholder="请输入用户账号" />
          </Form.Item>
          <Form.Item
            label="用户证件号:"
            name="userIdCard"
            rules={[{ required: true, message: "当前用户证件号不能为空!" }]}
          >
            <Input placeholder="请输入用户证件号" />
          </Form.Item>
          <Form.Item
            label="用户角色:"
            name="roleCode"
            rules={[{ required: true, message: "用户角色为必选项!" }]}
          >
            <Select placeholder="请选择用户角色">
              {roleList.map((el) => (
                <Select.Option key={el.id} value={el.roleCode}>
                  {el.roleName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="用户密码:"
            name="password"
          >
            <Input placeholder="请输入密码" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserPage;
