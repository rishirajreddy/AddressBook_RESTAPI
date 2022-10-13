const request = require('supertest');
const app = require('../src/index');

let token;

//Authenticating the user
beforeAll((done) => {
    request(app)
        .post('/auth/login')
        .send({
            username: 'msd7',
            password: '1234567'
        })
        .end((err, res) => {
            token = res.body.access_token;  //save the token
            done();
        });
});

describe('Contact', () => { 

    //Get a specific contact with status code 200
    it('GET should respond with the particular contact', async () => { 
            const response = await request(app).get('/contact/6346f1cb43314d8d9345648e')
            .set('Authorization', `Bearer ${token}`);
        console.log(response._body);
        expect(response.statusCode).toBe(200);
        expect(response.type).toBe('application/json'); 
    }) 

    //Add a new contact and get status code 200
    it('POST should return 200 response', async() => {
        return request(app).post('/contact/add')
                    .set('Authorization', `Bearer ${token}`)
                    .send({
                        "firstName":"MS",
                        "lastName":"Dhoni",
                        "contactNo":"666-111-222",
                        "city":"Ranchi",
                        "street":"14-0",
                        "post_code":"990099",
                        "country":"India"
                    })
                    .then((response) => {
                        expect(response.statusCode).toBe(200)
                    })  
    })

    //Get a matching contact based on fistName, lastName or contactNo
    it('POST should return 200 response', async() => {
        return request(app).post('/contact')
            .set('Authorization', `Bearer ${token}`)
            .send({
                firstName:"John"
            })
            .then((response) => {
                expect(response.statusCode).toBe(200)
            })
    })
})
