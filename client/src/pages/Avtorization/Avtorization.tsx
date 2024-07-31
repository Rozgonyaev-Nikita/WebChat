import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {authAction} from '../../store/authSlice'
import { useAppDispatch } from "../../hooks/reduxHooks";
import classes from "./Avtorization.module.css";

const Avtorization = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  // const [avtoriz, setAvtoriz] = useState(false);

  const navigate = useNavigate();

  // const auth = useAppSelector((state) => state.auth.isAuth);
  const dispatch = useAppDispatch();

  const avtorization = () => {
    console.log("начало входа");
    axios
      .get("http://localhost:5000/api/getUser", {
        params: {
          login,
          password,
        },
      })
      .then((response) => {
        // if (response.data === true) {
        if (response.data) {
          console.log(response.data);
          // setAvtoriz(response.data);
          dispatch(authAction(response.data));
          navigate("/");
        } else {
          // dispatch(authAction(response.data));
          alert("Пробуй еще!!!");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // useEffect(() => {
  //   if (auth) {
  //     navigate(-1);
  //   }
  // }, []);

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
          type="text"
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