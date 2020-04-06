const express = require("express");
const app = express();
var exphbs = require("express-handlebars");
var path = require("path");
const mongoose = require("mongoose");
const User = require('./models/user');
const session = require("express-session");
const varMiddleware = require("./middleware/variables")
const MongoStore = require('connect-mongodb-session')(session)
//Routes
const homeRoutes = require("./routes/home");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const cartRoutes = require("./routes/cart");
const ordersRoutes = require("./routes/orders");
const authRoutes = require('./routes/auth');

//Непонятный код со стак оферфлоу, который каким-то чудесным образом
//решил проблему
//--todo - разобраться потом что происходит
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

//MongoDB data
//--Не забыть, что аксес к базе через мой домашнйи айпи!
const password = "ArNCYAJJdUkzLVMo";
const uri = `mongodb+srv://sevka:${password}@cluster0-e6cu6.mongodb.net/shop`;

const store = new MongoStore({
    collection: 'sessions',
    uri
})

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs",
    handlebars: allowInsecurePrototypeAccess(Handlebars)
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

//ненужный мидлвеар

// app.use(async (req, res, next) => {
//     try {
//         const user = await User.findById('5e8336162ef2323f04a798ce')
//         req.user = user
//         next()
//     } catch (error) {
//         throw error
//     }
// });

//Настройка сессий
app.use(session({
    secret:'hello, world',
    resave: false,
    saveUninitialized: false, 
    store
}));
app.use(varMiddleware);

//Объявить папку public статичной
app.use(express.static(path.join(__dirname, "public")));
//Получить req.body
app.use(express.urlencoded({ extended: true }));
//Добавляем роуты
app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/add", addRoutes);
app.use("/cart", cartRoutes);
app.use("/orders", ordersRoutes);
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000;


//Исправляет ошибку при edit курса
//DOCS: 'useFindAndModify': true by default. 
//Set to false to make findOneAndUpdate() and findOneAndRemove() 
//use native findOneAndUpdate() rather than findAndModify()
mongoose.set('useFindAndModify', false);

//Самовызывающайся асинк функция для работы с промисами
(async function start() {
    try {
        await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        
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

