function updateMenu(url) {
    const active = document.querySelector('.navbar-nav a.active');

    if (active !== null) {
        active.classList.remove('active');
        console.log("remove", active)
    }

    const links = Array.from(document.querySelectorAll('.navbar-nav a'));
    const linkURLS = links.map(link => link.pathname);
    console.log(linkURLS, url);

    const index = linkURLS.indexOf(url);
    console.log(index);

    if (index !== -1) {
        console.log("add", links[index])
        links[index].classList.add('active');
    }
}

// hooks that will be triggered before any page transition
// meaning your menu active class will be updated before going to the next page
barba.hooks.before((data) => {
    console.log(data.trigger.pathname);
    updateMenu(data.trigger.pathname);
});

barba.init({
    preventRunning: true,
    transitions: [{
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
                console.log(data.next.url.path);
                updateMenu(data.next.url.path);
            },
            once(data) {
                return gsap.from(data.next.container, {
                opacity: 0
            });
            },
            afterOnce(){
            },
        name: 'opacity-transition',
             leave: ({current}) => {
                 gsap.to(current.container, {
                    autoAlpha: 0, duration: 1, clearProps:'all', ease:'none'
                });
            },
             enter({next}) {
                 gsap.from(next.container, {
                    autoAlpha: 0, duration: 1, clearProps:'all', ease:'none'
            });
        }
    }]
});
