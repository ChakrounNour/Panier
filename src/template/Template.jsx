import React, { useState } from "react";
import { Layout, Menu } from "antd";
import { menu } from "../helpers/menu";
import Produit from "../page/produit/Produit";
import CustomDrawer from "../component/Drawer";

const { Header, Content } = Layout;

const Template = () => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <Layout>
      <Header style={{ display: "flex", alignItems: "center" }}>
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          items={menu.map((item) => {
            if (item.key === "panier") {
              return {
                ...item,
                onClick: showDrawer,
              };
            }
            return item;
          })}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Header>
      <Content style={{ padding: "0 48px" }}>
        <div
          style={{
            background: "#fff",
            minHeight: 280,
            padding: 24,
            borderRadius: "8px",
          }}
        >
          <Produit />
        </div>
      </Content>

      <CustomDrawer onClose={onClose} open={open} />
    </Layout>
  );
};

export default Template;
