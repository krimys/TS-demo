import { Request } from "express";
export interface ICreateUser {
  email: string | undefined;
  password: string;
  firstName: string | undefined;
  lastName: string | undefined;
  phone: string | undefined | object;
  userName: string | undefined;
  countryCode: string | undefined;
  socialLogin: boolean;
  birthDate: string | undefined;
}

export interface ISignIn {
  userNameEmail: string;
  password: string;
}

export interface IUpdateUserProfile {
  firstName: string;
  lastName: string;
  userName: string;
  phoneNo: string;
  profileImage: string;
  id: string;
  birthDate: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  id: string;
  password: string;
}

export interface IHeaderUser extends Request {
  user: string | object;
}
