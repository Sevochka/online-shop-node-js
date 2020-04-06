//Функция, чтобы защищать роуты от неавторизированных пользователей

module.exports = function(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/login')
    }
    next();
}