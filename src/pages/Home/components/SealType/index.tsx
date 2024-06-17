import "./index.scss";
import {
  Table,
  Space,
  Button,
  Switch,
  message,
  Modal,
  Form,
  Input,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { getSealTypeList,addSealType, changeSealTypeStatus } from "@/api/sealType";
import { useState, useEffect } from "react";
interface DataType {
  id: number;
  sealTypeCode: string;
  sealTypeName: string;
  status: number;
}
const SealType = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleText, setTitleText] = useState("新增印章类型");
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const [total, setTotal] = useState<number>(0);
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
    sealTypeCode: "",
    sealTypeName: "",
  };
  const changePage = (current: number, pageSize: number) => {
    getSealTypeListReq(current, pageSize);
  };
  const openDialog = (type: string) => {
    if (type === "add") {
      setTitleText("新增印章类型");
    } else {
      setTitleText("编辑印章类型");
    }
    setIsModalOpen(true);
  };
  const handleSumbit = () => {
    form.validateFields().then(async (values) => {
    const res = await addSealType(values);
    if(res.code === 0) {
      setIsModalOpen(false);
      messageApi.open({
        type: "success",
        content: "新增成功!",
        duration: 1,
      }).then(() => {
        getSealTypeListReq(current, limit);
      })
    }
    })
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleStatusChange = async (checked: boolean, id: number) => {
    const res = await changeSealTypeStatus({ sealTypeId: id });
    if (res.code === 0) {
      if (checked) {
        messageApi.open({
          type: "success",
          content: "启用成功!",
          duration: 1,
        });
      } else {
        messageApi.open({
          type: "success",
          content: "禁用成功!",
          duration: 1,
        });
      }
    }
  };
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "#",
      dataIndex: "index",
      width: 70,
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: "印章类型编码",
      dataIndex: "sealTypeCode",
      key: "sealTypeCode",
    },
    {
      title: "印章类型名称",
      dataIndex: "sealTypeName",
      key: "sealTypeName",
    },
    {
      title: "状态",
      // 0:禁用 1:启用
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        return (
          <Switch
            checkedChildren="启用"
            unCheckedChildren="禁用"
            defaultChecked
            onChange={(check) => handleStatusChange(check, record.id)}
          />
        );
      },
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => openDialog('set')}>编辑</a>
          <a>删除</a>
        </Space>
      ),
    },
  ];
  const getSealTypeListReq = async (current: number, limit: number) => {
    const data = {
      limit: limit,
      current: current,
    };
    const res = await getSealTypeList(data);
    if (res.code === 0) {
      setDataSource(res.data.content.map((el, index) => ({ index, ...el })));
      setCurrent(res.data.pageable.pageNumber);
      setLimit(res.data.pageable.pageSize);
      setTotal(res.data.pageable.totalElements);
    }
  };
  useEffect(() => {
    getSealTypeListReq(1, 10);
  }, []);
  return (
    <div className="bg">
      {contextHolder}
      <div className="headers">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => openDialog("add")}
        >
          新增
        </Button>
      </div>
      <Table
        dataSource={dataSource}
        pagination={pageination}
        columns={columns}
        rowKey={(record) => record.id}
      />
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
          <Form.Item
            label="印章类型编码:"
            name="sealTypeCode"
            rules={[{ required: true, message: "当前印章类型编码不能为空!" }]}
          >
            <Input placeholder="请输入印章类型编码" />
          </Form.Item>
          <Form.Item
            label="印章类型名称:"
            name="sealTypeName"
            rules={[{ required: true, message: "当前印章类型名称不能为空!" }]}
          >
            <Input placeholder="请输入印章类型名称" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default SealType;
