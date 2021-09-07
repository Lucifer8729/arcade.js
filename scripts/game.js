class Game {
    constructor(div) {
        this.fps = 60;
        this.pressedKeys = {};
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d");

        div.appendChild(this.canvas);
        this._setSizes();
        window.onresize = this._onResize.bind(this);
    }

    start() {
        this.asteroidField = new AsteroidField();
        this.ship = new Ship(this.width / 2, this.height / 2);

        this.intervalId = setInterval(this._loop.bind(this), 1000 / this.fps);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    keyDown(keyCode) {
        this.pressedKeys[keyCode] = true;
    }

    keyUp(keyCode) {
        delete this.pressedKeys[keyCode];
    }


    /* Private Methods */
    _setSizes() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    _onResize() {
        this._setSizes();
        this._draw();
    }

    _loop() {
        this._update();
        this._draw();
    }

    _update() {
        this._respondToPressedKeys();
        this._updatePositions();
        this._checkForImpacts();
    }

    _draw() {
        this.asteroidField.render();
        this.ship.render();
    }

    _respondToPressedKeys() {
        if (this.pressedKeys[38]) {
            this.ship.accelerate();
        } 
        if (this.pressedKeys[40]) {
            this.ship.brake();
        }
        if (this.pressedKeys[37]) {
            this.ship.turnLeft();
        }
        if (this.pressedKeys[39]) {
            this.ship.turnRight();
        }
        if (this.pressedKeys[32]) {
            this.ship.fireRocket();
        }
    }

    _updatePositions() {
        let dt = 1 / this.fps;

        for (let asteroid of this.asteroidField.asteroids) {
            this._updateObjectPos(asteroid, dt);
        }

        for (let rocket of this.ship.rockets) {
            rocket.age += dt;
            this._updateObjectPos(rocket, dt);
        }
        this.ship.rockets = this.ship.rockets.filter(rocket => rocket.age < this.ship.maxRocketAge);

        this._updateObjectPos(this.ship, dt);
    }

    _checkForImpacts() {
        for (let rocket of this.ship.rockets) {
            for (let asteroid of this.asteroidField.asteroids) {
                if (Utils.isCollided(rocket, asteroid)) {
                    this.asteroidField.rocketHitsAsteroid(rocket, asteroid);
                    if (this.asteroidField.asteroids.length === 0) {
                        this._gameWon("You win!!");
                    }
                }
            }
            if (Utils.isCollided(rocket, this.ship) && rocket.age > 0.4) {
                this._gameOver("Your ship was destroyed by one of your own rockets!");
            }
        }

        for (let asteroid of this.asteroidField.asteroids) {
            if (Utils.isCollided(asteroid, this.ship)) {
                this._gameOver("Your ship was destroyed by an asteroid!");
            }
        }
    }

    _updateObjectPos(object, dt) {
        object.x += Utils.dXFromAngleAndHypot(object.heading, dt * object.velocity);
        object.y += Utils.dYFromAngleAndHypot(object.heading, dt * object.velocity);

        if (object.y > this.height) {
            object.y = 0;
        } else if (object.y < 0) {
            object.y = this.height;
        } else if (object.x > this.width) {
            object.x = 0;
        } else if (object.x < 0) {
            object.x = this.width;
        }
    }

    _gameOver(message) {
        this.stop();
        setTimeout(this._printEndOfGameMessage.bind(this, message, true), this.intervalId + 1);
    }
    
    _gameWon(message) {
        this.stop();
        setTimeout(this._printEndOfGameMessage.bind(this, message, false), this.intervalId + 1);
    }
    
    _printEndOfGameMessage(message, gameLost) {
        let ctx = this.canvas.getContext("2d");
        ctx.fillStyle = 'red';
        if (gameLost) {
            ctx.font = '48px serif';
            ctx.fillText('Game Over!', 10, 50);
        }
        ctx.font = '24px serif';
        ctx.fillText(message, 10, 150);
    }
}