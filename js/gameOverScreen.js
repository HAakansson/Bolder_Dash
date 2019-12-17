export default {

    name: 'gameOverScreen',

    props: ['deathMessage'],

    template: `
    <div class="game-over">
        <h1 class="game-over-title">GAME OVER</h1>
        <h2 class="game-over-message">{{ deathMessage }}!</h2>
        <div class="end-buttons">
            <button class="game-over-button" @click = "restart">Restart</button>
            <button class="game-over-button" @click = "backToStart">Start Menu</button>
        </div>
        
        <!--<img id="gameover" src = "gameover.jpg">-->
    </div>
    `,
   
    methods: {

        updateMessage(text) {
            this.message = text
        },

        restart() {
            this.$emit('reloadLevel')
        },
        backToStart() {
            this.$emit('startMenu')
        }
    },
    created() {
    
        console.log("GAME OVER WSA CREATED")
        
    },

}
