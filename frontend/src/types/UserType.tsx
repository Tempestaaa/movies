export type UserType = {
  _id: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  image: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type UserDataType = {
  users: UserType[];
  page: number;
  pages: number;
  totalUsers: number;
};

export type LoginForm = Pick<UserType, "email" | "password">;

export type RegisterForm = Pick<
  UserType,
  "email" | "password" | "username" | "confirmPassword"
>;
