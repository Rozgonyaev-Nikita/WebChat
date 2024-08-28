import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import classes from './Regisatration.module.css'
// import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const sendImg = async () => {
    const user = new FormData();
    user.append('login', login);
    user.append('password', password);
    user.append('image', image || null);

    try {
        const { data } = await axios.post('http://localhost:5000/api/registration', user);
        console.log('data', data); 
        navigate("/avtorization");
    } catch (error) {
        console.error('Error uploading image:', error);
    }
};


  return (
    <div className={classes.registration}>
      <div className={classes.form}>
      <input type="file" onChange={e => setImage(e.target.files[0])} />
      <br/>
      <br/>
        <label>
          Ввдедите имя:
          <input
            type="text"
            style={{ display: "block" }}
            value={login}
            {...register("name", {
              required: "Поле обязательное",
              minLength: { value: 5, message: "Слишком коротко" },
            })}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Введите логин"
          />
        </label>
        {errors?.name ? (
          <div style={{ margin: "0 0", padding: "0 0", color: "red" }}>
            {errors?.name?.message?.toString() || "karp"}
          </div>
        ) : (
          <div style={{ padding: "0 0 20px 0px", margin: "0 0" }}></div>
        )}
        <label>
          Введите пароль:
          <input
            type="password"
            style={{ display: "block" }}
            {...register("password", {
              required: "Поле обязательное",
              minLength: { value: 5, message: "Слишком короткий пароль" },
            })}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Введите пароль"
          />
        </label>
        {errors?.password ? (
          <div style={{ margin: "0 0", padding: "0 0", color: "red" }}>
            {errors?.password?.message?.toString() || "karp"}
          </div>
        ) : (
          <div style={{ padding: "0 0 20px 0px", margin: "0 0" }}></div>
        )}
        <label>
          Повторите пароль:
          <input
            type="password"
            style={{ display: "block" }}
            {...register("password2", {
              required: "Поле обязательное",
              minLength: { value: 5, message: "Слишком короткий пароль" },
            })}
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            placeholder="Повторите пароль"
          />
        </label>
        {errors?.password2 ? (
          <div style={{ margin: "0 0", padding: "0 0", color: "red" }}>
            {errors?.password2?.message?.toString() || "hg"}
          </div>
        ) : (
          <div style={{ padding: "0 0 20px 0px", margin: "0 0" }}></div>
        )}
        {/* <input type="submit" value="Зарегистрироватья" disabled={!isValid} /> */}
        <button onClick={sendImg}>Зарегистрироватья</button>
      </div>
      {/* <Link to={'/avtorization'}>Назад</Link> */}
    </div>
  );
};

export default Registration;