export default {
    
    name: 'tile',

    props: ['position'],

    template: `
        <button
        class="tile"
        @click="logPosition"
        >x</button>
    `,

    methods: {
        logPosition(){
            console.log(this.position.x, this.position.y)
        }
    }
}