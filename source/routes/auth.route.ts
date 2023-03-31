import express from "express";

import authController from "../auth/auth.controller";
import validate from "../middlewares/validate";
import authValidation from "./../auth/auth.validation";

const router = express.Router();

/**
 * @swagger
 * definitions:
 *   signIn:
 *     required:
 *       - password
 *       - provider
 *     properties:
 *       userNameEmail:
 *         type: string
 *         example: text@mailinator.com/text123
 *       password:
 *         type: string
 *         example: Test@123
 *       provider:
 *         type: string
 *         example: google/facebook/apple
 */

/**
 * @swagger
 *
 * /auth/signIn:
 *   post:
 *     tags:
 *       - "auth"
 *     description: user signIn
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: user signIn.
 *         in: body
 *         schema:
 *           $ref: "#/definitions/signIn"
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: user signIn.
 */
router.post(
  "/auth/signIn",
  validate(authValidation.signIn),
  authController.signIn
);

/**
 * @swagger
 * definitions:
 *   signUp:
 *     required:
 *       - email
 *       - password
 *       - firstName
 *       - lastName
 *       - userName
 *       - socialLogin
 *       - phone
 *     properties:
 *       email:
 *         type: string
 *         example: text@mailinator.com
 *       password:
 *         type: string
 *         example: Test@123
 *       firstName:
 *         type: string
 *         example: joi
 *       lastName:
 *         type: String
 *         example: martin
 *       userName:
 *         type: string
 *         example: joi_martin
 *       socialLogin:
 *         type: boolean
 *         example: false
 *       birthDate:
 *         type: string
 *         example: Thu Mar 30 2023 11:01:33 GMT+0530
 *       phone:
 *         type: object
 *         example: {number: "1234567890", countryCode: "+1"}
 */

/**
 * @swagger
 *
 * /auth/signUp:
 *   post:
 *     tags:
 *       - "auth"
 *     description: user signUp
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: user signUp.
 *         in: body
 *         schema:
 *           $ref: "#/definitions/signUp"
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: user signUp.
 */
router.post(
  "/auth/signUp",
  validate(authValidation.signUp),
  authController.signUp
);

/**
 * @swagger
 * definitions:
 *   forgotPassword:
 *     required:
 *       - email
 *     properties:
 *       email:
 *         type: string
 *         example: text@mailinator.com
 */

/**
 * @swagger
 *
 * /auth/forgotPassword:
 *   post:
 *     tags:
 *       - "auth"
 *     description: user forgot password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: user forgot password.
 *         in: body
 *         schema:
 *           $ref: "#/definitions/forgotPassword"
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: user forgot password.
 */
router.post(
  "/auth/forgotPassword",
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);

/**
 * @swagger
 * definitions:
 *   resetPassword:
 *     required:
 *       - id
 *       - password
 *     properties:
 *       id:
 *         type: string
 *         example: lwjehdwuawdjjsa
 *       password:
 *         type: string
 *         example: Text@124
 */

/**
 * @swagger
 *
 * /auth/resetPassword:
 *   post:
 *     tags:
 *       - "auth"
 *     description: user reset password
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         description: user reset password.
 *         in: body
 *         schema:
 *           $ref: "#/definitions/resetPassword"
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: user reset password.
 */
router.post(
  "/auth/resetPassword",
  validate(authValidation.resetPassword),
  authController.resetPassword
);

router.post("/auth/checkBirthDate", authController.checkBirthDate);

router.post("/auth/userDelete", authController.userDelete);

export = router;
