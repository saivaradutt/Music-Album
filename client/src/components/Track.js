import React from 'react';
import '../index.css';

export default class Track extends React.Component{
    constructor(props) {
        super(props);
        this.playlists = {};
        this.tracks = {};
        this.state = {
            selectOptions: null,
            selectedPlaylist: undefined,
            selectedTracks: undefined,
            message: ''
        }
        this.selectTrackChanged = this.selectTrackChanged.bind(this);
        this.deleteTrack = this.deleteTrack.bind(this);
    }
    componentDidMount() {                                                   //this function will run after rendering and will get a json formatted playlist to show in select dropdown
        const url = "http://localhost:3002/playlist";
        fetch(url)
            .then(response => response.json())
            .then(json => this.fetchSuccess(json));                         //passing fetched data into fetchSuccess function
    }
    fetchSuccess(jsonResult){                                               //generating options for select playlist tag with array.map() function
        this.playlists = jsonResult;
        const data = jsonResult.map((playlist) => <option key={playlist.id} value={playlist.id}>{playlist.title}</option>);
        this.setState({                                                 //setting selectOptions state with generated, and ready to pass in select playlist tag
            selectOptions: data
        })
    }
    selectTrackChanged(event){                                              //this function will run the user will select one option from the given playlist categories, will call on onChange function of select playlist tag
        const playlistId = parseInt(event.target.value);                    //converting selecting id into integer

        const url = "http://localhost:3002/track/" + playlistId;            //api will get all tracks matched with selected id of the playlist category
        fetch(url)
            .then(response => response.json())
            .then(json => this.fetchSuccessForTracks(json));                //passing json formatted data in to fetchSuccessForTracks function

    }
    fetchSuccessForTracks(jsonResult){                                      //array.map() making design (loop) to print the selected tracks in rows
        const data = jsonResult.map( (row,index) =>
                        <tr key={index}>
                            <th scope="row">{index+1}</th>
                            <td>{row.title}</td>
                            <td>{row.uri}</td>
                            <td>{row.master_id}</td>
                            <td>
                                {/*<button type="button" className="btn btn-dark"><i className="fa fa-music"></i></button>*/}
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger" title="Remove track from favourites"
                                        id={row.id} value={row.id} onClick={() => this.deleteTrack(row.id)}><i className="fa fa-trash"></i></button>        {/*to delete the targeted (selected) track from database, calling deleteTrack function and passing id of the track*/}
                            </td>
                        </tr>
        );
        this.setState({                                                 //setting the generate design is state property with seState method
            selectedTracks: data
        })
    }
    deleteTrack(trackId){                                                   //generating api to delete particular based on the passed id
        const selectedTrackId = trackId;
        alert("Record deleted successfully");
        this.setState({
            selectedTracks: this.state.selectedTracks.filter(track => track.id !== selectedTrackId)
        });

        const url = "http://localhost:3002/track/" + selectedTrackId;

        return fetch(url, {
            method: 'DELETE',                           // *GET, POST, PUT, DELETE, etc.
            mode: 'cors',                               // no-cors, *cors, same-origin
            //cache: 'no-cache',                        // *default, no-cache, reload, force-cache, only-if-cached
            //credentials: 'same-origin',               // include, *same-origin, omit
            headers:{
                'Content-Type': 'application/json'
                //'Content-Type': 'application/x-www-form-urlencoded'
            },
            //redirect: 'follow'                        // manual, *follow, error
            //referrerPolicy: 'no-referrer'             // no-referrer,
            body: JSON.stringify(this.state.selectedTracks)
        });
    }
    render() {

        return(
            <div>
                <main>
                    <nav className="navbar fixed-top navbar-light bg-light nav-search-box">
                        <select className="form-control" onChange={this.selectTrackChanged}>
                            {this.state.selectOptions}
                        </select>
                    </nav>
                    {(this.state.selectedTracks === undefined) ? (`Waiting for your selection ;)`) :  (
                    <>
                        <h1 className="pageTitle">Tracks</h1>
                        <table className="table table-hover custom-class">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">URI</th>
                                <th scope="col">Master Id</th>
                                <th className="tableHeadingCenter" colSpan="2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.state.selectedTracks}
                            </tbody>
                        </table>
                    </>
                        ) }
                </main>
            </div>
        );
    }
}