import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined,
  UnorderedListOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Row , Col} from 'antd';
import 'antd/dist/antd.css';
import '../layout/global.css';

import HeaderItem from "./headerItem/headerItem"

const { Header, Sider, Content, Footer } = Layout;
export default function BusinessLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <Layout hasSider>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,

          }} breakpoint='lg' onBreakpoint={
            (e) => {
              if (e) {
                setCollapsed(!collapsed)
              } else {
                setCollapsed(false)
              }
            }
          } trigger={null} collapsible collapsed={collapsed}
        >
          <div className="logo">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/archive/1/11/20220227005002%21FPT_logo_2010.svg/120px-FPT_logo_2010.svg.png" alt="Logo" style={{ width: '36px', marginRight: '8px' }} />
            {!collapsed && <h1>FPT University</h1>}
          </div>
          <Menu
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
                icon: <EditOutlined />,
                label: <Link to='/detailJob'>Detail job</Link>
              },
              {
                key: '3',
                icon: <UnorderedListOutlined />,
                label: <Link to='/listApply'>List apply</Link>,
              },
              {
                key: '4',
                icon:<InfoCircleOutlined />,
                label: <Link to='/detailBusinesses'>Detail businesses</Link>,
              },
            ]}
          />
        </Sider>
        <Layout
          className={collapsed ? 'customWidth' : 'site-layout-background'}
          style={{
            marginLeft: 200,
          }}
        >
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
              position: 'fixed',
              backgroundColor: '#fff',
              height: '72px',
              zIndex: 1, width: '100%'

            }}
          >
            <Row>
              <Col span={24} style={{ display: 'inline-flex' }}> {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: () => setCollapsed(!collapsed),
              })}
                <div className={!collapsed ? 'header-item-right' : 'header-item-rightClose' }>
                  <HeaderItem/>
                </div>
              </Col>
            </Row>
          </Header>
          <Content
            style={{
              margin: '61px 16px',
              padding: 24,
              height: '100%',
            }}
          >
          {children}
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2022 </Footer>
        </Layout>
      </Layout>

    </>
  )
}
