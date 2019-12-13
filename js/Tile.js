export default {

    name: 'tile',

    empty: 0,
    brick: 1,
    dirt: 2,
    boulder: 3,
    diamond: 4,
    player: 5,
    enemy: 6,
    explode: 7,

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
                    tileId: this.empty,
                    tileName: 'Empty',
                    tileImage: './Img/Empty.png'
                },
                {
                    tileId: this.brick,
                    tileName: 'Brick',
                    tileImage: './Img/Brick2.png'
                },
                {
                    tileId: this.dirt,
                    tileName: 'Dirt',
                    tileImage: './Img/Dirt.png'
                },
                {
                    tileId: this.boulder,
                    tileName: 'Boulder',
                    tileImage: './Img/Boulder.png'
                },
                {
                    tileId: this.diamond,
                    tileName: 'Diamond',
                    tileImage: './Img/Diamond.gif'
                },
                {
                    tileId: this.player,
                    tileName: 'Player',
                    tileImage: './Img/PlayerAnimated.gif'
                },
                {
                    tileId: this.enemy,
                    tileName: 'Enemy',
                    tileImage: './Img/EnemyAnimated.gif'
                },
                {
                    tileId: this.explode,
                    tileName: 'Explode',
                    tileImage: './Img/Expolotion.gif'
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
        logPosition() {

            if(this.position.background !== 1){
                //this.position.background = 0;
                //this.$emit('change-background');
                this.$emit('change-playerHasMoved');
            }                

            const convert = id => {
                switch (id) {
                    case 0: return "empty";
                    case 1: return "brick";
                    case 2: return "dirt";
                    case 3: return "boulder";
                    case 4: return "diamond";
                    case 5: return "player";
                    case 6: return "enemy";
                    case 7: return "explotion";
                }
            }
            console.log(this.position.x, this.position.y, convert(this.position.background))
        },

        setDiamond() {
            this.position.background = Tile.diamond;
            this.$emit('change-background');
        },
    },

    computed: {
        image() {
            return this.tileState[this.position.background].tileImage
        }
    }
}