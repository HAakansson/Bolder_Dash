import Tile from './Tile.js'
import Map1 from './Map1.js'

export default {

    name: 'grid',

    components: {
        Tile,
        Map1
    },

    template: `
    <div class="grid-layout">
        <tile 
        v-for="(tile, i) in flatTiles"
        v-bind:position="tile"
        v-bind:key="'tile' + i + tile.x + tile.y + tile.background"
        v-on:change-background="forceRender"
        ></tile>
    </div>
    `,

    data() {
        return {
            tiles: [],
            gridSize: 20,
            customGrid: [
                ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
                ['B','',' ',' ',' ',' ',' ','S',' ',' ',' ','S',' ','S',' ',' ',' ',' ','S',' ',' ',' ',' ',' ','D','S',' ',' ',' ','B'],
                ['B',' ','S','S',' ','S',' ',' ','S','S','D',' ','D','S',' ',' ','S',' ','S',' ','S',' ','S',' ',' ',' ',' ','S',' ','B'],
                ['B',' ','S','D',' ',' ',' ','S','D',' ',' ','S',' ',' ',' ','S',' ',' ',' ',' ','S',' ',' ','S',' ',' ',' ',' ',' ','B'],
                ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B',' ','B'],
                ['B',' ',' ',' ',' ',' ',' ',' ',' ',' ','B',' ',' ',' ',' ',' ',' ',' ',' ','S',' ',' ',' ','S',' ','S',' ',' ','D','B'],
                ['B','S',' ',' ','D',' ',' ',' ',' ','S','B',' ',' ',' ',' ',' ','S',' ',' ',' ',' ','S',' ',' ',' ','B',' ',' ','S','B'],
                ['B',' ',' ',' ',' ',' ',' ',' ','S','D','B',' ',' ',' ',' ',' ',' ','S',' ',' ',' ',' ',' ',' ',' ','B',' ',' ',' ','B'],
                ['B',' ','S',' ',' ',' ',' ',' ',' ','S','B',' ',' ',' ',' ',' ','D',' ','S',' ',' ',' ','S',' ',' ','B','B','B',' ','B'],
                ['B',' ','S',' ',' ',' ','D',' ',' ',' ','B',' ',' ',' ',' ',' ',' ',' ','B','B','B','B','D','S',' ',' ',' ','S','D','B'],
                ['B',' ','D','S',' ',' ',' ',' ',' ',' ','B','B','S',' ',' ',' ',' ',' ',' ','S',' ',' ',' ',' ',' ',' ',' ',' ',' ','B'],
                ['B',' ',' ','B','B','B',' ',' ',' ','B','B','D',' ',' ','B','B','B',' ',' ','S',' ',' ',' ',' ',' ',' ',' ',' ',' ','B'],
                ['B',' ',' ',' ','S',' ',' ',' ',' ',' ',' ',' ',' ',' ','S','D','B',' ',' ',' ',' ','S',' ','S',' ',' ',' ',' ',' ','B'],
                ['B',' ',' ',' ','S','B','B','B',' ',' ',' ',' ',' ',' ','B',' ',' ','S',' ',' ',' ',' ','S','D','S',' ','S',' ',' ','B'],
                ['B',' ',' ',' ','D',' ',' ','S',' ',' ','D',' ',' ',' ','B','B','B',' ',' ','S',' ',' ',' ','S',' ',' ',' ',' ',' ','B'],
                ['B',' ',' ',' ',' ',' ',' ',' ',' ',' ','B',' ',' ',' ','S',' ',' ',' ',' ','D',' ',' ',' ','S',' ',' ',' ',' ',' ','B'],
                ['B',' ',' ',' ',' ',' ','S',' ',' ','B','B','B','B','B','B','B',' ',' ',' ',' ',' ',' ',' ','S',' ','B','B','S',' ','B'],
                ['B',' ','S','S',' ',' ',' ',' ',' ','B',' ',' ','D',' ',' ','D',' ',' ',' ',' ','S',' ','S','D',' ','B','D',' ',' ','B'],
                ['B','P','D',' ',' ',' ',' ',' ',' ','S',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','B',' ',' ',' ','B'],
                ['B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B','B'],
            ],
            gridHeiht: 20,
            gridWidth: 30,
            counter: 1
        }
    },

    properties() {
        KeyboardEvent
    },

    computed: {
        flatTiles() {
            return this.tiles.flat()
        },
    },

    created() {

        for (let row = 0; row < this.gridHeiht; row++) {
            this.tiles[row] = []
            for (let col = 0; col < this.gridWidth; col++) {
                let position = {
                    x: col,
                    y: row,
                    background: Tile.empty
                }

                // if (
                //     position.y === 0 || position.y === this.gridHeiht - 1 ||
                //     position.x === 0 || position.x === this.gridWidth - 1) {
                //     position.background = Tile.brick
                // } 

                // if (position.x === 1 && position.y === 1 ||
                //     position.x === 2 && position.y === 2 ||
                //     position.x === 3 && position.y === 3 ) {
                //     position.background = Tile.boulder
                // }

                this.tiles[row].push(position)
            }
        }

        this.populateMap()
    },

    updated() {
        console.log("The grid has been changed");
        this.updateRollingStones();
        //this.updatePlayerMovement()
        // If the player moves, we should call forceRender
    },
    methods: {
        //Inbyggd vue metod
        start: function () {
            this.forceRender();
        },
        forceRender: function () {
            // rensar timern efter varje gång en sten hsr rört sig
            clearTimeout(this.renderTimeout);
            this.renderTimeout = setTimeout(() => {
                // This will make the component re-render
                Vue.set(this.tiles, 0, this.tiles[0]);
            }, 20)
        },

        updatePlayerMovement: function (direction) {
            if (direction === 'right' || direction === 'up') {
                for (let col = this.gridWidth - 1; col >= 0; col--) {
                    for (let row = 0; row < this.gridHeiht; row++) {
                        const tile = this.tiles[row][col];
                        if (direction === 'right') {
                            if (tile.background == Tile.player) {
                                const moveRight = this.tiles[row][col + 1];
                                const checkIfEmpty = this.tiles[row][col + 2]
                                if (moveRight.background !== Tile.brick &&
                                    moveRight.background !== Tile.boulder) {
                                    tile.background = Tile.empty;
                                    moveRight.background = Tile.player;
                                    this.forceRender();
                                } else if (moveRight.background === Tile.boulder && checkIfEmpty.background === Tile.empty) {
                                    moveRight.background = Tile.player;
                                    checkIfEmpty.background = Tile.boulder;
                                    tile.background = Tile.empty;
                                    this.forceRender();
                                }
                            }
                        } else if (direction === 'up') {
                            if (tile.background === Tile.player) {
                                const moveUp = this.tiles[row-1][col]
                                if (moveUp.background !== Tile.brick &&
                                    moveUp.background !== Tile.boulder) {
                                    tile.background = Tile.empty;
                                    moveUp.background = Tile.player;
                                    this.forceRender();
                                }
                            }
                        }
                    }
                }
            } else if (direction === 'left' || direction === 'down') {
                for (let row = this.gridHeiht - 1; row >= 0; row--) {
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
                                    } else if (moveLeft.background === Tile.boulder && checkIfEmpty.background === Tile.empty) {
                                        moveLeft.background = Tile.player;
                                        checkIfEmpty.background = Tile.boulder;
                                        tile.background = Tile.empty;
                                        console.log('Hej')
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
            }
        },

        updateRollingStones: function () {
            for (let row = this.gridHeiht - 1; row >= 0; row--) {
                for (let col = 0; col < this.gridWidth; col++) {
                    this.tiles[row][col].hasMoved = false;
                }
            }
            //Loopar nerifrån och upp för att undvika att stenarna går åt sidan ist för ner
            for (let row = this.gridHeiht - 1; row >= 0; row--) {
                for (let col = 0; col < this.gridWidth; col++) {
                    const tile = this.tiles[row][col];
                    if (tile.hasMoved == true) {
                        console.log('has moved')
                        //Om stenen redan har flyttats så - skip och loopa vidare på nästa
                        continue;
                    }

                    if (tile.background == Tile.boulder) {

                        const tileUnder = this.tiles[row + 1][col];
                        if (tileUnder.background == Tile.boulder) {

                            const tileLeft = this.tiles[row][col - 1];
                            const tileRight = this.tiles[row][col + 1];
                            if (tileRight.background == Tile.empty) {
                                const tileRightUnder = this.tiles[row + 1][col + 1];
                                if (tileRightUnder.background == Tile.empty) {
                                    // console.log("x:", tile.x, "y:", tile.y, "should move right");
                                    tile.background = Tile.empty;
                                    tileRight.background = Tile.boulder;
                                    tileRight.hasMoved = true;
                                    this.forceRender();
                                    col++;
                                }
                            } else if (tileLeft.background == Tile.boulder) {
                                const tileLeftUnder = this.tiles[row + 1][col - 1];
                                if (tileLeftUnder.background == Tile.empty) {
                                    // console.log("x:", tile.x, "y:", tile.y, "should move left");
                                    tile.background = Tile.empty;
                                    tileLeft.background = Tile.boulder;
                                    tileLeft.hasMoved = true;
                                    this.forceRender();
                                }
                            }
                        } else if (tileUnder.background == Tile.empty) {
                            tileUnder.background = Tile.boulder;
                            tile.background = Tile.empty;
                            tile.hasMoved = true;
                            this.forceRender();
                        }
                    }
                }
            }
        },

        populateMap() {

            for (let row = 0; row < this.gridHeiht; row++) {

                for (let col = 0; col < this.gridWidth; col++) {

                    switch(this.customGrid[row][col]) {

                        case 'B':
                            this.tiles[row][col].background = Tile.brick
                            break
                        case 'E':
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
                    }
                    // this.tiles[col][row].type = this.tileType
                    // index++
                    // console.log(index)
                }
            }
          
        }
    }
}
