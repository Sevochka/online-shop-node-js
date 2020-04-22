const keys = require('../keys')
/**
 * Возвращает объект-конфигурации для отправки email при восстановлении пароля
 * @param {string} to - Электронный адрес назначения.
 * @param {string} token - Заранее созданный resetToken, по которому происходит восстановление пароля.
 * @return {object} - Готовая для использования конфигурация для SendMail.
 */

module.exports = function (to, token) {
    return {
        to,
        from: keys.EMAIL_FROM,
        subject: "Восстановление доступа",
        html: `
            <h1>Вы забыли пароль</h1>
            <p>если нет, то проигнорируйте данное письмо</p>
            <p>Иначе нажмите на ссылку ниже</p>
            <p><a href="${keys.BASE_URL}/auth/password/${token}">Восстановить доступ</a></p>
            <hr/>
            <a href="${keys.BASE_URL}">Магазин курсов</a>
        `,
    };
};