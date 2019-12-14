import Grid from './Grid.js'
//import Highscore from './Highscore.js'
import Countdown from './Countdown.js'
import ScoreCalculator from './ScoreCalculator.js'
import WinningScreen from './WinningScreen.js'
import gameOverScreen from './gameOverScreen.js'

export default {
    components: {
        Grid,
        //Highscore,
        Countdown,
        ScoreCalculator,
        WinningScreen,
        gameOverScreen
    },

    template: `
        <div class="game-page-1">

           
            <div v-if="showStartMenu" class="start-menu start">

                 <div v-if="showStartMenu" class="creators-list start">
                    <h2>Creators:</h2> 
                    <h3 class="creators-name" v-for="creator in creators">  {{ creator.name }}  </h3>
                </div>
                <div class="start-box">
                    <h1 class="game-title" data-text="[Bolder_Dash]">[Bolder_Dash]</h1>
                    <div v-if="showHighScore" class="start info-box">
                         <!--<highscore
                    :newScore="this.totalScore"
                    class="highscore"/>-->
                </div>
               
                   
                <div class="buttons">
                    <button class="next-level" @click="nextLevel">Choose your level: (Level {{ currentLevel }})</button>
                    <button class="start-level" @click="beginGame">Start Game</button>
                </div>  
            </div>
        </div>



            <div v-if="startGame" class="game-page-2">
                <div class="hud">
                    <h2 class="level-box">Level {{ currentLevel }}</h2>
                    <Countdown 
                    @gameIsOver="gameOver" 
                    @timeLeft="updateRemainingTime"/>
                    <h2>Diamonds collected {{ diamondsCollected }} / {{ totalAmountOfDiamonds }}</h2>
                    <!--<ScoreCalculator class="score-text"
                    :collected="this.diamondsCollected"
                    :total="this.totalAmountOfDiamonds"
                    @finalScore="updateFinalScore"
                    @gameIsOver="gameOver"
                    @resetGame="resetGame"/>-->
                </div>
                <div v-if="currentLevel === 1 && startGame">
                    <grid key="1" @total="totalDiamonds" @collected="collectedDiamonds" @game-over="gameOver" @gameCompleted="gameCompleted" ref="gridComponent" level="0"></grid>
                </div>
                <div v-if="currentLevel === 2 && startGame">
                    <!--key visar för vue att varje grid är "unik" och drf måste den göra om destrot/create -->    
                    <grid key="2" @total="totalDiamonds" @collected="collectedDiamonds" @game-over="gameOver" @gameCompleted="gameCompleted" ref="gridComponent" level="1"></grid>
                </div>

            </div>
            <div class="win-screen" v-if="winningScreen">
                <winningScreen />
            </div>
            <div class="loose-screen" v-if="gameOverScreen">
                <gameOverScreen @resetGame="resetGame" />
            </div>
        </div>   
    `,
    data() {
        return {
            currentLevel: 1,
            maxNumberOfLevels: 2,
            diamondsCollected: 0,
            totalAmountOfDiamonds: 0,
            timeLeft: null,
            totalScore: 0,
            showStartMenu: true,
            startGame: false,
            showHighScore: true,
            gameOverScreen: false,
            winningScreen: false,
            creators: [
                { name: 'Niklas' },
                { name: 'Anton' },
                { name: 'Yusra' },
                { name: 'Henrik' }
            ],
        }
    },

    methods: {

        beginGame() {
            this.showStartMenu = false
            this.startGame = true
        },


        updateRemainingTime(time) {
            this.timeLeft = time
        },

        // IF GAME WON
        gameCompleted() {

            let calculator = new ScoreCalculator()
            let finalScore = calculator.calculateFinalScore(this.diamondsCollected, this.timeLeft)

            alert("You have completed the game!\nYour score is: " + finalScore) //+ " time left " + this.timeLeft)
            //this.updateFinalScore(finalScore)
            this.totalAmountOfDiamonds = 0
            this.nextLevel()
        },



        calculateScore() {

        },

        // TODO: ta bort? 
        updateFinalScore(score) {
            this.totalScore = score
            this.showStartMenu = true
            this.startGame = false
            this.showHighScore = true
        },

        resetGame() {
            this.showStartMenu = true
            this.startGame = false
            this.gameOverScreen = false
            this.showHighScore = true
        },

      

        totalDiamonds(maxNumberOfDiamonds) {
            this.totalAmountOfDiamonds = maxNumberOfDiamonds
        },


        
        collectedDiamonds(diamondsCollected) {

            this.diamondsCollected = diamondsCollected
            
            /*if (this.diamondsCollected == this.totalAmountOfDiamonds) {
                if (this.currentLevel == this.maxNumberOfLevels ) {
                    this.winningScreen = true
                    this.startGame = false                    
                } else {
                    this.totalAmountOfDiamonds = 0;
                    this.nextLevel()
                }
            }*/
        },


        nextLevel() {
            this.currentLevel = this.currentLevel >= this.maxNumberOfLevels ? 1 : this.currentLevel + 1
        },

        onKeyPressed(event) {
            var audio = new Audio('Sound/MovementSound.mp3');
            let keyEvent = event.key

            switch (keyEvent) {
                case 'ArrowUp':
                case 'w':
                    this.$refs.gridComponent.updatePlayerMovement('up');
                    audio.play();
                    break;
                case 'ArrowDown':
                case 's':
                    this.$refs.gridComponent.updatePlayerMovement('down');
                    audio.play();
                    break
                case 'ArrowLeft':
                case 'a':
                    this.$refs.gridComponent.updatePlayerMovement('left');
                    audio.play();
                    break
                case 'ArrowRight':
                case 'd':
                    this.$refs.gridComponent.updatePlayerMovement('right');
                    audio.play();
                    break
            }
        },

        gameOver() {
            this.gameOverScreen = true;
            this.startGame = false;
            this.totalAmountOfDiamonds = 0;
        },


    },

    created() {
        window.addEventListener('keydown', this.onKeyPressed)
    },

    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeyPressed)
    },
}