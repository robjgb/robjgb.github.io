const animationEnter = (container) => {

    const animate = container.querySelectorAll('.reveal-animate');
    const animate2 = container.querySelectorAll('.reveal-animate-2');

    const tl = gsap.timeline({
    })

    tl
    .fromTo(animate, {y: -100,ease: "power4.out",delay: 0.3,skewY: -10,stagger: {amount: 0.3}, opacity: 0},
        {y:0,opacity: 1, skewY: 0}, 0)
    .fromTo(animate2, { yPercent:-300, stagger:0.05, opacity: 0},  {yPercent:0,opacity: 1}, 0)

    return tl;

}

export default animationEnter;
