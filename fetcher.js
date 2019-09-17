//WELCOME TO ARRAX FETCHER 
/**
 WE MADE THIS SCRIPT TO MAKE THE FETCH PROCESS MORE EASIER USING THE OOP(OBJECT ORIENTED PROGRAMMING)
 
//AVAILABLE METHODS
[getSongs] a simple method that gives you search results from genius API
[getSongsByQuery] another method can help you to get a song by giving it the name of the artist and also the song title 
[getLyrics]the most important method in this script, this one can help to get the lyrics by just giving it the URL and  parraaaaa yeaah you have the lyrics now
[Questions]
*Yo man how i can get the url?
Simply just use one of our provided methods depending on your usage
 **/

// https://api.genius.com/search?access_token=ifVJ2NTFj1Zd3QDBhEcXccdzBIi-PMK0-trbe_18bMuh-pfme2CFI0X1WmdX_rWs&q=
class arrax {
    constructor() {
        this.api_token = `?access_token=ifVJ2NTFj1Zd3QDBhEcXccdzBIi-PMK0-trbe_18bMuh-pfme2CFI0X1WmdX_rWs`;
        this.base_url = `https://api.genius.com`
    }



    async getSongs(query) { //get all the search result
        try {
            const song_name = query;
            const url_search = `${this.base_url}/search${this.api_token}&q=${song_name}`
            const response = await fetch(url_search);
            const json = await response.json();
            return json.response.hits

        } catch (err) {
            return console.log('not found')
        }
    } 
    async getPopularSongs(limit = 10){ // Set Limit To get a specific amount of data,you can leave it empty and get default value
        try{
            let info = [];
            const response = await axios.get(`https://itunes.apple.com/us/rss/topsongs/limit=${limit}/json`);
            const data = response.data.feed.entry;
            data.forEach(item =>{
                info.push({'artist' : item['im:artist'].label ,'artwork' : item['im:image'][2].label } )
            })
            return info
        }
        catch(err){
            console.error(err)
        }
        
    }
    async getSongByQuery(artist_name, song) { //get specefic song by query required artist name as first param and song title
        const artist = artist_name;
        const song_name = song;
        const url_search = `${this.base_url}/search${this.api_token}&q=${artist} ${song_name}`
        const response = await fetch(url_search); //Fetch DAta
        const json = await response.json();
        let arr = json.response.hits; //store all the search results on this var
        let valide_song = [];
        arr.forEach(song => { //Filter the search reuslt to get the wanted song url
            const title = song.result.full_title;
            const reg_song_name = new RegExp(song_name, 'gi')
            const reg_artist_name = new RegExp(artist, 'gi')
            if (title.match(reg_song_name) && title.match(reg_artist_name)) {
                valide_song = song;
            }
        })
        return valide_song
    }
    async getLyrics(url) { //get Lyrics by url
        try {
            axios.defaults.baseURL = 'https://arrax.herokuapp.com'; //base api url
            let song = url; //song  = param
            const response = await axios.post('/lyrics', {
                data: {
                    url: song
                },
            }) //await until we get the lyrics from api
            return response.data //then return lyrics
        } catch (err) {
            console.log(err)
        }
    }
}