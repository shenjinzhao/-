import "./index.scss";
import { Table, Space, Button, Badge, message, Image, Modal, Spin } from "antd";
import type { TableProps } from "antd";
import { HighlightOutlined } from "@ant-design/icons";
import { getSealApplyList } from "@/api/sealApply";
import { tableItem } from "@/api/sealApply/type";
import { useState, useEffect } from "react";
const SealMake = () => {
  // DATA
  // 消息提示
  const [messageApi, contextHolder] = message.useMessage();
  // 表格数据
  const [dataSource, setDataSource] = useState<tableItem[]>([]);
  // 证书列表
  const [certList, setCertList] = useState<tableItem[]>([]);
  // 控制弹框是否显示
  const [isCheckedModalOpen, setIsCheckedModalOpen] = useState<boolean>(false);
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
  const changePage = (current: number, pageSize: number) => {
    getSealApplyListReq(current, pageSize);
  };
  const openDialog = (record: any) => {
    setIsCheckedModalOpen(true);
  };
  const makeSealOK = () => {};
  const makeSealCancel = () => {
    setIsCheckedModalOpen(false);
  };
  // 渲染表格数据配置
  const columns: TableProps<tableItem>["columns"] = [
    {
      title: "#",
      dataIndex: "index",
      width: 70,
      align: "center",
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: "印章申请编号",
      width: 300,
      dataIndex: "sealApplyCode",
      align: "center",
      key: "sealApplyCode",
    },
    {
      title: "印章名称",
      dataIndex: "sealName",
      align: "center",
      key: "sealName",
    },
    {
      title: "印章类型名称",
      dataIndex: "sealTypeName",
      align: "center",
      key: "sealTypeName",
    },
    {
      title: "申请状态",
      dataIndex: "status",
      align: "center",
      key: "status",
      render: (_, record) => {
        switch (record.status) {
          case 0:
            return <Badge status="default" text="待审批"></Badge>;
          case 1:
            return <Badge status="success" text="通过"></Badge>;
          case 2:
            return <Badge status="error" text="未通过"></Badge>;
        }
      },
    },
    {
      title: "印章图片",
      dataIndex: "sealImage",
      align: "center",
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
      title: "申请时间",
      width: 250,
      align: "center",
      dataIndex: "applyTime",
      key: "applyTime",
    },
    {
      title: "审批时间",
      width: 250,
      align: "center",
      dataIndex: "approvalTime",
      key: "approvalTime",
    },
    {
      title: "操作",
      width: 120,
      fixed: "right",
      align: "center",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<HighlightOutlined />}
            onClick={() => openDialog(record)}
          >
            制作
          </Button>
        </Space>
      ),
    },
  ];
  const certColumns: TableProps<tableItem>["columns"] = [
    {
      title: "#",
      dataIndex: "index",
      width: 70,
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: "证书性质",
      dataIndex: "certNature",
      key: "certNature",
    },
    {
      title: "证书类型",
      dataIndex: "certType",
      key: "certType",
    },
    {
      title: "使用人",
      dataIndex: "usePerson",
      key: "usePerson",
    },
    {
      title: "状态",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "开始时间",
      width: 250,
      dataIndex: "startTime",
      key: "startTime",
    },
    {
      title: "结束时间",
      width: 250,
      dataIndex: "endTime",
      key: "endTime",
    },
  ];
  const getSealApplyListReq = async (current: number, limit: number) => {
    setLoading(true);
    const data = {
      limit: limit,
      current: current,
    };
    const res = await getSealApplyList(data);
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
  const rowSelection = {
    onChange: (_: any, selectedRows: any) => {},
  };
  useEffect(() => {
    getSealApplyListReq(1, 10);
  }, []);
  return (
    <div className="bg">
      {contextHolder}
      <Spin spinning={loading}>
        <Table
          dataSource={dataSource}
          pagination={pageination}
          columns={columns}
          scroll={{ x: 1800, y: 560 }}
          rowKey={(record) => record.id}
        />
      </Spin>
      <Modal
        title="制作印章"
        open={isCheckedModalOpen}
        onOk={makeSealOK}
        onCancel={makeSealCancel}
        width={1500}
      >
        <Table
          dataSource={certList}
          columns={certColumns}
          rowSelection={{ type: "radio", ...rowSelection }}
          pagination={false}
          rowKey={(record) => record.id}
        />
      </Modal>
    </div>
  );
};

export default SealMake;
