import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authAction } from '../../store/authSlice';
import { useAppDispatch } from "../../hooks/reduxHooks";
import classes from "./Avtorization.module.css";
import { connectSocket } from "../../socket";


const Avtorization = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("123456");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const avtorization = () => {
    console.log("начало входа");
    axios
      .get("http://localhost:5000/api/login", {
        params: {
          login,
          password,
        },
      })
      .then((response) => {
        const {avatar, ...user} = response.data
        if (response.data) {
          console.log(user);
          connectSocket()
          dispatch(authAction(response.data));
          navigate("/");
        } else {
          alert("Пробуй еще!!!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        avtorization();
      }
    }
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [login, password]);

  return (
    <div className={classes.avtorization}>
      <div className={classes.form}>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Введите логин"
        />
        <input
          type="password" // Изменил на "password" для скрытия пароля
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Введите пароль"
        />
        <button onClick={avtorization}>Войти</button>
        <Link to="/registration" className={classes.back}>
          Зарегистрироваться
        </Link>
        <Link to="/" className={classes.back}>
          Назад
        </Link>
      </div>
    </div>
  );
};

export default Avtorization;
