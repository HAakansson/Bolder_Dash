import Grid from './Grid.js'
import Start from './Start.js'

export default {

    components: {
        Grid,
        Start
    },

    template: `
        <div id="app">
            <!--<start/>-->
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
                        this.$refs.gridComponent.updatePlayerMovement('up');
                    break
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


// function logKey(e) {
//     switch (e.code) {
//         case "ArrowUp":
//             grid.goUp();
//             break;
//         case "ArrowDown":
//             grid.goDown();
//             break;
//         case "ArrowLeft":
//             grid.goLeft();
//             break;
//         case "ArrowRight":
//             grid.goRight();
//             break;

//         default:
// 	    //Do nothing.
//             break;
//     }
// }