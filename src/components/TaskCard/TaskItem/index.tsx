import SvgIcon from "@/components/SvgIcon";
import {
  BarChartOutlined,
  ClockCircleOutlined,
  DeleteOutlined,
  DotChartOutlined,
  EditOutlined,
  EllipsisOutlined,
  LineChartOutlined,
  PieChartOutlined,
  SunOutlined,
} from "@ant-design/icons";
import {
  Checkbox,
  DatePicker,
  Dropdown,
  Flex,
  Form,
  Input,
  MenuProps,
  Modal,
  Radio,
  RadioChangeEvent,
  Select,
  Tag,
  Tooltip,
} from "antd";
import "./index.less";
import { useState } from "react";
import { ITaskItem } from "@/types/task";
import locale from "antd/es/date-picker/locale/zh_CN";

export default function TaskItem({ data }: { data: ITaskItem }) {
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
    form.setFieldsValue({
      ...data,
      dateType: 1,
    });
  };
  const hideModal = () => {
    setOpen(false);
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: "编辑",
      icon: <EditOutlined />,
      onClick: () => openModal(),
    },
    {
      key: "2",
      label: "删除",
      danger: true,
      icon: <DeleteOutlined />,
    },
  ];
  const changeDateType = (e: RadioChangeEvent) => {
    const value = e.target.value;
    form.setFieldsValue({
      dateType: value,
    });
    console.log(form.getFieldValue("dateType"));
  };
  return (
    <>
      <div className="task-item">
        <div className="task-item__header flex items-center">
          <div className="task-item__flag todo">
            <SvgIcon size={20} name="task-flag-fill" />
          </div>
          <Checkbox className="mr-5"></Checkbox>
          <div className="task-item__more">
            <Dropdown menu={{ items }}>
              <a onClick={(e) => e.preventDefault()}>
                <EllipsisOutlined />
              </a>
            </Dropdown>
          </div>
        </div>

        <div className="task-item__content">
          <div className="task-item__title">
            <span>{data.title}</span>
          </div>
          <Tooltip title={data.description}>
            <div className="task-item__description">{data.description}</div>
          </Tooltip>
        </div>
        <div className="task-item__footer">
          <div className="task-item__tags">
            {data.tags.map((tag, index) => (
              <Tag color="blue" key={index}>
                {tag}
              </Tag>
            ))}
          </div>
          <div className="task-item__date">
            <ClockCircleOutlined />
            <span style={{ marginLeft: 5 }} className="whitespace-nowrap">
              {data.date}
            </span>
          </div>
        </div>
      </div>
      {open && (
        <Modal
          title="编辑任务"
          open={open}
          onOk={hideModal}
          onCancel={hideModal}
          okText="确认"
          cancelText="取消"
          forceRender={true}
        >
          <Form form={form}>
            <Form.Item label="名称：" name="title">
              <Input placeholder="请输入标题" />
            </Form.Item>
            <Form.Item label="描述：" name="description">
              <Input.TextArea
                style={{ minHeight: 100 }}
                placeholder="请输入描述"
              />
            </Form.Item>
            <Form.Item label="标签：" name="tags">
              <Select
                mode="multiple"
                maxCount={3}
                showSearch
                placeholder="请选择标签"
                optionFilterProp="label"
                options={data.tags.map((tag) => ({
                  value: tag,
                  label: tag,
                }))}
              />
            </Form.Item>
            <Form.Item label="日期类型：" name="dateType">
              <Radio.Group buttonStyle="solid">
                <Radio.Button value={1} className="option-1">
                  <Flex justify="center" align="center" vertical>
                    <SunOutlined style={{ fontSize: 20 }} />
                    今天
                  </Flex>
                </Radio.Button>
                <Radio.Button value={2} className="option-2">
                  <Flex justify="center" align="center" vertical>
                    <SvgIcon size={22} name="task-sunrise" />
                    明天
                  </Flex>
                </Radio.Button>
                <Radio.Button value={3} className="option-3">
                  <Flex justify="center" align="center" vertical>
                    <SvgIcon size={20} name="task-calendar-one" />
                    日期
                  </Flex>
                </Radio.Button>
                <Radio.Button value={4} className="option-4">
                  <Flex justify="center" align="center" vertical>
                    <SvgIcon size={20} name="task-calendar" />
                    时间段
                  </Flex>
                </Radio.Button>
                <Radio.Button value={5} className="option-5">
                  <Flex justify="center" align="center" vertical>
                    <SvgIcon size={20} name="task-calendar-none" />无
                  </Flex>
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="日期：">
              <DatePicker
                locale={locale}
                format="YYYY-MM-DD"
                placeholder="请选择日期"
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
}
