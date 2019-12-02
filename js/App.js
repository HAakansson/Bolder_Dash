import Grid from './Grid.js'

export default {

    components: {
        Grid
    },

    template: `
        <div id="app">
            <h1>Vue Grid</h1>
            <grid></grid>
        </div>
    `,
    methods: {
        
        onKeyPressed(event) {
            let keyEvent = event.key

            switch (keyEvent) {

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