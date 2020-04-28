const mongoose = require("mongoose");
const KEYS = require("../keys");
const Course = require("../models/course");
const User =  require('../models/user')


beforeAll(async () => {
    //Connection to MongoDB
    await mongoose.connect(KEYS.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("Users", () => {
    test("Should insert user into collection", async () => {
        const mockUser = { 
            email: 'test@gmail.com', 
            password:'12323', 
            name: "John",
            cart: {
                items: [],
            }, 
        };
        await User.create(mockUser);
        const insertedUser = await User.findOne({email:"test@gmail.com"});
        expect(insertedUser).toHaveProperty('email', mockUser.email);
        expect(insertedUser).toHaveProperty('password', mockUser.password);
        expect(insertedUser).toHaveProperty('name', mockUser.name);
    });

    test("Should delete user from collection", async () => {
        await User.findOneAndDelete({email:"test@gmail.com"});
        const candidate = await User.findOne({email:"test@gmail.com"});
        expect(candidate).toBeNull();
    });

    test("Should add course to cart", async () => {
        let user = await User.findOne({email:'vsevoiodkochnev@mail.ru'});
        let course = await Course.findOne({title:"Angular"});
        let courseId = course._id;
        await user.addToCart(course);
        expect(user.cart.items[0].courseId).toStrictEqual(courseId);
    });

    test("Should add course to cart several times ", async () => {
        let user = await User.findOne({email:'vsevoiodkochnev@mail.ru'});
        let course = await Course.findOne({title:"Angular"});
        let courseId = course._id;
        await user.addToCart(course);
        expect(user.cart.items[0].courseId).toStrictEqual(courseId);
    });
});

describe("Course", () => {
    test("Should get list of courses", async () => {  
        const courses = await Course.find();
        expect(courses).toBeDefined();
        expect(typeof courses).toBe('object');
        expect(courses).toBeTruthy();
    });
    test("Should create a new course", async () => {  
        const ownerUser = await User.findOne({email:'vsevoiodkochnev@mail.ru'});
        const mockCourse = { 
            title: 'testCourse', 
            price: 1232233, 
            img: "test.img",
            user: ownerUser
        };
        await Course.create(mockCourse);
        const insertedCourse = await Course.findOne({title: 'testCourse'});
        expect(insertedCourse).toHaveProperty('title', mockCourse.title);
        expect(insertedCourse).toHaveProperty('price', mockCourse.price);
        expect(insertedCourse).toHaveProperty('img', mockCourse.img);
    });

    test("Should delete a existing course", async () => { 
        const ownerUser = await User.findOne({email:'vsevoiodkochnev@mail.ru'}); 
        const mockCourse = { 
            title: 'testCourse', 
            price:'1232233', 
            img: "test.img",
            user: ownerUser
        };
        await Course.findOneAndDelete(mockCourse);

        const candidate = await Course.findOne(mockCourse);
        expect(candidate).toBeNull();
    });
});
