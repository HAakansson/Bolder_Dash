import Tile from './Tile.js'
import { mapsArray } from './Maps.js'
import Enemy from './Enemy.js'

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
            playerIsStuck: false,
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
                // console.log(Enemy.moveRight(position))
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

        let enemyPos = this.findEnemy()
        // console.log('Enemy Pos = ', enemyPos)
        let newEnemyPos = Enemy.move(enemyPos, null, this.tiles, 2)
        this.updateEnemyPosition(enemyPos, newEnemyPos, this.tiles)

        this.canKill = false;
        this.forceRender()

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
                            boulderFall.play();
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

            // this.$emit('game-over')
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
                        case 'E': this.tiles[row][col].background = Tile.enemy
                    }
                    // this.tiles[col][row].type = this.tileType
                    // index++
                    // console.log(index)
                }
            }

        },

        findEnemy() {
            for (let col = 0; col < this.gridWidth; col++) {
                for (let row = 0; row < this.gridHeight; row++) {
                    const tileEnemy = this.tiles[row][col]
                    if(tileEnemy.background === Tile.enemy)
                    return tileEnemy
                }
            }
        },

        findPlayer() {
            for (let col = 0; col < this.gridWidth; col++) {
                for (let row = 0; row < this.gridHeight; row++) {
                    const tilePlayer = this.tiles[row][col]
                    if(tilePlayer.background === Tile.player)
                    return tilePlayer
                }
            }
        },

        updateEnemyPosition(enemyPos, newEnemyPos, grid){
            
            let playerPos = this.findPlayer()
            // console.log(playerPos)
            let tileAbove = grid[enemyPos.y - 1][enemyPos.x]
            let tileDown = grid[enemyPos.y + 1][enemyPos.x]
            let tileRight = grid[enemyPos.y][enemyPos.x + 1]
            let tileLeft = grid[enemyPos.y][enemyPos.x - 1]

            if(
                tileAbove.background === Tile.player ||
                tileDown.background === Tile.player ||
                tileRight.background === Tile.player ||
                tileLeft.background === Tile.player
            ) {
                this.explodes(grid[playerPos.y][playerPos.x])
                console.log('Explosion')
            } else if (this.tiles[newEnemyPos.y][newEnemyPos.x].background === Tile.empty){
                this.tiles[enemyPos.y][enemyPos.x].background = Tile.empty
                this.tiles[newEnemyPos.y][newEnemyPos.x].background = Tile.enemy
            }
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

        playerHasMoved(val) {
            if (val) {
                this.checkForDiamonds()
            }
        }
    },
}