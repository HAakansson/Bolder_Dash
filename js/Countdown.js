export default {

    props: ['newScore'],
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
            timer: 0,
        }
    },
    methods: {
    
        gameIsOver() {
            alert("Time's up! Game Over") // TODO: kolla poäng jämfört med highscore lista (ange namn om högt nog) 
            this.timeLeft = false
            this.$emit('gameIsOver', this.timeLeft)
            clearTimeout(this.time)
        },

        /*testTimer() {
            this.timer = setTimeout(function() {
                this.gameTime -= 1

                this.$emit('timeLeft', this.gameTime)

                if (this.gameTime <= 0) {
                    console.log("Game Over!!")
                    this.gameTime = 0                    
                }
            }, 1000) 
        },*/

        startTimer() {

            this.gameTime = 12

            var time = setInterval(() => {
                this.gameTime -= 1
                // Time's up (Game Over)
                
                // TODO: emit gameTime
                this.$emit('timeLeft', this.gameTime)

                if (this.gameTime <= 0) {
                    console.log("Game Over!!")
                    this.gameTime = 0                    
                }
            }, 1000)  
        },
    },

    created() {
        //this.testTimer()
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