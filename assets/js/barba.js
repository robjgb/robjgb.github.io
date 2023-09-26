import animationLeave from '/assets/js/animations/animationLeave.js';
import animationEnter from '/assets/js/animations/animationEnter.js';


function updateMenu(url) {
    const active = document.querySelector('.navbar-nav a.active');

    if (active !== null) {
        active.classList.remove('active');
    }

    const links = Array.from(document.querySelectorAll('.navbar-nav a'));
    const linkURLS = links.map(link => link.pathname);

    const index = linkURLS.indexOf(url);

    if (index !== -1) {
        links[index].classList.add('active');
    }
}

// hooks that will be triggered before any page transition
// meaning your menu active class will be updated before going to the next page
barba.hooks.before((data) => {
    updateMenu(data.trigger.pathname);
});

barba.init({
    preventRunning: true,
    transitions: [{
        name: 'default-transition',
            once({next}) {
                console.log("once");
            },
            afterOnce({next}){
                animationEnter(next.container);
            },
            leave: ({current}) =>
                animationLeave(current.container),
            enter({next}) {
                animationEnter(next.container);
            },

        name: 'disableMouse',
            before(){
                const body = document.querySelector('body');
                body.classList.add('noHover');
            },
            after(){
                const body = document.querySelector('body');
                body.classList.remove('noHover');
            },
        name: 'getNavActive',
            beforeOnce(data) {
                updateMenu(data.next.url.path);
            }
    }]
});
