import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, FloatingLabel } from "flowbite-react";
import Loader from "../../components/Loader";
import { UserType } from "../../types/UserType";
import { toast } from "react-toastify";
import { useProfileMutation } from "../../redux/User/userApi";
import { setCredentials } from "../../redux/Auth/authSlice";

const Profile = () => {
  const { userInfo } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Pick<UserType, "username" | "email" | "image">>({
    defaultValues: {
      email: userInfo?.email,
      username: userInfo?.username,
    },
  });

  const [updateProfile] = useProfileMutation();

  const onSubmit: SubmitHandler<
    Pick<UserType, "username" | "email" | "image">
  > = async (data) => {
    try {
      const res = await updateProfile(data).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("User updated");
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <div className="bg-sub w-full p-4 rounded-md">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold text-center md:text-left uppercase">
          Profile
        </h1>

        <section className="flex flex-col gap-4 md:w-1/2 mx-auto">
          {/* IMAGE */}
          <label className="overflow-hidden h-40 rounded-md border-2 border-dotted border-blue-500 !bg-sub grid place-items-center cursor-pointer md:mt-20">
            <span>Drag and drop your avatar here!</span>
            <input type="file" accept="image/*" className="hidden" />
          </label>

          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <div>
              <FloatingLabel
                variant="outlined"
                label="Email"
                type="email"
                autoComplete="email"
                {...register("email", {
                  validate: (value) => {
                    if (!value.includes("@")) return "Email must include @";
                    return true;
                  },
                })}
                className="text-text"
              />
              {errors.email && (
                <p className="text-secondary text-xs">{errors.email.message}</p>
              )}
            </div>

            {/* USERNAME */}
            <div>
              <FloatingLabel
                variant="outlined"
                label="Username"
                type="text"
                autoComplete="username"
                {...register("username")}
                className="text-text"
              />
              {errors.email && (
                <p className="text-secondary text-xs">{errors.email.message}</p>
              )}
            </div>
          </div>
          <Button disabled={isSubmitting} type="submit" color="failure">
            {isSubmitting ? <Loader size="sm" /> : "Save"}
          </Button>
        </section>
      </form>
    </div>
  );
};

export default Profile;
