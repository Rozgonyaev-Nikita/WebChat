import React, { FC } from 'react'
import classes from './Header.module.css'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useAppSelector } from '../../../hooks/reduxHooks'
import { IoMdNotificationsOutline } from "react-icons/io";
import avatarDefault from '../../../images/avatarDefault.webp'
import { ModalFloat } from '../../../UI/ModalFloat/ModalFloat';
import { Profile } from '../../../components/Profile/Profile';
import { Avatar, ESize } from '../../../UI/Avatar/Avatar';
import { Button, Layout } from 'antd';
import { Link } from 'react-router-dom';


const {Header} = Layout;

interface IHeader{
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export const _Header: FC<IHeader> = ({collapsed, setCollapsed}) => {
  const { login, avatar } = useAppSelector(u => u.auth.user)
  return (
    <Header style={{ display: 'flex', background: '#001529', justifyContent: 'center' }}>
      <div className={classes.wrapper} style={{display: 'flex', gap: '100px'}}>
    <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
              color: '#fcfcfc'
            }}
          />
      <Link to="/"><h1 style={{color: '#fcfcfc', fontSize: '18px'}}>Мой чат</h1></Link>

      
      {/* <RxAvatar size={30}/> */}
      <div className={classes.groupManagement}>
      <IoMdNotificationsOutline size={30} color='#fcfcfc'/>
        <div className={classes.profile}>
          <ModalFloat controlElement={<Avatar avatar={avatar} size={ESize.MIN}/>}>
            <Profile/>
          </ModalFloat>
        </div>
      </div>
      </div>
    </Header>
  )
}