
import { useForm, type SubmitHandler } from "react-hook-form";
import Input from "../component/Input";
import Button from "../component/Button";
import Card from "../component/Card";
import { Link } from "react-router-dom";
import classes from "../style/Login.module.css";

interface LoginFormInputs {
  email: string;
  password: string;
}

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const onSubmit: SubmitHandler<LoginFormInputs> = (data) => {
    console.log("Login form data:", data);
  };

  return (
    <Card>
      {/* Header */}
      <div className={classes.loginCardHeader}>
        <span className={classes.first}> Welcome Back!</span>
        <span className={classes.last}>Seamless collaboration starts here.</span>
        <span className={classes.stroke}></span>
      </div>

      {/* Form */}
      <form className={classes.loginInputContainer} onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
        <Input
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Enter a valid email address",
            },
          })}
          errorMessage={errors.email?.message}
        />
     

        {/* Password */}
        <Input
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          errorMessage={errors.password?.message}
        />
        
        {/* Button */}
        <Button label="Login" type="submit" />

        {/* Forgot Password */}
        <Link className={classes.forgotLink} to="/">
          Forgot Password?
        </Link>
      </form>
    </Card>
  );
};

export default Login;
