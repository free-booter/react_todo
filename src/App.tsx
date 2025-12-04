import { RouterProvider } from "react-router";
import { ConfigProvider, message } from "antd";
import zhCN from "antd/locale/zh_CN";
import { MessageContext } from "./context/MessageContext";
import routeConfig from "./router";

function App() {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <ConfigProvider locale={zhCN}>
      <MessageContext.Provider value={messageApi}>
        {contextHolder}
        <RouterProvider router={routeConfig} />
      </MessageContext.Provider>
    </ConfigProvider>
  );
}

export default App;
