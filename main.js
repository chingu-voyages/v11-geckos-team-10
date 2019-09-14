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