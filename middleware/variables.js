/**
 * Занести информацию о аунтефикации в локальное хранилище
 */
module.exports =  function(req, res, next) {
    res.locals.isAuth = req.session.isAuthenticated;
    res.locals.csrfToken = req.csrfToken();
    next()
}