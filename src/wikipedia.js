const useWikiApi = {

    getWiki: (id) => new Promise((resolve, reject) => {
        const URL = `https://fr.wikipedia.org/w/api.php?action=query&prop=extracts&exsentences=10&exlimit=1&pageids=${id}&explaintext=1&formatversion=2&format=json&origin=*`;

        fetch(URL).
            then((response) => response.json()).
            then(data => {
                resolve(data)
            }).catch(error => console.log(error));
    }),

    getId : (artist, title) => new Promise((resolve, reject) => {
        const URL = `https://fr.wikipedia.org/w/api.php?action=query&list=search&srsearch=${artist}+${title}&utf8=&format=json&origin=*`

        fetch(URL).
            then((response) => response.json()).
            then(data => {
                resolve(data)
            }).catch(error => console.log(error));
    }),
};

export default useWikiApi;