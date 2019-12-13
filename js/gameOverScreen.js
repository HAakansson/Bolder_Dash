export default{

    name: 'gameOverScreen',
    template: `
    <div>
        <button @click = "resetGame">Restart</button>
        <img id="gameover" src = "gameover.jpg">
    </div>
    `,
    

    

    methods: {

        resetGame() {
            this.$emit('resetGame')
        }
    }

}
