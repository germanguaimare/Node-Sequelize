import app from "./src/index.mjs"

describe("GET /", () =>{

    describe("Given an N number", () =>{
        //Should return N characters from R&M API
        //Should respond with a JSON object
        test("Should respond with a 200 status code", async () => {
            const response = await request(app).get("/").send({
                N: 1
            })
            expect(response.statusCode).toBe(200)
        })
        //Should specify JSON in the content header type

    })

    describe("Number N is not sent by the user", () =>{
        //Should respond status code 400

    })



})