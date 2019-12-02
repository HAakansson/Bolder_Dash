import Grid from './Grid.js'
import Start from './Start.js'

export default {

    components: {
        Start,
        Grid
    },

    template: `
        <div id="app">
            <start/>
            <!--<grid></grid>-->
        </div>
    `,
    methods: {
        
        onKeyPressed(event) {

            switch (event.key) {

                case 'ArrowUp': 
                case 'w':
                    console.log("Up")
                    break
                case 'ArrowDown':
                case 's':
                    console.log("Down")
                    break
                case 'ArrowLeft':
                case 'a':
                    console.log("Left")
                    break
                case 'ArrowRight':
                case 'd':
                    console.log("Right")
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

// document.addEventListener('keydown', logKey);

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