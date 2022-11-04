import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";

import api from "../../services/api";

import Logo from "../../assets/Logo.svg";
import { StyleRegister } from "./StyleRegister";

const Register = () => {
  const formSchema = yup.object({
    name: yup.string().required("Required name"),
    email: yup.string().required("Required email").email("Invalid email"),
    password: yup
      .string()
      .min(8, "At least 8 characters")
      .required("Required password"),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref("password")],
        "Password confirmation must be the same as password"
      ),
    bio: yup.string().required("Required description"),
    contact: yup.string().required("Required contact"),
    course_module: yup.string().required("Required course"),
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
      .post(`users`, data)
      .then((response) => {
        console.log(response.data);
        toast.success("Registration successful!", { autoClose: 2000 });
        navigate("/");
      })
      .catch((err) => toast.error(err.response.data.message));
  };

  console.log(errors);

  return (
    <StyleRegister>
      <div>
        <img src={Logo} alt="Logo" />
        <button onClick={() => navigate("/")}>Voltar</button>
      </div>
      <div className="form">
        <h1>Create your account</h1>
        <span>Fast and free, let's go!</span>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="Name">Name</label>
          <input id="Name" placeholder="Name" {...register("name")} />
          <small>{errors.name?.message}</small>

          <label htmlFor="Email">E-mail</label>
          <input id="Email" placeholder="Email" {...register("email")} />
          <small>{errors.email?.message}</small>

          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="Password"
            placeholder="Password"
            {...register("password")}
          />
          <small>{errors.password?.message}</small>

          <input
            type="password"
            id="Password"
            placeholder="Confirm password"
            {...register("confirmPassword")}
          />
          <small>{errors.confirmPassword?.message}</small>

          <label htmlFor="Bio">Bio</label>
          <input id="Bio" placeholder="Bio" {...register("bio")} />
          <small>{errors.bio?.message}</small>

          <label htmlFor="Contact">Contact</label>
          <input id="Contact" placeholder="Contact" {...register("contact")} />
          <small>{errors.contact?.message}</small>

          <label htmlFor="Select">Select module</label>
          <select id="Select" {...register("course_module")}>
            <option value="Select">Select</option>
            <option value="M1">M1</option>
            <option value="M2">M2</option>
            <option value="M3">M3</option>
            <option value="M4">M4</option>
            <option value="M5">M5</option>
            <option value="M6">M6</option>
          </select>
          <small>{errors.course_module?.message}</small>

          <button type="submit">Register</button>
        </form>
      </div>
    </StyleRegister>
  );
};

export default Register;
