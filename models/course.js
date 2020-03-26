//Генерация уникального идентификатора
const { v4: uuidv4 } = require('uuid');
const fs = require("fs");
const path = require("path");

class Course {
    constructor(title, price, img) {
        console.log(title);
        
        this.title = title;
        this.price = price;
        this.img = img;
        this.id = uuidv4();
    }

    toJSON(){
        return {
            title: this.title,
            price: this.price,
            img: this.img,
            id: this.id
        }
    }

     async save() {
        const courses = await Course.getAll();
        courses.push(this.toJSON())

        return new Promise((res, rej)=>{
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err)=>{
                    if (err) {
                        rej(err)
                    }
                    else{
                        res()
                    }
                }
            )
        })
        
    }

    static getAll() {
        return new Promise((res, rej) => {
            fs.readFile(
                path.join(__dirname, "..", "data", "courses.json"),
                "utf-8",
                (err, data) => {
                    if (err) {
                        rej(err);
                    } else {
                        res(JSON.parse(data));
                    }
                }
            );
        });
    }
}

module.exports = Course;
