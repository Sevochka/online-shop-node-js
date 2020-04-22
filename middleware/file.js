const multer = require("multer");

/**
 * @param {object} storage - Объект, содержащий информацию о расположении файлов и так же о системе наименования
 */
const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "images");
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    },
});

/**
 * @param {array} allowedTypes - Разрешенный типы для загрузки
 */
const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];

/**
 * @param {function} fileFilter - Функция для фильтрации допустимых файлов
 */
const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

/**
 * Промежуточный обработчик для работы с загружаемыми изображениями.
 */
module.exports = multer({
    storage,
    fileFilter
});
