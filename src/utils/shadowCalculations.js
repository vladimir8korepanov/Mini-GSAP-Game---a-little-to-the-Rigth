export const getShadowXY = (rotation, inner = false) => {
    // Определяет положение теней на основе
    // поворота рамки изображения.
    // Использует разные значения для внутренних и внешних теней. возвращает [xPosition, yPosition]
    if (inner) {
        return [
            Math.sin(rotation / (180 / Math.PI)) * 10,
            Math.cos(rotation / (180 / Math.PI)) * 10
        ];
    } else {
        return [
            Math.sin(rotation / (180 / Math.PI)) * 45 + 15,
            Math.cos(rotation / (180 / Math.PI)) * 45
        ];
    }
};