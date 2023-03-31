const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

import { IUpdateUserProfile } from "../interfaces/input";

/**
 *
 * @param data
 */
const userProfileUpdate = async (data: IUpdateUserProfile, id: any) => {
  return await prisma.user.update({
    where: {
      id: id.user,
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      profileImage: data.profileImage,
      birthDate: data.birthDate,
    },
    select: {
      firstName: true,
      lastName: true,
      userName: true,
      phone: true,
      profileImage: true,
      id: true,
    },
  });
};

export default { userProfileUpdate };
