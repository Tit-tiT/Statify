import useSpotifyApi from "../spotify.js";

Vue.component('modale-album', {
    props:['album'],
    template: `
        <div class="modal fade" id="modaleAlbum" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
            <div class="modal-content" style="background-color: #454444;"> 
                <div class="modal-header">
                <h5 class="card-title" id="ModalLabel" style="color: white"><b>Détail</b></h5>
                
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                    <div class="col-5 ">
                        <img :src="album.album.images[0].url" class="rounded col-12" alt="...">
                    </div> 
                    <div class="col row g-3  align-items-center">
                        <div class="container"><h2 class="align-middle p-3 m-0" style="background-color: #828181; color: white; border-radius: 5px;">{{albumName}}</h2></div>
                        <div class="container"><h2 class="align-middle p-3 m-0" style="background-color: #828181; color: white; border-radius: 5px;">{{artistName}}</h2></div>
                        <div class="container"><h4 class="align-middle p-3 m-0" style="background-color: #828181; color: white; border-radius: 5px;">Date de sortie : {{releaseDate}}</h4></div>
                        <div class="container"><h4 class="align-middle p-3 m-0" style="background-color: #828181; color: white; border-radius: 5px;">Nombre de titres : {{totalTracks}}</h4></div>
                    </div>
                    </div>
                <div class="mt-3">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                        <a class="nav-link active" data-bs-toggle="tab" style="color: black;" href="#home">Tracklist</a>
                        </li>
                    </ul>
                    
                    <!-- Tab panes -->
                    <div class="tab-content  mt-3">
                        <div class="tab-pane container active" id="home">
                            <div class='spinner-border text-primary' role='status' v-if="albumTracks==null"><span class='visually-hidden'>Loading...</span></div>
                            <list-music-in-modal-album v-if="albumTracks!=null && albumTracks!='Pas de musiques trouvées'" :list="{data:albumTracks}"></list-music-in-modal-album>
                            <p v-if="albumTracks!=null && albumTracks=='Pas de musiques trouvées'" style="color:white">{{albumTracks}}</p>
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
            albumName : null,
            artistName : null,
            releaseDate : null,
            totalTracks : null,
            albumTracks : []
        }
    },
    methods : {
        initialise() {
                this.albumName = this.album.album.name,
                this.artistName = this.album.album.artists[0].name,
                this.releaseDate = this.album.album.release_date,
                this.totalTracks = this.album.album.total_tracks.toString()
                this.albumTracks = []
                useSpotifyApi.getTracksAlbum(this.album.album.id).then(data => {
                    this.albumTracks=data.items
                    console.log(this.albumTracks)
                })
            }
    },
    mounted(){
        document.querySelectorAll("a#album").forEach((a) => {
            a.setAttribute("data-bs-toggle","modal")
            a.setAttribute("data-bs-target","#modaleAlbum")
        })
        var modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#modaleAlbum'))
        modal.show()
    },
    watch: { 
        album :{
            immediate: true,
            handler(){
                this.initialise()
            }
      }
    }
})

