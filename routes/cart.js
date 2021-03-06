const {Router} = require('express');
const Courses =  require("../models/course")
const router = Router();
const auth = require("../middleware/auth")
/**
 * Добавление нового курса в корзину
 */
router.post('/add', auth, async (req, res)=> {
    const course = await Courses.findById(req.body.id);
    await req.user.addToCart(course)
    res.redirect('/cart')
})
/**
 * Добавление нового курса в корзину
 * @param {string} id - уникальный идентификатор курса
 */
router.post('/add/:id', auth, async (req, res)=> {
    const course = await Courses.findById(req.params.id);
    await req.user.addToCart(course)
    const user = await req.user
        .populate('cart.items.courseId')
        .execPopulate();
    
    let price;
    const courses = user.cart.items.map(c => {
        price += c.courseId._doc.price * c.current; 
        return {...c.courseId._doc, current: c.current};
    });
    const cart = {
        courses
    }
    
    res.status(200).json(cart)
})

/**
 * Отображение страницы "Корзина"
 */
router.get('/', auth, async (req, res) => {
    //Заполнение 
    const user = await req.user
        .populate('cart.items.courseId')
        .execPopulate();
  
    let price = 0;
    const courses =  user.cart.items.map(c => {
        //Считаем цену
        price += c.courseId._doc.price * c.current; 
        return {...c.courseId._doc, current: c.current};
    });
    
    res.render('cart', {
        title: "Корзина",
        isCart: true,
        courses: courses,
        price
    }); 
})

/**
 * Удаление курса
 * @param {string} id - уникальный идентификатор курса
 */

router.delete('/remove/:id', auth, async (req, res)=> {
    await req.user.removeFromCart(req.params.id);
    const user = await req.user
        .populate('cart.items.courseId')
        .execPopulate();
    
    let price;
    const courses = user.cart.items.map(c => {
        price += c.courseId._doc.price * c.current; 
        return {...c.courseId._doc, current: c.current};
    });
    const cart = {
        courses
    }
   
    
    res.status(200).json(cart)
})

module.exports = router;