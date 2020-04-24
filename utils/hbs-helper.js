/**
 *  Добавления обработчика сравнения чисел в handlebars
 */

module.exports = {
    ifeq(a, b, options){
        if (a == b) {
            return options.fn(this);
        }
        return options.inverse(this);
    }
}