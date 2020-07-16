const db = require('../database/database');                             //including the database (connection) file to run these all functions

const STATUS_OK = 200;
const STATUS_NOT_FOUND = 400;
const CONTENT_TYPE_JSON = 'application/json';
const CONTENT_TYPE_HTML = 'text/html';

function getPlaylist(request,response){                                 //to get playlist category from playlist table in database
    db.query("select * from playlist")
        .then((data)=>{
            response.status(200).json(data.rows)
        })
        .catch(error => console.log(error))
}
function getTrack(request,response){                                    //to get all tracks based on the particular id  from track table in  db
    const paramId = parseInt(request.params.id);
    db.query("select * from track where playlist_id="+paramId)
        .then((data)=>{
            response.status(200).json(data.rows)
        })
        .catch(error => console.log(error))
}
function deleteTrack(request,response){                                 //to delete particular track from the track table based on the passed tack id from db
    const paramId = parseInt(request.params.id);

    db.query("delete from track where id ="+ paramId)
        .then((data)=>{
            response.status(200);
        })
        .catch(error => console.log(error))
}
function addTrack(request,response){                                    //inserting a new track in track table in db
    const paramPlaylistTitle = request.body.title;
    const paramPlaylistGenre = request.body.genre;
    const paramPlaylistUri = request.body.uri;
    const paramPlaylistMasterId = parseInt(request.body.master_id);

    console.log(request.body);

    let genre = 0;                                                      //selecting genre id according to the playlist categories' id
    switch (paramPlaylistGenre) {
        case "Acoustic": genre = 2;
        break;
        case "Classic": genre = 3;
            break;
        case "Country": genre = 4;
            break;
        case "Metal": genre = 5;
            break;
        case "Pop": genre = 6;
            break;
        case "Dance": genre = 6;
            break;
        case "Rock": genre = 7;
            break;
        default: genre = 1;
    }
    db.query("insert into track (id, playlist_id, title, uri, master_id) values(17,"+genre+",'"+paramPlaylistTitle+"','"+paramPlaylistUri+"',"+paramPlaylistMasterId+");")
        .then((data)=>{                     //important note * id: to insert a new track id column (field) should be auto increment :)
            response.status(200);
        })
        .catch(error => console.log(error))
}
module.exports = {                                  //exporting all function of this file to make available outside from this file :)

    getPlaylist,
    getTrack,
    deleteTrack,
    addTrack
}
