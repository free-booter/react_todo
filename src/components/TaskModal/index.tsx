import { TodoDetail, TaskPriority } from "@/types/task";
import "./index.less";
import SvgIcon from "@/components/SvgIcon";
import { SunOutlined } from "@ant-design/icons";
import {
  DatePicker,
  Flex,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Select,
} from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";
export default function TaskModal({
  data = {} as TodoDetail,
  type = "add",
  open,
  close,
}: {
  data: TodoDetail;
  type: "add" | "edit";
  open: boolean;
  close: () => void;
}) {
  const initialValues =
    type === "add"
      ? {
        dateType: 1,
        date: dayjs(),
      }
      : {
        ...data,
        dateType: 1,
        date: data.date ? dayjs(data.date) : undefined,
      };

  const [form] = Form.useForm();
  const dateType = Form.useWatch("dateType", form);
  const remindType = Form.useWatch("remindType", form);
  const advanceType = Form.useWatch("advanceType", form);

  useEffect(() => {
    if (open && type === "edit") {
      form.setFieldsValue(initialValues);
    }
  }, [open]);

  const hideModal = () => {
    close();
  };
  const handleConfirm = () => {
    if (type === "add") {
      form.validateFields().then((values) => {
        console.log(values, "新增");
      });
    } else {
      form.validateFields().then((values) => {
        console.log(values, "编辑");
      });
    }
  };
  return (
    <div className="task-modal">
      <Modal
        title="任务详情"
        open={open}
        onOk={handleConfirm}
        onCancel={hideModal}
        okText="保存"
        cancelText="取消"
        forceRender={true}
        width={650}
      >
        <Form
          form={form}
          layout="horizontal"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          style={{ maxWidth: "100%" }}
          initialValues={initialValues}
        >
          <Form.Item
            label="任务名称"
            name="title"
            rules={[{ required: true, message: "请输入任务名称" }]}
          >
            <Input placeholder="请输入任务名称" maxLength={50} showCount />
          </Form.Item>

          <Form.Item
            label="任务描述"
            name="description"
            rules={[{ required: true, message: "请输入任务描述" }]}
          >
            <Input.TextArea
              style={{ minHeight: 100 }}
              placeholder="请输入任务描述，可详细说明任务内容、要求等"
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item
            label="优先级"
            name="priority"
            rules={[{ required: true, message: "请选择优先级" }]}
          >
            <Radio.Group
              buttonStyle="solid"
              options={[
                { label: "高", value: TaskPriority.HIGH },
                { label: "中", value: TaskPriority.MEDIUM },
                { label: "低", value: TaskPriority.LOW },
                { label: "无", value: TaskPriority.NONE },
              ]}
            ></Radio.Group>
          </Form.Item>
          <Form.Item
            label="标签"
            name="tags"
          >
            <Select
              mode="multiple"
              maxCount={3}
              showSearch
              placeholder="选择或输入标签，最多3个"
              optionFilterProp="label"
              options={data.tags?.map((tag) => ({
                value: tag,
                label: tag,
              }))}
            />
          </Form.Item>

          <Form.Item
            label="时间设置"
            name="dateType"
            rules={[{ required: true, message: "请选择时间类型" }]}
          >
            <Radio.Group className="date-type-radio" buttonStyle="solid">
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
                  指定日期
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
                  <SvgIcon size={20} name="task-calendar-none" />
                  无截止日期
                </Flex>
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          {dateType === 3 && (
            <Form.Item
              label="选择日期"
              name="date"
              rules={[{ required: true, message: "请选择日期" }]}
            >
              <DatePicker
                placeholder="选择任务日期"
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}

          {dateType === 4 && (
            <Form.Item
              label="选择时间段"
              name="dateRange"
              rules={[{ required: true, message: "请选择时间段" }]}
            >
              <DatePicker.RangePicker
                placeholder={["开始日期", "结束日期"]}
                style={{ width: "100%" }}
              />
            </Form.Item>
          )}


          <Form.Item
            label="提醒设置"
            name="remindType"
            rules={[{ required: true, message: "请选择提醒方式" }]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="选择提醒时间"
              options={[
                { value: 1, label: "准时提醒" },
                { value: 2, label: "提前1天" },
                { value: 3, label: "提前2天" },
                { value: 4, label: "提前1周" },
                { value: 5, label: "自定义提醒" },
              ]}
            />
          </Form.Item>

          {remindType === 5 && (
            <>
              <Form.Item
                label="提醒类型"
                name="advanceType"
                rules={[{ required: true, message: "请选择提醒类型" }]}
              >
                <Radio.Group>
                  <Radio.Button value={1}>小时</Radio.Button>
                  <Radio.Button value={2}>天</Radio.Button>
                  <Radio.Button value={3}>周</Radio.Button>
                </Radio.Group>
              </Form.Item>

              {advanceType === 1 && (
                <Form.Item
                  label="提前时间"
                  name="advanceHours"
                  rules={[{ required: true, message: "请输入提前小时数" }]}
                >
                  <InputNumber
                    min={1}
                    max={23}
                    placeholder="输入小时数"
                    style={{ width: "100%" }}
                    addonAfter="小时"
                  />
                </Form.Item>
              )}

              {advanceType === 2 && (
                <Form.Item
                  label="提前时间"
                  name="advanceDays"
                  rules={[{ required: true, message: "请输入提前天数" }]}
                >
                  <InputNumber
                    min={1}
                    max={30}
                    placeholder="输入天数"
                    style={{ width: "100%" }}
                    addonAfter="天"
                  />
                </Form.Item>
              )}

              {advanceType === 3 && (
                <Form.Item
                  label="提前时间"
                  name="advanceWeeks"
                  rules={[{ required: true, message: "请输入提前周数" }]}
                >
                  <InputNumber
                    min={1}
                    max={52}
                    placeholder="输入周数"
                    style={{ width: "100%" }}
                    addonAfter="周"
                  />
                </Form.Item>
              )}
            </>
          )}

          <Form.Item
            label="提醒时间"
            name="remindTime"
            rules={[{ required: true, message: "请选择提醒时间" }]}
          >
            <DatePicker.TimePicker
              format="HH:mm"
              placeholder="选择提醒时间点"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="重复设置"
            name="repeatType"
            rules={[{ required: true, message: "请选择重复类型" }]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="选择重复方式"
              options={[
                { label: "不重复", value: 0 },
                { label: "每天重复", value: 1 },
                { label: "每周重复", value: 2 },
                { label: "每月重复", value: 3 },
                { label: "每年重复", value: 4 },
                { label: "工作日重复", value: 5 },
                { label: "法定工作日", value: 6 },
              ]}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
