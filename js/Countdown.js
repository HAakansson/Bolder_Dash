export default {

    // TODO: ta emot en array av Scores! om score vid end är högre än i listan -> skriv namn (spara nytti highscore)
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
            alert("Time's up! Game Over") // TODO: kolla poäng jämfört med highscore lista (ange namn om högt nog) 
            this.timeLeft = false
            this.$emit('gameIsOver', this.timeLeft)
        },


        startTimer() {

            let timer = setInterval(() => {
                this.gameTime -= 1
                // Time's up (Game Over)
                
                this.$emit('timeLeft', this.gameTime) // Send remaining time to parent

                if (this.gameTime <= 0) {
                    clearInterval(timer)
                    console.log("Game Over!!")
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
                // SKicka emit med sekunder kvar???
                this.gameIsOver()
            }
        }
    },
}