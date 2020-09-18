const server = require('./server')
const request = require('supertest')
const { intersect } = require('../database/dbConfig')
const { expectCt } = require('helmet')
const db = require('../database/dbConfig')

describe('post /api/auth/register', () => {
    beforeEach(async () => {
        // empty table and reset primary key back to 1
        await db("users").truncate();
    });
    it('should register a user', async () => {
        const res = await request(server).post('/api/auth/register')
        .send({
            username: "user2",
            password: "newPassword"
        })
        expect(res).toBeDefined()


    })
    it('should return a status code of 201', async () => {
        const res = await request(server).post('/api/auth/register')
        .send({
            username: "user3",
            password: "newPassword"
        })
        expect(res.status).toBe(201)
    })
})
describe('post /api/auth/login', () => {

    it('should login a user', async () => {
        const res = await request(server).post('/api/auth/login')
        .send({
            username: "user3",
            password: "newPassword"
        })
        expect(res).toBeDefined()
    })
    it('should return a status code of 200', async () => {
        const res = await request(server).post('/api/auth/login')
        .send({
            username: "user3",
            password: "newPassword"
        })
        expect(res.status).toBe(200)
        console.log(res.body.token)
    })
   
})
describe('GET /', () => {
    it('should be defined', () => {
        const res = request(server).get('/')
        expect(res).toBeDefined()
    })
  
})

describe('Get /api/jokes', () => {
    it('authentication middleware should prevent you from seeing protected route', async () => {
        const res = await request(server).get('/api/jokes')
        expect(res.status).toBe(401)
    })
    it('should show jokes with the correct token in the header', async () => {
        const res = await request(server).post('/api/auth/login')
        .send({
            username: "user3",
            password: "newPassword"
        })
        const token = res.body.token
        const jokes = await request(server).get('/api/jokes')
        .set('authorization', token)
        expect(jokes.status).toBe(200)
    })
})