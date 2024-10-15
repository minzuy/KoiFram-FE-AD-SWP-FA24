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
    // {
    //   title: "ID",
    //   dataIndex: "id",
    //   key: "id",
    //   width: "5%",
    // },
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      width: "10%",
      align: "center",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: "10%",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
      width: "10%",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      align: "center",
      width: "17%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: "7%",
    },
    {
      title: "Role",
      dataIndex: "role", // Đặt thành role để lấy toàn bộ object
      key: "role",
      render: (role) => role?.name || "N/A", // Truy cập trực tiếp vào role.name
      width: "7%",
    },

    {
      title: "Created At",
      dataIndex: "createAt",
      key: "createAt",
      align: "center",
      width: "14%",
    },
    {
      title: "Edit",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "7%",

      render: (_, record) => {
        return (
          <div className="action-buttons">
            <Button
              type="primary"
              onClick={() => {
                handleOpenModal(true);
                formVariable.setFieldsValue(record); // Load dữ liệu từ hàng vào form
              }}
            >
              EDIT
            </Button>
          </div>
        );
      },
    },

    {
      title: "Disable",
      dataIndex: "id",
      key: "id",
      align: "center",
      width: "7%",

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

  const api = "http://api-koifish.evericks.com/api/users/customers";

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
        await axios.put(`${api}/${user.id}`, user); // Cập nhật người dùng
      } else {
        await axios.post(api, user); // Thêm người dùng mới
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
        pagination={{ pageSize: 10 }}
        scroll={{ y: 1000 }}
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
            name={"username"}
            label={"Username"}
            rules={[{ required: true, message: "Vui lòng điền tên vào" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"id"}
            label={"User ID"}
            rules={[{ required: true, message: "Vui lòng điền ID vào" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"name"}
            label={"Name"}
            rules={[{ required: true, message: "Vui lòng điền tên vào" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"password"}
            label={"Password"}
            rules={[{ required: true, message: "Vui lòng điền mật khẩu vào" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name={"address"}
            label={"Address"}
            rules={[{ required: true, message: "Vui lòng điền địa chỉ vào" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"status"}
            label={"Status"}
            rules={[
              { required: true, message: "Vui lòng điền trạng thái vào" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name={"phone"}
            label={"Phone"}
            rules={[
              { required: true, message: "Vui lòng điền số điện thoại vào" },
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
