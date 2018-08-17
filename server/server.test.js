const request = require('supertest');
const expect  = require('expect');

const {setupTestData,bodyparts,exercises} = require('./data/test')

const setup = async () => {
    try {
        await setupTestData();
        console.log('setup: Done');
    } catch(error) {
        console.log('setup: Failed, error = ',error);
    }
};

const {app}   = require('./server');

before(setup);

describe('GET /bodyparts',() => {
    it('Should return a list of bodyparts',(done) => {
        request(app)
            .get('/bodyparts')
            .expect(200)
            .expect((response) => {
                expect(response.body.rows.length).toBe(2);
                expect(response.body.rows[0].name).toBe(bodyparts[0].name);
                expect(response.body.rows[1].name).toBe(bodyparts[1].name);
            })
            .end(done);
    });
});

describe('GET /bodyparts/:id/exercises',() => {
    it('Should return a list of excersices for the bodypart',(done) => {
        const bodypartId = 1;
        request(app)
            .get(`/bodyparts/${bodypartId}/exercises`)
            .expect(200)
            .expect((response) => {
                expect(response.body.rows.length).toBe(2);
                expect(response.body.rows[0].name).toBe(exercises[0].name);
                expect(response.body.rows[1].name).toBe(exercises[1].name);
            })
            .end(done);
    });

    it('Should return 404 if bodypartid dos not exist',(done) => {
        const bodypartId = 5;
        request(app)
            .get(`/bodyparts/${bodypartId}/exercises`)
            .expect(400)
            .end(done);
    });
});



describe('GET /exercises',() => {

    it('Should return list of exercises',(done) => {
        request(app)
            .get('/exercises')
            .expect(200)
            .expect((response) => {
                expect(response.body.rows.length).toBe(4);
                expect(response.body.rows[0].name).toBe(exercises[0].name);
                expect(response.body.rows[1].name).toBe(exercises[1].name);
                expect(response.body.rows[2].name).toBe(exercises[2].name);
                expect(response.body.rows[3].name).toBe(exercises[3].name);
            })
            .end(done);
    });

});

describe('GET /exercises/bodypart/:id',() => {
    it('Should return a list of excersices for the bodypart',(done) => {
        const bodypartId = 2;
        request(app)
            .get(`/exercises/bodypart/${bodypartId}`)
            .expect(200)
            .expect((response) => {
                expect(response.body.rows.length).toBe(2);
                expect(response.body.rows[0].name).toBe(exercises[2].name);
                expect(response.body.rows[1].name).toBe(exercises[3].name);
            })
            .end(done);
    });

    it('Should return 404 if bodypartid dos not exist',(done) => {
        const bodypartId = 5;
        request(app)
            .get(`/exercises/bodypart/${bodypartId}`)
            .expect(400)
            .end(done);
    });
});


// TODO: Add user test cases!