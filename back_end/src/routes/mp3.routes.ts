import { Router } from 'express'
import { getMp3Controller, uploadmp3Controller } from '~/controllers/mp3.controller'
import { AccessValidator, CheckVerifyEmail } from '~/middleware/users.middleware'
import { handlerEror } from '~/utils/handleError'
const mp3Router = Router()

/**
 * @swagger
 * /mp3/upload_mp3:
 *   post:
 *     tags:
 *       - mp3
 *     summary: up load mp3 a user
 *     description: tải lên một bài hát
 *     operationId: tải lên bài hát
 *     security:
 *      - BearerAuth: []
 *     requestBody:
 *       description: up load mp3 a user
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/UploadMp3'
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessUploadMusic'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */

mp3Router.post('/upload_mp3', AccessValidator, CheckVerifyEmail as any, handlerEror(uploadmp3Controller))

/**
 * @swagger
 * /mp3/get_mp3s/{name}:
 *   get:
 *     tags:
 *       - mp3
 *     summary: Get mp3 a user
 *     description: Lấy một bài hát
 *     operationId: Lấy một bài hát
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
 *               $ref: '#/components/schemas/SuccessGetMusic'
 *       '400':
 *         description: Invalid ID supplied
 *       '404':
 *         description: User not found
 *       '422':
 *         description: Validation exception
 */
mp3Router.get('/get_mp3s/:name', AccessValidator, handlerEror(getMp3Controller))

export default mp3Router
