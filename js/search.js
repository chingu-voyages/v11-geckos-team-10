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


const fetcher_search = new arrax();
const input = document.getElementById('search_input');
const search = document.getElementById('search_input');
const button = document.getElementById('search_button');
const header_collaps = document.querySelector('#search .header');
const search_res_container = document.getElementById('search_container');

button.addEventListener('click' , async (e)=>{
    if(search.value.length < 3 ){
        return
    }
    $('.card').fadeOut(()=>{
        $('.card').remove()
    })
    e.preventDefault()
    const songs = await fetcher_search.getSongs(search.value)
    if(songs.length < 1){
        header_collaps.style.height='90.5vh';
        swal("404", "can't find the song you are looking for", "info", {
            button: "OK",
        })
    }else{
        header_collaps.style.height='50vh';
        search_res_container.style.display ='flex'
        songs.forEach(song=>{
        const {title , song_art_image_thumbnail_url} = song.result;
        const artist = song.result.primary_artist.name;
        const template = `
            <div class="card">
            <img src="${song_art_image_thumbnail_url}"
                alt="">
            <div title="${title}" class="music_title"><a href="view.html?data=${title}+${artist}">${title.slice(0,13) + '...'}</a></div>
            <div title="${artist}" class="music_name">${artist}</div>
            </div>`
        $(search_res_container).append(template) 
        }
        )
    }
})

