/**
 * Эскпортируемый объект со всеми основными константами для более удобного управления проектом.
 * @property {string} MONGO_URI - URI для установления соединения с БД.
 * @property {string} SESSION_SECRET - Секретный ключ для хеширования сеанса.
 * @property {string} SENDGRID_API_KEY - API ключ для сервиса отправки электронной почты.
 * @property {string} EMAIL_FROM - Указание email адреса, с которого осуществляется отправление писем.
 * @property {string} BASE_URL - Адрес сайта, необходимо изменить при продакшене.
 */

module.exports = {
    MONGO_URI: process.env.MONGODB_URI,
    SESSION_SECRET: process.env.SESSION_SECRET,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    BASE_URL: process.env.BASE_URL
}