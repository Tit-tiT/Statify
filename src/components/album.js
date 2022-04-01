Vue.component('album', {
    props: ['albumInfo'],
    template: `
    <div class="col-sm-2">
      <a id="album" v-on:click="sendAlbum(albumInfo.info)" href="#" class="card m-3 rounded text-reset text-decoration-none" style="background-color: #454444;">
        <div class="card-header">
            <img :src="albumInfo.info.images[0].url" style="height:9vw" class="card-img-top rounded float-start" alt="...">
        </div>
        <div class="card-footer">
            <h5 class="card-title" style="color: white">{{albumName}}</h5>
            <p class="card-text" style="color: white">{{artistName}}</p>
        </div>
      </a>
    </div>
    `,
    data : function(){
      return {
        albumName : null,
        artistName : null,
      }
  },
    methods: {
      sendAlbum: function(album) {
          this.$emit("getInfoForModale", this.albumInfo.info)
        },
        initialise(){
          this.albumName = this.albumInfo.info.name
          this.artistName = this.albumInfo.info.artists[0].name
          if(this.albumName.length>13) this.albumName = this.albumName.substring(0,10)+"..."
          if(this.artistName.length>16) this.artistName = this.artistName.substring(0,13)+"..."
        },
    },
    mounted(){
      this.initialise()
  },
  watch: { 
    albumInfo :{
        immediate: true,
        handler(){
            this.initialise()
        }
      }
  }
})