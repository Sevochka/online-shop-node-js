const {Router} = require('express');
const Courses =  require("../models/course")
const router = Router();


router.post('/add', async (req, res)=> {
    const course = await Courses.findById(req.body.id);
    await req.user.addToCart(course)
    res.redirect('/cart')
})

router.get('/', async (req, res) => {
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

router.post('/remove', async (req, res)=> {
    console.log(req.body);
    //await User.findByIdAndRemove(req.body.id);
    res.redirect("/cart")
})

module.exports = router;