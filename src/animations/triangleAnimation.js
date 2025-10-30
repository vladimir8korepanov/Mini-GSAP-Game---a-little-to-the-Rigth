export const createTriangleAnimation = () => {
    return gsap.timeline({
        paused: true,
        repeat: -1,
        yoyo: true
    }).to("#wallpaper path", {
        rotate: 60,
        ease: "back.inOut(2.5)",
        duration: 0.6
    });
};

export const createArrowAnimation = (rotationSign) => {
    return gsap
        .timeline({ delay: 2, repeat: -1, repeatDelay: 2 })
        .to("#arrow", {
            duration: 0.8,
            drawSVG: "0% 100%",
            ease: "power2.inOut",
            rotate: 0
        })
        .to(
            "#arrow",
            {
                drawSVG: "100% 100%",
                duration: 0.4
            },
        )
        .set("#arrow", { drawSVG: "0% 0%", rotate: 40 * rotationSign });
};