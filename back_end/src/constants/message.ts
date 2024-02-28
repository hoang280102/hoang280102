export const message = {
  NOT_EMPTY: 'not empty',
  NAME_LENGTH: 'Name must be at least 6 characters and not more than 30 characters',
  STRING: 'must string',
  IS_EMAIL: 'must email address',
  IS_STRONG_PASSWORD:
    'password must be at 1 uppercase character, 1 lowercase character, 1 sysbol character,1 number character',
  IS_STRONG_CONFIRM_PASSWORD:
    'confirm password must be at 1 uppercase character, 1 lowercase character, 1 sysbol character,1 number character',
  EMAIL_IS_EXIST: 'email is exist',
  PASSWORD_DIFFERENT_CONFIRM_PASSWORD: 'password is different confirm password',
  REGISTER_SUCCESS: 'register success',
  LOGIN_SUCCESS: 'login success',
  EMAIL_IS_NOT_EXIST: 'email is not exist',
  PASSWORD_IS_WRONG: 'password is wrong',
  NOT_EXIST_ACCESS_TOKEN: 'not exist access token',
  LOGOUT_SUCCESS: 'logout success',
  EMAIL_IS_VERIFED: 'email is verify',
  USER_NOT_FOUND: 'user not found',
  RESEND_VERIFY_EMAIL_USERS: 'resend verify email users',
  EMAIL_NOT_VERIFIED: 'email is not verified',
  FORGOT_PASSWORD_SUCCESS: 'forgot password successfully',
  RESET_FORGOT_PASSWORD_SUCCESS: 'reset forgot password successfully',
  PASSWROD_IS_USED_BEFORE: 'password is used before',
  PASSWORD_NEW_SAME_PASSWORD_OLD: 'password new same password old'
} as const
