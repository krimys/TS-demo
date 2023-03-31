import Joi from "@hapi/joi";

const profileUpdate = {
  body: Joi.object().keys({
    firstName: Joi.string(),
    lastName: Joi.string(),
    userName: Joi.string(),
    phoneNo: Joi.string(),
    profileImage: Joi.string(),
    id: Joi.string().required(),
    birthDate: Joi.string(),
  }),
};

export default { profileUpdate };
