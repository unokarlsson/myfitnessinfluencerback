const express     = require('express');
const bodyParser  = require('body-parser');
const mysql       = require('mysql');
const cors        = require('cors');

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

// let connection = mysql.createConnection(vocabularyRemote);
let connection = mysql.createConnection(myFitnessRemote);

let app = express();

app.use(cors());
app.use(bodyParser.json());


// ========== BODYPARTS ==========

app.get('/bodyparts', (request, response) => {
    connection.query('SELECT * FROM bodypart',(error,rows) => {
        if(error) {
            console.log(error);
            response.status(400).send();
        } else {
            response.send({rows});
        }
    });
});


// ========== EXERCISES ==========

app.get('/exercises', (request, response) => {
    connection.query('SELECT * FROM exercise', (error, rows) => {
        if(error) {
            console.log(error);
             response.status(400).send();
        } else {
            response.send({rows});        
        }
    });
});

//  Alternative 1
app.get('/bodyparts/:id/exercises', (request, response) => {
    let id = request.params.id;
    connection.query(`SELECT * FROM exercise WHERE bodypartid=${id}`, (error, rows) => {
        if(error) {
            console.log(error);
            response.status(404).send();
        } else {
            response.send({rows});        
        }
    });
});

//  Alternative 2
app.get('/exercises/bodypart/:id', (request, response) => {
    let id = request.params.id;
    connection.query(`SELECT * FROM exercise WHERE bodypartid=${id}`, (error, rows) => {
        if(error) {
             console.log(error);
             response.status(404).send();
        } else {
            response.send({rows});        
        }
    });
});


// ========== USERS ==========

app.post('/users',(request,response) => {
    const name = request.body.name;
    const userid = request.body.userid;
    const password = request.body.password;

    console.log('name',name);
    console.log('userid',userid);
    console.log('password',password);

    const query = `INSERT INTO user (name,userid,password) VALUES ('${name}','${userid}','${password}')`;
    console.log('query',query);

    connection.query(query,(error,result) => {
        if(error) {
            console.log(error);
            response.status(400).send();
        } else {
            response.send(result);
        }
    });
});

app.get('/users',(request,response) => {
    connection.query('SELECT * FROM user',(error,result) => {
        if(error) {
            console.log(error);
            response.status(400).send();
        } else {
            response.send({result});
        }
    });
});

app.get('/users/:id',(request,response) => {
    const id = request.params.id;

    connection.query(`SELECT * FROM user WHERE id=${id}`,(error,result) => {
        if(error) {
            console.log(error);
            response.status(400).send();
        } else {
            if(result.length===0) {
                response.status(404).send();
            } else {
                response.send({result});
            }
        }
    });
});

app.delete('/users/:id',(request,response) => {
    const id = request.params.id;

    connection.query(`DELETE FROM user WHERE id=${id}`,(error,result) => {
        if(error) {
            console.log(error);
            response.status(400).send();
        } else {
            console.log
            if(result.affectedRows===0) {
                response.status(404).send();
            } else {
                response.send({result});
            }
        }
    });
});


app.listen(port,() => {
    console.log(`Started on ${port}`);
});

/*
INSERT INTO `myfitnessdb`.`exercise` (`id`, `name`, `bodypartid`) VALUES ('1', 'Bicep curl', '1');
INSERT INTO `myfitnessdb`.`exercise` (`id`, `name`, `bodypartid`) VALUES ('2', 'Chins', '2');
INSERT INTO `myfitnessdb`.`exercise` (`id`, `name`, `bodypartid`) VALUES ('3', 'Squat', '3');
*/ 

/*
    console.log('Try to connect to database');

    const connection = db.connect((error) => {
        if(error) {
            console.log('Unable to connect to mysql',error);
        } else {
            console.log('Connected to mysql');
        }
    });
    */

    // Do CRUD operaiotn on mysql
    /*
    console.log('Try to query mysql');
    connection.query('SELECT * FROM word',(error,rows) => {
        if(error) {
            console.log('Unable to query mysql');
            response.status(500).send('Could not retrieve data from mysql');
        } else {
            console.log('Able to query mysql');
            console.log(rows);
            response.send(rows);
        }

        // Disconnect from database
        console.log('Try to disconnect from mysql');
        connection.end((error) => {
            if(erro) {
                console.log('Unable to disconnect from mysql');
            } else {
                console.log('Disconnected from mysql')
            }
        });
    });
    */
    
    // Disconnect from database
    /*
    console.log('Try to disconnect from mysql');
    connection.end((error) => {
        if(erro) {
            return console.log('Unable to disconnect from mysql');
        } else {
            console.log('Dsiconnect from mysql')
        }
    });
    */