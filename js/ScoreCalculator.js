import Countdown from './Countdown.js'

export default {
    //TODO: lyssna på highscore
    props: ['collected', 'total'],

    components: {
        Countdown
    },
    template: `
        <div>
            <h2>Diamonds collected {{ collectedDiamonds }} / {{ totalDiamonds }}</h2>
            <Countdown @gameIsOver="timeIsUp" @timeLeft="updateRemainingTime"/>
            <!--<button @click="showTimeLeft"></button>--> <!-- TODO: REMOVE-->
        </div>
    `,

    data() {
        return {
            collectedDiamonds: 0,
            totalDiamonds: 0,
            timeLeft: 120,
            gameWon: false,
            gameOver: false
        }
    },

    methods: {
        /*pickupDiamond() {
            collectedDiamonds += 1
        },*/
        updateRemainingTime(gameTime) {
            this.timeLeft = gameTime
        },
        
        /*showTimeLeft() {
            alert("You have " + this.timeLeft + " seconds left")
        },*/

        calculateFinalScore() {
            let totalScore = this.collectedDiamonds * 100
            totalScore += (this.timeLeft * 2)

            return totalScore
        },

        timeIsUp() {
            gameOver: true

            // TODO: GÖR HÅRD, sidoomladdning?
            this.$emit('gameIsOver', this.gameOver)
            //console.log("TIME IS UP SCORE")
        }

    },

    watch: {
        collected(val) {
            this.collectedDiamonds = val
        },
        total(val) {
            this.totalDiamonds = val
        },

        collectedDiamonds(val) {
            //this.totalDiamonds = 1
            console.log(this.totalDiamonds + "total")
            console.log(this.collectedDiamonds + " collected")
            /*if (val === this.totalDiamonds) {
                this.gameWon = true
                console.log("WON")
            }*/
        },

        // Receives a boolean as parameter
        gameWon(val) {
            if (val) {
                let score = this.calculateFinalScore()
                this.$emit('finalScore', score)
                alert("You have won!! " + score + " points")
                console.log("WON GAME")
            }
        },

    },

}