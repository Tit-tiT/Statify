import useSpotifyApi from "../spotify.js";

Vue.component('app', {
    template: `
    <div>
        <search-bar @getSearch="search($event)"> </search-bar>

        <list-search-music v-if="tracksFound.length>0" :list="{title:'Musiques', data:tracksFound}" @getInfoForModale="giveInfoModaleMusic($event)"> </list-search-music>
        <list-search-artist v-if="artistsFound.length>0" :list="{title:'Artistes', data:artistsFound}" @getInfoForModale="giveInfoModaleArtist($event)"> </list-search-artist>
        <list-search-album v-if="albumsFound.length>0" :list="{title:'Albums', data:albumsFound}" @getInfoForModale="giveInfoModaleAlbum($event)"> </list-search-album>

        <list-music v-if="like.length>0 && tracksFound.length<=0" :list="{title:'Titres favoris', data:like}" @getInfoForModale="giveInfoModaleMusic($event)"> </list-music>
        <list-music v-if="topPays.length>0 && tracksFound.length<=0" :list="{title:'Top France', data:topPays}" @getInfoForModale="giveInfoModaleMusic($event)"> </list-music>
        <list-music v-if="topMonde.length>0 && tracksFound.length<=0" :list="{title:'Top Monde', data:topMonde}" @getInfoForModale="giveInfoModaleMusic($event)"> </list-music>

        <modale-music v-if="infoTrackModale!=null" :track="{track : infoTrackModale}" @addLikedMusic="chnageLikedMusic($event)"> </modale-music>
        <modale-artist v-if="infoArtistModale!=null" :artist="{artist : infoArtistModale}"> </modale-artist>
        <modale-album v-if="infoAlbumModale!=null" :album="{album : infoAlbumModale}"> </modale-album>  

    </div>
    `,
    data : function(){
        return {
            tracksFound : [],
            albumsFound : [],
            artistsFound : [],
            lyrics : "",
            topMonde : [],
            topPays : [],
            like : [],
            infoTrackModale : null,
            infoArtistModale : null,
            infoAlbumModale : null,
            tracksAlbum : [],
        }
    },
    methods : {
        search : function(data){
            this.tracksFound = []
            this.artistsFound = []
            this.albumsFound = []
            data.artists.items.forEach(artist => {
                if(data.artists!=null && artist.images.length!=0 && this.artistsFound.length<12)   this.artistsFound.push(artist)
            });
            data.albums.items.forEach(album => {
                if(data.albums!=null && this.albumsFound.length<12)   this.albumsFound.push(album)
            });
            data.tracks.items.forEach(track => {
                if(data.tracks!=null && this.tracksFound.length<12)   this.tracksFound.push(track)
            });
        },
        giveInfoModaleMusic : function(data) {
            if(data!=null) this.infoTrackModale = data
        },
        giveInfoModaleArtist : function(data) {
            if(data!=null) this.infoArtistModale = data
        },
        giveInfoModaleAlbum : function(data) {
            if(data!=null) this.infoAlbumModale = data
        },
        chnageLikedMusic : function(likeId){
            this.like = []
            likeId.forEach(id => {
                useSpotifyApi.getTrack(id).then(track => {
                    this.like.push(JSON.parse(JSON.stringify({track : track})))
                })
            })
        }
    },
    mounted(){
        useSpotifyApi.getTopFrance().then(data => {
            this.topPays=data.tracks.items
        })
        useSpotifyApi.getTopMonde().then(data => {
            this.topMonde=data.tracks.items
        })
        let likeId = JSON.parse(window.localStorage.getItem("like"))
        if(likeId!=null && likeId.length>0){
            likeId.forEach(id => {
                useSpotifyApi.getTrack(id).then(track => {
                    this.like.push(JSON.parse(JSON.stringify({track : track})))
                })
            })
        }
    }
})
