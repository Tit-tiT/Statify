const useSpotifyApi = {

    getToken: () => new Promise((resolve,reject) =>{
        const URL = 'https://accounts.spotify.com/api/token'
        let Authorization = btoa('f2b7851b4d5b4e0d970f60d37e3ad61c' + ':' + '1174dd4dfa074d5fa4a12a0b68a3d9de')
    
        fetch(URL,{
            method:"POST",
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${Authorization}`,
            },
            body: "grant_type=refresh_token&refresh_token=AQBa4Ikf55pOImhL22m3sjCYgMJz3K3kHZB_P8m8_Nz0ZReCHi2BJf8gM5AQzT943VsG4Pirm5yh6x7hMMd4GDuzXfZNyLovOBNd3kmScnp5E54RkNBL5W_TwOPuV-lJ_kc"
        }).then(response => response.json())
        .then(data=> resolve(data.access_token))
    }),


    search: (search) => new Promise((resolve,reject) => {
        useSpotifyApi.getToken().then(token =>{
            const URL =  `https://api.spotify.com/v1/search?q=${search}&type=album,track,artist`
            fetch(URL,{
                headers : { 'Authorization':`Bearer ${token}`}
            })
            .then((response) => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        })
    }),

    getTrack : (id) => new Promise((resolve,reject) =>{
        useSpotifyApi.getToken().then(token =>{
            const URL = `https://api.spotify.com/v1/tracks/${id}`
            fetch(URL,{
                headers : { 'Authorization':`Bearer ${token}`}
            })
            .then((response) => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        })
    }),

    getArtist : (id) => new Promise((resolve,reject) =>{
        useSpotifyApi.getToken().then(token =>{
            const URL = `https://api.spotify.com/v1/artists/${id}`
            fetch(URL,{
                headers : { 'Authorization':`Bearer ${token}`}
            })
            .then((response) => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        })
    }),

    getAlbulm : (id) => new Promise((resolve,reject) =>{
        useSpotifyApi.getToken().then(token =>{
            const URL = `https://api.spotify.com/v1/albums/${id}`
            fetch(URL,{
                headers : { 'Authorization':`Bearer ${token}`}
            })
            .then((response) => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        })
    }),

    getTopFrance : () => new Promise((resolve,reject) =>{
        useSpotifyApi.getToken().then(token =>{
            const URL = `https://api.spotify.com/v1/playlists/37i9dQZEVXbIPWwFssbupI`
            fetch(URL,{
                headers : { 'Authorization':`Bearer ${token}`}
            })
            .then((response) => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        })
    }),

    getTopMonde : () => new Promise((resolve,reject) =>{
        useSpotifyApi.getToken().then(token =>{
            const URL = `https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF`
            fetch(URL,{
                headers : { 'Authorization':`Bearer ${token}`}
            })
            .then((response) => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        })
    }),

    getArtistTopTrack : (id) => new Promise((resolve,reject) => {
        useSpotifyApi.getToken().then(token =>{
            const URL = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=FR`
            fetch(URL,{
                headers : { 'Authorization':`Bearer ${token}`}
            })
            .then((response) => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        })


    }),

    getTracksAlbum : (id) => new Promise((resolve,reject) => {
        useSpotifyApi.getToken().then(token =>{
            const URL = `https://api.spotify.com/v1/albums/${id}/tracks`
            fetch(URL,{
                headers : { 'Authorization':`Bearer ${token}`}
            })
            .then((response) => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        })


    }),

    getMarket : () => new Promise((resolve,reject) => {
        useSpotifyApi.getToken().then(token =>{
            const URL = `https://api.spotify.com/v1/markets`
            fetch(URL,{
                headers : { 'Authorization':`Bearer ${token}`}
            })
            .then((response) => response.json())
            .then(data => resolve(data))
            .catch(error => reject(error));
        })


    }),

    
}

export default useSpotifyApi;