const { Router } = require("express");
const router = Router();
const User = require("../models/user");
const encryptor = require('bcryptjs');
const nodemailer = require('nodemailer');
const sendgrid = require('nodemailer-sendgrid-transport');
const keys = require('../keys')
const regEmail = require("../emails/registration")
const crypto = require('crypto');
const resetEmail = require("../emails/reset");

const transporter = nodemailer.createTransport(sendgrid({
    auth:{api_key: keys.SENDGRID_API_KEY}
}))

router.get("/login", async (req, res) => {
    res.render("auth/login", {
        title: "Авторизация",
        isLogin: true,
        loginError: req.flash('loginError')
    });
});

router.get("/register", async (req, res) => {
    res.render("auth/register", {
        title: "Регистрация",
        isRegister: true,
        registerError: req.flash('registerError')
    });
});

router.get("/logout", async (req, res) => {
    //req.session.isAuthenticated = false;
    req.session.destroy(() => {
        res.redirect("/auth/login");
    });
});

router.post("/login", async (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        const candidate = await User.findOne({
            email
        })
        if (candidate) {
            //Сравниваем пароль из БД с введенным 
            const areSame = await encryptor.compare(password, candidate.password)

            if (areSame) {
                //Сохраняем пользователя в объект сесиии, чтобы потом хватать
                req.session.user = candidate;
                req.session.isAuthenticated = true;
                //Для того, чтобы редирект произошел после установления сессии
                req.session.save((err) => {
                    if (err) throw err;
                    else res.redirect("/");
                });
            } else {
                //Если пароли из БД и введенный не свопадают
                //Если бы в детстве тебя почаще пороли, тебе бы подходили пароли, ну а так ты не подходишь по роли
                req.flash('loginError', 'Неправильный пароль')
                res.redirect('/auth/login#login')
            }
        } else {
            //Если маил не свопадает
            req.flash('loginError', 'Такого пользователя не существует')
            res.redirect('/auth/login')
        }
    } catch (error) {
        throw error
    }
});

router.post("/register", async (req, res) => {
    try {
        const {
            email,
            password,
            repeat,
            name
        } = req.body;

        const isExist = await User.findOne({
            email
        })

        if (isExist) {
            req.flash('registerError', 'Такой email уже занят')
            return res.redirect('/auth/login')
        } else {
            //Шифратор паролей, второй параметр - точность шифратора - чем больше, тем круче шифрование
            //но дольше времени занимает
            const hashPassword = await encryptor.hash(password, 10);
            console.log(hashPassword);
            
            const user = new User({
                email,
                name,
                password: hashPassword,
                cart: {
                    items: []
                }
            })
            await user.save();
            //Сервис по отпарвке emails
            await transporter.sendMail(regEmail(email))
            res.redirect('/auth/login');
        }
    } catch (error) {
        throw error
    }
});

router.get('/reset', (req, res) => {
    res.render('auth/reset', {
        title:'Забыли пароль?', 
        resetError: req.flash('resetError')
    })
})

router.post('/reset', (req, res) => {
    try {
        crypto.randomBytes(32, async (err, buffer) => {
            if (err) {
                req.flash('error', "Что-то пошло не так, обидно!")
                return res.redirect('/auth/reset')
            }

            const token = buffer.toString('hex');
            const isExist = await User.findOne({email: req.body.email})

            if (isExist) {
                isExist.resetToken = token;
                //1 hour
                isExist.resetTokenExp = Date.now() + 60 * 60 * 1000;
                await isExist.save();
                await transporter.sendMail(resetEmail(isExist.email, token));
                res.redirect('/auth/login');
            } else {
                req.flash('resetError', "Такого емаил нет")
                res.redirect('/auth/reset')
            }
        })
    } catch (error) {
        throw error
    }
})

router.get("/password/:token", async (req, res) => {
    if (!req.params.token) {
        return res.redirect('/auth/login')
    }

    try {
        const user = await User.findOne({
            resetToken: req.params.token,
            resetTokenExp: {$gt: Date.now()}
        }) 

        if (!user) {
            return res.redirect('/auth/login');
        } else {
            res.render("auth/password", {
                title: "Восстановить доступ",
                registerError: req.flash('error'),
                userId: user._id.toString(),
                token: req.params.token
            });
        }
    } catch (error) {
        throw error
    }
    
});

module.exports = router;