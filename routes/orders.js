const { Router } = require("express");
const router = Router();
const Order = require("../models/order");

router.get("/", async (req, res) => {
    try {
        const orders = await Order.find({
            'user.userId': req.user._id
        }).populate('user.userId')

        res.render("orders", {
            isOrder: true,
            title: "Заказы",
            orders: orders.map(order => {
                return {
                    ...order._doc, 
                    price: order.courses.reduce((total, c) => {
                        return total += c.current * c.course.price
                    })
                }
            })
        });
    } catch (error) {
        throw error;
    }
});

router.post("/", async (req, res) => {
    try {
        const user = await req.user
            .populate("cart.items.courseID")
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
