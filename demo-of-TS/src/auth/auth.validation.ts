import Joi from '@hapi/joi';

const register = {
  body: Joi.object().keys({
    firstName: Joi.string(),
    middleName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string().email(),
    mobileNumber: Joi.number(),
    birthday: Joi.date(),
    image: Joi.string(),
    parmenentAddress: Joi.string(),
    presentAddress: Joi.string(),
    bankName: Joi.string(),
    accoutName: Joi.string(),
    bankAccountNumber: Joi.number(),
    ifscCode: Joi.string(),
    adharcardNumber: Joi.number(),
    panNumber: Joi.string(),
    designation: Joi.string(),
    department: Joi.string(),
    experienceMonth: Joi.string(),
    experienceYear: Joi.string(),
    currentLocation: Joi.string(),
    skills: Joi.array(),
    educationDetail1: Joi.array(),
    experienceDetail1: Joi.array(),
    joiningDate: Joi.date(),
    nextAppraisal: Joi.date(),
    currentCtc: Joi.string(),
  }),
};

const userUpdate = {
  params: Joi.object().keys({
    id: Joi.string(),
  }),
};
export default {
  register,
  userUpdate,
};
