export class GameState {
    constructor() {
        this.isWin = false;
        this.currentRotation = 0;
        this.isDragging = false;
        this.attempts = 0;
    }
    
    checkWinCondition(rotation) {
        return rotation > -1 && rotation < 1;
    }
    
    setWinState(isWin) {
        this.isWin = isWin;
        document.body.classList.toggle('win', isWin);
        if (isWin) this.attempts++;
    }
    
    setRotation(rotation) {
        this.currentRotation = rotation;
    }
    
    setDragging(isDragging) {
        this.isDragging = isDragging;
    }
    
    getStats() {
        return {
            attempts: this.attempts,
            isWin: this.isWin,
            currentRotation: this.currentRotation
        };
    }
}