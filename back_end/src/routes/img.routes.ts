import { AccessValidator, CheckVerifyEmail } from './../middleware/users.middleware'
import { Router } from 'express'
import { getImgController, uploadImgController } from '~/controllers/img.controller'
import { handlerEror } from '~/utils/handleError'

const imgRouter = Router()
/**
 * @swagger
 * /img/upload_img:
 *   post:
 *     tags:
 *       - img
 *     summary: up load img a user
 *     description: tải lên một ảnh
 *     operationId: tải lên ảnh
 *     security:
 *      - BearerAuth: []
 *     requestBody:
 *       description: up load img a user
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UploadImg'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessUploadImg'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */

imgRouter.post('/upload_img', AccessValidator, CheckVerifyEmail as any, handlerEror(uploadImgController))

/**
 * @swagger
 * /img/get_imgs/{name}:
 *   get:
 *     tags:
 *       - img
 *     summary: Get img a user
 *     description: Lấy một ảnh
 *     operationId: Lấy một ảnh
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
 *               $ref: '#/components/schemas/SuccessGetImg'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
imgRouter.get('/get_imgs/:name', AccessValidator, handlerEror(getImgController))

export default imgRouter
