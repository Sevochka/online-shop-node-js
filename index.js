const express = require("express");
const app = express();
var exphbs = require("express-handlebars");
//Routes
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cartRoutes = require('./routes/cart')

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

//Объявить папку public статичной
app.use(express.static(__dirname + '/public'));
//Получить req.body
app.use(express.urlencoded({extended: true}))
//Добавляем роуты
app.use('/', homeRoutes)
app.use('/courses', coursesRoutes)
app.use('/add', addRoutes)

app.use('/cart', cartRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
