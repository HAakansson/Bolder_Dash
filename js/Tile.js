export default {
    
    name: 'tile',

    props: {
        position: {
            type: Object,
            required: true
        },

        image: {
            type: String,
            required: true
        }

        // tileState: {
        //     type: Array,
        //     required: true
        // }
    },

    template: `
        <div class="tile" @click="logPosition">
            <img v-bind:src="image">
        </div>
    `,

    methods: {
        logPosition(){
            console.log(this.position.x, this.position.y)
        }
    },

    // computed: {
    //     image(){
    //         return this.tileState[2].tileImage
    //     }
    // }
}