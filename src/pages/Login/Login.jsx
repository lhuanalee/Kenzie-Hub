import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../assets/Logo.svg";
import { StyleLogin } from "./StyleLogin";
import { toast } from "react-toastify";

const Login = ({ setUser }) => {
  const formSchema = yup.object().shape({
    email: yup.string().required("Required email").email(),
    password: yup.string().required("Required password"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const navigate = useNavigate();

  const onSubmit = (data) => {
    api
      .post("sessions", data)
      .then((response) => {
        console.log(response.data);
        setUser(response.data.user);
        navigate("/dashboard");
        localStorage.setItem("@token", response.data.token);
        localStorage.setItem("@id", response.data.user.id);
        toast.success("Login successfully done!", { autoClose: 2000 });
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  console.log(errors);

  return (
    <StyleLogin>
      <img src={Logo} alt="Logo" />
      <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="E-mail">E-mail</label>
          <input id="E-mail" placeholder="Email" {...register("email")} />
          <small>{errors.email?.message}</small>
          <label htmlFor="Password">Password</label>
          <input
            id="Password"
            type="password"
            placeholder="Password"
            {...register("password")}
          />
          <small>{errors.password?.message}</small>
          <button type="submit">Login</button>
        </form>
        <span>Don't have a registration yet?</span>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </StyleLogin>
  );
};

export default Login;
