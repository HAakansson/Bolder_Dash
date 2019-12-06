export default {

    template: `
        <div class="timer">
            <h2>Time Left: {{ gameTime }} </h2>
        </div>
    `,

    data() {
        return {
            gameTime: 120, 
        }
    },
    methods: {
    
        gameIsOver() {
            alert("Time's up!") // TODO: kolla poäng jämfört med highscore lista (ange namn om högt nog) 
            clearTimeout
            // TODO: return till huvudmeny
        },

        startTimer() {

            this.gameTime = 120

            let time = setInterval(() => {
                this.gameTime -= 1
                // Time's up (Game Over)
                if (this.gameTime <= 0) {
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
                console.log("Listener says 0")
                // SKicka emit med sekunder kvar???
                this.gameIsOver()
            }
        }
    },
}