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

const animationEnterOnce = (container) => {

    const tl = gsap.timeline({
    })

    return tl
     .from('.nav-animate-title', { autoAlpha:0, duration: 1}, 1)
     .from('.nav-animate', { autoAlpha:0, duration: 1}, 2)
     .fromTo(container, {y: -100,ease: "power4.out", delay: 3,skewY: -10,stagger: {amount: 0.3}, opacity: 0},
    {y:0,opacity: 1, skewY: 0}, 2)

}

// hooks that will be triggered before any page transition
// meaning your menu active class will be updated before going to the next page
barba.hooks.before((data) => {
    updateMenu(data.trigger.pathname);
});

barba.init({
    preventRunning: true,
    transitions: [{
            async once(data) {
                console.log("before");
                const body = document.querySelector('body');
                body.classList.remove('hide');
                body.classList.add('noHover');
                await animationEnterOnce(data.next.container);
                console.log("once");
            },
            afterOnce(){
                const body = document.querySelector('body');
                body.classList.remove('noHover');
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
