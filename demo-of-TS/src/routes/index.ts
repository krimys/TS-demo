import express from 'express';
import authController from '../auth/auth.controller';
import validate from '../middlewares/validate';
import authValidation from '../auth/auth.validation';
// import multer from 'multer';
// import CloudinaryStorage from 'multer-storage-cloudinary';
const multer = require('multer');
var storage = multer.diskStorage({});
var upload = multer({ storage: storage });

const router = express.Router();

router.post('/auth/register', validate(authValidation.register), authController.register);
router.patch(
  '/auth/userUpdate/:id',
  upload.single('file'),
  validate(authValidation.userUpdate),
  authController.updateUser
);
router.get('/auth/getAllUser', authController.getAllUser);
router.get('/auth/getUser/:id', authController.getUser);
router.patch('/auth/userDetailEduUpdate/:id', authController.userDetailUpdate);
router.patch('/auth/userDetailExpUpdate/:id', authController.userDetailExpUpdate);

export = router;
