import React, { useEffect, useState } from "react";
import {
  Button,
  Table,
  Space,
  Popconfirm,
  Modal,
  Form,
  Flex,
  Select,
  Input,
  DatePicker,
  Radio,
} from "antd";
import { useTranslation } from "react-i18next";
import type { TableColumnsType } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, updateUser } from "../UserReducer";
import dayjs from "dayjs";

interface DataType {
  key: React.Key;
  name: string;
  national: string;
  cID: string;
  gender: string;
  pNumber: string;
  visa: string;
  eSalary: string;
}

const FormTable = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [oldName, setOldName] = useState(null);
  const [oldDate, setOldDate] = useState(null);
  const [oldNational, setOldNational] = useState(null);
  const [oldCID, setOldCID] = useState(null);
  const [oldgender, setOldGender] = useState(null);
  const [oldpNumber, setOldPNumber] = useState(null);
  const [oldvisa, setOldVisa] = useState(null);
  const [oldeSalary, setOldESalary] = useState(null);
  const [usekey, setUsekey] = useState(null)

  const [editform] = Form.useForm();

  const showModal = (record) => {
    setIsModalOpen(true);
    const existingUser = users.filter((f) => f.key == record);
    const name = existingUser[0].name;
    const date = existingUser[0].bday;
    const national = existingUser[0].national;
    const cID = existingUser[0].cID;
    const gender = existingUser[0].gender;
    const pNumber = existingUser[0].pNumber;
    const visa = existingUser[0].visa;
    const eSalary = existingUser[0].eSalary;
    setUsekey(record)
    setOldDate(date);
    setOldName(name);
    setOldNational(national);
    setOldCID(cID);
    setOldGender(gender);
    setOldPNumber(pNumber);
    setOldVisa(visa);
    setOldESalary(eSalary);
    editform.resetFields();
  };

  const handleFormSubmit = (values) => {
    console.log(JSON.stringify(values));

    const name = values.name;
    const bday = values.bday.format("YYYY-MM-DD");
    const national = values.national;
    const cID = values.cID;
    const gender = values.gender;
    const pNumber = values.pNumber;
    const visa = values.visa;
    const eSalary = values.eSalary;

    dispatch(
      updateUser({
        key: usekey,
        name: name,
        bday: bday,
        national: national,
        cID: cID,
        gender: gender,
        pNumber: pNumber,
        visa: visa,
        eSalary: eSalary,
      })
    );

    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setOldName(null);
  };

  const handleDelete = (key) => {
    dispatch(deleteUser({ key: key }));
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const { t, i18n } = useTranslation();

  const handleSelectDelete = () => {
    selectedRowKeys.map((key) => {
      dispatch(deleteUser({ key: key }));
    });
  };

  const lngs = {
    en: { nativeName: `${t("langSwitchEn")}` },
    th: { nativeName: `${t("langSwitchTh")}` },
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "ชื่อ",
      dataIndex: "name",
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "เพศ",
      dataIndex: "gender",
      sorter: (a, b) => a.sex - b.sex,
    },
    {
      title: "หมายเลขโทรศัพท์มือถือ",
      dataIndex: "pNumber",
      sorter: (a, b) => a.phone - b.phone,
    },
    {
      title: "สัญชาติ",
      dataIndex: "national",
      sorter: (a, b) => a.national - b.national,
    },
    {
      title: "จัดการ",
      dataIndex: "key",
      render: (record) => (
        <Space size="middle">
          <button onClick={() => showModal(record)}>Edit</button>
          <Popconfirm
            title="Sure to delete?"
            onConfirm={() => handleDelete(record)}
          >
            <a>Delete</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" onClick={() => handleSelectDelete()}>
          ลบข้อมูล
        </Button>
      </div>
      <Table rowSelection={rowSelection} columns={columns} dataSource={users} />
      <Modal
        title="Edit Data"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={editform.submit}
        width={1000}
        destroyOnClose
      >
        <Form
          form={editform}
          name="editRegister"
          onFinish={(values) => handleFormSubmit(values)}
        >
          <Flex gap="middle">
            <Form.Item
              label={t("formdesc.firstName")}
              name="name"
              initialValue={oldName}
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Please input your Last Name",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Flex>
          <Flex gap="middle">
            <Form.Item
              label={t("formdesc.bDay")}
              name="bday"
              initialValue={dayjs(oldDate, "YYYY-MM-DD")}
              rules={[
                {
                  type: "date",
                },
                {
                  required: true,
                  message: "Please select your Birthday",
                },
              ]}
            >
              <DatePicker format="YYYY-MM-DD" allowClear />
            </Form.Item>
            <Form.Item
              label={t("formdesc.national")}
              name="national"
              initialValue={oldNational}
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Please select your Nationality",
                },
              ]}
            >
              <Select
                options={[
                  { value: "ไทย", label: "ไทย" },
                  { value: "ยูโรป", label: "ยูโรป" },
                  { value: "จีน", label: "จีน" },
                ]}
                placeholder="- - กรุณาเลือก - -"
                style={{ width: 200 }}
              />
            </Form.Item>
          </Flex>
          <Form.Item
            label={t("formdesc.citizenId")}
            name="cID"
            initialValue={oldCID}
            rules={[
              {
                type: "string",
              },
              {
                required: true,
                message: "Please input your Citizen ID",
              },
              {
                min: 13,
              },
            ]}
            style={{ width: "50%" }}
          >
            <Input maxLength={13} />
          </Form.Item>
          <Form.Item
            label={t("formdesc.gender")}
            name="gender"
            initialValue={oldgender}
            rules={[
              {
                type: "string",
              },
              {
                required: true,
                message: "Please select your gender",
              },
            ]}
          >
            <Radio.Group>
              <Radio value="ผู้ชาย"> ผู้ชาย </Radio>
              <Radio value="ผู้หญิง"> ผู้หญิง </Radio>
              <Radio value="ไม่ระบุ"> ไม่ระบุ </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label={t("formdesc.pNumber")}
            name="pNumber"
            initialValue={oldpNumber}
            rules={[
              {
                type: "string",
              },
              {
                required: true,
                message: "Please input your Phone Number",
              },
            ]}
          >
            <Input style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label={t("formdesc.visa")}
            style={{ width: "50%" }}
            name="visa"
            initialValue={oldvisa}
            rules={[
              {
                type: "string",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Flex>
            <Form.Item
              label={t("formdesc.eSalary")}
              style={{ width: "50%" }}
              initialValue={oldeSalary}
              name="eSalary"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Please input your Expected Salary",
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Flex>
        </Form>
      </Modal>
    </div>
  );
};

export default FormTable;
