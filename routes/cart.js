const {Router} = require('express');
const Courses =  require("../models/course")
const router = Router();

router.post('/add', async (req, res)=> {
    const course = await Courses.findById(req.body.id);
    await req.user.addToCart(course)
    res.redirect('/cart')
})

router.get('/', async (req, res) => {
    //const cart = await Cart.fetch()
    res.render('cart', {
        title: "Корзина",
        isCart: true,
        //courses: cart.courses,
        //price: cart.price
    })
})

router.delete('/remove/:id', async (req, res)=> {
    const cart = await Cart.remove(req.params.id)
    res.json(cart)
})

module.exports = router;