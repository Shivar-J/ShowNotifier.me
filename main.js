import fetch, { isRedirect } from 'node-fetch'
import express, { response } from 'express'
import postgres from 'pg'
import bcrypt from 'bcrypt'

const{Client} = postgres;
const app = express();
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'password1234',
    database: 'postgres'
});
var title;
var year;
var imdbID;
var type;
var poster;

app.listen(8000, '0.0.0.0', () => console.log('listening on port 8000'));
app.use(express.static('public'));
app.use(express.json());
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

await client.connect();


app.post('/api/login', async (req, res) => {
    const body = req.body;

    if(body.type == "signup"){
        if(!(body.username && body.password)) {
            return res.sendStatus(400);
        }
        
        const salt = await bcrypt.genSalt(10);
        var userPassword = body.password;
        var userUsername = body.username;

        console.log("Username: ", userUsername);
        console.log("Password: ", userPassword);

        userPassword = await bcrypt.hash(userPassword, salt);
        
        const checkExisting = 'SELECT * FROM userdata WHERE username=$1';
        const valuesExisting = [body.username];
        var usernameData = await client.query(checkExisting, valuesExisting);

        if(usernameData.rows.length == 0){
            const text = 'INSERT INTO "userdata"(\"username\",\"password\") VALUES($1,$2)';
            const values = [body.username, userPassword];

            client.query(text, values, (err, res) => {
                console.log(err,res);
            });
            res.status(200);
            res.send(body.username);
            return;
        }
        else{
            res.sendStatus(409);
            return;
        }
    }
    else if(body.type == "login"){
        const checkUsers = 'SELECT * FROM userdata WHERE username=$1';
        console.log("BODY DATA");
        console.log(body);
        const valuesCheck = [body.username];
        var usernameChecks = await client.query(checkUsers, valuesCheck);
        console.log("USER DATA");
        console.log(usernameChecks.rows.length);
        if(usernameChecks.rows.length == 1){
            const checkPassword = 'SELECT password FROM userdata WHERE username=$1';
            const checkPasswordValue = [body.username];
            var passwordCompare = await client.query(checkPassword, checkPasswordValue);
            console.log("PASSWORD DATA");
            console.log(passwordCompare.rows);
            const validPassword = bcrypt.compare(passwordCompare.rows[0].password, body.password);
            if(validPassword){
                res.status(200);
                res.send(body.username);
                return;
            }
            else {
                res.sendStatus(400);
                return;
            }
        }
        else{
            res.sendStatus(401);
            return;
        }
    }
    else{
        res.sendStatus(404);
        return;
    }
});

app.post('/api/getWatchList', async(request, response) => {
    const body = request.body;

    const checkWatchlist = 'SELECT \"showID\" FROM \"userList\" WHERE \"userName\"=$1';
    const checkWatchlistUsername = [body.username];
    //console.log(checkWatchlist);
    //console.log(checkWatchlistUsername);
    //console.log(body.username);
    var getWatchlist = await client.query(checkWatchlist, checkWatchlistUsername);
    //console.log(getWatchlist.rows);
    response.status(200);
    response.send(getWatchlist.rows);
});

app.post('/api/setWatchList', async(request, response) => {
    const body = request.body;

    if(body.type == "add"){
        const text = 'INSERT INTO "userList"(\"userName\",\"showID\") VALUES($1,$2)';
        const values = [body.username, body.imdbID];
        var setWatchList = await client.query(text, values);
        response.status(200);
        response.send(setWatchList);
    }
    else if(body.type == "remove"){
        const text = 'DELETE FROM \"userList\" WHERE \"userName\" = $1 AND \"showID\" = $2';
        const values = [body.username, body.imdbID];
        var removeWatchList = await client.query(text, values);
        response.status(200);
        response.send(removeWatchList);
    }
});

app.post('/api/dashboard', async(request, response) =>{
    const body = request.body;
    
    var objectDashboard = [];

    for(let i in body.ids){
        let searchData = await fetch('http://www.omdbapi.com/?apikey=6d04333e&i=' + body.ids[i].showID);
        searchData = await searchData.json();
        objectDashboard.push(searchData);
    }

    console.log(objectDashboard);
    response.status(200);
    response.send(objectDashboard);
});

app.post('/api/search', async(request, response) => {
    //console.log(request.body);
    //console.log(request.body);
    const data = request.body.search_query;
    console.log(data);
    let searchData = await fetch('http://www.omdbapi.com/?apikey=6d04333e&s=' + request.body.search_query + '&page=1');
    var obj = await searchData.json();
    if(searchData == null || obj["Search"] == null || obj["Search"].length == 0){
        response.sendStatus(404);
    }
    else{
        //let object = JSON.parse(await searchData.json());
        response.send(obj);
        //console.log(obj["Search"]);
        obj["Search"].forEach(Element => {
            console.log(Element["Year"]);
            title = Element["Title"];
            year = Element["Year"];
            imdbID = Element["imdbID"];
            type = Element["Type"];
            poster = Element["Poster"];

            const text = 'INSERT INTO "tv"(\"Title\",\"Year\",\"imdbID\",\"Type\",\"Poster\") VALUES($1,$2,$3,$4,$5)';
            const values = [title, year, imdbID, type, poster];

            client.query(text, values, (err, res) => {
                console.log(err,res);
            });
        })
    }
});