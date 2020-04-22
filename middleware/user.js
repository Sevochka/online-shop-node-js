const User = require('../models/user')

/**
 * Превращение session.user в модель user mongodb, чтобы populate можно было делать
 */
module.exports = async function(req, res, next) {
    //Если нет пользователя, то вернуться
    if (!req.session.user) {
        return next()
    }

    req.user = await User.findById(req.session.user._id);
    next()
}