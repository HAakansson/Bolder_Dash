export default {

    props: ['newScore'],
    // TODO: send remainning time
    // TODO: ta emot en array av Scores! om score vid end är högre än i listan -> skriv namn (spara nytti highscore)
    template: `
        <div class="timer">
            <h2>Time Left: {{ gameTime }} </h2>
        </div>
    `,

    data() {
        return {
            gameTime: 120, 
            timeLeft: true
        }
    },
    methods: {
    
        gameIsOver() {// TODO: kolla poäng jämfört med highscore lista (ange namn om högt nog) 
            clearTimeout
            this.timeLeft = false
            this.$emit('gameIsOver', this.timeLeft)
            setTimeout(() => {
                alert("Time's up! Game Over") 
            }, 100);
        },

        startTimer() {

            //this.gameTime = 12

            let time = setInterval(() => {
                this.gameTime -= 1
                // Time's up (Game Over)
                
                // TODO: emit gameTime
                this.$emit('timeLeft', this.gameTime)

                if (this.gameTime <= 0) {
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