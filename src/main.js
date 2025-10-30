import { getShadowXY } from './utils/shadowCalculations.js';
import { adjustPicture, handleMoveEnd } from './utils/gameLogic.js';
import { createTriangleAnimation, createArrowAnimation } from './animations/triangleAnimation.js';
import { GameState } from './store/gameState.js';

// Инициализация состояния игры
const gameState = new GameState();
let triangleTL;

function init() {
    const initialRotation = 
        gsap.utils.random(8.5, 16, 0.1) * gsap.utils.random([1, -1]);

    // Настройка начальных позиций элементов
    gsap.set("#cat-image", { x: 275, y: 315 });
    gsap.set("#glare-2", {
        x: 60,
        y: 60
    });
    gsap.set("#glare-3", {
        x: 760,
        y: 360
    });

    gsap.set("#wallpaper path", { transformOrigin: "center" });

    // Создание анимаций
    triangleTL = createTriangleAnimation();

    // Установка начального поворота рамки
    gsap.set("#picture-frame", {
        rotation: initialRotation
    });

    adjustPicture(initialRotation, 0);
    gameState.setRotation(initialRotation);

    // Настройка стрелки-подсказки
    const rotationSign = Math.sign(initialRotation);
    gsap.set("#arrow", {
        stroke: "hsl(200, 20%, 20%)",
        y: 1010,
        scaleX: rotationSign * -1,
        x: () => (initialRotation > 0 ? 5 : 1050),
        drawSVG: "0%",
        opacity: 0.5,
        rotate: 40 * rotationSign
    });

    // Запуск анимации стрелки
    createArrowAnimation(rotationSign);
    
    // Плавное появление интерфейса
    gsap.to("body", {
        opacity: 1,
        duration: 0.2
    });

    // Инициализация перетаскивания
    Draggable.create("#picture-frame", {
        type: "rotation",
        inertia: true,
        bounds: { minRotation: -110, maxRotation: 100 },
        onDrag: function () {
            gameState.setDragging(true);
            gameState.setRotation(this.rotation);
            adjustPicture(this.rotation);
            gsap.to("#arrow", { opacity: 0, duration: 0.2 });
        },
        onDragEnd: function () {
            gameState.setDragging(false);
            handleMoveEnd(this.rotation, triangleTL);
            if (gameState.checkWinCondition(this.rotation)) {
                gameState.setWinState(true);
            }
        },
        onThrowUpdate: function () {
            gameState.setRotation(this.rotation);
            adjustPicture(this.rotation);
        },
        onThrowComplete: function () {
            handleMoveEnd(this.rotation, triangleTL);
            if (gameState.checkWinCondition(this.rotation)) {
                gameState.setWinState(true);
            }
        }
    });

    console.log('Game initialized with state:', gameState.getStats());
}

// Запуск игры когда DOM готов
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}