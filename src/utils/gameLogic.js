import { getShadowXY } from './shadowCalculations.js';

export const adjustPicture = (rotation, duration = 0) => {
    // Обновляет тени и блики при повороте изображения.
    const [outerShadowX, outerShadowY] = getShadowXY(rotation, false);

    gsap.to("#shadow", {
        x: outerShadowX,
        y: outerShadowY,
        duration
    });

    const [innerShadowX, innerShadowY] = getShadowXY(rotation, true);

    gsap.to("#inner-shadow", {
        x: innerShadowX,
        y: innerShadowY,
        duration
    });

    //постоянство белых бликующих линий
    gsap.to("#glare-group", {
        duration,
        rotate: -1 * rotation,
        transformOrigin: "center center"
    });
};

export const handleMoveEnd = (rotation, triangleTL) => {
    // Вызывается по завершении перетаскивания или по инерции. 
    // Применяет гравитацию и "выигрышное" состояние.

    //если изображениие высоко, применить искусственную гравитацию
    if (rotation > 45 || rotation < -45) {
        const sign = Math.sign(rotation);
        const newRotation = gsap.utils.random(15, 25, 1) * sign;
        gsap.to('#picture-frame', {
            rotation: newRotation,
            duration: 2
        });
        adjustPicture(newRotation, 2);
    }

    //проверка состояния 'win'
    const body = document.querySelector("body");
    if (rotation > -1 && rotation < 1) {
        body.classList.add("win");
        if (triangleTL) triangleTL.resume();
    } else {
        body.classList.remove("win");
        if (triangleTL) triangleTL.pause();
    }
};