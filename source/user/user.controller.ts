import { Request, Response } from "express";
import httpStatus from "http-status";

import userService from "../user/user.service";
import createResponse from "./../utils/response";
import Messages from "./../utils/messages";

/**
 *
 * @param req
 * @param res
 */
const profileUpdate = async (req: Request, res: Response) => {
  try {
    const userProfileUpdate = await userService.userProfileUpdate(
      req.body,
      req.user
    );
    createResponse(
      res,
      httpStatus.OK,
      Messages.USER_UPDATE_SUCCESS,
      userProfileUpdate
    );
  } catch (error: any) {
    createResponse(res, httpStatus.BAD_REQUEST, error.message, {});
  }
};

export default { profileUpdate };
