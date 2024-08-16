import React, { useState } from 'react';
import { Layout, Menu, theme, Modal, Drawer } from 'antd';
import { menu } from '../helpers/menu';
import Produit from '../page/produit/Produit';
import Panier from '../page/panier/Paniers';

const { Header, Content, Footer } = Layout;

const Template = () => {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  return (
    <Layout>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div className="demo-logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['2']}
          items={menu.map((item) => {
            if (item.key === 'panier') {
              return {
                ...item,
                onClick: showDrawer,
              };
            }
            return item;
          })}
          style={{
            flex: 1,
            minWidth: 0,
          }}
        />
      </Header>
      <Content
        style={{
          padding: '0 48px',
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <Produit />
        </div>
      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Ant Design ©{new Date().getFullYear()} Created by Ant UED
      </Footer>

      <Drawer title="Panier" onClose={onClose} open={open}>
      <Panier />
      </Drawer>
     
    </Layout>
  );
};

export default Template;
