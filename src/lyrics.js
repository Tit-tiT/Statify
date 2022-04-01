const tab = ["-","with","feat","ft","\(","\[","w/"]

const useLyricsApi = {

    getLyrics: (artist, title) => new Promise((resolve, reject) => {

        let changer = false
        tab.forEach(char => {
            if(!changer){
                if(title.includes(char)){
                    title = title.substring(0,title.search(char))
                    changer=true
                }
            }
        })
        
        const LYRICS_API_URL = `https://api.lyrics.ovh/v1/${artist}/${title}`;


        fetch(LYRICS_API_URL)
            .then((response) =>  response.json())
            .then(data => resolve(data))
            .catch(error => console.log(error));
    }),
};

export default useLyricsApi;
