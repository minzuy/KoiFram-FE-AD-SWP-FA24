import {
  Button,
  DatePicker,
  Form,
  Image,
  Input,
  InputNumber,
  Modal,
  Popconfirm,
  Table,
  Upload,
} from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import uploadFile from "../../../../utils/file"; // Đảm bảo đường dẫn đúng
import "./fish.css";
import moment from "moment";

function FishManagementPage() {
  const [formVariable] = useForm();
  const [visible, setVisible] = useState(false);
  const [fishes, setFishes] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [selectedFish, setSelectedFish] = useState(null); // Fish được chọn để chỉnh sửa hoặc xóa
  const [fileList, setFileList] = useState([]); // Quản lý danh sách file hình ảnh
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  // Fetch API
  const api = "http://api-koifish.evericks.com/api/fish";

  // GET
  const fetchFishes = async () => {
    try {
      const response = await axios.get(api);
      setFishes(response.data);
    } catch (error) {
      toast.error("Failed to fetch fishes:", error);
      console.error(error.response.data);
    }
  };
  useEffect(() => {
    fetchFishes();
  }, []);
  // CREATE || UPDATE
  const handleSubmitValue = async (fish) => {
    try {
      setSubmitting(true);

      // Upload hình ảnh nếu có
      if (fileList.length > 0) {
        const file = fileList[0].originFileObj;
        const imageUrl = await uploadFile(file);
        fish.thumbnailUrl = imageUrl; // Sử dụng thumbnailUrl để lưu đường dẫn hình ảnh
      }
      // Chuyển đổi dateOfBirth sang định dạng yyyy/mm/dd
      fish.dateOfBirth = fish.dateOfBirth
        ? moment(fish.dateOfBirth).format("YYYY/MM/DD")
        : null;

      // Lấy token từ localStorage hoặc nơi bạn lưu trữ
      const token = localStorage.getItem("token");

      const headers = {
        Authorization: `Bearer ${token}`, // Thay yourToken bằng token thật của bạn
        // Bạn có thể thêm các headers khác nếu cần
      };

      if (selectedFish) {
        await axios.put(`${api}/${selectedFish.id}`, fish, { headers });
        toast.success("Edit successfully");
      } else {
        await axios.post(api, fish);
        toast.success("Create successfully");
      }
      console.log(token); // Log token để kiểm tra
      console.log(fish); // Thêm log để kiểm tra dữ liệu fish

      fetchFishes();
      formVariable.resetFields();
      setFileList([]); // Reset danh sách file sau khi submit
      handleHideModal();
    } catch (error) {
      console.error("Error:", error);
      // Kiểm tra nếu lỗi là 401 và hiển thị thông báo phù hợp
      if (error.response && error.response.status === 401) {
        toast.error(
          "Unauthorized: Access is denied due to invalid credentials."
        );
      } else {
        toast.error("Failed to submit fish");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteByID = async (fishID) => {
    try {
      await axios.delete(`${api}/${fishID}`);
      toast.success("Delete successful");
      fetchFishes();
      setSelectedFish(null); // Reset fish đã chọn sau khi xóa
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleHideModal = () => {
    setVisible(false);
  };

  const handleOKButton = () => {
    formVariable.submit();
  };

  const handleRowClick = (record) => {
    setSelectedFish(record); // Chọn dòng được nhấp
    setFileList([
      {
        uid: "-1",
        name: "image.png",
        status: "done",
        url: record.thumbnailUrl,
      },
    ]); // Hiển thị hình ảnh hiện tại trong Upload component
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);

  const uploadButton = (
    <div>
      <PlusCircleOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      align: "center",
    },
    {
      title: "Origin",
      dataIndex: "origin",
      key: "origin",
      align: "center",
    },
    {
      title: "Size (cm)",
      dataIndex: "size",
      key: "size",
      align: "center",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      align: "center",
      width: "5%",
    },
    {
      title: "Promotion Price",
      dataIndex: "promotionPrice",
      key: "promotionPrice",
      align: "center",
      width: "3%",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      align: "center",
      width: "7%",
    },
    {
      title: "Date of Birth",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      align: "center",
      render: (date) => moment(date).format("YYYY/MM/DD"),
    },
    {
      title: "Image",
      dataIndex: "thumbnailUrl",
      key: "thumbnailUrl",
      render: (image) => <Image src={image} alt="" width={170} />,
    },
    {
      title: "Fish Categories",
      dataIndex: "fishCategories",
      key: "fishCategories",
      render: (fishCategories) =>
        fishCategories.map((category) => category.category.name).join(", "),
      align: "center",
    },
  ];

  return (
    <div className="container">
      <h1>Fish Management</h1>
      <Button
        type="primary"
        onClick={() => {
          formVariable.resetFields(); // Reset form khi nhấn "ADD"
          setSelectedFish(null); // Đảm bảo selectedFish là null
          setFileList([]); // Reset danh sách file khi thêm mới
          handleOpenModal();
        }}
        style={{ fontWeight: "bold" }}
      >
        ADD <PlusCircleOutlined />
      </Button>

      <br />
      <br />

      <Table
        dataSource={fishes}
        columns={columns}
        bordered
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record), // Khi nhấn vào hàng
        })}
      />

      <Modal
        title={selectedFish ? "Edit Fish" : "Create New Fish"}
        open={visible}
        onCancel={handleHideModal}
        onOk={handleOKButton}
        confirmLoading={submitting}
      >
        <Form
          form={formVariable}
          onFinish={handleSubmitValue}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Fish Name"
            rules={[
              {
                required: true,
                message: "Please enter fish name",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: "Please enter description",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="origin"
            label="Origin"
            rules={[
              {
                required: true,
                message: "Please enter origin",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="size"
            label="Size (cm)"
            rules={[
              {
                required: true,
                message: "Please enter size",
              },
            ]}
          >
            <InputNumber min={1} />
          </Form.Item>

          <Form.Item
            name="price"
            label="Price"
            rules={[
              {
                required: true,
                message: "Please enter price",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item
            name="promotionPrice"
            label="Promotion Price"
            rules={[
              {
                required: true,
                message: "Please enter promotion price",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Date of Birth"
            rules={[{ required: true, message: "Please enter date of birth" }]}
          >
            <DatePicker format="YYYY/MM/DD" />
          </Form.Item>

          <Form.Item
            name="status"
            label="Status"
            rules={[
              {
                required: true,
                message: "Please select status",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item name="thumbnailUrl" label="Image">
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              beforeUpload={() => false} // Ngăn chặn upload mặc định
              maxCount={1} // Giới hạn chỉ upload một hình ảnh
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Preview Modal */}
      <Modal
        open={previewOpen}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img alt="Preview" style={{ width: "100%" }} src={previewImage} />
      </Modal>

      {/* Sidebar */}
      <div className="sidebar">
        <h3 style={{ color: "#195b89 " }}>Actions</h3>
        {selectedFish ? (
          <div className="action-buttons">
            <h4>
              Selected Fish: <b>{selectedFish.name}</b>
            </h4>{" "}
            {/* Hiển thị tên cá đã chọn */}
            <Button
              type="primary"
              onClick={() => {
                handleOpenModal();
                formVariable.setFieldsValue(selectedFish); // Set giá trị của fish đã chọn vào form
              }}
            >
              EDIT
            </Button>
            <Popconfirm
              onConfirm={() => handleDeleteByID(selectedFish.id)}
              title="Delete"
              description="Are you sure?"
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        ) : (
          <p>Click on a fish to see actions</p>
        )}
      </div>
    </div>
  );
}

export default FishManagementPage;
