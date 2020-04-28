const mongoose = require("mongoose");
const databaseName = "test";
const KEYS = require("../keys");
const Course = require("../models/course");
const User =  require('../models/user')

const { MongoClient } = require("mongodb");

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
        expect(insertedUser).toMatchObject(mockUser);
    });
});
