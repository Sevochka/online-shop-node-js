const { Router } = require("express");
const router = Router();
const Order = require("../models/order");
const auth = require("../middleware/auth")

router.get("/", auth, async (req, res) => {
    try {
        const mainInfo = await Order.find({
            'user.userId': req.user._id
        })
        .populate('user.userId')

        const orders = mainInfo.map(order => {
            //console.log(order.courses[0].current);
            //console.log(order.courses[0].course.price);
            return {
                ...order._doc, 
                price: order.courses.reduce((total, c) => {
                    return total += c.current * c.course.price
                }, 0)
            }
        });
        res.render("orders", {
            isOrder: true,
            title: "Заказы",
            orders
        });
    } catch (error) {
        throw error;
    }
});

router.post("/", auth, async (req, res) => {
    try {
        const user = await req.user
            .populate("cart.items.courseId")
            .execPopulate();

            
        const courses = user.cart.items.map(el => {
            return { current: el.current, course: { ...el.courseId._doc } };
        });

        const order = new Order({
            user: {
                name: req.user.name,
                userId: req.user
            },
            courses: courses
        });

        await order.save();
        await req.user.clearCart();

        res.redirect("/orders");
    } catch (error) {
        throw error;
    }
});

module.exports = router;
