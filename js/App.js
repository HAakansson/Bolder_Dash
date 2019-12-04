import Grid from './Grid.js'

export default {

    components: {
        Grid,

    },

    template: `
        <div id="app">
            <h1>Vue Grid</h1>
            <grid v:dir="dir" ref="gridComponent"></grid>
            
        </div>
    `,

    data() {
        return {
            dir: 0,
        }
    },

    methods: {

        onKeyPressed(event) {
            let keyEvent = event.key

            switch (keyEvent) {
                case 'ArrowUp':
                case 'w':
                    console.log("Up")
                    this.$refs.gridComponent.updatePlayerMovement('up');
                    break;
                case 'ArrowDown':
                case 's':
                    this.$refs.gridComponent.updatePlayerMovement('down');
                    break
                case 'ArrowLeft':
                case 'a':
                    this.$refs.gridComponent.updatePlayerMovement('left');
                    break
                case 'ArrowRight':
                case 'd':
                    this.$refs.gridComponent.updatePlayerMovement('right');
                    break
            }
        }
    },
    created() {
        window.addEventListener('keydown', this.onKeyPressed)
    },
    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeyPressed)
    },
}