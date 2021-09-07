class Utils {
    static dXFromAngleAndHypot(angle, hypot) {
        return hypot * Math.cos(Utils.toRadians(angle));
    }
    static dYFromAngleAndHypot(angle, hypot) {
        return hypot * Math.sin(Utils.toRadians(angle));
    }
    static toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }
    static toDegrees(radians) {
        return radians * (180 / Math.PI);
    }
    static isCollided(square1, square2) {
        return (
            (square1.x + square1.size / 2) >= (square2.x - square2.size / 2) &&
            (square1.x - square1.size / 2) <= (square2.x + square2.size / 2) &&
            (square1.y + square1.size / 2) >= (square2.y - square2.size / 2) &&
            (square1.y - square1.size / 2) <= (square2.y + square2.size / 2)
        )
    }
}
