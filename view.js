const loading_screen = document.querySelector('.loading_screen')
function encode(url) {
    const link = url.slice(url.indexOf('?') + 1)
    const c = link.slice(link.indexOf('=') + 1)
    const b = c.split('+')
    let data = []
    let output = []
    b.forEach(s => {
        if (s.includes('%20')) {
            let ext = s.split('%20');
            let f = "";
            ext.forEach(i => {
                f += " " + i
            })
            data.push(f)
        } else {
            data.push(s)
        }
    })
    output.push({
        "song_name": data[0],
        "artist": data[1]
    })
    return output[0]
}
const {
    song_name,
    artist
} = encode(window.location.href)
const fetcher_view = new arrax();
const artwork = document.getElementById('artwork');
const name = document.getElementById('song_title')
const artist_name = document.getElementById('artist_name');
const date = document.getElementById('date_release')
const song_writter = document.getElementById('song_writter')
const preview = document.getElementById('preview_youtube');
async function setInfo(artist, song_name) {
    try{
        const link = await fetcher_view.getSongByQuery(artist, song_name)
        setLyrics(link.result.url)
        const moreInfo = await fetcher_view.getSongById(link.result.id)
        const release_date = moreInfo.data.response.song.release_date;
        const writter = moreInfo.data.response.song.writer_artists[0].name;
        let youtube = moreInfo.data.response.song.media;
        youtube.forEach(item=>{
            if(item.provider == 'youtube'){
                youtube = item.url
            }
        })
        const {
            title,
            song_art_image_thumbnail_url
        } = link.result;
        const primary_artist = link.result.primary_artist.name;
        song_writter.textContent = writter;
        name.textContent = title;
        date.textContent = release_date;
        artist_name.textContent = primary_artist
        artwork.setAttribute('src', song_art_image_thumbnail_url)
        preview.setAttribute('href' ,  youtube)
    }
    catch(err){
        swal("404", "Sorry we can't find this song!", "error", {
            button: "Go Back Home",
        }).then(()=>{
            window.location.replace('index.html')
        })

    }
}
async function setLyrics(url) {
    const lyrics = document.getElementById('lyrics');
    const res = await fetcher_view.getLyrics(url)
    lyrics.textContent = res.trim()
    loading_screen.style.display = 'none'
}
setInfo(artist, song_name)