import { Button, FloatingLabel } from "flowbite-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginForm } from "../../types/UserType";
import { useLoginMutation } from "../../redux/User/userApi";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCredentials } from "../../redux/Auth/authSlice";
import { useEffect } from "react";
import Loader from "../../components/Loader";
import { Bounce, ToastContainer, toast } from "react-toastify";
import ErrorDisplay from "../../components/ErrorDisplay";

const Login = () => {
  // Initital
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginForm>();
  const [loginApiCall] = useLoginMutation();
  const { userInfo } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Functions
  useEffect(() => {
    if (userInfo) navigate("/");
  }, [userInfo, navigate]);

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    try {
      const res = await loginApiCall(data).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (error: any) {
      reset();
      toast.error(error?.data?.message || error.error);
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
            LOGIN
          </h1>
          <div className="flex flex-col gap-2">
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
            <div>
              <FloatingLabel
                variant="outlined"
                label="Password"
                type="password"
                autoComplete="current-password"
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
          </div>
          <Button disabled={isSubmitting} type="submit" color="failure">
            {isSubmitting ? <Loader size="sm" /> : "Login"}
          </Button>

          <div className="text-xs">
            <p>
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-secondary font-semibold cursor-pointer"
              >
                Register
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

export default Login;
