//navbar
const nav = document.querySelector('nav');

const closeNavButton = document.querySelector('.closeNavButton');

let hamburger = document.querySelector('.hamburger');

function toggleState() {
    nav.classList.toggle('active'); //show the nav
    hamburger.style.display = 'none'; //hide the hamburger icon
}

//this event generates the clicks on the burger icon
hamburger.addEventListener('click', toggleState);

//this event generates the clicks on the close nav
closeNavButton.addEventListener('click', () => {
    hamburger.style.display = 'block';
    nav.classList.toggle('active');
});



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
const {song_name, artist} = encode(window.location.href)
const fetcher_view = new arrax();
const artwork = document.getElementById('artwork');
const name = document.getElementById('song_title')
const artist_name = document.getElementById('artist_name');
const date = document.getElementById('date_release')
const song_writter = document.getElementById('song_writter')
const preview = document.getElementById('preview_youtube');
const suggested = document.getElementById('suggested');
async function setInfo(artist, song_name) {
    try {
        let suggested_songs = []
        const link = await fetcher_view.getSongByQuery(artist, song_name)
        setLyrics(link.result.url)
        const moreInfo = await fetcher_view.getSongById(link.result.id)
        suggested_songs.push(moreInfo.data.response.song.song_relationships);
        const release_date = moreInfo.data.response.song.release_date;
        const writter = moreInfo.data.response.song.writer_artists[0].name;
        let youtube = moreInfo.data.response.song.media;
        youtube.forEach(item => {
            if (item.provider == 'youtube') {
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
        preview.setAttribute('href', youtube)

        let b = 0;
        while (b < suggested_songs[0].length) {
            let count = suggested_songs[0][b];
            if(count.songs.length > 4){
                suggested_songs= []
                suggested_songs.push(count.songs)
                suggested_songs[0].forEach(song=>{
                    const template_suggested =  `
                      <div class="card">
                              <div class="artwork">
                              <img src="${song.song_art_image_thumbnail_url}"
                                  alt="">
                              </div>
                              <div title="${song.title}" class="music_title"><a href="view.html?data=${song.title}+${song.primary_artist.name}">${song.title.slice(0,13) + '...'}</a></div>
                              <div title="${song.primary_artist.name}" class="music_name">${song.primary_artist.name}</div>
                          </div>
                      `
                  $(suggested).append(template_suggested)
              })
                b = suggested_songs[0].length
            }

            b++
        }

    } catch (err) {
        console.log(err)
        swal("can't handle this request :(", "an error occurred while processing your request!", "error", {
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