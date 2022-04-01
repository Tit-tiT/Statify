Vue.component('list-search-album', {
    props: ['list'],
    template: `
    <div class="container my-5">
        <h3 style="color: white" class="mx-4"> {{ list.title }} </h3>
        <div class="card-group">
            <album v-for="n in list.data.length" :key="n" :albumInfo="{info : list.data[n-1]}" @getInfoForModale="sendAlbum($event)"> </album>
        </div>
    </div>`,
    methods : {
        sendAlbum : function(data) {
            this.$emit("getInfoForModale", data)
        }
    }
})