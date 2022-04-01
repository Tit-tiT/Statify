Vue.component('music', {
    props: ['trackInfo'],
    template: `
    <div class="col-sm-2">
      <a id="track" v-on:click="sendTrack(trackInfo.info)" href="#" class="card m-3 rounded text-reset text-decoration-none" style="background-color: #454444;">
        <div class="card-header">
            <img :src="trackInfo.info.album.images[0].url" class="card-img-top rounded float-start" alt="...">
        </div>
        <div class="card-footer">
            <h5 class="card-title" style="color: white">{{trackName}}</h5>
            <p class="card-text" style="color: white">{{artistName}}</p>
        </div>
      </a>
    </div>
    `,
    data : function(){
      return {
          trackName : null,
          artistName : null,
      }
  },
    methods: {
      sendTrack: function(track, artist) {
          this.$emit("getInfoForModale", this.trackInfo.info)
        },
      initialise(){
        this.trackName = this.trackInfo.info.name
        if(this.trackName.length>13) this.trackName = this.trackName.substring(0,10)+"..."
        this.artistName = this.trackInfo.info.artists[0].name
        if(this.artistName.length>16) this.artistName = this.artistName.substring(0,13)+"..."
      }
    },
    mounted(){
      this.initialise()
  },
  watch: { 
    trackInfo :{
        immediate: true,
        handler(){
            this.initialise()
        }
  }
}
})