import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Popconfirm,
  Table,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import uploadFile from "../../../utils/file";
import "./fish.css";

function FishManagementPage() {
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
      title: "Category",
      dataIndex: "category",
      key: "category",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Category 1",
          value: "Category 1",
          children: [
            {
              text: "category 1",
              value: "category",
            },
            {
              text: "category 2",
              value: "category",
            },
          ],
        },
        {
          text: "Category 2",
          value: "Category 2",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
      width: "17%",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <Image src={image} alt="" width={170} />;
      },
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      filters: [
        {
          text: "Special",
          value: "Special",
        },
        {
          text: "General",
          value: "New York",
        },
      ],
      onFilter: (value, record) => record.name.startsWith(value),
      filterSearch: true,
      width: "20%",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Weight",
      dataIndex: "weight",
      key: "weight",
      sorter: (a, b) => a.weight - b.weight,
    },
    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (id, category) => {
        return (
          <div className="action-buttons">
            <Button
              type="primary"
              onClick={() => {
                handleOpenModal(true);
                formVariable.setFieldsValue(category);
              }}
            >
              EDIT
            </Button>

            <Popconfirm
              onConfirm={() => handleDeleteByID(id)}
              title="Delete"
              description="Are u sure"
            >
              <Button type="primary" danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];

  const [formVariable] = useForm();
  const [visible, setVisible] = useState(false);
  const [fishes, setFishes] = useState([]);
  const [submitting, setSubtmitting] = useState(false);
  // variable for Preview Image
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  // for FIREBASE
  const [fileList, setFileList] = useState([]);

  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleHideModal = () => {
    setVisible(false);
  };

  const handleOKButton = () => {
    formVariable.submit();
  };

  const api = "https://66f7bc23b5d85f31a34378b6.mockapi.io/FishManagement";

  const fetchFishes = async () => {
    try {
      const response = await axios.get(api);
      setFishes(response.data);
    } catch (error) {
      console.error("Failed to fetch fishes:", error);
    }
  };

  useEffect(() => {
    fetchFishes();
  }, []);

  // CREATE | EDIT
  const handleSubmitValue = async (fish) => {
    if (fileList.length > 0) {
      // Upload ảnh lên Firebase trước
      const file = fileList[0].originFileObj;
      const imageUrl = await uploadFile(file);
      fish.image = imageUrl; // Thêm URL ảnh vào đối tượng fish
    }
    try {
      setSubtmitting(true);

      if (fish.id) {
        const response = await axios.put(`${api}/${fish.id}`, fish); // Correct API call
        toast.success("Edit successfully");
      } else {
        const response = await axios.post(api, fish);
        toast.success("Create successfully");
      }
      fetchFishes();
      formVariable.resetFields();
      handleHideModal();
    } catch (error) {
      console.error(error);
      toast.error("FAILED");
    } finally {
      setSubtmitting(false);
    }
  };

  const handleDeleteByID = async (fishID) => {
    try {
      await axios.delete(`${api}/${fishID}`);
      toast.success("Delete successful");
      fetchFishes();
    } catch (error) {
      console.error(error);
      toast.error("Delete failed");
    }
  };
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  // ant design
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  // tạo ra danh sách lưu trữ
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  return (
    <div className="container">
      <h1>Fish Management</h1>
      <Button
        type="primary"
        onClick={() => {
          formVariable.resetFields(); // Reset form khi nhấn "ADD"
          handleOpenModal(true);
        }}
      >
        ADD
      </Button>

      <br></br>

      <Table dataSource={fishes} columns={columns} bordered />
      <Modal
        title="Create New Fish"
        open={visible}
        onCancel={handleHideModal}
        onOk={handleOKButton}
        confirmLoading={submitting}
      >
        <Form form={formVariable} onFinish={handleSubmitValue}>
          <Form.Item
            name={"name"}
            label={"Fish Name"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền tên cá vào",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"category"}
            label={"Category"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền thể loại cá vào",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label={"image"} name={"image"}>
            {/* Upload của ANT DESIGN */}
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            name={"type"}
            label={"Fish Type"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền loại cá vào",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={"weight"}
            label={"Fish Weight (kg)"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền cân nặng vào",
              },
              {
                type: "number",
                min: 0,
                message: "Cân nặng không hợp lệ",
              },
            ]}
          >
            <InputNumber step={0.1} />
          </Form.Item>

          <Form.Item
            name={"age"}
            label={"Fish Age (years)"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền tuổi cá vào",
              },
              {
                type: "number",
                min: 0,
                message: "Tuổi cá không hợp lệ",
              },
            ]}
          >
            <InputNumber step={1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default FishManagementPage;
