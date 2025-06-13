import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  Form, 
  Input, 
  Button, 
  Upload, 
  message, 
  Card, 
  Typography,
  Divider,
  Checkbox
} from 'antd';
import { UploadOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import styles from './Regisatration.module.css';

const { Title } = Typography;

const Registration = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    if (values.password !== values.password2) {
      message.error('Пароли не совпадают!');
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('login', values.login);
      formData.append('password', values.password);
      if (image) formData.append('image', image);

      await axios.post('https://webchat-dopi.onrender.com/api/registration', formData);
      message.success('Регистрация прошла успешно!');
      navigate("/avtorization");
    } catch (error) {
      message.error('Ошибка при регистрации');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file) => {
    setImage(file);
    return false;
  };

  return (
    <div className={styles.registrationContainer}>
      <Card className={styles.registrationCard}>
        <Title level={3} className={styles.title}>
          Регистрация
        </Title>
        
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
          layout="vertical"
        >
          <Form.Item name="avatar" label="Аватар">
            <Upload
              name="avatar"
              listType="picture"
              beforeUpload={beforeUpload}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Загрузить фото</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            name="login"
            label="Логин"
            rules={[
              { required: true, message: 'Пожалуйста, введите логин!' },
              { min: 5, message: 'Логин должен быть не менее 5 символов!' },
            ]}
          >
            <Input prefix={<UserOutlined />} placeholder="Придумайте логин" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Пароль"
            rules={[
              { required: true, message: 'Пожалуйста, введите пароль!' },
              { min: 6, message: 'Пароль должен быть не менее 6 символов!' },
            ]}
            hasFeedback
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Придумайте пароль" />
          </Form.Item>

          <Form.Item
            name="password2"
            label="Подтвердите пароль"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Пожалуйста, подтвердите пароль!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Повторите пароль" />
          </Form.Item>

          <Form.Item
            name="agreement"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value ? Promise.resolve() : Promise.reject(new Error('Необходимо согласие')),
              },
            ]}
          >
            <Checkbox>
              Я согласен с <a href="#">условиями использования</a>
            </Checkbox>
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
              className={styles.submitButton}
            >
              Зарегистрироваться
            </Button>
          </Form.Item>

          <Divider className={styles.divider}>Уже есть аккаунт?</Divider>
          
          <Button 
            type="link" 
            block
            onClick={() => navigate("/avtorization")}
            className={styles.loginLink}
          >
            Войти
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Registration;