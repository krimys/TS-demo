import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";

import createResponse from "./../utils/response";

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const secratekey: string = process.env.JWT_SECRET as string;
    const token: string | undefined = req.header("Authorization");
    if (!token) {
      createResponse(res, httpStatus.UNAUTHORIZED, "Please authenticate", {});
    } else {
      const decoded = jwt.verify(token, secratekey);
      req.user = decoded.sub;
      next();
    }
  } catch (err: any) {
    createResponse(res, httpStatus.UNAUTHORIZED, "Please authenticate", {});
  }
};

export default auth;
