import React, { useState, useEffect } from "react";
import { Table, DatePicker, Button, Space, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import moment from "moment";
import "./order.css"; // Import file CSS

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  // Lấy dữ liệu đơn hàng (mock API)
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://mockapi.io/api/v1/orders");
        setOrders(response.data);
        setFilteredOrders(response.data); // Ban đầu hiển thị tất cả
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  // Xử lý khi chọn ngày
  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const filtered = orders.filter((order) =>
        moment(order.date).isSame(date, "day")
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(orders); // Reset nếu không chọn ngày
    }
  };

  // Cột của bảng
  const columns = [
    {
      title: "Order ID",
      dataIndex: "orderId",
      key: "orderId",
    },
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Order Date",
      dataIndex: "date",
      key: "date",
      render: (text) => moment(text).format("DD/MM/YYYY"),
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (status) => {
    //     let color = status === "Completed" ? "green" : "red";
    //     return <Tag color={color}>{status.toUpperCase()}</Tag>;
    //   },
    // },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `$${total}`,
    },
  ];

  return (
    <div className="order-page">
      <h1>Customer Orders</h1>

      {/* Bộ lọc theo ngày */}
      <Space style={{ marginBottom: 16 }}>
        <DatePicker
          onChange={handleDateChange}
          format="DD/MM/YYYY"
          placeholder="Select Date"
        />
        <Button
          icon={<SearchOutlined />}
          onClick={() => handleDateChange(selectedDate)}
          type="primary"
        >
          Filter by Date
        </Button>
        <Button onClick={() => setFilteredOrders(orders)} type="default">
          Reset Filters
        </Button>
      </Space>

      {/* Bảng hiển thị danh sách đơn hàng */}
      <Table
        columns={columns}
        dataSource={filteredOrders}
        rowKey="orderId"
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default OrderPage;
