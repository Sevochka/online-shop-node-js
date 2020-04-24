const { body } = require("express-validator");
const User = require("../models/user");
/**
 * Валидация полей регистрации
 */
exports.registerValidators = [
    body("email")
        .isEmail()
        .withMessage("Введите корректный email")
        .custom(async (value, { req }) => {
            try {
                const user = await User.findOne({ email: value });
                if (user) {
                    return Promise.reject("Такой email уже занят");
                }
            } catch (error) {
                throw error;
            }
        })
        .normalizeEmail(),
    body("password", "Пароль должен быть минимум 6 символов")
        .isLength({ min: 6, max: 56 })
        .trim(),
    body("confirm")
        .custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Пароли должны совпадать");
        }
        return true;
    })
    .trim(),
    body("name")
        .isLength({ min: 3 })
        .withMessage("Имя должно быть минимум 3 символа")
        .trim(),
];
/**
 * Валидация полей курсов
 */
exports.courseValidators = [
    body('title').isLength({min: 3}).withMessage('Минимальная длина названия 3 символа').trim(),
    body('title').isLength({min: 15}).withMessage('Максимальная длина названия 50 символов').trim(),
    body('price').isNumeric().withMessage('Введите корректную цену'),
    body('img', 'Введите корректный url').isURL()
]