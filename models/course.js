const {Schema, model} = require('mongoose')
/**
 * Курс, создаваемый пользователем
 * @typedef {Object} Course
 * @property {string} title - Название курса
 * @property {number} price - Цена курса
 * @property {string} img - Главное изображение курса
 * @property {ObjectId} userId - Создатель курса
 */
const course = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }

})

module.exports = model('Course', course)