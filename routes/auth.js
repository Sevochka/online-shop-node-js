const { Router } = require("express");
const router = Router();
const User = require("../models/user");

router.get("/login", async (req, res) => {
    res.render("auth/login", {
        title: "Авторизация",
        isLogin: true,
    });
});

router.get("/logout", async (req, res) => {
    //req.session.isAuthenticated = false;
    req.session.destroy(() => {
        res.redirect("/auth/login#login");
    });
});

router.post("/login", async (req, res) => {
    const user = await User.findById("5e8336162ef2323f04a798ce");
    //Сохраняем пользователя в обхекты сесиии, чтобы потом хватать
    req.session.user = user;
    req.session.isAuthenticated = true;
    //Для того, чтобы редирект произошел после установления сессии
    req.session.save((err) => {
        if (err) throw err;
        else res.redirect("/");
    });
});

router.post("/register", async (req, res) => {
   try {
      const { email, password, repeat, name } = req.body;

      const isExist = await User.findOne({ email })

      if (isExist) {
          return res.redirect('/auth/login#register')
      }

      const user = new User({
          email,
          name,
          password,
          cart: {
              items:[]
          }
      })
      await user.save();
      res.redirect('/auth/login#login')
   } catch (error) {
       throw error
   }
});

module.exports = router;
