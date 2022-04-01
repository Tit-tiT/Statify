import useSpotifyApi from "../spotify.js";

Vue.component('search-bar', {
    template: `
    <div class="container mt-3">
        <nav class="navbar">
        <form class="container-fluid mx-3" @submit.prevent="research(myresearch)">
            <div class="d-flex" style="width: 100%;">
            <header-site> </header-site>
            <input id="input" type="search" class="form-control me-3" placeholder="Rechercher un titre, un album, un artiste, etc..." aria-label="Search" v-model="myresearch" autocomplete="off">
            <button class="btn" style="background-color: #1DB954" type="submit">Recherche</button>
            </div>
        </form>
        </nav>
    </div>`,

    data : function() {
        return {
            myresearch: "" /*ma recherche*/
            }
        },
    methods: {
        research: function(myresearch) {
            useSpotifyApi.search(myresearch).then(data => {
                this.$emit("getSearch",data)
            })
        }

    },
    mounted(){
        const autocomplete = document.querySelector("#input")
        let dataSource = []
        
        autocomplete.addEventListener('keyup', event => {
            const inputText = event.target.value;
            if(inputText.length<=0) dataSource.length = 0
            else {
                dataSource.length = 0
                useSpotifyApi.search(inputText).then(search => {
                    search.tracks.items.forEach(music => {
                        const musicList = []
                        musicList.push(["label",music.name])
                        dataSource.push(Object.fromEntries(musicList))
                    })
                })
            }
        });
        const options = {
            maximumItems: 5,
            data: dataSource   
        }
        new Autocomplete(autocomplete,options)
    }
})