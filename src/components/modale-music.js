import useLyricsApi from "../lyrics.js";
import useWikiApi from "../wikipedia.js";

Vue.component('modale-music', {
    props:['track'],
    template: `
        <div class="modal fade" id="modaleMusic" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl">
            <div class="modal-content" style="background-color: #454444;"> 
                <div class="modal-header">
                <h5 class="card-title pt-2" id="ModalLabel" style="color: white"><b>Détail</b></h5>
                <button class="btn btn-default" v-on:click="like2(track.track)"><img :src="imgLike" width="30rem"/></button>
                <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="row g-3">
                    <div class="col-5 ">
                        <img :src="track.track.album.images[0].url" class="rounded col-12" alt="...">
                    </div> 
                    <div class="col row g-3  align-items-center">
                        <div class="container"><h2 class="align-middle p-3 m-0" style="background-color: #828181; color: white; border-radius: 5px;">{{trackName}}</h2></div>
                        <div class="container"><h2 class="align-middle p-3 m-0" style="background-color: #828181; color: white; border-radius: 5px;">{{trackArtist}}</h2></div>
                        <div class="container"><h4 class="align-middle p-3 m-0" style="background-color: #828181; color: white; border-radius: 5px;">Durée : {{trackDuration}}</h4></div>
                        <div class="container"><h4 class="align-middle p-3 m-0" style="background-color: #828181; color: white; border-radius: 5px;">Album : {{trackAlbumName}}</h4></div>
                        <div class="container"><h4 class="align-middle p-3 m-0" style="background-color: #828181; color: white; border-radius: 5px;">Date de sortie : {{trackDate}}</h4></div>        
                    </div>
                    </div>
                    <div class="mt-3">
                    <ul class="nav nav-tabs">
                        <li class="nav-item">
                        <a class="nav-link active" data-bs-toggle="tab" style="color: #1DB954;" href="#parole">Paroles</a>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" data-bs-toggle="tab" style="color : #1DB954;" href="#wiki">Wiki</a>
                        </li>
                    </ul>
                    
                    <!-- Tab panes -->
                    <div class="tab-content  mt-3">
                        <div class="tab-pane container active" id="parole">
                            <div v-if="parole==null" class='spinner-border text-primary' role='status'><span class='visually-hidden'>Loading...</span></div>
                            <p style="white-space: pre; color:white" v-if="parole!=null">{{parole}}</p>
                        </div>
                        <div class="tab-pane container" id="wiki">
                            <div v-if="wiki==null" class='spinner-border text-primary' role='status'><span class='visually-hidden'>Loading...</span></div>
                            <p style="white-space:  pre-wrap;color:white" v-if="wiki!=null">{{wiki}}</p>
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
            trackName : null,
            trackArtist : null,
            trackDuration : null,
            trackAlbumName : null,
            trackDate : null,
            parole : null,
            wiki : null,
            like : null,
            imgLike : ""
        }
    },
    methods : {
        initialise() {
            this.trackName = this.track.track.name,
            this.trackArtist = this.track.track.artists[0].name,
            this.wiki=null
            useWikiApi.getId(this.trackArtist,this.trackName).then(dataId => {
                if(dataId.query.search.length==0 
                    || (!dataId.query.search[0].title.includes((this.trackArtist))
                    && !dataId.query.search[0].title.includes((this.trackName)))) this.wiki = "Pas de wiki trouvé"
                else {
                    let id = dataId.query.search[0].pageid
                    useWikiApi.getWiki(id).then(data => this.wiki = data.query.pages[0].extract)
                }
            })
            this.trackDuration = Math.trunc((this.track.track.duration_ms/1000)/60) + "min " + Math.trunc((this.track.track.duration_ms/1000)%60) + "s"
            this.trackAlbumName = this.track.track.album.name,
            this.trackDate = this.track.track.album.release_date,
            this.trackDate = this.trackDate.substring(0,4)
            this.parole = null,
            useLyricsApi.getLyrics(this.trackArtist,this.trackName).then(data => {
                if(data.error == null) this.parole = data.lyrics.replace(/(?:\r\n|\r|\n\n)/g,'\n')
                else this.parole = "Pas de paroles trouvées"
            }).catch(error => console.log(error))

            this.like = JSON.parse(window.localStorage.getItem("like"));
            if(this.like == null) this.like = []
            if(this.like.includes(this.track.track.id)) this.imgLike =  "../../assets/img/fullCoeur.png";
            else this.imgLike =  "../../assets/img/emptyCoeur.png";

            document.querySelectorAll("a#track").forEach((a) => {
                a.setAttribute("data-bs-toggle","modal")
                a.setAttribute("data-bs-target","#modaleMusic")
            })
        },
        like2(track){
            if(this.like.includes(track.id)){
                this.imgLike =  "../../assets/img/emptyCoeur.png";
                this.like.splice(this.like.indexOf(track.id),1)
                window.localStorage.setItem("like",JSON.stringify(this.like))
            }
            else {
                this.imgLike =  "../../assets/img/fullCoeur.png";
                this.like.push(track.id)
                window.localStorage.setItem("like",JSON.stringify(this.like))
            } 
            this.$emit("addLikedMusic", this.like)
        }
    },
    mounted(){
        this.initialise()
        var modal = bootstrap.Modal.getOrCreateInstance(document.querySelector('#modaleMusic'))
        modal.show()
    },
    watch: { 
        track :{
            immediate: true,
            handler(){
                this.initialise()
            }
       }
    }
})

