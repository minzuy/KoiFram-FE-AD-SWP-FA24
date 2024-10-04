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
import "./index.css";

function UserManagementPage() {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "User's account",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "User's password",
      dataIndex: "password",
      key: "password",
    },
    {
      title: "Bonus Score",
      dataIndex: "bonusScore",
      key: "bonusScore",
      sorter: (a, b) => a.bonusScore - b.bonusScore,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, user) => {
        return (
          <>
            <Button
              type="primary"
              onClick={() => {
                handleOpenModal(true);
                formVariable.setFieldsValue(user); // Load dữ liệu user vào form
              }}
            >
              EDIT
            </Button>
            <Popconfirm
              onConfirm={() => handleDeleteByID(id)}
              title="Delete"
              description="Are you sure?"
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </>
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
            name={"name"}
            label={"User Name"}
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
            name={"bonusScore"}
            label={"Bonus Score"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền điểm vào",
              },
              {
                type: "number",
                min: 0,
                max: 10,
                message: "Điểm không hợp lệ",
              },
            ]}
          >
            <InputNumber step={0.1} />
          </Form.Item>
          <Form.Item
            name={"address"}
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
        </Form>
      </Modal>
    </div>
  );
}

export default UserManagementPage;
