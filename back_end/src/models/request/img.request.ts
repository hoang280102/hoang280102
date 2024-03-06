//upload  mp3
/**
 * @swagger
 * components:
 *   schemas:
 *     UploadImg:
 *       type: object
 *       properties:
 *         img:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *     SuccessUploadImg:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           format: url
 *           example: http://localhost:8081/img/hehe.jpg
 */

//get a img
/**
 * @swagger
 * components:
 *   schemas:
 *     SuccessGetImg:
 *       type: object
 *       properties:
 *         message:
 *           type: string
 *           example: get a img success
 *         ouput:
 *           type: object
 *           properties:
 *             music_name:
 *               type: string
 *               example: hehe
 */
