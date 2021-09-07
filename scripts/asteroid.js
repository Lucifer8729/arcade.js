class Asteroid {
    constructor(x, y, heading, velocity, size) {
        this.x = x;
        this.y = y;
        this.heading = heading;
        this.velocity = velocity;
        this.size = size;
    }
    
    render() {
        game.ctx.fillStyle = '#ffffff';
        let leftX = this.x - this.size / 2;
        let topY = this.y - this.size / 2
        game.ctx.fillRect(leftX, topY, this.size, this.size);
    }
}