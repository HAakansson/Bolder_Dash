export default {

    // Todo skicka nya score
    props: ["newScore"],

    template: `
        <div>
            <h2>Highscores</h2>
            <ol>
                <li v-for="score in highscoreList">{{ score.name }} - Score: {{ score.score }}</li>
            </ol>
        </div>
    `,
    data() {
        return {
            
            //highscoreList: [],
            highscoreList: [
                { name: 'ABC', score: 123},
                { name: 'BCD', score: 234},
                { name: 'CDE', score: 345},
                { name: 'DEF', score: 456},
                { name: 'EFG', score: 567},
                { name: 'EFG', score: 232},
            ]
           
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

            // Sätt storleks ordning
            let newValueInserted = false

            for (let highscore of highscoreList.score) {

                if (score > highscore.score && !newValueInserted) {

                    // TODO: Sätt in nya värdet på rätt plats
                    highscoreList.splice(highscore -1, highscoreList.length - 1, score)
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
        
        highscoreList: {
            // TODO: kalla updateHighscore?
            
            deep: true,

            handler(val) {
                localStorage.setItem('saved-scores', JSON.stringify(this.highscoreList))
            } 
        }
    },

    created() {
        this.removeLowScores()
        this.sortHighscores()
        //this.highscoreList = JSON.parse(localStorage.getItem('saved-scores'))

    },

}