import Tile from './Tile.js'
import Map1 from './Map1.js'
import Map2 from './Map2.js'


export default {

    name: 'grid',

    components: {
        Tile,
    },

    props: ['level'],

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
        const maps = [Map1, Map2]
        return {
            tiles: [],
            gridSize: 20,
            customGrid: maps[this.level],
            gridHeiht: 20,
            gridWidth: 30,
            playerHasMoved: false,
            counter: 1,
            diamondsCollected: 0,
            maxNumberOfDiamonds: 0,
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
        // window.addEventListener('keydown', this.onKeyPressed)

        for (let row = 0; row < this.gridHeiht; row++) {
            this.tiles[row] = []
            for (let col = 0; col < this.gridWidth; col++) {
                let position = {
                    x: col,
                    y: row,
                    background: Tile.dirt
                }
                this.tiles[row].push(position)
            }
        }
        
        this.populateMap()
        this.getTotalNumberOfDiamonds()
    },
    // beforeDestroy(){
    //     window.removeEventListener('keydown', this.onKeyPressed)
    // },

    updated() {
        console.log("The grid has been changed");
        this.playerHasMoved = false;
        this.updateRollingStones();
        // this.forceRender()
        //this.updatePlayerMovement()
        // If the player moves, we should call forceRender
    },
    methods: {
        forceRender: function () {
            // rensar timern efter varje gång en sten har rört sig
            clearTimeout(this.renderTimeout);
            this.renderTimeout = setTimeout(() => {
                // This will make the component re-render
                Vue.set(this.tiles, 0, this.tiles[0]);
            }, 20)
        },

        updatePlayerMovement: function (direction) {
            //forcerender kallas endast en gång per knapptryckning 
            this.forceRender()
            if (this.playerHasMoved) { return;}
            this.playerHasMoved = true;

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
            //this.checkForDiamonds() 
        },

        updateRollingStones: function () {
            for (let row = this.gridHeiht - 1; row >= 0; row--) {
                for (let col = 0; col < this.gridWidth; col++) {
                    this.tiles[row][col].playerHasMoved = false;
                }
            }

            //Loopar nerifrån och upp för att undvika att stenarna går åt sidan ist för ner
            for (let row = this.gridHeiht - 1; row >= 0; row--) {
                for (let col = 0; col < this.gridWidth; col++) {
                    const tile = this.tiles[row][col];
                    if (tile.playerHasMoved == true) {
                        console.log('has moved')
                        //Om stenen redan har flyttats så - skip och loopa vidare på nästa
                        continue;
                    }

                    if (tile.background === Tile.boulder || tile.background === Tile.diamond) {
                    let tempTile = tile.background;
                        const tileUnder = this.tiles[row + 1][col];
                        if (tileUnder.background === Tile.boulder || tileUnder.background === Tile.diamond) {
                          
                            const tileLeft = this.tiles[row][col - 1];
                            const tileRight = this.tiles[row][col + 1];
                            if (tileRight.background == Tile.empty) {
                                const tileRightUnder = this.tiles[row + 1][col + 1];
                                if (tileRightUnder.background == Tile.empty) {
                                    // console.log("x:", tile.x, "y:", tile.y, "should move right");
                                    tile.background = Tile.empty;
                                    tileRight.background = tempTile;
                                    tileRight.playerHasMoved = true;
                                    this.forceRender();
                                    col++;
                                }
                            } else if (tileLeft.background == Tile.empty) {
                                const tileLeftUnder = this.tiles[row + 1][col - 1];
                                if (tileLeftUnder.background == Tile.empty) {
                                    // console.log("x:", tile.x, "y:", tile.y, "should move left");
                                    tile.background = Tile.empty;
                                    tileLeft.background = tempTile;
                                    tileLeft.playerHasMoved = true;
                                    this.forceRender();
                                }
                            }
                        } else if (tileUnder.background == Tile.empty) {
                            tileUnder.background = tempTile;
                            tile.background = Tile.empty;
                            tile.playerHasMoved = true;
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
        },


      
        // Check if tile player stands on contains a diamond
        checkForDiamonds(playerPosition) {

            for (let row = 0; row < this.gridHeiht; row++) {

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
            
            for (let row = 0; row < this.gridHeiht; row++) {
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
