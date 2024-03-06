//upload  mp3
/**
 * @swagger
 * components:
 *   schemas:
 *     UploadMp3:
 *       type: object
 *       properties:
 *         mp3:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *     SuccessUploadMusic:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           format: url
 *           example: http://localhost:8081/mp3s/TroubleIsAFriendsRemixV2.mp3
 */

//get a mp3
/**
 * @swagger
 * components:
 *   schemas:
 *     SuccessGetMusic:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: get a music success
 *         ouput:
 *           type: object
 *           properties:
 *             music_name:
 *               type: string
 *               example: TroubleIsAFriendsRemixV2
 */
