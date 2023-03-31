import { Request, Response } from "express";
import httpStatus from "http-status";

import authService from "../auth/auth.service";
import createResponse from "./../utils/response";
import Messages from "./../utils/messages";

/**
 *
 * @param req
 * @param res
 */
const signIn = async (req: Request, res: Response) => {
  try {
    if (!req.body.provider) {
      const signIn = await authService.signIn(req.body);
      createResponse(res, httpStatus.OK, Messages.LOGIN, signIn);
    } else {
      const checkEmail = await authService.checkDuplicateEmailForSocialLogin(
        req.body
      );
      createResponse(res, httpStatus.OK, Messages.LOGIN, checkEmail);
    }
  } catch (error: any) {
    createResponse(res, httpStatus.BAD_REQUEST, error.message, {});
  }
};

/**
 *
 * @param req
 * @param res
 */
const signUp = async (req: Request, res: Response) => {
  try {
    const signUp = await authService.signUp(req.body);
    if (signUp.socialLogin == true) {
      const checkEmail = await authService.checkDuplicateEmailForSocialLogin(
        req.body
      );
      createResponse(res, httpStatus.OK, Messages.LOGIN, checkEmail);
    } else {
      createResponse(res, httpStatus.OK, Messages.SIGN_UP_SUCCESS, signUp);
    }
  } catch (error: any) {
    createResponse(res, httpStatus.BAD_REQUEST, error.message, {});
  }
};

/**
 *
 * @param req
 * @param res
 */
const forgotPassword = async (req: Request, res: Response) => {
  try {
    const forgotPassword = await authService.forgotPassword(req.body.email);
    createResponse(
      res,
      httpStatus.OK,
      Messages.FORGOT_PASSWORD_SUCCESS,
      forgotPassword
    );
  } catch (error: any) {
    createResponse(res, httpStatus.BAD_REQUEST, error.message, {
      emailFound: false,
    });
  }
};

/**
 *
 * @param req
 * @param res
 */
const resetPassword = async (req: Request, res: Response) => {
  try {
    const resetPassword = await authService.resetPassword(req.body);
    createResponse(res, httpStatus.OK, Messages.RESET_PASSWORD, resetPassword);
  } catch (error: any) {
    createResponse(res, httpStatus.BAD_REQUEST, error.message, {});
  }
};

const checkBirthDate = async (req: Request, res: Response) => {
  try {
    if (req.body.provider) {
      const socialLogin = await authService.socialLogin(req.body);
      if (socialLogin) {
        createResponse(res, httpStatus.OK, "", {
          isBirthDateAvailable: true,
          user: socialLogin.user,
        });
      } else {
        createResponse(res, httpStatus.OK, "", {
          isBirthDateAvailable: false,
        });
      }
    } else {
      const checkEmail = await authService.checkDuplicateEmailForSocialLogin(
        req.body
      );
      if (checkEmail) {
        createResponse(res, httpStatus.OK, "", {
          isBirthDateAvailable: true,
          user: checkEmail.user,
        });
      } else {
        createResponse(res, httpStatus.OK, "", {
          isBirthDateAvailable: false,
        });
      }
    }
  } catch (error: any) {
    createResponse(res, httpStatus.BAD_REQUEST, error.message, {});
  }
};

const userDelete = async (req: Request, res: Response) => {
  const userDelete = await authService.userDelete(req.body);
  createResponse(res, httpStatus.OK, "", userDelete);
};

export default {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
  checkBirthDate,
  userDelete,
};
