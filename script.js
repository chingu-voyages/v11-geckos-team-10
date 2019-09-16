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
/* Simple usage of arrax local script */

// const fetcher = new arrax();
// let song = null;
// fetcher.getSongByQuery('russ', 'some time')
//     .then(response => {
//         song = response.result.url
//         console.log(response)
//     }).then(() => {
//         fetcher.getLyrics(song)
//             .then(res => {
//                 console.log(res)
//             })
//     })

fetch("http://api.deezer.com/editorial/0/charts", {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "87dfe9e82amshf1b38b7b8830090p181fe0jsnc80ae8869c22"
        }
    })
    .then(response => {
        return response.json()
    }).then(data => {
        console.log(data)
    })
    .catch(err => {
        console.log(err);
    })