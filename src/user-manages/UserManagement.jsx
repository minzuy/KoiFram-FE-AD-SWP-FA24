import { Button, Form, Input, InputNumber, message, Modal, Table } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";
function UserManagement() {
  // hiển thị data
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
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
  ];

  // tạo ra 1 cái biến đại diện cho cái form
  const [formVariable] = useForm();

  // tạo ra useState để chỉnh sửa giá trị cho viển hiển thị MODAL
  const [visible, setVisible] = useState(false);
  // store data
  const [students, setStudents] = useState([]);
  // không cho người dùng đụng vào khi đang trong create process
  const [submitting, setSubtmitting] = useState(false);

  const handleOpenModal = () => {
    setVisible(true);
  };

  const handleHideModal = () => {
    setVisible(false);
  };

  // dành cho việc lấy data và truyển data từ MODAL
  const handleOKButton = () => {
    formVariable.submit();
  };

  const api = "https://66f10f2141537919154f5539.mockapi.io/Student";

  // get data from API
  const fetchStudents = async () => {
    try {
      const response = await axios.get(api);
      console.log(response.data);
      setStudents(response.data); // Gán dữ liệu vào state students
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };
  // dependency array []
  useEffect(() => {
    // action
    // run any action <=> event
    // [] => run when page loaded
    // [number] => run when number adjusted
    fetchStudents();
  }, []);

  // get data values and close MODAL
  const handleSubmitValue = async (student) => {
    try {
      setSubtmitting(true);
      // Gửi dữ liệu lên API
      const response = await axios.post(api, student);

      // Thêm sinh viên mới vào state students sau khi nhận phản hồi thành công
      setStudents([...students, response.data]);
      //   toast.success("Student added successfully!");

      // Đóng Modal và reset form
      formVariable.resetFields();
      handleHideModal();
    } catch (error) {
      console.error(error);
      //   toast.error("Failed to add student!");
    } finally {
      setSubtmitting(false);
    }
  };

  return (
    <div>
      <Button type="primary" onClick={handleOpenModal}>
        ADD
      </Button>

      <Table dataSource={students} columns={columns} />

      <Modal
        title="Create New Student"
        open={visible}
        onCancel={handleHideModal}
        onOk={handleOKButton}
        confirmLoading={submitting}
      >
        {/* bấm OK => submit form */}
        {/* identify the form be assigned  (form ở giữa) */}
        <Form form={formVariable} onFinish={handleSubmitValue}>
          {/* NAME */}
          <Form.Item
            name={"name"} // Chuyển "variableName" thành "name"
            label={"Student Name"}
            rules={[
              {
                required: true,
                message: "Djt me điền tên vào",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          {/* Student CODE */}
          <Form.Item
            name={"code"}
            label={"Student Code"}
            rules={[
              {
                required: true,
                message: "Djt me điền  vào",
              },
              {
                pattern: "SE[0-9]{6}",
                message: "Invalid code format",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          {/* SCORE */}
          <Form.Item
            name={"score"}
            label={"Student Score"}
            rules={[
              {
                required: true,
                message: "Djt me điền  vào",
              },
              {
                type: Number,
                min: 0,
                max: 10,
                message: "Invalid code format",
              },
            ]}
          >
            <InputNumber step={0.1} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
export default UserManagement;
