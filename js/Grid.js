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
        ref="tileComponenet"
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
            enableExit: false,
            playerIsStuck: false
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
            this.$emit('player-stuck')
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

            for (let col = this.gridWidth - 1; col >= 0; col--) {
                for (let row = 0; row < this.gridHeight; row++) {
                    const tile = this.tiles[row][col];

                    switch (direction) {
                        case 'right':

                            if (tile.background == Tile.player) {

                                const tileToTheRight = this.tiles[row][col + 1];
                                const tile2StepsToTheRight = this.tiles[row][col + 2]

                                if (tileToTheRight.background !== Tile.brick &&
                                    tileToTheRight.background !== Tile.boulder) {

                                    tile.background = Tile.empty;
                                    tileToTheRight.background = Tile.player;
                                    this.forceRender();



                                } else if (tileToTheRight.background === Tile.boulder &&
                                    tile2StepsToTheRight.background === Tile.empty) {

                                    tileToTheRight.background = Tile.player;
                                    tile2StepsToTheRight.background = Tile.boulder;
                                    tile.background = Tile.empty;
                                    this.forceRender();

                                }
                            }
                            break
                        case 'up':
                            if (tile.background === Tile.player) {
                                const moveUp = this.tiles[row - 1][col]
                                if (moveUp.background !== Tile.brick &&
                                    moveUp.background !== Tile.boulder) {
                                    tile.background = Tile.empty;
                                    moveUp.background = Tile.player;
                                    this.forceRender();

                                }
                            }
                        default:
                            break;
                    }
                }
            }

            for (let row = this.gridHeight - 1; row >= 0; row--) {
                for (let col = 0; col < this.gridWidth; col++) {
                    const tile = this.tiles[row][col];
                    switch (direction) {
                        case 'left':
                            if (tile.background === Tile.player) {
                                const moveLeft = this.tiles[row][col - 1];
                                const checkIfEmpty = this.tiles[row][col - 2];
                                if (moveLeft.background !== Tile.brick &&
                                    moveLeft.background !== Tile.boulder) {
                                    tile.background = Tile.empty;
                                    moveLeft.background = Tile.player;
                                    this.forceRender();
                                } else if (moveLeft.background === Tile.boulder &&
                                    checkIfEmpty.background === Tile.empty) {
                                    moveLeft.background = Tile.player;
                                    checkIfEmpty.background = Tile.boulder;
                                    tile.background = Tile.empty;
                                    this.forceRender();
                                }
                            } break
                        case 'down':
                            if (tile.background === Tile.player) {
                                const moveDown = this.tiles[row + 1][col];
                                if (moveDown.background !== Tile.brick &&
                                    moveDown.background !== Tile.boulder) {
                                    tile.background = Tile.empty;
                                    moveDown.background = Tile.player;
                                    this.forceRender();
                                }
                            }
                            break
                    }
                }
            }
        },

        updateRollingStones: function () {
            var boulderFall = new Audio('Sound/BoulderFall.mp3');
            for (let row = this.gridHeiht - 1; row >= 0; row--) {
                for (let col = 0; col < this.gridWidth; col++) {
                    this.tiles[row][col].playerHasMoved = false;
                    this.tiles[row][col].canKill = false;
                }
            }
            //Loopar nerifrån och upp för att undvika att stenarna går åt sidan ist för ner
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
                                    tileRight.playerHasMoved = true;
                                    this.forceRender();
                                    col++;
                                }
                            } else if (tileLeft.background == Tile.empty) {
                                const tileLeftUnder = this.tiles[row + 1][col - 1];
                                if (tileLeftUnder.background == Tile.empty) {
                                    tile.background = Tile.empty;
                                    tileLeft.background = tempTile;
                                    tileLeft.playerHasMoved = true;
                                    this.forceRender();
                                }
                            }
                        } else if (tileUnder.background === Tile.empty) {
                            boulderFall.play();
                            tile.canKill = false
                            tileUnder.canKill = true
                            tileUnder.background = tempTile;
                            tile.background = Tile.empty;
                            tile.playerHasMoved = true
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

            tile.background = 7
            tileRight.background = 7
            tileRightDown.background = 7
            tileDown.background = 7
            tileLeftDown.background = 7
            tileLeft.background = 7
            tileLeftAbove.background = 7
            tileAbove.background = 7
            tileRightAbove.background = 7

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
                            this.tiles[row][col].background = Tile.player
                            break
                        case 'S':
                            this.tiles[row][col].background = Tile.boulder
                            break
                        case 'D':
                            this.tiles[row][col].background = Tile.diamond
                            break
                        case 'E': 
                            this.tiles[row][col].background = Tile.enemy
                            break
                        case 'G':
                            this.tiles[row][col].background = Tile.exit
                    }
                    // this.tiles[col][row].type = this.tileType
                    // index++
                    // console.log(index)
                }
            }

        },

        enemyUpdate: function () {
            let rand = (Math.floor(Math.random() * 4));
            switch (rand) {

                case 0:
                    this.enemyMoveLeft();
                    break
                case 1:
                    this.enemyMoveUp();
                    break
                case 2:
                    this.enemyMoveRight();
                    break
                case 3:
                    this.enemyMoveDown();
                    break
            }


        },

        enemyMoveUp: function () {
            for (let col = this.gridWidth - 1; col >= 0; col--) {
                for (let row = 0; row < this.gridHeight; row++) {
                    const tile = this.tiles[row][col];
                    if (tile.background === Tile.enemy) {
                        const moveUp = this.tiles[row - 1][col]
                        if (moveUp.background === Tile.empty ||
                            moveUp.background === Tile.player) {
                            tile.background = Tile.empty;
                            moveUp.background = Tile.enemy;
                            this.forceRender();
                        }
                    }
                }
            }
        },

        enemyMoveDown: function () {
            for (let row = this.gridHeight - 1; row >= 0; row--) {
                for (let col = 0; col < this.gridWidth; col++) {
                    const tile = this.tiles[row][col];
                    if (tile.background === Tile.enemy) {
                        const moveDown = this.tiles[row + 1][col];
                        if (moveDown.background === Tile.empty ||
                            moveDown.background === Tile.player) {
                            tile.background = Tile.empty;
                            moveDown.background = Tile.enemy;
                            this.forceRender();
                        }
                    }
                }
            }


        },

        enemyMoveLeft: function () {
            for (let row = this.gridHeight - 1; row >= 0; row--) {
                for (let col = 0; col < this.gridWidth; col++) {
                    const tile = this.tiles[row][col];
                    if (tile.background === Tile.enemy) {
                        const moveLeft = this.tiles[row][col - 1];
                        if (moveLeft.background === Tile.empty ||
                            moveLeft.background === Tile.player) {
                            tile.background = Tile.empty;
                            moveLeft.background = Tile.enemy;
                            this.forceRender();
                        }
                    }
                }


            }
        },

        enemyMoveRight: function () {
            for (let col = this.gridWidth - 1; col >= 0; col--) {
                for (let row = 0; row < this.gridHeight; row++) {

                    const tile = this.tiles[row][col];

                    if (tile.background === Tile.enemy) {

                        const moveRight = this.tiles[row][col + 1];

                        if (moveRight.background === Tile.empty ||
                            moveRight.background === Tile.player) {

                            tile.background = Tile.empty;
                            moveRight.background = Tile.enemy;

                            this.forceRender();

                        }
                    }
                }
            }


        },
        // Check if tile player stands on contains a diamond
        checkForDiamonds() {

            for (let row = 0; row < this.gridHeight; row++) {

                for (let col = 0; col < this.gridWidth; col++) {

                    if (this.customGrid[row][col] == 'D' && this.tiles[row][col].background == Tile.player) {

                        this.diamondsCollected += 1
                        this.$emit('collected', this.diamondsCollected)

                        if (this.diamondsCollected === this.maxNumberOfDiamonds - 22) {
                            this.enableExit = true
                        }
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



        openExit() {

            //this.customGrid[15][29] = 'G'
            //this.customGrid[14][29] = 'G'
            this.customGrid[15][0] = 'G'
            this.customGrid[14][0] = 'G'
            this.tiles[15][0].background = Tile.exit
            this.tiles[14][0].background = Tile.exit

            //this.tiles[15][29].background = Tile.exit
            //this.tiles[14][29].background = Tile.exit
            this.forceRender()
        
        },

        checkForExit() {

            if ((this.customGrid[15][0] == 'G' || this.customGrid[14][0] == 'G') && (this.tiles[15][0].background == Tile.player || this.tiles[14][0].background == Tile.player)) {
                console.log("VICTORY")
                alert("FINISHED")
            }      
        },




        onKeyPressed(event) {
            let keyEvent = event.key

            switch (keyEvent) {
                case 'ArrowUp':
                case 'w':
                    this.updatePlayerMovement('up');
                    break;
                case 'ArrowDown':
                case 's':
                    this.updatePlayerMovement('down');
                    break
                case 'ArrowLeft':
                case 'a':
                    this.updatePlayerMovement('left');
                    break
                case 'ArrowRight':
                case 'd':
                    this.updatePlayerMovement('right');
                    break
            }
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
        }
    },

    watch: {

        enableExit(val) {
            if (val) {
                this.openExit()
            }
        },

     

        playerHasMoved(val) {  
            if (val) {
                this.checkForDiamonds()
                if (this.enableExit)this.checkForExit()
            }
        }
    },
}