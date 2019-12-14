export default{

    name: 'gameOverScreen',
    template: `
    <div class="game-over">
        <h1 class="game-over-title">GAME OVER</h1>
        <button class="game-over-button" @click = "resetGame">Restart</button>
        <!--<img id="gameover" src = "gameover.jpg">-->
    </div>
    `,
    

    

    methods: {

        resetGame() {
            this.$emit('resetGame')
        }
    }

}
