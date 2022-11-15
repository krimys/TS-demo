import UserModel from '../model/document/userModel';
import mongoose, { ObjectId } from 'mongoose';
import AppError from '../utils/AppError';
import Messages from '../utils/messages';
import httpStatus from 'http-status';
import bcrypt from 'bcryptjs';

const register = async (body: any) => {
  //   body.sPassword = await bcrypt.hash(body.sPassword, 8);
  const userData = await UserModel.create(body);
  return userData;
};

const updateUser = async (id: any, body: any) => {
  const user: any = await UserModel.findById(id);
  if (user) {
    const userData = await UserModel.findByIdAndUpdate(id, body, { new: true });
    return userData;
  } else {
    throw new AppError(httpStatus.UNPROCESSABLE_ENTITY, 'NOT FOUND');
  }
};

const getAllUser = async () => {
  const getAllUser = await UserModel.find({ status: { $ne: 'Deleted' } });
  return getAllUser;
};

const getUser = async (id: any) => {
  const getUser = await UserModel.findById(id);
  return getUser;
};

const userDetailUpdate = async (id: any, body: any) => {
  let filter = {};
  let query = {};
  if (body.type === 'eduDel') {
    filter = { _id: id };
    query = { $pull: { educationDetail1: { _id: body.id } } };
  } else if (body.type === 'eduEdit') {
    filter = { _id: id, 'educationDetail1._id': body.id };
    query = {
      $set: {
        'educationDetail1.$.educationName': body.educationName,
        'educationDetail1.$.universityName': body.universityName,
        'educationDetail1.$.result': body.result,
        'educationDetail1.$.yearOfPAssing': body.yearOfPAssing,
      },
    };
  }
  const userDetailUpdate = await UserModel.findOneAndUpdate(filter, query, { new: true });
  return userDetailUpdate;
};

const userDetailExpUpdate = async (id: any, body: any) => {
  let filter = {};
  let query = {};
  if (body.type === 'expDel') {
    filter = { _id: id };
    query = { $pull: { experienceDetail1: { _id: body.id } } };
  } else if (body.type === 'expEdit') {
    filter = { _id: id, 'experienceDetail1._id': body.id };
    query = {
      $set: {
        'experienceDetail1.$.companyName': body.companyName,
        'experienceDetail1.$.position': body.position,
        'experienceDetail1.$.totalYear': body.totalYear,
        'experienceDetail1.$.lastCtc': body.lastCtc,
      },
    };
  }
  const userDetailUpdate = await UserModel.findOneAndUpdate(filter, query, { new: true });
  return userDetailUpdate;
};
export default {
  register,
  updateUser,
  getAllUser,
  userDetailUpdate,
  userDetailExpUpdate,
  getUser,
};
