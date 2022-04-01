Vue.component('artist', {
    props: ['artistInfo'],
    template: `
    <div class="col-sm-2">
      <a id="artist" v-on:click="sendArtist(artistInfo.info)" href="#" class="card m-3 rounded text-reset text-decoration-none" style="background-color: #454444;">
        <div class="card-header">
            <img :src="artistInfo.info.images[0].url" style="height:9vw" class="card-img-top rounded float-start" alt="...">
        </div>
        <div class="card-footer">
            <h5 class="card-title" style="color: white">{{artistName}}</h5>
        </div>
      </a>
    </div>
    `,
    data : function(){
      return {
          artistName : null,
      }
  },
    methods: {
      sendArtist: function(artist) {
          this.$emit("getInfoForModale", this.artistInfo.info)
        },
        initialise(){
          this.artistName = this.artistInfo.info.name
          if(this.artistName.length>13) this.artistName = this.artistName.substring(0,10)+"..."
        },
    },
    mounted(){
      this.initialise()
  },
  watch: { 
    artistInfo :{
        immediate: true,
        handler(){
            this.initialise()
        }
      }
  }
})