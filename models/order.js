const {Schema, model} = require('mongoose');

/**
 * Заказ
 * @typedef {Object} Order
 * @property {Array} courses - Добавленные курсы
 * @property {Object} user - Пользователеть-владелец
 * @property {Date} date - Дата создания заказа
 */
const orderSchema = new Schema({
    courses: [
        {
            course: {
                type: Object,
                required: true
            },
            current: {
                type: Number,
                required: true
            }
        }
    ],
    user:{
        name: String,
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = model("Order", orderSchema);