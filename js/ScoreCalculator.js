export default class ScoreCalculator {


    calculateFinalScore(diamondsCollected, timeLeft) {
        let totalScore = diamondsCollected * 100
        totalScore += (timeLeft * 2)

        return totalScore
    }
    

}




// import Countdown from './Countdown.js'

// export default {
//     //TODO: lyssna på highscore
//     props: ['collected', 'total', 'wonGame'],

//     components: {
//         Countdown
//     },
//     template: `
//         <div>
//             <h2>Diamonds collected {{ collectedDiamonds }} / {{ totalDiamonds }}</h2>
//             <Countdown @gameIsOver="timeIsUp" @timeLeft="updateRemainingTime"/>
//         </div>
//     `,

//     data() {
//         return {
//             collectedDiamonds: 0,
//             totalDiamonds: 0,
//             timeLeft: 120,
//             gameWon: false,
//             gameOver: false
//         }
//         },

//         methods: {
      
//         updateRemainingTime(gameTime) {
//             this.timeLeft = gameTime
//         },
        
     
//         calculateFinalScore() {
//             let totalScore = this.collectedDiamonds * 100
//             totalScore += (this.timeLeft * 2)

//             return totalScore
//         },

//         timeIsUp() {
//             gameOver: true

//             this.$emit('gameIsOver', this.gameOver)
//         }

//     },

//     watch: {
//         collected(val) {
//             this.collectedDiamonds = val
//         },
//         total(val) {
//             this.totalDiamonds = val
//         },

//         collectedDiamonds(val) {
//             //this.totalDiamonds = 1
//             console.log(this.totalDiamonds + "total")
//             console.log(this.collectedDiamonds + " collected")
            
//             /*if (val === this.totalDiamonds) {
//                 this.gameWon = true
//                 console.log("WON")
//             }*/
//         },

//         // Receives a boolean as parameter
//         wonGame(val) {
//             if (val) {
//                 let score = this.calculateFinalScore()
//                 this.$emit('finalScore', score)
//                 //alert("You have won!! " + score + " points")
//                 //console.log("WON GAME")
//             }
//         },

//     },

// }
