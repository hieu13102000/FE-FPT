import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import 'antd/dist/antd.css';
import '../layout/global.css';
import Topbar from "../../admin/topbar/Topbar"
import { Link } from 'react-router-dom'

const { Header, Sider, Content, Footer } = Layout;
export default function BusinessLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={[
              {
                key: '1',
                icon: <PlusCircleOutlined />,
                label: <Link to='/createJob'>Create job</Link>

              },
              {
                key: '2',
                icon: <UnorderedListOutlined />,
                label: <Link to='/listApply'>List apply</Link>,
              },
              {
                key: '3',
                icon:<InfoCircleOutlined />,
                label: <Link to='/detailBusinesses'>Detail businesses</Link>,
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            <div  className="row">
              <div  className="col-1 text-center">{React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}</div>
              <div  className="col-11"> <Topbar /></div>
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    </>
  )
}
