import { Request, Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import authService from './auth.services';
import createResponse from './../utils/response';
import Messages from './../utils/messages';
import bcrypt from 'bcryptjs';
import messages from '@src/utils/messages';
// import authServices from "./auth.services";
// import emailService from "./../services/email_services";
// import tokenService from "./../services/token_services";
// import AppError from "../utils/AppError";
import { uploadOnCloudinary } from '../common/cloudinary.service';

const register: any = async (req: Request, res: Response, next: NextFunction) => {
  let URL: any;
  const data: any = await authService.register(req.body);
  createResponse(res, httpStatus.OK, Messages.REGISTER, data);
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    if (req.body.type == 'image') {
      let profileImage: any = await uploadOnCloudinary(req.file.path, true);
      req.body['image'] = profileImage.secure_url;
    } else if (req.body.type == 'resume') {
      let profileImage: any = await uploadOnCloudinary(req.file.path, true);
      req.body['resume'] = profileImage.secure_url;
    }
  }

  const data: any = await authService.updateUser(req.params.id, req.body);
  createResponse(res, httpStatus.OK, Messages.REGISTER, data);
};

const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
  const getAllUser = await authService.getAllUser();
  createResponse(res, httpStatus.OK, 'user get successfully', getAllUser);
};

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  const getUser = await authService.getUser(req.params.id);
  createResponse(res, httpStatus.OK, 'user info get successfully', getUser);
};

const userDetailUpdate = async (req: Request, res: Response, next: NextFunction) => {
  const userDetailUpdate = await authService.userDetailUpdate(req.params.id, req.body);
  createResponse(res, httpStatus.OK, 'edu update successfully', userDetailUpdate);
};

const userDetailExpUpdate = async (req: Request, res: Response, next: NextFunction) => {
  const userDetailExpUpdate = await authService.userDetailExpUpdate(req.params.id, req.body);
  createResponse(res, httpStatus.OK, 'exp update successfully', userDetailExpUpdate);
};

export default {
  register,
  updateUser,
  getAllUser,
  userDetailUpdate,
  userDetailExpUpdate,
  getUser,
};
