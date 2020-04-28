const {Schema, model} = require('mongoose')

/**
 * Заказ
 * @typedef {Object} User 
 * @property {String} email - Электронная почта, пользователя
 * @property {String} name - Имя
 * @property {String} password - Пароль
 * @property {String} avatarUrl - Аватарка
 * @property {String} resetToken - Внутренний токен для восстановления пароля
 * @property {Date} resetTokenExp - Дата, когда токен перестает работать
 * @property {Object} cart - Корзина пользователя
*/

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: String,
    resetToken: String,
    resetTokenExp: Date,
    cart: {
        items: [
            {
                current:{
                    type: Number,
                    required: true,
                    default: 1  
                },
                courseId: {
                    type: Schema.Types.ObjectId,
                    ref: 'Course',
                    required: true 
                }
            }
        ]
    }
})

/**
 * Метод добавления курса в корзину
 * @param {Object} Course - Курс
 */
userSchema.methods.addToCart = function(course) {
    const items = [...this.cart.items];
    const index = items.findIndex(c => {
        return c.courseId.toString() === course.id.toString()
    })
    
    if (index === -1) {
        items.push({
            courseId: course._id,
            count: 1
        })
    } else {
        items[index].current += 1;
    }

    const cart = {items}
    this.cart = cart
    return this.save()
}
/**
 * Метод удаления товара из корзины
 * @param {Number} id - Уникальный идентификатор курса
 */
userSchema.methods.removeFromCart = function(id) {
    
    let items = [...this.cart.items];
    //console.log(items);
    
    const idx = items.findIndex(c => {
        return c.courseId.toString() === id.toString();
    })

    if (items[idx].current === 1) {
        //items = items.splice(idx, 1)
        items = items.filter(c => c.courseId.toString() !== id.toString())
    } else {
        items[idx].current--;
    }
    
    this.cart = {items}
    return this.save()
}
/**
 * Метод очистки корзины
 */
userSchema.methods.clearCart = function(){
    this.cart.items = [];
    return this.save();
}

module.exports = model('User', userSchema)