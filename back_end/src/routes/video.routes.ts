import { Router } from 'express'
import { getVideoController, uploadVideoController } from '~/controllers/video.controller'
import { AccessValidator, CheckVerifyEmail } from '~/middleware/users.middleware'
import { handlerEror } from '~/utils/handleError'
const videoRouter = Router()

/**
 * @swagger
 * /video/upload_video:
 *   post:
 *     tags:
 *       - video
 *     summary: up load video a user
 *     description: tải lên một video
 *     operationId: tải lên video
 *     security:
 *      - BearerAuth: []
 *     requestBody:
 *       description: up load video a user
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UploadVideo'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessUploadVideo'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */

videoRouter.post('/upload_video', AccessValidator, CheckVerifyEmail as any, handlerEror(uploadVideoController))

/**
 * @swagger
 * /video/get_videos/{name}:
 *   get:
 *     tags:
 *       - video
 *     summary: Get video a user
 *     description: Lấy một video
 *     operationId: Lấy một video
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
 *               $ref: '#/components/schemas/SuccessGetVideo'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
videoRouter.get('/get_videos/:name', AccessValidator, handlerEror(getVideoController))

export default videoRouter
