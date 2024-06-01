import { Bounce, ToastContainer, toast } from "react-toastify";
import Loader from "../../components/Loader";
import { Button, FloatingLabel } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RegisterForm } from "../../types/UserType";
import { useRegisterMutation } from "../../redux/User/userApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { setCredentials } from "../../redux/Auth/authSlice";
import ErrorDisplay from "../../components/ErrorDisplay";

const Register = () => {
  // Initital
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterForm>();
  const [registerApiCall, { isLoading }] = useRegisterMutation();
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Functions
  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {
    if (data.password !== data.confirmPassword) {
      reset();
      return toast.error("Password do not match");
    } else {
      try {
        const res = await registerApiCall(data).unwrap();
        dispatch(setCredentials({ ...res }));
      } catch (error: any) {
        reset();
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <div className="min-h-svh bg-primary text-text flex font-default">
      {/* LOGIN FORM */}
      <section className="w-full md:w-1/4 md:border-r border-sub flex items-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col w-full px-4 gap-4"
        >
          <h1 className="text-4xl font-semibold text-center md:text-left">
            REGISTER
          </h1>
          <div className="flex flex-col gap-2">
            {/* Email */}
            <div>
              <FloatingLabel
                variant="outlined"
                label="Email"
                type="email"
                autoComplete="email"
                {...register("email", {
                  required: "Email is required",
                  validate: (value) => {
                    if (!value.includes("@")) return "Email must include @";
                    return true;
                  },
                })}
                className="text-text"
              />
              {errors.email && <ErrorDisplay message={errors.email.message} />}
            </div>

            {/* Username */}
            <div>
              <FloatingLabel
                variant="outlined"
                label="Username"
                type="text"
                autoComplete="username"
                {...register("username", {
                  required: "Username is required",
                })}
                className="text-text"
              />
              {errors.username && (
                <ErrorDisplay message={errors.username.message} />
              )}
            </div>

            {/* Password */}
            <div>
              <FloatingLabel
                variant="outlined"
                label="Password"
                type="password"
                autoComplete="new-password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have 6 or more characters",
                  },
                })}
                className="text-text"
              />
              {errors.password && (
                <ErrorDisplay message={errors.password.message} />
              )}
            </div>

            {/* Confirm password */}
            <div>
              <FloatingLabel
                variant="outlined"
                label="Confirm password"
                type="password"
                autoComplete="new-password"
                {...register("confirmPassword", {
                  required: "Confirm password is required",
                  minLength: {
                    value: 6,
                    message: "Password must have 6 or more characters",
                  },
                })}
                className="text-text"
              />
              {errors.confirmPassword && (
                <ErrorDisplay message={errors.confirmPassword.message} />
              )}
            </div>
          </div>
          <Button disabled={isLoading} type="submit" color="failure">
            {isLoading ? <Loader size="sm" /> : "Register"}
          </Button>

          <div className="text-xs">
            <p>
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-secondary font-semibold cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </section>

      {/* HERO */}
      <section className="hide md:block flex-1"></section>

      {/* Toast */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </div>
  );
};

export default Register;
