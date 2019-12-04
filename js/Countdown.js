export default {

    // TODO: ta emot en array av Scores! om score vid end är högre än i listan -> skriv namn (spara nytti highscore)
    template: `
        <div class="hud timer">
            <!--<h2>{{ totalAmountOfdiamonds }}</h2>-->

            <h2>Time Left: {{ gameTime }}</h2>
        </div>
    `,
    data() {
        return {

            //secondsLeft: 4000,
            gameTime: 120, 

            displayedTime: 4,
            timeLeft: 4000,

            totalAmountOfdiamonds: 15,
            counter: {},
        }
    },
    methods: {
    




       
    
        gameOver() {
            alert("Time's up!") // TODO: kolla poäng jämfört med highscore lista (ange namn om högt nog) 
            clearTimeout
            // TODO: return till huvudmeny
        },

        /*startCountdown() {
            setTimeout(this.gameOver, this.timeLeft)
            this.displayedTime = this.timeLeft - displayedTime
        },*/



        startTimer() {

            this.gameTime = 12

            let time = setInterval(() => {
                this.gameTime -= 1
            
                // Time's up
                if (this.gameTime <= 0) {
                    console.log("Game Over!!")
                    this.gameTime = 0                    
                }
                
            }, 1000)
        },

        test() {
            console.log("Hej")
        }

    },


    created() {
        this.startTimer()

        //setTimeout(this.test, 1000)
    },

    watch: {

        gameTime(val) {
            if (val === 0) {
                console.log("Listener says 0")
                // SKicka emit med sekunder kvar???
                this.gameOver()
            }
        }


    },
}