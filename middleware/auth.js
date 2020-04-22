/**
 * Промежуточный обработчик, для защиты роутов от неавторизованных пользователей
 */

module.exports = function(req, res, next) {
    if (!req.session.isAuthenticated) {
        return res.redirect('/auth/login')
    }
    next();
}