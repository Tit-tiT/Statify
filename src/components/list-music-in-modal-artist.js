Vue.component('list-music-in-modal-artist', {
    props: ['list'],
    template: `
    <div class="container">        
            <ul class="list-group ">
                <li style="background-color: #828181;color: white;" v-for="music in track" class="list-group-item d-flex justify-content-between align-items-start">
                    <b>{{music.trackName}} <span style="background-color: #1DB954"  class="badge rounded-pill">{{music.trackDuration}}</span></b> 
                    {{music.trackAlbum}}
                </li>
            </ul>
    </div>`,
    data : function(){
        return {
            track : []
        }
    },
    methods : {
        initialise(){
            this.track = []
            this.list.data.forEach(track => {
                let name = track.name
                if(name.length>20) name = name.substring(0,17)+"..."

                let album = track.album.name
                if(album.length>20) album = album.substring(0,17)+"..."

                let minute = Math.floor((track.duration_ms/1000)/60)
                let seconde = Math.floor((track.duration_ms/1000)%60)
                if(seconde<10) seconde = "0"+seconde

                let duration =  minute+ ":" +seconde 
                this.track.push({
                    trackName : name,
                    trackAlbum : album,
                    trackDuration : duration
                })
            });
        },
    },
    watch: { 
        list :{
            immediate: true,
            handler(){
                this.initialise()
            }
        }
    }
})