//BETA FETCHER
class arrax{
    constructor(){
        this.api_token = `?access_token=ifVJ2NTFj1Zd3QDBhEcXccdzBIi-PMK0-trbe_18bMuh-pfme2CFI0X1WmdX_rWs`;
        this.base_url = `https://api.genius.com`
    }
    async getSongs(query){
        try{
            const song_name = query;
            const url_search = `${this.base_url}/search${this.api_token}&q=${song_name}`
            const response =  await fetch(url_search);
            const json = await response.json();
            return json.response.hits
            
        }
        catch(err){
            return console.log('not found')
        }
    } 
    async getSongByQuery(artist_name , song){
        const artist = artist_name;
        const song_name = song;
        const url_search = `${this.base_url}/search${this.api_token}&q=${artist} ${song_name}`
        const response = await fetch(url_search);
        const json = await response.json();
        let arr = json.response.hits;
        let valide_song = [];
        arr.forEach(song =>{
            const title = song.result.full_title;
            const reg_song_name = new RegExp(song_name , 'gi')
            const reg_artist_name = new RegExp(artist , 'gi')
            if(title.match(reg_song_name) && title.match(reg_artist_name)){
                valide_song = song;
            }
        })
        return valide_song
    }
    getLyrics(url){ 
        axios.defaults.baseURL = 'https://arrax.herokuapp.com';
        let song = url;
        axios.post('/lyrics',
        {
            data:{
                url:song 
            },
        }
        
        )
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error.message);
        })
    }
}
const arrax1 =  new arrax();
let song_;
const song = arrax1.getSongByQuery('ezhel' , 'felaket')
song.then((res)=>{
    song_ = res.result.url
}).then(()=>{
    arrax1.getLyrics(song_);
})