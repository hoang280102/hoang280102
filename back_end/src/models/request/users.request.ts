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
 *     SuccessUser:
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
 *     SuccessUser:
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
