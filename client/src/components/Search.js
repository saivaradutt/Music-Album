import React, {useState} from 'react';
import '../index.css';

const api = {                                                           //required credentials to get data from discogs api
    key: "kNRznvjPxwGEWnCLdLmh",
    secret: "CajcGRIwOWuAtTrjscnIdVpsRqDQIeGU",
    base: "https://api.discogs.com/database/search?"
};
const Search = () => {
    const [query, setQuery] = useState('');                 //using useState to manage the states without class
    const [tracks, setTracks] = useState({});

    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [uri, setUri] = useState('');
    const [masterId, setMasterId] = useState(0);

    const search = evt => {                                         //search arrow function to search tracks from discog api

        if(evt.key === "Enter"){
            fetch(`${api.base}key=${api.key}&secret=${api.secret}&artist=${query}&country=canada`)
                .then(res => res.json())
                .then(result => {
                    setTracks(result);
                    setQuery('');
                })
        }
    };
    const addToTracks = row => {                                    //addToTracks arrow function to make api to add new tracks in the database track table
        alert("Track added to your playlist");
        const url = "http://localhost:3002/addtrack";
        return  fetch(url, {
            method: 'POST',                                 // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',                                   // no-cors, *cors, same-origin
            //cache: 'no-cache',                            // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin',                   // include, *same-origin, omit
            headers:{
                'Content-Type': 'application/json'
                //'Content-Type': 'application/x-www-form-urlencoded'
            },
            //redirect: 'follow'                            // manual, *follow, error
            //referrerPolicy: 'no-referrer'                 // no-referrer,
            body: JSON.stringify( {
                "title": row.title,
                "uri": row.uri,
                "genre": row.genre[0],
                "master_id": row.master_id
            })
        });
    };
    return (
        <>
            <main>
                <nav className="navbar fixed-top navbar-light bg-light nav-search-box">             {/*search box to search new tracks*/}
                    <input className="form-control mr-sm-2" type="search"
                           placeholder="Search..." aria-label="Search"
                           value={query} onKeyPress={search}
                           onChange={e => setQuery(e.target.value)}/>

                </nav>
                {(typeof tracks.results != "undefined") ? (
                    <>
                        <h1 className="pageTitle">Searched Result</h1>
                        <table className="table table-hover custom-class">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Thumb</th>
                                <th scope="col">Genre</th>
                                <th scope="col">Extra Info.</th>
                                <th className="tableHeadingCenter" colSpan="2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>                                                             {/*dynamically generated table with fetched data from discog api*/}
                            { tracks.results.map( (row,index) =>
                                <tr key={index}>
                                    <th scope="row">{index+1}</th>
                                    <td>{row.title}</td>
                                    <td><img className="custom-img-thumbnail" src={row.thumb} /></td>
                                    <td>{row.genre}</td>
                                    <td>
                                        <label>URI:</label> {row.uri}<br/>
                                        <label>Master id:</label> {row.master_id}
                                    </td>
                                    <td>
                                        {/*<button type="button" className="btn btn-dark"><i className="fa fa-music"></i></button>*/}
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-danger" value={index}  onClick={() => addToTracks(row)}
                                                title="Add to favourite tracks"><i className="fa fa-heart"></i></button>                {/*add button to call addToTrack function*/}
                                    </td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </>
                ) : ('')}
            </main>

        </>
    );
};

export default Search;