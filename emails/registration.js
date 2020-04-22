const keys = require('../keys')
/**
 * Возвращает объект-конфигурации для отправки email об успешной регистрации.
 * @param {string} to - Электронный адрес назначения.
 * @return {object} - Готовая для использования конфигурация для SendMail.
 */
module.exports = function (to) {
    return {
        to,
        from: keys.EMAIL_FROM,
        subject: "Аккаунт создан",
        html: `
            <h1>Добро подаловать в наш магазин</h1>
            <p>Вы успешно создали аккаунт с email - ${to}</p>
            <hr/>
            <a href="${keys.BASE_URL}">Магазин курсов</a>
        `,
    };
};
