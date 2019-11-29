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
        v-bind:key="'tile' + i + tile.x + tile.y"
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

        for(let row = 0; row < this.gridSize; row++){
            this.tiles[row] = []
            for(let col = 0; col < this.gridSize; col++){
                let position = {
                    x: col,
                    y: row,
                    background: 2
                }
                if(
                    position.y === 0 ||
                    position.y === this.gridSize-1 ||
                    position.x === 0 ||
                    position.x === this.gridSize-1 ){
                    position.background = 1
                } else if(Math.random() > 0.8) {
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
    }
}