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
        ` 
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