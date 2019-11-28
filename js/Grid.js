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
        v-bind:tileState="tileState"
        v-bind:key="'tile' + i + tile.x + tile.y"
        ></tile>
    </div>
    `,

    data() {
        return {
            tiles: [],
            gridSize: 20,
            tileState: [
                {
                    tileId: 0,
                    tileName: 'Empty',
                    tileImage: './Img/Empty.png'
                },
                {
                    tileId: 1,
                    tileName: 'Brick',
                    tileImage: './Img/Brick.png'
                },
                {
                    tileId: 2,
                    tileName: 'Dirt',
                    tileImage: './Img/Dirt.png'
                },
                {
                    tileId: 3,
                    tileName: 'Boulder',
                    tileImage: './Img/Boulder.png'
                },
            ]
        }
    },

    computed: {
       flatTiles() {
           return this.tiles.flat()
       } 
    },

    created() {

        for(let row = 0; row < this.gridSize; row++){
            this.tiles[row] = []
            for(let col = 0; col < this.gridSize; col++){
                let position = {
                    x: col,
                    y: row
                }
                this.tiles[row].push(position)
            }
        }
    }
}