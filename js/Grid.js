import Tile from './Tile.js'

export default {

    name: 'grid',

    components: {
        Tile
    },

    template: `
    <div class="grid-layout">
        <tile 
        v-for="tile in flatTiles"
        v-bind:position="tile"
        v-bind:key="'tile' + tile.x + tile.y"
        ></tile>
    </div>
    `,

    data() {
        return {
            tiles: []
        }
    },

    computed: {
       flatTiles() {
           return this.tiles.flat()
       } 
    },

    created() {

        for(let row = 0; row < 5; row++){
            this.tiles[row] = []
            for(let col = 0; col < 5; col++){
                let position = {
                    x: col,
                    y: row
                }
                this.tiles[row].push(position)
            }
        }

        console.log(this.tiles)
        console.log(this.flatTiles)

    }
}