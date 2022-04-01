Vue.component('list-search-artist', {
    props: ['list'],
    template: `
    <div class="container my-5">
        <h3 style="color: white" class="mx-4"> {{ list.title }} </h3>
        <div class="card-group">
            <artist v-for="n in list.data.length" :key="n" :artistInfo="{info : list.data[n-1]}" @getInfoForModale="sendArtist($event)"> </artist>
        </div>
    </div>`,
    methods : {
        sendArtist : function(data) {
            this.$emit("getInfoForModale", data)
        }
    }
})