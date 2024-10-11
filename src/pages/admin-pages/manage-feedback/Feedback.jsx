import { useState, useEffect } from "react";
import { Table, Tag, Space, Typography, Card } from "antd";
import axios from "axios";
import "./feedback.css";

const { Title } = Typography;

const ViewFeedbackPage = () => {
  const [feedbackData, setFeedbackData] = useState([]);

  useEffect(() => {
    axios.get("/api/feedback").then((response) => {
      const data = response.data;
      if (Array.isArray(data)) {
        setFeedbackData(data);
      } else {
        console.error("Data is not an array:", data);
      }
    });
  }, []);

  const columns = [
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <Tag color={status === "Resolved" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>View</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Card style={{ marginBottom: "20px", background: "#f0f2f5" }}>
        <Title level={3} style={{ textAlign: "center" }}>
          User Feedback
        </Title>
      </Card>
      <Table
        columns={columns}
        dataSource={feedbackData}
        rowKey="id"
        bordered
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default ViewFeedbackPage;
