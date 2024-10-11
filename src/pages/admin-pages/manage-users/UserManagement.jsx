import {
  Button,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Table,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./user.css";

function UserManagementPage() {
  const columns = [
    {
      title: "ID",
      dataIndex: "Id",
      key: "Id",
      width: "5%",
    },
    {
      title: "Username",
      dataIndex: "Username",
      key: "Username",
      width: "10%",
      align: "center",
    },
    {
      title: "Account",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Username",
      dataIndex: "Name",
      key: "Name",
    },
    {
      title: "Point",
      dataIndex: "Point",
      key: "Point",
      sorter: (a, b) => a.Point - b.Point, // Thay đổi từ bonusScore thành point
      width: "7%",
    },
    {
      title: "Address",
      dataIndex: "Address",
      key: "Address",
    },
    {
      title: "Created At",
      dataIndex: "CreateAt",
      key: "CreateAt",
    },
    {
      title: "Status",
      dataIndex: "Status",
      key: "Status",
      width: "7%",
    },
    {
      title: "Phone",
      dataIndex: "Phone",
      key: "Phone",
      align: "center",
    },
    {
      title: "Edit",
      dataIndex: "Id",
      key: "Id",
      align: "center",

      render: (user) => {
        return (
          <div className="action-buttons">
            <Button
              type="primary"
              onClick={() => {
                handleOpenModal(true);
                formVariable.setFieldsValue(user); // Load dữ liệu user vào form
              }}
            >
              EDIT
            </Button>
          </div>
        );
      },
    },
    {
      title: "Disabled",
      dataIndex: "Id",
      key: "Id",
      align: "center",

      render: (Id) => {
        return (
          <Popconfirm
            onConfirm={() => handleDeleteByID(Id)}
            title="Delete"
            description="Are you sure?"
          >
            <Button type="primary" danger>
              DISABLE
            </Button>
          </Popconfirm>
        );
      },
    },
  ];

  const [formVariable] = useForm();
  const [visible, setVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleHideModal = () => {
    setVisible(false);
  };

  const handleOKButton = () => {
    formVariable.submit();
  };

  const api = "https://66f510f49aa4891f2a23b862.mockapi.io/UserManagement";

  const fetchUsers = async () => {
    try {
      const response = await axios.get(api);
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSubmitValue = async (user) => {
    try {
      setSubmitting(true);
      if (user.id) {
        const response = await axios.put(`${api}/${user.id}`, user); // Correct API call
      } else {
        const response = await axios.post(api, user);
      }
      fetchUsers();
      formVariable.resetFields();
      handleHideModal();
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteByID = async (userID) => {
    try {
      await axios.delete(`${api}/${userID}`);
      toast.success("Delete successful");
      fetchUsers();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  return (
    <div className="container">
      <h1>User Management</h1>
      <Table
        dataSource={users}
        columns={columns}
        bordered
        className="custom-table-border"
        pagination={{ pageSize: 10 }} // Hiển thị 10 item mỗi trang
        scroll={{ y: 1000 }} // Tạo thanh cuộn dọc khi bảng có nhiều dữ liệu
      />

      <Modal
        title="Manage User"
        open={visible}
        onCancel={handleHideModal}
        onOk={handleOKButton}
        confirmLoading={submitting}
      >
        <Form form={formVariable} onFinish={handleSubmitValue}>
          <Form.Item
            name={"Username"}
            label={"Username"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên vào",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"userId"}
            label={"User ID"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền ID vào",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"Name"}
            label={"Name"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên vào",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"password"}
            label={"Password"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền mật khẩu vào",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name={"Point"}
            label={"Point"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền điểm vào",
              },
              {
                type: "number",
                min: 0,
                max: 100,
                message: "Điểm không hợp lệ",
              },
            ]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name={"Address"}
            label={"Address"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền địa chỉ vào",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"Status"}
            label={"Status"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền trạng thái vào",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"Phone"}
            label={"Phone"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền số điện thoại vào",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default UserManagementPage;
