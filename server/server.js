const express     = require('express');
const bodyParser  = require('body-parser');
const cors        = require('cors');

const mysql       = require('mysql');
const util        = require('util');

const port = 3001;

const vocabularyRemote = {
    host     : '192.168.0.152',
    user     : 'root',
    password : 'ropa+1',
    database : 'Vocabulary'
};   

const myFitnessRemote = ({
    host     : '192.168.0.152',
    user     : 'root',
    password : 'ropa+1',
    database : 'myfitnessdb'
});

let mySqlPool = mysql.createPool(myFitnessRemote);
mySqlPool.query = util.promisify(mySqlPool.query);

let app = express();
app.use(cors());
app.use(bodyParser.json());


// ========== BODYPARTS ==========

app.get('/bodyparts', async (request, response) => {
    try {
        const rows = await mySqlPool.query('SELECT * FROM bodypart');
        response.send({rows});
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});


// ========== EXERCISES ==========

app.get('/exercises', async (request, response) => {
    try {
        const rows = await mySqlPool.query('SELECT * FROM exercise');
        response.send({rows});
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});

//  Alternative 1
app.get('/bodyparts/:id/exercises', async (request, response) => {
    let id = request.params.id;
    try {
        const rows = await mySqlPool.query(`SELECT * FROM exercise WHERE bodypartId=${id}`);
        response.send({rows});
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});

//  Alternative 2
app.get('/exercises/bodypart/:id', async (request, response) => {
    let id = request.params.id;
    try {
        const rows = await mySqlPool.query(`SELECT * FROM exercise WHERE bodypartId=${id}`);
        response.send({rows});
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});


// ========== USERS ==========

app.post('/users', async (request,response) => {
    const name = request.body.name;
    const userid = request.body.userid;
    const password = request.body.password;

    // console.log('name',name);
    // console.log('userid',userid);
    // console.log('password',password);

    const query = `INSERT INTO user (name,userid,password) VALUES ('${name}','${userid}','${password}')`;
    // console.log('query',query);

    try {
        const rows = await mySqlPool.query(query);
        response.send({rows});
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});

app.get('/users', async (request,response) => {
    try {
        const rows = await mySqlPool.query('SELECT * FROM user');
        response.send({rows});
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});

app.get('/users/:id', async (request,response) => {
    const id = request.params.id;
    try {
        const rows = await mySqlPool.query(`SELECT * FROM user WHERE id=${id}`);
        if(rows.length===0) {
            response.status(404).send();
        } else {
            response.send({rows});
        }
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});

app.delete('/users/:id', async (request,response) => {
    const id = request.params.id;
    try {
        const rows = await mySqlPool.query(`DELETE FROM user WHERE id=${id}`);
        if(rows.affectedRows===0) {
            response.status(404).send();
        } else {
            response.send({rows});
        }
    } catch(error) {
        console.log(error);
        response.status(400).send();
    }
});


app.listen(port,() => {
    console.log(`Started on ${port}`);
});

/*
INSERT INTO `myfitnessdb`.`exercise` (`id`, `name`, `bodypartid`) VALUES ('1', 'Bicep curl', '1');
INSERT INTO `myfitnessdb`.`exercise` (`id`, `name`, `bodypartid`) VALUES ('2', 'Chins', '2');
INSERT INTO `myfitnessdb`.`exercise` (`id`, `name`, `bodypartid`) VALUES ('3', 'Squat', '3');
*/ 
