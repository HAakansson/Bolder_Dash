export default {
    
    name: 'tile',

    props: {
        position: {
            type: Object,
            required: true
        }
    },

    data() {
        return {
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
            ],
        }
    },

    template: `
        <div class="tile" @click="logPosition">
            <img v-bind:src="image">
        </div>
    `,

    methods: {
        logPosition(){
            console.log(this.position.x, this.position.y, this.position.tilePic)
        }
    },

    computed: {
        image(){
            return this.tileState[this.position.background].tileImage
        }
    }
}