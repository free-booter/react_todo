# 日历视图后端接口需求文档

## 概述

日历视图需要后端提供按月获取任务数据的能力，支持在日历上展示、新增、编辑、删除任务。

---

## 一、核心接口

### 1. 获取日历任务数据接口

**接口路径：** `GET /task/calendar`

**请求参数：**

```typescript
{
  month?: string;        // 可选，格式：YYYY-MM，例如 "2025-01"
  startDate?: string;    // 可选，格式：YYYY-MM-DD，开始日期
  endDate?: string;      // 可选，格式：YYYY-MM-DD，结束日期
}
```

**参数说明：**

- 如果提供 `month`，返回该月份的所有任务
- 如果提供 `startDate` 和 `endDate`，返回该日期范围内的所有任务
- 优先级：`month` > `startDate/endDate`
- 如果都不提供，默认返回当前月份的数据

**响应数据结构：**

```typescript
{
  range: {
    start: string;  // 数据范围的开始日期，格式：YYYY-MM-DD
    end: string;    // 数据范围的结束日期，格式：YYYY-MM-DD
  },
  events: EventTodo[]  // 任务事件列表
}
```

**EventTodo 数据结构：**

```typescript
{
  id: number; // 任务ID
  title: string; // 任务标题
  status: number; // 任务状态：0-待办(todo), 1-进行中(inprogress), 2-已完成(done)
  priority: number; // 优先级：1-高(high), 2-中(medium), 3-低(low)
  dateType: number; // 日期类型：0-无截止日期, 1-今天, 2-明天, 3-指定日期, 4-时间段
  start: string; // 任务开始日期，格式：YYYY-MM-DD
  end: string; // 任务结束日期，格式：YYYY-MM-DD
  isOverdue: boolean; // 是否逾期
  tags: Array<{
    // 标签列表
    id: number; // 标签ID
    name: string; // 标签名称
  }>;
}
```

**业务逻辑要求：**

1. **日期范围计算：**

   - 如果 `dateType = 1`（今天）：`start` 和 `end` 都应该是今天的日期
   - 如果 `dateType = 2`（明天）：`start` 和 `end` 都应该是明天的日期
   - 如果 `dateType = 3`（指定日期）：`start` 和 `end` 都应该是 `dueDate` 的值
   - 如果 `dateType = 4`（时间段）：`start` 应该是 `startDate`，`end` 应该是 `dueDate`
   - 如果 `dateType = 0`（无截止日期）：该任务不应该出现在日历视图中，或者 `start` 和 `end` 都设置为 `createdAt` 的日期

2. **数据过滤：**

   - 只返回有截止日期的任务（`dateType !== 0`）
   - 根据请求的月份或日期范围，只返回在该范围内的任务
   - 需要判断任务是否逾期（`isOverdue`）

3. **性能优化：**
   - 建议对日期范围进行索引优化
   - 可以考虑缓存当月数据

**响应示例：**

```json
{
  "range": {
    "start": "2025-01-01",
    "end": "2025-01-31"
  },
  "events": [
    {
      "id": 1,
      "title": "完成项目文档",
      "status": 0,
      "priority": 1,
      "dateType": 3,
      "start": "2025-01-15",
      "end": "2025-01-15",
      "isOverdue": false,
      "tags": [
        {
          "id": 1,
          "name": "工作"
        }
      ]
    },
    {
      "id": 2,
      "title": "代码审查",
      "status": 1,
      "priority": 2,
      "dateType": 4,
      "start": "2025-01-10",
      "end": "2025-01-20",
      "isOverdue": false,
      "tags": []
    }
  ]
}
```

---

## 二、复用现有接口

以下接口在日历视图中也会使用，需要确保这些接口正常工作：

### 2. 创建任务接口

**接口路径：** `POST /task/create`

**请求体：** 参考 `TodoBase` 类型定义

**说明：** 在日历视图中，用户点击日期创建任务时，会自动设置 `dueDate` 为选中的日期。

---

### 3. 更新任务接口

**接口路径：** `PUT /task/update`

**请求体：** 参考 `Todo` 类型定义（包含 `id`）

**说明：** 在日历视图中，用户可以通过任务菜单编辑任务。

---

### 4. 删除任务接口

**接口路径：** `DELETE /task/delete`

**请求参数：**

```typescript
{
  id: number; // 任务ID
}
```

**说明：** 在日历视图中，用户可以通过任务菜单删除任务。

---

### 5. 获取任务详情接口

**接口路径：** `GET /task/detail/:id`

**说明：** 在日历视图中，用户点击任务可以查看详情。

---

## 三、数据映射关系

### 状态映射（Status）

- `0` → `todo` (待办)
- `1` → `inprogress` (进行中)
- `2` → `done` (已完成)

### 优先级映射（Priority）

- `1` → `high` (高优先级)
- `2` → `medium` (中优先级)
- `3` → `low` (低优先级)

### 日期类型映射（DateType）

- `0` → `none` (无截止日期)
- `1` → `today` (今天)
- `2` → `tomorrow` (明天)
- `3` → `specific` (指定日期)
- `4` → `range` (时间段)

---

## 四、特殊场景处理

### 1. 时间段任务（dateType = 4）

- 如果任务有开始日期和结束日期，该任务应该在开始日期到结束日期之间的每一天都显示
- 前端会通过 `isDateInRange` 函数判断某个日期是否在任务的时间范围内

### 2. 逾期判断（isOverdue）

- 如果任务的 `dueDate` 早于当前日期，且任务状态不是 `done`，则 `isOverdue = true`
- 前端会根据 `isOverdue` 显示特殊的样式标识

### 3. 已完成任务

- 已完成的任务（`status = 2`）仍然会显示在日历上，但会有特殊的视觉标识（删除线、透明度降低）

---

## 五、错误处理

### 错误响应格式

```json
{
  "code": 400,
  "message": "错误信息",
  "data": null
}
```

### 常见错误场景

1. **参数错误：** `month` 格式不正确（应该是 YYYY-MM）
2. **日期范围错误：** `startDate` 晚于 `endDate`
3. **权限错误：** 用户无权限访问该任务数据

---

## 六、性能要求

1. **响应时间：** 接口响应时间应 < 500ms
2. **数据量：** 单月任务数据建议不超过 1000 条
3. **缓存策略：** 可以考虑对当月数据进行缓存，缓存时间 5 分钟

---

## 七、测试用例

### 测试场景 1：按月获取数据

```
请求：GET /task/calendar?month=2025-01
预期：返回 2025年1月的所有任务
```

### 测试场景 2：按日期范围获取数据

```
请求：GET /task/calendar?startDate=2025-01-01&endDate=2025-01-31
预期：返回该日期范围内的所有任务
```

### 测试场景 3：时间段任务

```
任务：开始日期 2025-01-10，结束日期 2025-01-15
预期：在 1月10日到1月15日之间的每一天都应该显示该任务
```

### 测试场景 4：逾期任务

```
任务：截止日期 2025-01-01，状态为 todo，当前日期 2025-01-05
预期：isOverdue = true
```

---

## 八、注意事项

1. **时区处理：** 所有日期应该使用服务器时区，或者统一使用 UTC 时间
2. **数据一致性：** 确保日历接口返回的数据与其他任务列表接口的数据一致
3. **权限控制：** 只返回当前用户有权限查看的任务
4. **数据完整性：** 确保返回的 `start` 和 `end` 字段始终有值（即使是无截止日期的任务，也应该有默认值）

---

## 九、接口依赖关系

日历视图功能依赖以下接口的正常工作：

- ✅ `GET /task/calendar` - **核心接口，需要实现**
- ✅ `POST /task/create` - 已存在
- ✅ `PUT /task/update` - 已存在
- ✅ `DELETE /task/delete` - 已存在
- ✅ `GET /task/detail/:id` - 已存在

---

## 十、总结

**需要重点实现的接口：**

1. **GET /task/calendar** - 这是日历视图的核心接口，需要根据月份或日期范围返回任务数据

**关键点：**

- 正确计算任务的 `start` 和 `end` 日期
- 正确处理时间段任务（dateType = 4）
- 正确判断任务是否逾期
- 确保数据格式符合前端 TypeScript 类型定义

**其他接口：** 都是现有接口，只需要确保它们正常工作即可。
