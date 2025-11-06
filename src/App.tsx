import { RouterProvider } from "react-router";
import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";
import routeConfig from "./router";
function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#6200EA",
          },
          components: {
            Segmented: {
              itemSelectedColor: "#6200EA",
              itemColor: "#4b5563",
              itemHoverColor: "#6200EA",
              itemHoverBg: "transparent",
            },
          },
        }}
        locale={zhCN}
      >
        <RouterProvider router={routeConfig} />
      </ConfigProvider>
    </>
  );
}

export default App;
