import { Router } from 'express'
import {
  loginUsersController,
  logoutUsersController,
  registerUsersController,
  resendVerifyEmailUsersController,
  verifyEmailUsersController
} from '~/controllers/users.controller'
import {
  AccessValidator,
  LoginValidator,
  RefreshValidator,
  RegisterValidator,
  VerifyEmailValidator
} from '~/middleware/users.middleware'
import { handlerEror } from '~/utils/handleError'
const userRouter = Router()

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - users
 *     summary: Register a user
 *     description: Đăng ký người dùng thông thường
 *     operationId: đăng ký người dùng
 *     requestBody:
 *       description: register a user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUser'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessUser'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
userRouter.post('/register', RegisterValidator, handlerEror(registerUsersController))

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags:
 *       - users
 *     summary: Login a user
 *     description: Đăng nhập người dùng thông thường
 *     operationId: đăng nhập người dùng
 *     requestBody:
 *       description: login a user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginUser'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessUser'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
userRouter.post('/login', LoginValidator, handlerEror(loginUsersController))

/**
 * @swagger
 * /users/logout:
 *   post:
 *     tags:
 *       - users
 *     summary: Logout a user
 *     description: Đăng xuất người dùng thông thường
 *     operationId: đăng xuất người dùng
 *     security:
 *      - BearerAuth: []
 *     requestBody:
 *       description: logout a user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LogoutUser'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessUser'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
userRouter.post('/logout', AccessValidator, RefreshValidator, handlerEror(logoutUsersController))

/**
 * @swagger
 * /users/very_email:
 *   post:
 *     tags:
 *       - users
 *     summary: very_email a user
 *     description: very_email người dùng thông thường
 *     operationId: very_email người dùng
 *     requestBody:
 *       description: very_email a user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VeryEmailtUser'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessVeryEmailtUser'
 *       '400':
 *         description: Invalid value
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
userRouter.post('/very_email', VerifyEmailValidator, handlerEror(verifyEmailUsersController))

/**
 * @swagger
 * /users/resend_verify_email:
 *   post:
 *     tags:
 *       - users
 *     summary: Resend verify email a user
 *     description: Gửi lại token verify email người dùng thông thường
 *     operationId: Gửi lại token verify email người dùng
 *     security:
 *      - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
userRouter.post('/resend_verify_email', AccessValidator, handlerEror(resendVerifyEmailUsersController))
export default userRouter
