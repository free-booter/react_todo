import Layout from "./layout";
import { ConfigProvider } from "antd";
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
        <Layout />
      </ConfigProvider>
    </>
  );
}

export default App;
