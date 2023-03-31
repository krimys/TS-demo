import constant from "./constant";

const roles = [constant.ROLES.ADMIN, constant.ROLES.USER];
const roleRights = new Map();

roleRights.set(roles[0], ["changePassword"]);
roleRights.set(roles[1], ["changePassword"]);

export { roles, roleRights };
