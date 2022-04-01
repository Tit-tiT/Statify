Vue.component('list-search-music', {
    props: ['list'],
    template: `
    <div class="container my-5">
        <h3 style="color: white" class="mx-4"> {{ list.title }} </h3>
        <div class="card-group">
            <music v-for="n in list.data.length" :key="n" :trackInfo="{info : list.data[n-1]}" @getInfoForModale="sendTrack($event)"> </music>
        </div>
    </div>`,
    methods : {
        sendTrack : function(data) {
            this.$emit("getInfoForModale", data)
        }
    }
})