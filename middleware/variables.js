//занести ифформацию о аунтефикации в локальную
module.exports =  function(req, res, next) {
    res.locals.isAuth = req.session.isAuthenticated;
    next()
}