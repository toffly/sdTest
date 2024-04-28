import {
  Select,
  Typography,
  Form,
  Input,
  Flex,
  DatePicker,
  Radio,
  Button,
} from "antd";
import { useTranslation } from "react-i18next";
import FormTable from "../components/FormTable";
import { addUser } from "../UserReducer";
import { useDispatch, useSelector } from "react-redux";

const Test2 = () => {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  const [form] = Form.useForm();

  const handleFormSubmit = (values) => {
    console.log(JSON.stringify(values));

    const name = values.title + " " + values.firstName + " " + values.lastName;
    const bday = values.bday.format("YYYY-MM-DD");
    const national = values.national;
    const cID = values.cID;
    const gender = values.gender;
    const pNumber = values.prefixpNumber + values.pNumber;
    const visa = values.visa;
    const eSalary = values.eSalary;

    dispatch(
      addUser({
        key: users[users.length - 1].key + 1,
        name,
        bday,
        national,
        cID,
        gender,
        pNumber,
        visa,
        eSalary,
      })
    );

    // console.log(
    //   "name : " + name,
    //   "birthday : " + bday,
    //   "nationality : " + national,
    //   "citizen ID : " + cID,
    //   "gender : " + gender,
    //   "phone number : " + pNumber,
    //   "visa" + visa,
    //   "expected salary " + eSalary
    // );
  };

  const lngs = {
    en: { nativeName: `${t("langSwitchEn")}` },
    th: { nativeName: `${t("langSwitchTh")}` },
  };

  return (
    <div className="w-full h-screen p-4">
      <Select
        className="absolute top-5 right-10 w-[100px]"
        value={i18n.resolvedLanguage}
        options={Object.keys(lngs).map((lng: string) => {
          return {
            label: (
              <a
                key={lng}
                type="submit"
                className="w-full h-full"
                style={{
                  fontWeight: i18n.resolvedLanguage === lng ? "bold" : "normal",
                }}
                onClick={() => {
                  i18n.changeLanguage(lng);
                }}
              >
                {lngs[lng as keyof typeof lngs].nativeName}
              </a>
            ),
          };
        })}
      />
      <Typography.Title level={1}>{t("test2header")}</Typography.Title>

      <div className="flex justify-center items-center">
        <Form
          style={{ width: 1200 }}
          className="rounded-2xl border-solid border-2 p-2 border-black"
          form={form}
          name="register"
          onFinish={(values) => handleFormSubmit(values)}
        >
          <Flex gap="middle">
            <Form.Item
              label={t("formdesc.title")}
              name="title"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Please select your title",
                },
              ]}
            >
              <Select
                options={[
                  { value: "นาย", label: "นาย" },
                  { value: "นาง", label: "นาง" },
                  { value: "นางสาว", label: "นางสาว" },
                ]}
                placeholder="คำนำหน้า"
                style={{ width: 120 }}
              />
            </Form.Item>
            <Form.Item
              label={t("formdesc.firstName")}
              name="firstName"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Please input your First Name",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label={t("formdesc.lastName")}
              name="lastName"
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
            <Input
              maxLength={13}
              onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }}
            />
          </Form.Item>
          <Form.Item
            label={t("formdesc.gender")}
            name="gender"
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
          <Flex gap="middle">
            <Form.Item
              label={t("formdesc.pNumber")}
              name="prefixpNumber"
              rules={[
                {
                  type: "string",
                },
                {
                  required: true,
                  message: "Select Prefix",
                },
              ]}
            >
              <Select
                options={[
                  { value: "09", label: "09" },
                  { value: "08", label: "08" },
                  { value: "02", label: "02" },
                ]}
                style={{ width: 100 }}
              />
            </Form.Item>
            -
            <Form.Item
              name="pNumber"
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
              <Input
                style={{ width: 400 }}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Flex>
          <Form.Item
            label={t("formdesc.visa")}
            style={{ width: "50%" }}
            name="visa"
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
            <Flex style={{ width: "50%" }} justify="space-evenly">
              <Button onClick={() => form.resetFields()}>ล้างข้อมูล</Button>
              <Button htmlType="submit">ส่งข้อมูล</Button>
            </Flex>
          </Flex>
        </Form>
      </div>
      <FormTable />
    </div>
  );
};

export default Test2;
