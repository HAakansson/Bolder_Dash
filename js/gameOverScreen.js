export default {

    name: 'gameOverScreen',
    template: `
    <div id="loose-screen">
        <button id="restart-button" @click = "resetGame">Restart</button>
        <img id="gameover" src = "gameover.jpg">
    </div>
    `,




    methods: {

        resetGame() {
            this.$emit('resetGame')
        }
    }

}
