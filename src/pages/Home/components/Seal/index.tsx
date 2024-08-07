import { Table, message, Button, Space, Popconfirm, Image, Spin } from "antd";
import type { TableProps } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { getSealList, deleteSeal } from "@/api/seal/index";
import { tableItem } from "@/api/seal/type";
const Seal = () => {
  // DATA
  // 表格数据
  const [dataSource, setDataSource] = useState<tableItem[]>([]);
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

  // Function
  useEffect(() => {
    // 获取印章列表
    getSealListReq(1, 10);
  }, []);
    // 获取印章列表
  const getSealListReq = async (current: number, limit: number) => {
    setLoading(true);
    const data = {
      limit: limit,
      current: current,
    };
    const res = await getSealList(data);
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
  // 监听页码和每页条数的变化
  const changePage = (current: number, pageSize: number) => {
    getSealListReq(current, pageSize);
  };
  const confirm = async (record: tableItem) => {
    const res = await deleteSeal({ sealCode: record.sealCode });
    if (res.code === 0) {
      messageApi
        .open({
          type: "success",
          content: "删除成功!",
          duration: 1,
        })
        .then(() => {
          getSealListReq(current, limit);
        });
    }
  };
  // 渲染表格数据配置
  const columns: TableProps["columns"] = [
    {
      title: "#",
      align: "center",
      dataIndex: "index",
      width: 70,
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: "印章名称",
      align: "center",
      dataIndex: "sealName",
      key: "userName",
    },
    {
      title: "印章编码",
      align: "center",
      dataIndex: "sealCode",
      key: "userCode",
    },
    {
      title: "印章类型",
      align: "center",
      dataIndex: "sealTypeName",
      key: "sealTypeName",
    },
    {
      title: "印章图片",
      align: "center",
      dataIndex: "sealImage",
      key: "sealImage",
      render: (_, record) => {
        return (
          <Image
            src={"data:image/png;base64," + record.sealImage}
            style={{ height: "60px" }}
          />
        );
      },
    },
    {
      title: "操作",
      align: "center",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Popconfirm
            title="提示"
            description="您确定要删除该印章吗?"
            onConfirm={() => confirm(record)}
            okText="是"
            cancelText="否"
          >
            <Button type="link" icon={<DeleteOutlined />}>删除</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div className="bg">
      {contextHolder}
      <Spin spinning={loading}>
        <Table
          dataSource={dataSource}
          pagination={pageination}
          columns={columns}
          scroll={{ y: 560 }}
          rowKey={(record) => record.sealCode}
        />
      </Spin>
    </div>
  );
};

export default Seal;
