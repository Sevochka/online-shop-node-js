const password = "ArNCYAJJdUkzLVMo";
/**
 * Эскпортируемый объект со всеми основными константами для более удобного управления проектом.
 * @property {string} MONGO_URI - URI для установления соединения с БД.
 * @property {string} SESSION_SECRET - Секретный ключ для хеширования сеанса.
 * @property {string} SENDGRID_API_KEY - API ключ для сервиса отправки электронной почты.
 * @property {string} EMAIL_FROM - Указание email адреса, с которого осуществляется отправление писем.
 * @property {string} BASE_URL - Адрес сайта, необходимо изменить при продакшене.
 */

module.exports = {
    MONGO_URI:`mongodb+srv://sevka:${password}@cluster0-e6cu6.mongodb.net/shop`,
    SESSION_SECRET: 'hello, world',
    SENDGRID_API_KEY: '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',
    EMAIL_FROM: "sevkaplay@gmail.com",
    BASE_URL: 'http://localhost:3000'
}