const nav = document.querySelector('nav');
const closeNavButton = document.querySelector('.closeNavButton');
let hamburger = document.querySelector('.hamburger');
const popular_songs_continer= document.getElementById('popular_songs');
const music_news= document.getElementById('music_news');
const recomanded_songs_container = document.getElementById('recommended_songs');
const fetcher = new arrax();
const loading_screen = document.querySelector('.loading_screen')

/* Send to view page */

/* Get Popular songs Function*/
function getPop(){
fetcher.getPopularSongs(50).then(res=>{
    res.forEach(item =>{
        const template = 
        `
        <div class="card">
            <img src="${item.artwork}"
                alt="">
            <div title="${item.song_name}" class="music_title"><a href="view.html?data=${item.song_name}+${item.artist}">${item.song_name.slice(0,13) + '...'}</a></div>
            <div title ="${item.artist}" class="music_name">${item.artist.split('&')[0]}</div>

        </div>
        `
        $(popular_songs_continer).append(template)
    })
})
}
getPop()

/*Get News Songs*/
async function getNews(){
    const reply = await fetcher.getNews()
    const template = await `
    <div class="image_news">
        <img class="illustration"
        src="${reply[0].image}"
        alt="illustration" />
    </div>

    <div class="block_container">
        <!-- container for the block beside the illustration -->
        <h1>${reply[0].title}</h1>
        <div class="block_paragraph">
           <p>${reply[0].content}</p>
        </div>
        <div class="button"><a target="_blank" href="${reply[0].url}">Read More</a></div>
    </div>`;
    $(music_news).append(template)
}
getNews()


/* Get recommended*/
async function getReco(){
    const reply = await fetcher.getRecom();
    const data = reply.data;
    data.forEach(song =>{
        const template = `
        <div class="card">
                <img src="${song.Artwork}"
                    alt="">
                <div title="${song.Name}" class="music_title"><a href="view.html?data=${song.Name}+${song.Artist}">${song.Name.slice(0,13) + '...'}</a></div>
                <div title="${song.Artist}" class="music_name">${song.Artist}</div>
            </div>
        `
        $(recomanded_songs_container).append(template)

    })
    loading_screen.style.display = 'none'
}
getReco()

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
