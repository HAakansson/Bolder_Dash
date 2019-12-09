//import Score from "./Score";

export default {

    // Todo skicka nya score
    props: ["newScore"],

    components: {
        //Score
    },
    template: `
        <div>
            <h2>Highscores</h2>
            <ol>
                <li v-for="highscore in highscoreList">{{ highscore.name }} - Score: {{ highscore.score }}</li>
            </ol>
        </div>
    `,
    data() {
        return {
            
            currentScore: 0,
            lowestCurrentScore: 0,
            highscoreList: [Score],
            /*highscoreList: [
                { name: 'ABC', score: 123},
                { name: 'BCD', score: 234},
                { name: 'CDE', score: 345},
                { name: 'DEF', score: 456},
                { name: 'EFG', score: 567},
            ]*/
           
        }
    },

    methods: {

        sortHighscores() {
            this.highscoreList.sort((a, b) => (a.score < b.score) ? 1 : -1)
        },

        removeLowScores() {
            this.highscoreList.length = 5
        },

        updateLowestScoreVariable() {
            //this.newScore.score
        },


        updateHighscore(score) {

            // Only insert new score once 
            let newValueInserted = false
            console.log("UPDATE HIGHSCORE")
            for (let highscore of this.highscoreList) {

                if (score > highscore.score && !newValueInserted) {

                    // TODO: Sätt in nya värdet på rätt plats
                    /*let newScore = {
                        name: "NEW SCORe",
                        score: score
                    }*/


                    //let newScore = new Score("Kalle", score)
                    //this.highscoreList.push(newScore(newScore))


                    //this.highscoreList.splice(highscore -1, this.highscoreList.length - 1, newScore)
                    
                    
                    //highscoreList.splice
                    // Insert score (remove scores after 5)

                    newValueInserted = true
                }
            }

            this.removeLowScores()
        }
    },


    // TODO: Lägg till en listener för ett score object. När det ändras kör uppdate functionen
    watch: {




        newScore(val) {
            console.log("NEW SCORE IN HIGHSCORE")
            this.currentScore = val
        },

        
        highscoreList: {
            // TODO: kalla updateHighscore?

            deep: true,

            handler(val) {
                localStorage.setItem('saved-scores', JSON.stringify(this.highscoreList))
            } 
        },
    },

    created() {
        this.removeLowScores()
        this.sortHighscores()
        //this.highscoreList = JSON.parse(localStorage.getItem('saved-scores'))
        //this.updateHighscore(this.newScore)
    },

}