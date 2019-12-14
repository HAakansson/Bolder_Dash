export default {

    template: `
        <div class="timer">
            <h2>Time Left: {{ gameTime }} </h2>
        </div>
    `,

    data() {
        return {
            gameTime: 120, 
            timeLeft: true,
        }
    },
    methods: {
    
        gameIsOver() {

            clearTimeout
            this.timeLeft = false
            this.$emit('gameIsOver', this.timeLeft)
            setTimeout(() => {
                alert("Time's up! Game Over") 
            }, 100);
        },


        startTimer() {

            let timer = setInterval(() => {

                this.gameTime -= 1                
                this.$emit('timeLeft', this.gameTime) // Send remaining time to parent

                if (this.gameTime <= 0) {

                    clearInterval(timer)
                    this.gameTime = 0                    
                }
            }, 1000)  
        },
    },

    created() {
        this.startTimer()
    },

    watch: {
        gameTime(val) {
            if (val === 0) {
                this.gameIsOver()
            }
        }
    },
}