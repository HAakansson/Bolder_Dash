import Tile from './Tile.js'
import { mapsArray } from './Maps.js'

export default {

    name: 'grid',

    components: {
        Tile,
    },

    props: ['level'],

    template: `
    <div class="grid-layout">
        <tile
        v-for="(tile, i) in tiles.flat()"
        v-bind:position="tile"
        v-bind:key="'tile' + i + tile.x + tile.y + tile.background"
        v-on:change-background="forceRender"
        ></tile>
    </div>
    `,

    data() {
        return {
            tiles: [],
            customGrid: mapsArray[this.level],
            gridHeight: 20,
            gridWidth: 30,
            playerHasMoved: false,
            diamondsCollected: null,
            maxNumberOfDiamonds: null,
            playerIsStuck: false,

            playerPos: {
                row: null,
                col: null,
                heading: null
            },
            enemyPos: [],
        }
    },

    created() {

        for (let row = 0; row < this.gridHeight; row++) {
            this.tiles[row] = []
            for (let col = 0; col < this.gridWidth; col++) {
                let position = {
                    // TODO MAYBE - Create an instance of a class here instead of x, y and background. Like a boulder class or something.
                    x: col,
                    y: row,
                    background: Tile.dirt
                }
                this.tiles[row].push(position)
            }
        }

        this.populateMap()
        this.getTotalNumberOfDiamonds()
        var musicTheme = new Audio('Sound/MainTheme.mp3');
        musicTheme.play();
    },

    updated() {

        this.playerHasMoved = false;
        this.updateRollingStones();
        // TODO MAYBE - Fix so enemy moves when player moves, and it moves towards player.
        this.enemyUpdate();
        this.canKill = false;
        this.forceRender()

        if (this.checkIfPlayerIsStuck() && this.playerIsStuck === false) {
            this.playerIsStuck = true

            setTimeout(() => {
                this.$emit('game-over')

                setTimeout(() => {
                    alert("The player got stuck! Game Over")
                    this.$emit('resetGame')
                }, 100);

            }, 1000);
        }
    },

    methods: {
        forceRender: function () {
            // rensar timern efter varje gång en sten har rört sig
            clearTimeout(this.renderTimeout);
            this.renderTimeout = setTimeout(() => {
                // This will make the component re-render
                Vue.set(this.tiles, 0, this.tiles[0]);
            }, 100)
        },

        updatePlayerMovement: function (direction) {

            if (this.playerHasMoved) { return; }
            this.playerHasMoved = true;

            const row = this.playerPos.row;
            const col = this.playerPos.col
            const tile = this.tiles[row][col];

            switch (direction) {
                case 'right': {
                    const tileToTheRight = this.tiles[row][col + 1];
                    const tile2StepsToTheRight = this.tiles[row][col + 2]
                    const newPlayerPos = { row, col: col + 1, heading: 'right' };

                    if (tileToTheRight.background !== Tile.brick &&
                        tileToTheRight.background !== Tile.boulder) {

                        tile.background = Tile.empty;
                        tileToTheRight.background = Tile.player;

                        this.playerPos = newPlayerPos;
                        this.forceRender();
                    } else if (tileToTheRight.background === Tile.boulder &&
                        tile2StepsToTheRight.background === Tile.empty) {

                        tileToTheRight.background = Tile.player;
                        tile2StepsToTheRight.background = Tile.boulder;
                        tile.background = Tile.empty;

                        this.playerPos = newPlayerPos;
                        this.forceRender();
                    }
                }
                    break
                case 'up': {
                    const moveUp = this.tiles[row - 1][col]
                    const newPlayerPos = { row: row - 1, col, heading: 'up' };

                    if (moveUp.background !== Tile.brick &&
                        moveUp.background !== Tile.boulder) {
                        tile.background = Tile.empty;
                        moveUp.background = Tile.player;

                        this.playerPos = newPlayerPos;
                        this.forceRender();
                    }
                }
                    break

                case 'left': {
                    const moveLeft = this.tiles[row][col - 1];
                    const checkIfEmpty = this.tiles[row][col - 2];
                    const newPlayerPos = { row, col: col - 1, heading: 'left' };

                    if (moveLeft.background !== Tile.brick &&
                        moveLeft.background !== Tile.boulder) {
                        tile.background = Tile.empty;
                        moveLeft.background = Tile.player;
                        this.playerPos = newPlayerPos;
                        this.forceRender();
                    } else if (moveLeft.background === Tile.boulder &&
                        checkIfEmpty.background === Tile.empty) {
                        moveLeft.background = Tile.player;
                        checkIfEmpty.background = Tile.boulder;
                        tile.background = Tile.empty;

                        this.playerPos = newPlayerPos;
                        this.forceRender();
                    }
                }

                    break
                case 'down': {
                    const moveDown = this.tiles[row + 1][col];
                    const newPlayerPos = { row: row + 1, col, heading: 'down' };

                    if (moveDown.background !== Tile.brick &&
                        moveDown.background !== Tile.boulder) {
                        tile.background = Tile.empty;
                        moveDown.background = Tile.player;

                        this.playerPos = newPlayerPos;
                        this.forceRender();
                    }
                }
                    break

            }
        },

        updateRollingStones: function () {
            var boulderFall = new Audio('Sound/BoulderFall.mp3');
            // for (let row = this.gridHeiht - 1; row >= 0; row--) {
            //     for (let col = 0; col < this.gridWidth; col++) {
            //         //this.tiles[row][col].playerHasMoved = false;
            //         this.tiles[row][col].canKill = false;
            //     }
            // }
            // //Loopar nerifrån och upp för att undvika att stenarna går åt sidan ist för ner
            for (let row = this.gridHeight - 1; row >= 0; row--) {
                for (let col = 0; col < this.gridWidth; col++) {
                    const tile = this.tiles[row][col];

                    if (tile.background === Tile.boulder || tile.background === Tile.diamond) {
                        let tempTile = tile.background;
                        const tileUnder = this.tiles[row + 1][col]
                        const tileAbove = this.tiles[row - 1][col]
                        // const tile2StepsUnder = this.tiles[row + 2][col]
                        if (tileUnder.background === Tile.boulder || tileUnder.background === Tile.diamond) {
                            const tileLeft = this.tiles[row][col - 1];
                            const tileRight = this.tiles[row][col + 1];
                            tileAbove.canKill = false;
                            tileUnder.canKill = false;
                            tile.canKill = false;
                            if (tileRight.background == Tile.empty) {
                                const tileRightUnder = this.tiles[row + 1][col + 1];
                                if (tileRightUnder.background == Tile.empty) {
                                    tile.background = Tile.empty;
                                    tileRight.background = tempTile;
                                    //tileRight.playerHasMoved = true;
                                    this.forceRender();
                                }
                            } else if (tileLeft.background == Tile.empty) {
                                const tileLeftUnder = this.tiles[row + 1][col - 1];
                                if (tileLeftUnder.background == Tile.empty) {
                                    tile.background = Tile.empty;
                                    tileLeft.background = tempTile;
                                    //tileLeft.playerHasMoved = true;
                                    this.forceRender();
                                }
                            }
                        } else if (tileUnder.background === Tile.empty) {
                            boulderFall.play();
                            tile.canKill = false
                            tileUnder.canKill = true
                            tileUnder.background = tempTile;
                            tile.background = Tile.empty;
                            //tile.playerHasMoved = true
                            this.forceRender();
                        } else if (tileUnder.background === Tile.player && tile.canKill === true) {
                            // boulderFall.play();
                            tileUnder.background = tempTile;
                            tile.background = Tile.empty;
                            this.explodes(tileUnder)
                            this.forceRender();

                        } else {
                            tile.canKill = false
                        }
                    }
                }
            }
        },

        explodes(tile) {
            let tileRight = this.tiles[tile.y][tile.x + 1]
            let tileRightDown = this.tiles[tile.y + 1][tile.x + 1]
            let tileDown = this.tiles[tile.y + 1][tile.x]
            let tileLeftDown = this.tiles[tile.y + 1][tile.x - 1]
            let tileLeft = this.tiles[tile.y][tile.x - 1]
            let tileLeftAbove = this.tiles[tile.y - 1][tile.x - 1]
            let tileAbove = this.tiles[tile.y - 1][tile.x]
            let tileRightAbove = this.tiles[tile.y - 1][tile.x + 1]

            tile.background = Tile.explode
            tileRight.background = Tile.explode
            tileRightDown.background = Tile.explode
            tileDown.background = Tile.explode
            tileLeftDown.background = Tile.explode
            tileLeft.background = Tile.explode
            tileLeftAbove.background = Tile.explode
            tileAbove.background = Tile.explode
            tileRightAbove.background = Tile.explode

            setTimeout(() => {
                this.$emit('game-over')

                setTimeout(() => {
                    alert("Game Over")
                    this.$emit('resetGame')
                }, 100);

            }, 2000);
            var deathSound = new Audio('Sound/DeathSound.mp3');
            deathSound.play();
            var explotionSound = new Audio('Sound/Explotion.mp3');
            explotionSound.play();
            this.$emit('game-over')
        },

        populateMap() {
            for (let row = 0; row < this.gridHeight; row++) {
                for (let col = 0; col < this.gridWidth; col++) {
                    switch (this.customGrid[row][col]) {
                        case 'B':
                            this.tiles[row][col].background = Tile.brick
                            break
                        case 'O':
                            this.tiles[row][col].background = Tile.empty
                            break
                        case 'P':
                            this.tiles[row][col].background = Tile.player;
                            this.playerPos = { row, col }
                            break
                        case 'S':
                            this.tiles[row][col].background = Tile.boulder
                            break
                        case 'D':
                            this.tiles[row][col].background = Tile.diamond
                            break
                        case 'E':
                            this.tiles[row][col].background = Tile.enemy
                            this.enemyPos.push({ row, col, heading: 0 })
                            break
                        case ' ':
                            break
                        default:
                            console.error('Unknown tile:', this.customGrid[row][col])
                            break
                    }
                    // this.tiles[col][row].type = this.tileType
                    // index++
                    // console.log(index)
                }
            }

        },

        canMove(row, col) {
            return this.tiles[row][col].background === Tile.empty || this.tiles[row][col].background === Tile.player;
        },

        changeEnemyHeading(enemy) {
            switch (enemy.heading) {
                case 0:
                    if (this.canMove(enemy.row, enemy.col - 1)) {
                        enemy.heading = 3;
                    } else if (!this.canMove(enemy.row - 1, enemy.col)) {
                        enemy.heading = 1;
                    }

                    break;
                case 1:
                    if (this.canMove(enemy.row - 1, enemy.col)) {
                        enemy.heading = 0;
                    } else if (!this.canMove(enemy.row, enemy.col + 1)) {
                        enemy.heading = 2;
                    }

                    break;
                case 2:
                    if (this.canMove(enemy.row, enemy.col + 1)) {
                        enemy.heading = 1;
                    } else if (!this.canMove(enemy.row + 1, enemy.col)) {
                        enemy.heading = 3;
                    }

                    break;
                case 3:
                    if (this.canMove(enemy.row + 1, enemy.col)) {
                        enemy.heading = 2;
                    } else if (!this.canMove(enemy.row, enemy.col - 1)) {
                        enemy.heading = 0;
                    }

                    break;
            }
        },

        moveEnemy(enemy) {
            switch (enemy.heading) {
                case 0:
                    if (!this.canMove(enemy.row - 1, enemy.col)) {
                        return;
                    }
                    break;
                case 1:
                    if (!this.canMove(enemy.row, enemy.col + 1)) {
                        return;
                    }
                    break;
                case 2:
                    if (!this.canMove(enemy.row + 1, enemy.col)) {
                        return;
                    }
                    break;
                case 3:
                    if (!this.canMove(enemy.row, enemy.col - 1)) {
                        return;
                    }
                    break;

            }

            this.tiles[enemy.row][enemy.col].background = Tile.empty;

            switch (enemy.heading) {
                case 0:
                    enemy.row -= 1
                    break;
                case 1:
                    enemy.col += 1;
                    break;
                case 2:
                    enemy.row += 1;
                    break;
                case 3:
                    enemy.col -= 1;
                    break;
            }
            this.tiles[enemy.row][enemy.col].background = Tile.enemy;

            this.forceRender();
        },

        enemyUpdate: function () {
            this.enemyPos.forEach((enemy, index) => {
                this.changeEnemyHeading(enemy)
                this.moveEnemy(enemy);
                if (enemy.row === this.playerPos.row && enemy.col === this.playerPos.col) {
                    this.explodes(this.tiles[enemy.row][enemy.col])
                }
            })
        },

        // Check if tile player stands on contains a diamond
        checkForDiamonds() {

            for (let row = 0; row < this.gridHeight; row++) {

                for (let col = 0; col < this.gridWidth; col++) {

                    if (this.customGrid[row][col] == 'D' && this.tiles[row][col].background == Tile.player) {

                        this.diamondsCollected += 1
                        this.$emit('collected', this.diamondsCollected)
                    }
                }
            }
        },

        // Check how many diamonds the whole level have
        getTotalNumberOfDiamonds() {
            for (let row = 0; row < this.gridHeight; row++) {
                for (let col = 0; col < this.gridWidth; col++) {
                    if (this.customGrid[row][col] == 'D') {
                        this.maxNumberOfDiamonds += 1
                    }
                }
            }

            this.$emit('total', this.maxNumberOfDiamonds)
        },

        checkIfPlayerIsStuck() {
            for (let col = this.gridWidth - 1; col >= 0; col--) {
                for (let row = 0; row < this.gridHeight; row++) {
                    let tile = this.tiles[row][col];
                    if (tile.background === Tile.player) {

                        let tileToTheRight = this.tiles[row][col + 1]
                        let tile2StepsToTheRight = this.tiles[row][col + 2]
                        let tileUnder = this.tiles[row + 1][col]
                        let tileToTheLeft = this.tiles[row][col - 1]
                        let tile2StepsToTheLeft = this.tiles[row][col - 2]
                        let tileAbove = this.tiles[row - 1][col]
                        const tile2StepsUp = this.tiles[row - 2][col]

                        if (
                            (tileToTheRight.background === Tile.brick || tileToTheRight.background === Tile.boulder) &&
                            (tile2StepsToTheRight.background === Tile.brick || tile2StepsToTheRight.background === Tile.boulder || tile2StepsToTheRight.background === Tile.dirt || tile2StepsToTheLeft.background === Tile.diamonds) &&
                            (tileUnder.background === Tile.brick || tileUnder.background === Tile.boulder) &&
                            (tileToTheLeft.background === Tile.brick || tileToTheLeft.background === Tile.boulder) &&
                            (tile2StepsToTheLeft.background === Tile.brick || tile2StepsToTheLeft.background === Tile.boulder || tile2StepsToTheLeft.background === Tile.dirt || tile2StepsToTheLeft.background === Tile.diamonds) &&
                            (tileAbove.background === Tile.brick || tileAbove.background === Tile.boulder)
                        ) {
                            // console.log(true)
                            return true
                        }
                        // console.log(false)
                        return false
                    }
                }
            }

        },
    },

    watch: {
        playerHasMoved(val) {
            if (val) {
                this.checkForDiamonds()
            }
        }
    },
}