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

            <!-- Start Menu -->
            <div v-if="showStartMenu" class="start-menu start">

                <div v-if="showStartMenu" class="creators-list start">
                    <h2>Creators:</h2> 
                    <h3 class="creators-name" v-for="creator in creators">{{ creator.name }}</h3>
                </div>

                <div class="start-box">
                    <h1 class="game-title" data-text="[Bolder_Dash]">[Bolder_Dash]</h1>
                
                    <div class="buttons">
                        <button class="next-level" @click="nextLevel">Choose your level: (Level {{ currentLevel }})</button>
                        <button class="start-level" @click="startGame">Start Game</button>
                    </div>  
                </div>
            </div>

            <div v-if="showGame" class="game-page-2">
               
                <div class="hud">
                    <h2 class="level-box">Level {{ currentLevel }}</h2>
                    <Countdown 
                    ref="timeComponent"
                    @gameIsOver="gameOver" 
                    @timeLeft="updateRemainingTime"/>
                    <h2>Diamonds collected {{ diamondsCollected }} / {{ totalAmountOfDiamonds }}</h2>
                </div>

                <div v-if="currentLevel === 1 && showGame">
                    <grid key="1" @addTime="updateTime" @total="totalDiamonds" @collected="collectedDiamonds" @game-over="gameOver" @gameCompleted="gameCompleted" ref="gridComponent" level="0" ></grid>
                </div>

                <div v-if="currentLevel === 2 && showGame">
                    <!--key visar för vue att varje grid är "unik" och drf måste den göra om destrot/create -->    
                    <grid key="2" @total="totalDiamonds" @collected="collectedDiamonds" @game-over="gameOver" @gameCompleted="gameCompleted" ref="gridComponent" level="1" difficulity="this.difficulity"></grid>
                </div>

                <div v-if="currentLevel === 3 && showGame">
                    <grid @total="totalDiamonds" @collected="collectedDiamonds" @player-stuck="gameOver" ref="gridComponent" level="2"></grid>
                </div>

            </div>

            <div class="win-screen" v-if="winningScreen">
                <winningScreen />
            </div>

            <div id="loose-screen" v-if="showGameOver">
                <gameOverScreen :deathMessage="gameOverReason" @reloadLevel="restartLevel" @startMenu="showMenu"/>
            </div>
        </div>   
    `,
    data() {
        return {
            currentLevel: 1,
            maxNumberOfLevels: 3,
            diamondsCollected: 0,
            totalAmountOfDiamonds: 0,
            timeLeft: null,
            totalScore: 0,
            showStartMenu: true,
            showGame: false,
            showGameOver: false,
            winningScreen: false,
            gameOverReason: "You are dead",
            difficulity: 1,
            addTime: null,
            creators: [
                { name: 'Niklas' },
                { name: 'Anton' },
                { name: 'Yusra' },
                { name: 'Henrik' }
            ],
        }
    },

    methods: {

        startGame() {
            this.showStartMenu = false
            this.showGame = true
        },

        showMenu() {
            this.showStartMenu = true
            this.currentLevel = 1,
            this.difficulity = 1,
            this.resetEverything()
        },

        restartLevel() {
            this.resetEverything()
            this.startGame()
        },

        resetEverything() {
            this.showGameOver = false
            this.totalScore = 0,
            this.diamondsCollected = 0,
            this.totalAmountOfDiamonds = 0,
            this.timeLeft = null
            window.addEventListener('keydown', this.onKeyPressed)
        },

        /*resetGame() {
            this.showStartMenu = true
            this.showGame = false
            this.showGameOver = false
        },*/


        gameOver() {

            window.removeEventListener('keydown', this.onKeyPressed)

            let gameOverDelay = setTimeout(() => {
                this.showGame = false;
                this.showGameOver = true;
                clearTimeout(gameOverDelay)

            }, 2000)

        },
        

        // IF GAME WON
        gameCompleted() {

            let calculator = new ScoreCalculator()
            let finalScore = calculator.calculateFinalScore(this.diamondsCollected, this.timeLeft)

            alert("You have completed the game!\nYour score is: " + finalScore) //+ " time left " + this.timeLeft)
            //this.updateFinalScore(finalScore)
            this.totalAmountOfDiamonds = 0

            this.currentLevel == 1 ? this.nextLevel() : this.showMenu()
            //this.nextLevel()
        },


        updateRemainingTime(time) {

            this.timeLeft = time
        },

        updateTime() {
            console.log("UPDATING TIME")
            this.$refs.timeComponent.timeAdder();

            addTime: 20
        },

        updateDeathMessage() {
            this.$refs.gameOverComponent.updateDeathMessage("HOWDY")
        },

        calculateScore() {

        },

        // TODO: ta bort? 
        /*updateFinalScore(score) {
            this.totalScore = score
            this.showStartMenu = true
            this.showGame = false
        },*/

       


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

        nextDifficulity(){
            this.difficulity+=1;
            if (this.difficulity === 3){
                this.difficulity = 1
            }

            //this.difficulity = this.difficulity >= 3 ? 1 : difficulity + 1
        },

        nextLevel() {
            this.currentLevel = this.currentLevel >= this.maxNumberOfLevels ? 1 : this.currentLevel + 1
        },

        onKeyPressed(event) {
            let keyEvent = event.key

            switch (keyEvent) {
                case 'ArrowUp':
                case 'w':
                    this.$refs.gridComponent.updatePlayerMovement('up');
                    break;
                case 'ArrowDown':
                case 's':
                    this.$refs.gridComponent.updatePlayerMovement('down');
                    break
                case 'ArrowLeft':
                case 'a':
                    this.$refs.gridComponent.updatePlayerMovement('left');
                    break
                case 'ArrowRight':
                case 'd':
                    this.$refs.gridComponent.updatePlayerMovement('right');
                    break
            }
        },

    

    },

    created() {
        window.addEventListener('keydown', this.onKeyPressed)
    },

    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeyPressed)
    },
}