import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Popconfirm, Modal, Form, Input } from "antd";
import { toast } from "react-toastify";

function DeliverCompany() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm(); // Khai báo form từ Ant Design

  const api = "http://api-koifish.evericks.com/api/delivery-companies";

  const fetchCompanies = async () => {
    setLoading(true);
    try {
      const response = await axios.get(api);
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching delivery companies:", error);
      toast.error("Failed to fetch delivery companies.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleDelete = async (companyId) => {
    try {
      await axios.delete(`${api}/${companyId}`);
      toast.success("Company deleted successfully");
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
      toast.error("Failed to delete company.");
    }
  };

  const handleEdit = (company) => {
    setEditingCompany(company);
    form.setFieldsValue(company); // Điền giá trị vào form
    setIsModalVisible(true);
  };

  const handleAdd = () => {
    setEditingCompany(null); // Đặt lại giá trị công ty đang chỉnh sửa
    form.resetFields(); // Đặt lại giá trị của form
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCompany) {
        // Cập nhật thông tin công ty
        await axios.put(`${api}/${editingCompany.id}`, values);
        toast.success("Company updated successfully");
      } else {
        // Thêm công ty mới
        await axios.post(api, values);
        toast.success("Company added successfully");
      }
      fetchCompanies(); // Tải lại dữ liệu
      setIsModalVisible(false); // Đóng modal
    } catch (error) {
      console.error("Error saving company:", error);
      toast.error("Failed to save company.");
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Đóng modal
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Price (VND/Km)",
      dataIndex: "price",
      key: "price",
      align: "center",
      render: (text) => text.toLocaleString(), // Định dạng giá với dấu phẩy
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
    },
    {
      title: "Actions",
      key: "actions",
      align: "center",
      render: (text, record) => (
        <div>
          <Button
            type="primary"
            onClick={() => handleEdit(record)}
            style={{ marginRight: 8 }}
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this company?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="container">
      <h1>Delivery Companies</h1>
      <Button type="primary" onClick={handleAdd} style={{ marginBottom: 16 }}>
        Add Company
      </Button>
      <Button type="primary" onClick={fetchCompanies} loading={loading}>
        Refresh
      </Button>
      <br />
      <br />
      <Table
        dataSource={companies}
        columns={columns}
        bordered
        rowKey="id"
        loading={loading}
      />

      <Modal
        title={editingCompany ? "Edit Company" : "Add Company"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Company Name"
            rules={[{ required: true, message: "Please input company name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Phone"
            rules={[{ required: true, message: "Please input phone number!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: "Please input status!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="price"
            label="Price (per km)"
            rules={[{ required: true, message: "Please input price!" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default DeliverCompany;
