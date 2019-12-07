import Countdown from './Countdown.js'

export default {

    props: ['score'],

    components: {
        Countdown
    },
    template: `
        <div>
            <!--<h2>Diamonds collected {{ collectedDiamonds }}</h2>-->
            <Countdown @timeLeft="updateRemainingTime"/>
            <button @click="showTimeLeft"></button>
        </div>
    `,


    data() {
        return {
            collectedDiamonds: 0,
            timeLeft: 120
        }
    },

    methods: {
        pickupDiamond() {
            collectedDiamonds += 1
        },
        updateRemainingTime(gameTime) {
            this.timeLeft = gameTime
        },
        showTimeLeft() {
            alert("You have " + this.timeLeft + " seconds left")
        }
    },
}