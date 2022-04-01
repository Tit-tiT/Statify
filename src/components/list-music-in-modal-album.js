Vue.component('list-music-in-modal-album', {
    props: ['list'],
    template: `
    <div class="container">        
            <ul class="list-group ">
                <li style="background-color: #828181;color: white;" v-for="music in track" class="list-group-item d-flex justify-content-between align-items-start">
                    <b>{{music.trackNumber}}. {{music.trackName}} <span style="background-color: #1DB954"  class="badge rounded-pill">{{music.trackDuration}}</span></b> 
                    {{music.trackArtists}}
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
                
                let artists = ""
                track.artists.forEach(element => {
                    artists = artists+" "+element.name
                });

                let minute = Math.floor((track.duration_ms/1000)/60)
                let seconde = Math.floor((track.duration_ms/1000)%60)
                if(seconde<10) seconde = "0"+seconde

                let duration =  minute+ ":" +seconde 

                let number = track.track_number
                this.track.push({
                    trackName : name,
                    trackArtists : artists,
                    trackDuration : duration,
                    trackNumber : number
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