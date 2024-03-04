import { JwtPayload } from 'jsonwebtoken'
import { AuthorizedUserStatus, UserVerifyStatus } from '~/constants/enum'
export interface TokenPayLoad extends JwtPayload {
  user_id: string
  verify: UserVerifyStatus
  authorized_user: AuthorizedUserStatus
  iat: number
  exp: number
}

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: admin1
 *         email:
 *           type: string
 *           example: admin@example.com
 *         password:
 *           type: string
 *           example: Admin123@
 *         confirm_password:
 *           type: string
 *           example: Admin123@
 *     SuccessUser:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: register success
 *         result:
 *           type: object
 *           properties:
 *             access_token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjViMTM1OTYzYjRmNDMwMzY5YmI3NWU2IiwidG9rZW5fdHlwZSI6MCwidmVyaWZ5IjoxLCJpYXQiOjE3MDg0NDIxMDUsImV4cCI6MTcwODUyODUwNX0.9gD2gsR7sw_wB_gTYnu0j1W1dlsqe_CcwsLlN-2wDMY
 *             refresh_token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjViMTM1OTYzYjRmNDMwMzY5YmI3NWU2IiwidG9rZW5fdHlwZSI6MSwidmVyaWZ5IjoxLCJpYXQiOjE3MDg0NDIxMDUsImV4cCI6MTcwOTA0NjkwNX0.YBaE4Jh1gIgxEDJNi-kU06JjuT0gskf4ucNZKdi69TU
 */
export interface ReqBodyRegister {
  name: string
  email: string
  password: string
  confirm_password: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: admin@example.com
 *         password:
 *           type: string
 *           example: Admin123@
 *     SuccessLoginUser:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Login success
 *         result:
 *           type: object
 *           properties:
 *             access_token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjViMTM1OTYzYjRmNDMwMzY5YmI3NWU2IiwidG9rZW5fdHlwZSI6MCwidmVyaWZ5IjoxLCJpYXQiOjE3MDg0NDIxMDUsImV4cCI6MTcwODUyODUwNX0.9gD2gsR7sw_wB_gTYnu0j1W1dlsqe_CcwsLlN-2wDMY
 *             refresh_token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjViMTM1OTYzYjRmNDMwMzY5YmI3NWU2IiwidG9rZW5fdHlwZSI6MSwidmVyaWZ5IjoxLCJpYXQiOjE3MDg0NDIxMDUsImV4cCI6MTcwOTA0NjkwNX0.YBaE4Jh1gIgxEDJNi-kU06JjuT0gskf4ucNZKdi69TU
 */
export interface ReqBodyLogin {
  email: string
  password: string
}
/**
 * @swagger
 * components:
 *   schemas:
 *     LogoutUser:
 *       type: object
 *       properties:
 *         refresh_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjViMTM1OTYzYjRmNDMwMzY5YmI3NWU2IiwidG9rZW5fdHlwZSI6MSwidmVyaWZ5IjoxLCJpYXQiOjE3MDg0NDIxMDUsImV4cCI6MTcwOTA0NjkwNX0.YBaE4Jh1gIgxEDJNi-kU06JjuT0gskf4ucNZKdi69TU
 *     SuccessLogoutUser:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Logout success
 *         result:
 *           type: object
 *           example: Logout success
 */
export interface ReqBodyLogout {
  refresh_token: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     VeryEmailtUser:
 *       type: object
 *       properties:
 *         verify_email_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjVkY2IyODI5MzQ2ZWM5NWE0OTE0ZTZkIiwidmVyaWZ5IjowLCJhdXRob3JpemVkX3VzZXIiOjAsImlhdCI6MTcwODk2MjQzNCwiZXhwIjoxNzA5NTY3MjM0fQ.kzOcorJWHbkz6ySFuxByrnHMCDWVWlwPzAC2E6hkN6k
 *     SuccessVeryEmailtUser:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: email is verify
 */
export interface ReqBodyVerifyEmail {
  verify_email_token: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ForgotPasswordUser:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: admin@example.com
 *     SuccessForgotPasswordUser:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: forgot password successfully
 *         result:
 *           type: object
 *           properties:
 *             access_token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjViMTM1OTYzYjRmNDMwMzY5YmI3NWU2IiwidG9rZW5fdHlwZSI6MCwidmVyaWZ5IjoxLCJpYXQiOjE3MDg0NDIxMDUsImV4cCI6MTcwODUyODUwNX0.9gD2gsR7sw_wB_gTYnu0j1W1dlsqe_CcwsLlN-2wDMY
 *             refresh_token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjViMTM1OTYzYjRmNDMwMzY5YmI3NWU2IiwidG9rZW5fdHlwZSI6MSwidmVyaWZ5IjoxLCJpYXQiOjE3MDg0NDIxMDUsImV4cCI6MTcwOTA0NjkwNX0.YBaE4Jh1gIgxEDJNi-kU06JjuT0gskf4ucNZKdi69TU
 */
export interface ReqBodyForgotPassword {
  email: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ResetForgotPasswordUser:
 *       type: object
 *       properties:
 *         forgot_password_token:
 *           type: string
 *           example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjVkY2E4NTdmMTM1MWEwY2M3NjQ5MTlhIiwidmVyaWZ5Ijp7IjAiOiJVbnZlcmlmaWVkIiwiMSI6IlZlcmlmaWVkIiwiMiI6IkJhbm5lZCIsIlVudmVyaWZpZWQiOjAsIlZlcmlmaWVkIjoxLCJCYW5uZWQiOjJ9LCJhdXRob3JpemVkX3VzZXIiOnsiMCI6IlVzZXJzIiwiMSI6IkFkbWluIiwiMiI6IlByb2R1Y2VyIiwiVXNlcnMiOjAsIkFkbWluIjoxLCJQcm9kdWNlciI6Mn0sImlhdCI6MTcwOTA4OTE2NiwiZXhwIjoxNzA5NjkzOTY2fQ.oy7gGTsM8A8hATBsQ4EVQUDP1FhQXRD8N2nM8Cttk5g
 *         password:
 *           type: string
 *           example: Admin123@
 *         confirm_password:
 *           type: string
 *           example: Admin123@
 *     SuccessResetPasswordUser:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: reset forgot password successfully
 *         result:
 *           type: object
 *           properties:
 *             access_token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjViMTM1OTYzYjRmNDMwMzY5YmI3NWU2IiwidG9rZW5fdHlwZSI6MCwidmVyaWZ5IjoxLCJpYXQiOjE3MDg0NDIxMDUsImV4cCI6MTcwODUyODUwNX0.9gD2gsR7sw_wB_gTYnu0j1W1dlsqe_CcwsLlN-2wDMY
 *             refresh_token:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjViMTM1OTYzYjRmNDMwMzY5YmI3NWU2IiwidG9rZW5fdHlwZSI6MSwidmVyaWZ5IjoxLCJpYXQiOjE3MDg0NDIxMDUsImV4cCI6MTcwOTA0NjkwNX0.YBaE4Jh1gIgxEDJNi-kU06JjuT0gskf4ucNZKdi69TU
 */
export interface ReqBodyResetForgotPassword {
  forgot_password_token: string
  password: string
  confirm_password: string
}

//get me
/**
 * @swagger
 * components:
 *   schemas:
 *     GetMe:
 *      type: object
 *      properties:
 *        message:
 *          type: string
 *          example: get me success
 *        result:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: admin
 *             email:
 *               type: string
 *               example: admin@gmail.com
 *             authorized_user:
 *               type: number
 *               example: 0
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ChangePasswordUser:
 *       type: object
 *       properties:
 *         old_password:
 *           type: string
 *           example: Hoang!123
 *         password:
 *           type: string
 *           example: Hoang123@
 *         confirm_password:
 *           type: string
 *           example: Hoang123@
 *     SuccessChangePasswordUser:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: change password success
 *         result:
 *           type: object
 *           example: true
 */
export interface ReqBodyChangPassword {
  old_password: string
  password: string
  confirm_password: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     ChangeInforUser:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Hoang cute
 *     SuccessChangeInforUser:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: Change user success
 *         result:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               example: Hoang cute
 *             email:
 *               type: string
 *               example: ngaovc123@gmail.com
 *             create_at:
 *               type: string
 *               example: 2024-02-26T15:03:51.694Z
 *             update_at:
 *               type: string
 *               example: 2024-02-26T15:03:51.694Z
 *             verify:
 *               type: string
 *               example: 1
 *             authorized_user:
 *               type: string
 *               example: 0
 */
export interface ReqBodyChangeUser {
  name: string
}

/**
 * @swagger
 * components:
 *   schemas:
 *     FollowerUser:
 *       type: object
 *       properties:
 *         user_id_followed:
 *           type: string
 *           example: 65dcb2829346ec95a4914e6d
 *     SuccessFollowerUser:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: follow user successfully
 *         result:
 *           type: object
 *           example: true
 */
export interface ReqBodyFollowUser {
  user_id_followed: string
}

//unfollow
/**
 * @swagger
 * components:
 *   schemas:
 *     SuccessUnFollowerUser:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: unfollow user unsuccessfully
 *         result:
 *           type: object
 *           example: true
 */
