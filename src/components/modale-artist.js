import useSpotifyApi from "../spotify.js";

Vue.component('modale-artist', {
    props:['artist'],
    template: `
        <div class="modal fade" id="modaleArtist" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
            <div class="modal-content" style="background-color: #454444;"> 
                <div class="modal-header">
                <h5 class="card-title" id="ModalLabel" style="color: white"><b>Détail</b></h5>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                    <div class="col-5 ">
                        <img :src="artist.artist.images[0].url" class="rounded col-12" alt="...">
                    </div> 
                    <div class="col row g-3  align-items-center">
                        <div class="container"><h2 class="align-middle p-3 m-0" style="background-color: #828181; color: white; border-radius: 5px;">{{artistName}}</h2></div>
                        <div class="container"><h4 class="align-middle p-3 m-0" style="background-color: #828181; color: white; border-radius: 5px;">Followers : {{followers}}</h4></div>
                        <div class="container"><h4 class="align-middle p-3 m-0" style="background-color: #828181; color: white; border-radius: 5px;">Genre : {{genre}}</h4></div>
                    </div>
                    </div>
                    <div class="mt-3">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                        <a class="nav-link active" data-bs-toggle="tab" style="color: black;" href="#home">Top Music</a>
                        </li>
                    </ul>
                    
                    <!-- Tab panes -->
                    <div class="tab-content  mt-3">
                        <div class="tab-pane container active" id="home">
                            <div class='spinner-border text-primary' role='status' v-if="topMusic==null"><span class='visually-hidden'>Loading...</span></div>
                            <list-music-in-modal-artist v-if="topMusic!=null && topMusic!='Pas de musiques trouvées'" :list="{data:topMusic}"></list-music-in-modal-artist>
                            <p v-if="topMusic!=null && topMusic=='Pas de musiques trouvées'" style="color:white">{{topMusic}}</p>
                        </div>
                    </div>
                    </div>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn" style="background-color: #1DB954" data-bs-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
        </div>
    `,
    data : function(){
        return {
            artistName : null,
            followers : null,
            genre : "",
            topMusic : null
        }
    },
    methods : {
        initialise() {
            this.artistName = this.artist.artist.name
            this.followers = this.artist.artist.followers.total

            this.topMusic = null
            useSpotifyApi.getArtistTopTrack(this.artist.artist.id).then(data => {
                if(data.tracks.length>0)this.topMusic = data.tracks
                else this.topMusic = "Pas de musiques trouvées"
            })

            this.genre = ""
            if( this.artist.artist.genres.length>0){
                this.artist.artist.genres.forEach(g =>{
                    this.genre += g+", "
                })
                if(this.genre.length>47)  this.genre = this.genre.substring(0,44)+"..."
                else this.genre = this.genre.substring(0,this.genre.length-2)
            }
            else this.genre = "Pas de genre trouvé"
        }
    },
    mounted(){
        document.querySelectorAll("a#artist").forEach((a) => {
            a.setAttribute("data-bs-toggle","modal")
            a.setAttribute("data-bs-target","#modaleArtist")
        })
        var modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#modaleArtist'))
        modal.show()
    },
    watch: { 
        artist :{
            immediate: true,
            handler(){
                this.initialise()
            }
      }
    }
})

