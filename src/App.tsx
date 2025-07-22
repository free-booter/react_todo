import { RouterProvider } from "react-router";
import { ConfigProvider } from "antd";
import routeConfig from "./router";
function App() {
  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#6200EA",
          },
        }}
      >
        <RouterProvider router={routeConfig} />
      </ConfigProvider>
    </>
  );
}

export default App;
