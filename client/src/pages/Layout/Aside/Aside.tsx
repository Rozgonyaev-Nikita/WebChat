import { FC } from 'react'
import classes from './Aside.module.css'
import {
  UserOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom'
import Sider from 'antd/es/layout/Sider'
import { Menu } from 'antd'

interface IAside{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const _Aside:FC<IAside> = ({collapsed, setCollapsed}) => {

  
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className={classes.asideWrapper} style={{backgroundColor: '#fcfcfc', height: "calc(100vh - 64px)"}}>
        <div className="demo-logo-vertical" />
        <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={['1']}
      >
        <Menu.Item key="1" icon={<CommentOutlined />}>
          <Link to="/">Сообщения</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/friends">Друзья</Link>
        </Menu.Item>
      </Menu>
      </Sider>
  )
}