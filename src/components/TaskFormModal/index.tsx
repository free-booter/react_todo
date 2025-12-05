import "./index.less";
import SvgIcon from "@/components/SvgIcon";
import { PlusOutlined, SunOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  InputRef,
  Modal,
  Radio,
  Select,
  Space,
} from "antd";
import { useContext, useEffect, useRef, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  reqUpdateTodo,
  reqAddTag,
  reqAddTodo,
  reqTodoDetail,
} from "@/services/api/home";
import { RemindTypeConfig, RepeatTypeConfig } from "@/types/config";
import { TaskPriority, Todo } from "@/views/Task/type";
import { TaskStatus } from "@/types/task";
import { useTaskStore } from "@/store/task";
import { MessageContext } from "@/context/MessageContext";

export default function TaskModal({
  id,
  type = "add",
  open,
  close,
  status,
}: {
  id?: number;
  type: "add" | "edit";
  open: boolean;
  close: () => void;
  status: TaskStatus;
}) {
  const priorityOptions: Array<{ label: string; value: TaskPriority }> = [
    { label: "低", value: "low" },
    { label: "中", value: "medium" },
    { label: "高", value: "high" },
  ];
  const messageApi = useContext(MessageContext)!;
  const [form] = Form.useForm<
    Todo & {
      dateRange: [Dayjs, Dayjs];
    }
  >();

  const dateType = Form.useWatch("dateType", form);
  const remindType = Form.useWatch("remindType", form);
  const advanceType = Form.useWatch("advanceType", form);

  useEffect(() => {
    if (!open) return;
    if (type === "edit" && id) {
      // 获取详情
      reqTodoDetail(id).then((res) => {
        const {
          isOverdue,
          dateType,
          title,
          description,
          priority,
          tags,
          remindType,
          repeatType,
          advanceType,
          advanceValue,
          remindTime,
          dueDate,
        } = res;
        const formData = {
          title,
          description,
          priority,
          tags,
          remindType,
          repeatType,
          advanceType,
          advanceValue,
          dateType,
          dueDate: dueDate ? dayjs(dueDate) : null, // 转换为 dayjs 对象,
          remindTime: remindTime ? dayjs(`${dueDate} ${remindTime}`) : null,
        };
        // 判断是否逾期，如果逾期并且到期类型设置的today，则设置为指定日期
        if (isOverdue && dateType === "today") {
          formData.dateType = "specific";
        }
        form.setFieldsValue(formData as any);
      });
    } else if (type === "add") {
      form.resetFields();
      form.setFieldsValue({
        priority: "low",
        dateType: "today",
        tags: [],
        remindType: "none",
        repeatType: "none",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, type, id]);

  const hideModal = () => {
    // 清理状态
    setLabel("");
    close();
  };
  const handleConfirm = () => {
    form.validateFields().then((values) => {
      const { advanceType, advanceValue, remindTime, remindType } = values;

      let remindOffset = 0;

      // 根据不同提醒类型计算 offset
      if (
        remindType === "custom" &&
        advanceType !== undefined &&
        advanceValue
      ) {
        const typeToMuties = [1, 60, 60 * 24, 60 * 24 * 7];
        remindOffset = advanceValue * (typeToMuties[advanceType] || 1);
      } else if (remindType === "one_day_before") {
        remindOffset = 60 * 24;
      } else if (remindType === "two_days_before") {
        remindOffset = 60 * 24 * 2;
      } else if (remindType === "one_week_before") {
        remindOffset = 60 * 24 * 7;
      }

      const params = {
        ...values,
        remindOffset: remindOffset > 0 ? -remindOffset : 0, // 存储为负数表示提前
        remindTime: remindTime ? dayjs(remindTime).format("HH:mm") : null,
        status,
      };
      if (dateType === "range") {
        const [startDate, dueDate] = values.dateRange;
        params.startDate = dayjs(startDate).format("YYYY-MM-DD");
        params.dueDate = dayjs(dueDate).format("YYYY-MM-DD");
      }
      if (dateType === "specific") {
        params.dueDate = dayjs(values.dueDate).format("YYYY-MM-DD");
      }

      // 校验提醒时间
      if (
        remindType !== "none" &&
        !checkRemindTimeValid(values, Math.abs(params.remindOffset))
      ) {
        return;
      }

      // 提交数据
      submitTodo(params);
    });
  };
  // 提交方法
  const { getTaskAllList } = useTaskStore();
  const submitTodo = async (params: any) => {
    try {
      if (type === "edit" && id) {
        await reqUpdateTodo({ ...params, id });
        messageApi.success("更新成功！");
      } else {
        await reqAddTodo(params);
        messageApi.success("创建成功！");
      }
      getTaskAllList();
      // 清理状态
      setLabel("");
      close();
    } catch (error) {
      messageApi.error("操作失败，请重试！");
    }
  };

  // 校验提醒时间是否合理
  const checkRemindTimeValid = (
    data: Todo & {
      dateRange: [Dayjs, Dayjs];
    },
    remindOffset: number
  ): boolean => {
    const { remindType, remindTime, dateType, dueDate, dateRange } = data;
    const now = dayjs();

    if (!remindTime) {
      return false;
    }

    // 根据不同的日期类型计算基准日期
    let baseDatetime: dayjs.Dayjs | null = null;

    switch (dateType) {
      case "today":
        baseDatetime = dayjs()
          .hour(dayjs(remindTime).hour())
          .minute(dayjs(remindTime).minute());
        break;

      case "tomorrow":
        baseDatetime = dayjs()
          .add(1, "day")
          .hour(dayjs(remindTime).hour())
          .minute(dayjs(remindTime).minute());
        break;

      case "specific":
        if (!dueDate) {
          messageApi.error("请先选择截止日期！");
          return false;
        }
        baseDatetime = dayjs(dueDate)
          .hour(dayjs(remindTime).hour())
          .minute(dayjs(remindTime).minute());
        break;

      case "range":
        if (!dateRange || !dateRange[0]) {
          messageApi.error("请先选择开始日期！");
          return false;
        }
        // 使用开始日期作为基准
        baseDatetime = dayjs(dateRange[0])
          .hour(dayjs(remindTime).hour())
          .minute(dayjs(remindTime).minute());
        break;

      case "none":
        // 无截止日期的情况，使用今天作为基准
        baseDatetime = dayjs()
          .hour(dayjs(remindTime).hour())
          .minute(dayjs(remindTime).minute());
        break;

      default:
        messageApi.error("请先选择时间设置！");
        return false;
    }

    if (!baseDatetime) return false;

    // 计算最终提醒时间（减去提前时间）
    const finalRemindTime = calculateFinalRemindTime(
      baseDatetime,
      remindType,
      remindOffset
    );

    // 检查提醒时间是否已过
    if (finalRemindTime.isBefore(now)) {
      const timeDiff = now.diff(finalRemindTime, "minute");
      if (timeDiff > 0) {
        messageApi.error(`提醒时间已过，请调整时间设置！`);
        return false;
      }
    }

    return true;
  };

  // 根据提醒类型计算最终提醒时间
  const calculateFinalRemindTime = (
    baseTime: dayjs.Dayjs,
    remindType: string,
    remindOffset: number
  ): dayjs.Dayjs => {
    switch (remindType) {
      case "on_time":
        return baseTime;

      case "one_day_before":
        return baseTime.subtract(1, "day");

      case "two_days_before":
        return baseTime.subtract(2, "day");

      case "one_week_before":
        return baseTime.subtract(1, "week");

      case "custom":
        // 自定义情况下，remindOffset 是负数（提前的分钟数）
        return baseTime.subtract(Math.abs(remindOffset), "minute");

      default:
        return baseTime;
    }
  };

  const inputRef = useRef<InputRef>(null);
  const [label, setLabel] = useState("");
  const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  };
  // 获取标签列表
  const [tagList, setTagList] = useState<any[]>([]);
  const handleAddTag = () => {
    reqAddTag({ name: label }).then((res) => {
      setTagList([...tagList, res]);
      setLabel("");
      inputRef.current?.blur();
      form.setFieldValue("tags", [
        ...(form.getFieldValue("tags") || []),
        res.value,
      ]);
    });
  };

  return (
    <div className="task-modal">
      <Modal
        title={type === "add" ? "新增任务" : "编辑任务"}
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
            rules={[{ message: "请输入任务描述" }]}
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
              options={priorityOptions}
            ></Radio.Group>
          </Form.Item>
          <Form.Item label="标签" name="tags">
            <Select
              value={form.getFieldValue("tags")}
              mode="multiple"
              maxCount={3}
              showSearch
              placeholder="选择或输入标签，最多3个"
              optionFilterProp="label"
              options={tagList}
              popupRender={(menu) => (
                <>
                  {menu}
                  <Divider style={{ margin: "8px 0" }} />
                  <Space style={{ padding: "0 8px 4px" }}>
                    <Input
                      placeholder="请输入标签"
                      ref={inputRef}
                      value={label}
                      onChange={onLabelChange}
                      onKeyDown={(e) => e.stopPropagation()}
                    />
                    <Button
                      type="text"
                      icon={<PlusOutlined />}
                      onClick={handleAddTag}
                    >
                      新增
                    </Button>
                  </Space>
                </>
              )}
            />
          </Form.Item>

          <Form.Item
            label="时间设置"
            name="dateType"
            rules={[{ required: true, message: "请选择时间类型" }]}
          >
            <Radio.Group className="date-type-radio" buttonStyle="solid">
              <Radio.Button value="today" className="option-1">
                <Flex justify="center" align="center" vertical>
                  <SunOutlined style={{ fontSize: 20 }} />
                  今天
                </Flex>
              </Radio.Button>
              <Radio.Button value="tomorrow" className="option-2">
                <Flex justify="center" align="center" vertical>
                  <SvgIcon size={22} name="task-sunrise" />
                  明天
                </Flex>
              </Radio.Button>
              <Radio.Button value="specific" className="option-3">
                <Flex justify="center" align="center" vertical>
                  <SvgIcon size={20} name="task-calendar-one" />
                  指定日期
                </Flex>
              </Radio.Button>
              <Radio.Button value="range" className="option-4">
                <Flex justify="center" align="center" vertical>
                  <SvgIcon size={20} name="task-calendar" />
                  时间段
                </Flex>
              </Radio.Button>
              <Radio.Button value="none" className="option-5">
                <Flex justify="center" align="center" vertical>
                  <SvgIcon size={20} name="task-calendar-none" />
                  无截止日期
                </Flex>
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          {dateType === "specific" && (
            <Form.Item
              label="选择日期"
              name="dueDate"
              rules={[{ required: true, message: "请选择日期" }]}
            >
              <DatePicker
                placeholder="选择任务日期"
                style={{ width: "100%" }}
                format="YYYY-MM-DD"
              />
            </Form.Item>
          )}

          {dateType === "range" && (
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
              options={RemindTypeConfig}
            />
          </Form.Item>

          {remindType === "custom" && (
            <>
              <Form.Item
                label="提醒类型"
                name="advanceType"
                rules={[{ required: true, message: "请选择提醒类型" }]}
              >
                <Radio.Group>
                  <Radio.Button value={0}>分钟</Radio.Button>
                  <Radio.Button value={1}>小时</Radio.Button>
                  <Radio.Button value={2}>天</Radio.Button>
                  <Radio.Button value={3}>周</Radio.Button>
                </Radio.Group>
              </Form.Item>

              {advanceType === 0 && (
                <Form.Item
                  label="提前时间"
                  name="advanceValue"
                  rules={[{ required: true, message: "请输入提前分钟数" }]}
                >
                  <InputNumber
                    min={1}
                    max={59}
                    placeholder="输入分钟数"
                    style={{ width: "100%" }}
                    addonAfter="分钟"
                  />
                </Form.Item>
              )}
              {advanceType === 1 && (
                <Form.Item
                  label="提前时间"
                  name="advanceValue"
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
                  name="advanceValue"
                  rules={[{ required: true, message: "请输入提前天数" }]}
                >
                  <InputNumber
                    min={1}
                    max={6}
                    placeholder="输入天数"
                    style={{ width: "100%" }}
                    addonAfter="天"
                  />
                </Form.Item>
              )}

              {advanceType === 3 && (
                <Form.Item
                  label="提前时间"
                  name="advanceValue"
                  rules={[{ required: true, message: "请输入提前周数" }]}
                >
                  <InputNumber
                    min={1}
                    placeholder="输入周数"
                    style={{ width: "100%" }}
                    addonAfter="周"
                  />
                </Form.Item>
              )}
            </>
          )}

          {remindType !== "none" && (
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
          )}

          <Form.Item
            label="重复设置"
            name="repeatType"
            rules={[{ required: true, message: "请选择重复类型" }]}
          >
            <Select
              style={{ width: "100%" }}
              placeholder="选择重复方式"
              options={RepeatTypeConfig}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
