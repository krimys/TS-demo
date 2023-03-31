import Joi from "@hapi/joi";

const signIn = {
  body: Joi.object().keys({
    userNameEmail: Joi.string(),
    password: Joi.string(),
    token: Joi.string(),
    provider: Joi.string(),
    email: Joi.string(),
    socialLogin: Joi.boolean(),
  }),
};

const signUp = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required().allow(null, ""),
    firstName: Joi.string().allow(null, ""),
    lastName: Joi.string().allow(null, ""),
    userName: Joi.string().allow(null, ""),
    phone: Joi.object().allow(null, ""),
    countryCode: Joi.string().allow(null, ""),
    socialLogin: Joi.boolean(),
    birthDate: Joi.string().allow(null, ""),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    id: Joi.string(),
    password: Joi.string(),
  }),
};

export default {
  signIn,
  signUp,
  forgotPassword,
  resetPassword,
};
