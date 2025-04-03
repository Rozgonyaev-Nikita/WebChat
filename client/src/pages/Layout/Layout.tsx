import React, { useState } from 'react';
import classes from './Layout.module.css'

import { Layout, theme } from 'antd';
import { MainPage } from '../MainPage/MainPage';
import { _Header } from './Header/Header';
import { _Aside } from './Aside/Aside';
import { useBack, useIsAuth } from '../../hooks';

const { Content } = Layout;

export const _Layout: React.FC = () => {
  useBack();
  useIsAuth()
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
        <_Header collapsed={collapsed} setCollapsed={setCollapsed}/>
      <Layout className={classes.wrapper}>
        <div className={classes.wrapperMain}>
        <_Aside collapsed={collapsed} setCollapsed={setCollapsed}/>
        <Content className={classes.content}
          style={{
            margin: '12px 16px',
            // padding: 24,
            // minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <MainPage />
        </Content>
        </div>
      </Layout>
    </Layout>
  );
};
