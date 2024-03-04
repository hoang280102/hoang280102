import { Router } from 'express'
import {
  ChangePasswordController,
  ChangeUserController,
  FollowUserController,
  UnFollowUserController,
  forgotPasswordUsersController,
  getMeController,
  loginUsersController,
  logoutUsersController,
  registerUsersController,
  resendVerifyEmailUsersController,
  resetforgotPasswordUsersController,
  verifyEmailUsersController
} from '~/controllers/users.controller'

import {
  AccessValidator,
  ChangePasswordValidator,
  ChangeUserValidator,
  CheckVerifyEmail,
  FollowUserValidator,
  ForgotPasswordValidator,
  LoginValidator,
  RefreshValidator,
  RegisterValidator,
  ResetForgotPasswordValidator,
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
 *               $ref: '#/components/schemas/SuccessLoginUser'
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
 *               $ref: '#/components/schemas/SuccessLogoutUser'
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
 *         content:
 *           application/json:
 *             schema:

 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
userRouter.post('/resend_verify_email', AccessValidator, handlerEror(resendVerifyEmailUsersController))

/**
 * @swagger
 * /users/forgot_password:
 *   post:
 *     tags:
 *       - users
 *     summary: forgot_password a user
 *     description: Gửi link token để check mật khẩu người dùng thông thường
 *     operationId: Quên mật khẩu người dùng

 *     requestBody:
 *       description: forgot password a user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPasswordUser'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessForgotPasswordUser'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
userRouter.post('/forgot_password', ForgotPasswordValidator, handlerEror(forgotPasswordUsersController))

/**
 * @swagger
 * /users/reset_forgot_password:
 *   post:
 *     tags:
 *       - users
 *     summary: reset_forgot_password a user
 *     description: điền lại mật khẩu người dùng thông thường
 *     operationId: điền lại mật khẩu người dùng
 *     requestBody:
 *       description: reset_forgot_password a user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetForgotPasswordUser'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessResetPasswordUser'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */

userRouter.post('/reset_forgot_password', ResetForgotPasswordValidator, handlerEror(resetforgotPasswordUsersController))

/**
 * @swagger
 * /users/get_me:
 *   get:
 *     tags:
 *       - users
 *     summary: get_me a user
 *     description: lấy thông tin người dùng thông thường
 *     operationId: lấy thông tin người dùng
 *     security:
 *      - BearerAuth: []
 *     requestBody:
 *       description: get_me a user
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetMe'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
userRouter.get('/get_me', AccessValidator, handlerEror(getMeController))

/**
 * @swagger
 * /users/change_password:
 *   put:
 *     tags:
 *       - users
 *     summary: Change password a user
 *     description: Thay đổi mật khẩu người dùng
 *     operationId: Thay đổi mật khẩu người dùng
 *     security:
 *      - BearerAuth: []
 *     requestBody:
 *       description: Change password a user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordUser'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessChangePasswordUser'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
userRouter.put(
  '/change_password',
  AccessValidator,
  CheckVerifyEmail as any,
  ChangePasswordValidator,
  handlerEror(ChangePasswordController)
)

/**
 * @swagger
 * /users/change_infor_user:
 *   patch:
 *     tags:
 *       - users
 *     summary: Change infor user a user
 *     description: Thay đổi thông tin người dùng
 *     operationId: Thay đổi thông tin người dùng
 *     security:
 *      - BearerAuth: []
 *     requestBody:
 *       description: change infor user a user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangeInforUser'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessChangeInforUser'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
userRouter.patch(
  '/change_infor_user',
  AccessValidator,
  CheckVerifyEmail as any,
  ChangeUserValidator,
  handlerEror(ChangeUserController)
)

/**
 * @swagger
 * /users/follower:
 *   post:
 *     tags:
 *       - users
 *     summary: Follower a user
 *     description: Theo dõi người dùng
 *     operationId: Theo dõi người dùng
 *     security:
 *      - BearerAuth: []
 *     requestBody:
 *       description: follower a user
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FollowerUser'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessFollowerUser'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
userRouter.post(
  '/follower',
  AccessValidator,
  CheckVerifyEmail as any,
  FollowUserValidator,
  handlerEror(FollowUserController)
)

/**
 * @swagger
 * /users/unfollower/{id}:
 *   delete:
 *     tags:
 *       - users
 *     summary: UnFollower a user
 *     description: Bỏ Theo dõi người dùng
 *     operationId: Bỏ Theo dõi người dùng
 *     parameters:
 *      - name: id
 *        in: path
 *        description: Id need used
 *        required: true
 *        schema:
 *          type: string
 *          items:
 *            type: string
 *     security:
 *      - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessUnFollowerUser'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
userRouter.delete('/unfollower/:id', AccessValidator, CheckVerifyEmail as any, handlerEror(UnFollowUserController))
export default userRouter
