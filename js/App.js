import Start from './Start.js'

export default {

    components: {
        Start
    },

    template: `
        <div id="app">
            <start/>
        </div>
    `

    data() {
        return {
        //     dir: 0,
        }
    },

    methods: {

    //     onKeyPressed(event) {

    //         let keyEvent = event.key

    //         switch (keyEvent) {
    //             case 'ArrowUp':
    //             case 'w':
    //                 this.$refs.gridComponent.updatePlayerMovement('up');
    //                 console.log("up")
    //                 break;
    //             case 'ArrowDown':
    //             case 's':
    //                 this.$refs.gridComponent.updatePlayerMovement('down');
    //                 break
    //             case 'ArrowLeft':
    //             case 'a':
    //                 this.$refs.gridComponent.updatePlayerMovement('left');
    //                 break
    //             case 'ArrowRight':
    //             case 'd':
    //                 this.$refs.gridComponent.updatePlayerMovement('right');
    //                 break
    //         }
    //     }
    // },
    // created() {
    //     window.addEventListener('keydown', this.onKeyPressed)
    // },
    // beforeDestroy() {
    //     window.removeEventListener('keydown', this.onKeyPressed)
    // },
    }
}