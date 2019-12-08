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
            <Countdown @timeLeft="updateRemainingTime"/>
            <!--<button @click="showTimeLeft"></button>--> <!-- TODO: REMOVE-->
        </div>
    `,


    data() {
        return {
            collectedDiamonds: 0,
            totalDiamonds: 0,
            timeLeft: 120,
            gameWon: false
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
            this.totalDiamonds = 5
            if (val === this.totalDiamonds) {
                this.gameWon = true
                console.log("WON")
            }
        },

        gameWon(val) {
            if (val) {

                let score = this.calculateFinalScore()
                this.$emit('finalScore', score)
                alert("You won!" + score + " points")
                console.log("WON GAME")
            }
        }
    },
}