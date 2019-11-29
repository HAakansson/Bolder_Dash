import Tile from './Tile.js'

export default {

    name: 'grid',

    components: {
        Tile
    },

    template: `
    <div class="grid-layout">
        <tile 
        v-for="(tile, i) in flatTiles"
        v-bind:position="tile"
        v-bind:key="'tile' + i + tile.x + tile.y + tile.background"
        ></tile>
    </div>
    `,

    data() {
        return {
            tiles: [],
            gridSize: 20,
            counter: 1
        }
    },

    computed: {
        flatTiles() {
            return this.tiles.flat()
        },

        //    image() {
        //         return this.tileState[].tileImage
        //    }
    },

    created() {

        for (let row = 0; row < this.gridSize; row++) {
            this.tiles[row] = []
            for (let col = 0; col < this.gridSize; col++) {
                let position = {
                    x: col,
                    y: row,
                    background: 2
                }
                if (
                    position.y === 0 ||
                    position.y === this.gridSize - 1 ||
                    position.x === 0 ||
                    position.x === this.gridSize - 1) {
                    position.background = 1
                } else if (Math.random() > 0.8) {
                    position.background = 3
                }

                // if(this.counter <= 10){
                //     if(position.background === 2){
                //         position.background = 0
                //         this.counter++
                //     } 
                // }

                this.tiles[row].push(position)
            }
        }

        setTimeout(() => {
            this.start();
        }, 10)
    },

    updated() {
        console.log("The grid has been changed");

        this.updateRollingStones();
        // this.updatePlayerMovement()
        // If the player moves, we should call forceRender
    },
    methods: {
        start: function () {
            this.forceRender();
        },
        forceRender: function () {
            // rensar timern efter varje gång en sten hsr rört sig
            clearTimeout(this.renderTimeout);
            this.renderTimeout = setTimeout(() => {
                // This will make the component re-render
                Vue.set(this.tiles, 0, this.tiles[0]);
            }, 1000)
        },

        updateRollingStones: function () {
            for (let row = this.tiles.length - 1; row >= 0; row--) {
                for (let col = 0; col < this.tiles.length; col++) {
                    this.tiles[row][col].hasMoved = false;
                }
            }
            //Loopar nerifrån och upp för att undvika att stenarna går åt sidan ist för ner
            for (let row = this.tiles.length - 1; row >= 0; row--) {
                for (let col = 0; col < this.tiles.length; col++) {
                    const tile = this.tiles[row][col];
                    if (tile.hasMoved == true) {
                        //Om stenen redan har flyttats så - skip och loopa vidare på nästa
                        continue;
                    }

                    if (tile.background == 3) {

                        const tileUnder = this.tiles[row + 1][col];
                        if (tileUnder.background == 3) {

                            const tileLeft = this.tiles[row][col - 1];
                            const tileRight = this.tiles[row][col + 1];
                            if (tileRight.background == 0) {
                                const tileRightUnder = this.tiles[row + 1][col + 1];
                                if (tileRightUnder.background == 0) {
                                    // console.log("x:", tile.x, "y:", tile.y, "should move right");
                                    tile.background = 0;
                                    tileRight.background = 3;
                                    tileRight.hasMoved = true;
                                    this.forceRender();
                                    col++;
                                }
                            } else if (tileLeft.background == 0) {
                                const tileLeftUnder = this.tiles[row + 1][col - 1];
                                if (tileLeftUnder.background == 0) {
                                    // console.log("x:", tile.x, "y:", tile.y, "should move left");
                                    tile.background = 0;
                                    tileLeft.background = 3;
                                    tileLeft.hasMoved = true;
                                    this.forceRender();
                                }
                            }
                        } else if (tileUnder.background == 0) {
                            tileUnder.background = 3;
                            tile.background = 0;
                            tile.hasMoved = true;
                            this.forceRender();
                        }
                    }
                }
            }
        }

    }
}
