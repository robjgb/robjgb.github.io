const animationLeave = (container) => {

    const animate = container.querySelectorAll('.reveal-animate');
    const animate2 = container.querySelectorAll('.reveal-animate-2');


    const tl = gsap.timeline({
        defaults: {
            ease: 'power4.out'
       }
    })

    tl
    .fromTo(animate, { yPercent:0, stagger:0.05}, {yPercent:-200, opacity:0 }, 0)
    .fromTo(animate2, { yPercent:0, stagger:0.05}, {yPercent:-200, opacity:0 }, 0)

    return tl;

}

export default animationLeave;
