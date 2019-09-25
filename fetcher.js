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
    async getNews() { //get music world news
        // let today = new Date();
        // let day = today.getDate();
        // let month  = today.getMonth() + 1;
        // let yyy = today.getFullYear();
        // if (day < 10) {
        //     day = '0' + day;
        //   } 
        //   if (month < 10) {
        //     month = '0' + month;
        // }
        // const date = yyy + '-' + month + '-' + (day-1);
        const url = `http://newsapi.org/v2/everything?domains=billboard.com&apiKey=a79879fc5f5a41388fc6766b09d8e851`;
        const response = await axios.get(url);
        const data = response.data.articles;
        let info = [];
        let randomPost = Math.floor(Math.random() * data.length);
        if (data[randomPost].content === null || data[randomPost].image === null || data[randomPost].title === null) { //filter result to avoide empty results
            let i = 0;
            while (i < data.length) {
                if (data[i].content !== null && data[i].title !== null && data[i].urlToImage !== null) {
                    info.push({
                        'content': data[i].content.substring(data[i].content.lastIndexOf(']' + 1), data[i].content.lastIndexOf('[')),
                        'title': data[i].title,
                        'url': data[i].url,
                        'image': data[i].urlToImage
                    })
                    i = data.length;
                }
                i++;
            }
            return info
        } else {
            info.push({
                'content': data[randomPost].content.substring(data[randomPost].content.lastIndexOf(']' + 1), data[randomPost].content.lastIndexOf('[')),
                'title': data[randomPost].title,
                'url': data[randomPost].url,
                'image': data[randomPost].urlToImage
            })
            return info
        }
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
    async getPopularSongs(limit = 10) { // Set Limit To get a specific amount of data,you can leave it empty and get default value
        try {
            let info = [];
            const response = await axios.get(`http://itunes.apple.com/us/rss/topsongs/limit=${limit}/json`);
            const data = response.data.feed.entry;
            data.forEach(item => {
                info.push({
                    'artist': item['im:artist'].label,
                    'artwork': item['im:image'][2].label,
                    'song_name': item['im:name'].label
                })
            })
            return info
        } catch (err) {
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