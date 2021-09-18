import fetch from 'node-fetch'
import express from 'express'

const app = express();


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
    await fetch(
        'http://www.omdbapi.com/?s= ?apikey=3a94a54f&');
    //console.log(request.body);
    const data = request.body;
    console.log(request.body);
    response.json({
        status:'success',
        show: data
    })
});

/*async function getSearchData(){
    let response = await fetch('http://www.omdbapi.com/?s=' + searchResult + '?apikey=3a94a54f&');
    let data = await response.json()
    return data;
}*/

//getSearchData().then(data => console.log(data));