const path = require('path');
const fs = require('fs');

const p = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
)

class Cart {

    static async add(course){
        const cart = await Cart.fetch()
        const idx = cart.courses.findIndex(c=> {
            return c.id === course.id
        })
        const candidate = cart.courses[idx]
        if (candidate) {
            //курс уже есть
            candidate.count++
            cart.courses[idx] = candidate;
        } else {
            //необходиммо добавить
            course.count = 1;
            cart.courses.push(course);
        }

        cart.price += +course.price

        return new Promise((resolve, reject) => {
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    reject(err)
                }
                else {
                    resolve()
                }
            })
        })
    }

    static async remove(course){
        let cart = await Cart.fetch()

        const idx = cart.courses.findIndex(c=> {
            c.id === course.id
        })

        cart.courses = cart.courses.filter((el) => {
            return el.id !== course.id
        })

        return new Promise((res, rej) => {
            fs.writeFile(p, JSON.stringify(cart), err => {
                if (err) {
                    rej(err)
                }
                else {
                    res(cart)
                }
            })
        })
        
    }

    static async fetch(){
        return new Promise((resolve, reject) => {
            fs.readFile(p, 'utf-8', (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(JSON.parse(data));
                }
            })
        })
    }
}

module.exports = Cart;