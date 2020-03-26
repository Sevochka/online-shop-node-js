const express = require("express");
const app = express();
var exphbs = require("express-handlebars");
//Routes
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')

const hbs = exphbs.create({
    defaultLayout: "main",
    extname: "hbs"
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

//Объявить папку public статичной
app.use(express.static(__dirname + '/public'));
//Добавляем роуты
app.use('/', homeRoutes)
app.use('/add', coursesRoutes)
app.use('/courses', addRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
