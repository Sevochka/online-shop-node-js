const request = require("request");

describe("200 requests: /*", () => {
    test("Courses request statusCode should be 200", async () => {
        await request("http://localhost:3000/courses", function (
            err,
            res,
            body
        ) {
            expect(res.statusCode).toBe(200);
        });
    });
    test("Cart request statusCode should be 200", async () => {
        await request("http://localhost:3000/cart", function (err, res, body) {
            expect(res.statusCode).toBe(200);
        });
    });
    test("Order request statusCode should be 200", async () => {
        await request("http://localhost:3000/order", function (err, res, body) {
            expect(res.statusCode).toBe(200);
        });
    });
    test("Home request statusCode should be 200", async () => {
        await request("http://localhost:3000/", function (err, res, body) {
            expect(res.statusCode).toBe(200);
        });
    });
    test("Profile request statusCode should be 200", async () => {
        await request("http://localhost:3000/profile", function (
            err,
            res,
            body
        ) {
            expect(res.statusCode).toBe(200);
        });
    });
});

describe("404 requests: /*", () => {
    test("Test1 request statusCode should be 404", async () => {
        await request("http://localhost:3000/reseet", function (err, res, body) {
            expect(res.statusCode).toBe(404);
        });
    });

    test("Test2 request statusCode should be 404", async () => {
        await request("http://localhost:3000/cart1", function (err, res, body) {
            expect(res.statusCode).toBe(404);
        });
    });

    test("Test3 request statusCode should be 404", async () => {
        await request("http://localhost:3000/orders/1", function (
            err,
            res,
            body
        ) {
            expect(res.statusCode).toBe(404);
        });
    });
    test("Test4 request statusCode should be 404", async () => {
        await request("http://localhost:3000/cart/12", function (
            err,
            res,
            body
        ) {
            expect(res.statusCode).toBe(404);
        });
    });
});
