class Enemy {

    constructor(game, opt) {
        this.img = loadImage('assets/enemy.png');
        this.game = game;
        this.pos = { x: opt.x, y: opt.y };
        this.isAlive = true;
        this.size = this.game.size;
        this.timeout = 1000 + random(-300, 100);
        // this.strategy = new st(this) || new AleatoryStrategy(this); // Decide o tipo de estrátegia que será utilizada.
        this.setStrategy(opt.strategy);
        this.update();
        this.start();
    }

    setStrategy(opt) {
        switch (opt) {
            // case PseudoStrategy:
            //     this.strategy = new PseudoStrategy(this);
            //     break;
            case AleatoryStrategy:
                this.strategy = new AleatoryStrategy(this);
                break;
            default:
                this.strategy = new AleatoryStrategy(this);
        }
    }

    start() {
        this.interval = setInterval(() => {
            if (this.isAlive) {
                this.runStrategy();
                this.update();
            }
        }, this.timeout);
    }

    runStrategy() {
        this.strategy.run();
    }

    aleatoryStrategy() {
        let x = this.pos.x;
        let y = this.pos.y;
        if (random() > 0.5)
            x += round(random(-1, 1));
        else
            y += round(random(-1, 1));

        if (this.game.isUsableSpace(x, y))
            this.pos = { x, y };
        else this.aleatoryStrategy();
    }

    getMazePosition() {
        return this.game.maze[this.pos.y][this.pos.x];
    }

    update() {
        this.location = {
            x: this.pos.x * this.size,
            y: this.pos.y * this.size
        };
    }

    draw() {
        image(this.img, this.location.x, this.location.y, this.size, this.size);
        if (this.getMazePosition() == 4) {
            this.isAlive = false;
            clearInterval(this.interval);
            this.pos = { x: 0, y: 0 };
        }
    }

}