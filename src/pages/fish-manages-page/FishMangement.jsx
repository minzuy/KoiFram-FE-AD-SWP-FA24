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
              text: "Yellow",
              value: "Yellow",
            },
            {
              text: "Pink",
              value: "Pink",
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

    // {
    //   title: "Image",
    //   dataIndex: "image",
    //   key: "image",
    //   render: (image) => {
    //     return <Image src={image} alt="" width={200} />;
    //   },
    // },

    {
      title: "Action",
      dataIndex: "id",
      key: "id", //=> Lấy data gì thì key p tương ứng
      render: (id) => {
        // => muốn thay đổi thông tin hiển thị => AUTO : RENDER
        // render luôn p trùng với dataIndex
        return (
          <>
            <Popconfirm
              onConfirm={() => handleDeleteByID(id)}
              title="Delete"
              description="Are u sure"
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
  const [fishes, setFishes] = useState([]);
  const [submitting, setSubtmitting] = useState(false);

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

  const handleSubmitValue = async (fish) => {
    try {
      setSubtmitting(true);
      const response = await axios.post(api, fish);
      setFishes([...fishes, response.data]);
      formVariable.resetFields();
      handleHideModal();
    } catch (error) {
      console.error(error);
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

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        ADD
      </Button>

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
            name={"species"}
            label={"Species"}
            rules={[
              {
                required: true,
                message: "Vui lòng điền loài cá vào",
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
