import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authAction } from '../../store/authSlice';
import { useAppDispatch } from "../../hooks/reduxHooks";
import { connectSocket } from "../../socket";
import { 
  Form, 
  Input, 
  Button, 
  Card, 
  Typography,
  Divider,
  Alert,
  Layout 
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Avtorization.module.css';

const { Title } = Typography;
const { Content } = Layout;

const Authorization = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");
      
      const response = await axios.get("https://webchat-dopi.onrender.com/api/login", {
        params: { login, password }
      });

      if (response.data) {
        const { avatar, ...user } = response.data;
        connectSocket();
        dispatch(authAction({...user, avatar}));
        navigate("/");
      } else {
        setError("Неверный логин или пароль");
      }
    } catch (err) {
      console.error(err);
      setError("Ошибка при авторизации");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleSubmit();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [login, password]);

  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <Card className={styles.card}>
          <Title level={3} className={styles.title}>
            Вход в систему
          </Title>

          {error && (
            <Alert 
              message={error} 
              type="error" 
              showIcon 
              className={styles.alert}
            />
          )}

          <Form layout="vertical">
            <Form.Item
              label="Логин"
              rules={[{ required: true, message: 'Введите ваш логин' }]}
            >
              <Input
                prefix={<UserOutlined />}
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="Введите логин"
                size="large"
              />
            </Form.Item>

            <Form.Item
              label="Пароль"
              rules={[{ required: true, message: 'Введите ваш пароль' }]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Введите пароль"
                size="large"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                onClick={handleSubmit}
                loading={loading}
                block
                size="large"
              >
                Войти
              </Button>
            </Form.Item>

            <Divider className={styles.divider}>Нет аккаунта?</Divider>
            
            <Button 
              type="default" 
              block
              size="large"
            >
              <Link to="/registration">Зарегистрироваться</Link>
            </Button>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
};

export default Authorization;