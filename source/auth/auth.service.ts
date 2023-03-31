import httpStatus from "http-status";
import bcrypt from "bcryptjs";
import { randomUUID } from "crypto";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import AppError from "../utils/AppError";
import Messages from "./../utils/messages";
import tokenService from "../services/token.services";
import {
  ICreateUser,
  ISignIn,
  IForgotPassword,
  IResetPassword,
} from "../interfaces/input";

/**
 *
 * @param email
 */
const checkDuplicateEmail = async (email: string | undefined) => {
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (checkEmail) {
    throw new AppError(
      httpStatus.UNPROCESSABLE_ENTITY,
      Messages.EMAIL_ALREADY_EXIST
    );
  }
  return checkEmail;
};

/**
 *
 * @param userName
 */
const checkDuplicateUserName = async (userName: string | undefined) => {
  const checkUserName = await prisma.user.findUnique({
    where: {
      userName: userName,
    },
  });
  if (checkUserName) {
    throw new AppError(
      httpStatus.UNPROCESSABLE_ENTITY,
      Messages.USERNAME_ALREADY_EXIST
    );
  }
  return checkUserName;
};

/**
 *
 * @param data
 */
const signUp = async (data: ICreateUser) => {
  if (data.password.length > 0) {
    data.password = await bcrypt.hash(data.password, 8);
  }
  await checkDuplicateEmail(data.email);
  await checkDuplicateUserName(data.userName);
  const id = randomUUID();
  return await prisma.user.create({
    data: {
      id: id,
      email: data.email,
      password: data.password ? data.password : "",
      firstName: data.firstName ? data.firstName : "",
      lastName: data.lastName ? data.lastName : "",
      // phoneNo: data.phoneNo ? data.phoneNo : "",
      // countryCode: data.countryCode ? data.countryCode : "",
      phone: data.phone,
      userName: data.userName,
      socialLogin: data.socialLogin,
      birthDate: data.birthDate,
    },
  });
};

/**
 *
 * @param password
 * @param correctPassword
 */
const checkPassword = async (password: string, correctPassword: string) => {
  const isPasswordMatch = await bcrypt.compare(password, correctPassword);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, Messages.INVALID);
  }
  return isPasswordMatch;
};

/**
 *
 * @param data
 */
const signIn = async (data: ISignIn) => {
  const signIn = await prisma.user.findMany({
    where: {
      OR: [
        {
          email: data.userNameEmail,
        },
        {
          userName: data.userNameEmail,
        },
      ],
    },
  });

  if (signIn.length > 0) {
    if (signIn[0].password != "" || data.password.length > 0) {
      await checkPassword(data.password, signIn[0].password);
    }
    const tokens = await tokenService.generateAuthTokens(signIn[0].id);
    const user = {
      id: signIn[0].id,
      firstName: signIn[0].firstName,
      lastName: signIn[0].lastName,
      profileImage: signIn[0].profileImage,
      birthDate: signIn[0].birthDate,
      accessToken: tokens.access.token,
      refreshToken: tokens.refresh.token,
    };
    return { user };
  } else {
    throw new AppError(
      httpStatus.UNPROCESSABLE_ENTITY,
      Messages.EMAIL_NOT_FOUND
    );
  }
};

/**
 *
 * @param data
 */
const checkDuplicateEmailForSocialLogin = async (data: ICreateUser) => {
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (checkEmail) {
    const obj = {
      userNameEmail: checkEmail.email,
      password: data.password,
    };
    return await signIn(obj);
  } else {
    return checkEmail;
  }
};

/**
 *
 * @param email
 */
const forgotPassword = async (email: IForgotPassword) => {
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
    },
  });
  if (!checkEmail) {
    throw new AppError(
      httpStatus.UNPROCESSABLE_ENTITY,
      Messages.EMAIL_NOT_FOUND_FORGOTPASSWORD
    );
  }
  return { id: checkEmail.id, emailFound: true };
};

/**
 *
 * @param data
 */
const resetPassword = async (data: IResetPassword) => {
  data.password = await bcrypt.hash(data.password, 8);
  const resetPassword = await prisma.user.update({
    where: {
      id: data.id,
    },
    data: {
      password: data.password,
    },
    select: {
      id: true,
    },
  });
  return resetPassword;
};

const userDelete = async (data: any) => {
  return await prisma.user.delete({
    where: {
      id: "c85e975d-cdb7-4f67-9038-649fb2e4ed51",
    },
  });
};

const socialLogin = async (data: any) => {
  const checkEmail = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (checkEmail) {
    const tokens = await tokenService.generateAuthTokens(checkEmail.id);
    const user = {
      id: checkEmail.id,
      firstName: checkEmail.firstName,
      lastName: checkEmail.lastName,
      profileImage: checkEmail.profileImage,
      birthDate: checkEmail.birthDate,
      accessToken: tokens.access.token,
      refreshToken: tokens.refresh.token,
    };
    return { user };
  } else {
    return checkEmail;
  }
};

export default {
  signUp,
  signIn,
  checkDuplicateEmailForSocialLogin,
  forgotPassword,
  resetPassword,
  userDelete,
  socialLogin,
};
