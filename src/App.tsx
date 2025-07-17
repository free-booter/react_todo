import { Outlet, RouterProvider, useRoutes } from "react-router-dom";
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
        <RouterProvider
          future={{
            v7_startTransition: true,
          }}
          router={routeConfig}
        />
      </ConfigProvider>
    </>
  );
}

export default App;
