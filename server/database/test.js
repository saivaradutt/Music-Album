const db = require('./database');

/*db.query("select * from playlist")                      //1st way
    .then(response => console.log(response.rows))
    .then(rows => console.log(rows))
    .catch(error => console.log(error));*/
db.query("delete from track where id=2")                      //1st way
    .then(response => console.log(response.rows))
    .then(rows => console.log(rows))
    .catch(error => console.log(error));

//console.log(db.getAllTrackTitles());                                          //2nd way not working
/*db.getAllTrackTitles()
    .then(response => console.log(response))
    .catch(error => console.log(error));*/
/*db.insertTrack(2, 'demo', 'http', 123)                                            //not working
    .then(response => console.log(response))
    .catch(error => console.log(error));*/