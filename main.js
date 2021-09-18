import fetch from 'node-fetch'
import express from 'express'
import postgres from 'pg'

const{Client, Pool} = postgres;
const app = express();
const pool = new Pool();
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'password1234',
    database: 'postgres'
});

//await client.connect();

app.listen(8000, '0.0.0.0', () => console.log('listening on port 8000'));
app.use(express.static('public'));
app.use(express.json());

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.post('/api/search', async(request, response) => {
    //console.log(request.body);
    //console.log(request.body);
    const data = request.body.search_query;
    console.log(data);
    let searchData = await fetch('http://www.omdbapi.com/?apikey=6d04333e&s=' + request.body.search_query);
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
        })
    }
});

/*const text = 'INSERT INTO Shows/Movies(Title,Year,imdbID,Type,Poster) VALUES($1,$2,$3,$4,$5)';
const values = [obj.Title, obj.Year, obj.imdbID, obj.Type, obj.Poster];

client.query(text, values, (err, res) => {
    console.log(err,res);
    client.end();
});*/