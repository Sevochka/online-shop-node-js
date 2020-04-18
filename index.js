const express = require("express");
const app = express();
var exphbs = require("express-handlebars");
var path = require("path");
const mongoose = require("mongoose");
const csrf = require('csurf');
const flash = require('connect-flash');
const session = require("express-session");
//Middlewares
const varMiddleware = require("./middleware/variables");
const userMiddleware = require("./middleware/user");
const errorHandler = require('./middleware/error')//404
//MongoDB
const MongoStore = require('connect-mongodb-session')(session);
const keys = require("./keys");
//Routes
const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

//Непонятный код со стак оферфлоу, который каким-то чудесным образом
//решил проблему
//--todo - разобраться потом что происходит
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

//MongoDB data
//--Не забыть, что аксес к базе через мой домашнйи айпи!


const store = new MongoStore({
    collection: 'sessions',
    uri: keys.MONGO_URI
})

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: require('./utils/hbs-helper')
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");
//Объявить папку public статичной
app.use(express.static(path.join(__dirname, "public")));
//Получить req.body
app.use(express.urlencoded({ extended: true }));
//Настройка сессий
app.use(session({
    secret: keys.SESSION_SECRET,
    resave: false,
    saveUninitialized: false, 
    store
}));
//Защита сессий
app.use(csrf());
//
app.use(flash());
//midlewares
app.use(varMiddleware);
app.use(userMiddleware);
//Добавляем роуты
app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

app.use(errorHandler)
const PORT = process.env.PORT || 3000;


//Исправляет ошибку при edit курса
//DOCS: 'useFindAndModify': true by default. 
//Set to false to make findOneAndUpdate() and findOneAndRemove() 
//use native findOneAndUpdate() rather than findAndModify()
mongoose.set('useFindAndModify', false);

//Самовызывающайся асинк функция для работы с промисами
(async function start() {
    try {
        await mongoose.connect(keys.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        
        //ненжуно ибо сессия все решает 

        // const candidate = await User.findOne();
        // if (!candidate) {
        //     const user = new User({
        //         email: 'test',
        //         name: 'Seva',
        //         cart: {items: []}
        //     })
        //     await user.save()
        // }

        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        throw error;
    }
})();

