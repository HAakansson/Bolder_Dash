import Grid from './Grid.js'
import Highscore from './Highscore.js'
import Countdown from './Countdown.js'

export default {
    components: {
        Grid,
        Highscore,
        Countdown
    },

    template: `
        <div class="game-page-1">
            <div v-if="showStartMenu" class="start-menu">
                <h1 class="game-title" data-text="[Bolder_Dash]">[Bolder_Dash]</h1>
                <div v-if="showHighScore" class="start info-box">
                    <highscore class="highscore"/>
                </div>
                <div class="buttons">
                    <button class="next-level" @click="nextLevel">Choose your level: (Level {{ currentLevel }})</button>
                    <button class="start-level" @click="beginGame">Start Game</button>
                </div>  
                <div class="creators-list">
                    <h2>Creators:</h2> 
                    <h3 class="creators-name" v-for="creator in creators"> || {{ creator.name }}  </h3>
                </div>
            </div>

            <div v-if="startGame" class="game-page-2">
                <div class="hud">
                    <h2 class="level-box">Level {{ currentLevel }}</h2>
                    <Countdown/>
                </div>
                <div v-if="currentLevel === 1 && startGame">
                    <grid v:dir="dir" ref="gridComponent" level="0"></grid>
                </div>
                <div v-if="currentLevel === 2 && startGame">
                <grid v:dir="dir" ref="gridComponent" level="1"></grid>
                </div>
            </div>
        </div>   
    `,
    data() {
        return {
            currentLevel: 1,
            maxNumberOfLevels: 2,
            showStartMenu: true,
            startGame: false,
            showHighScore: false,
            creators: [
                { name: 'Niklas' },
                { name: 'Anton' },
                { name: 'Yusra'},
                { name: 'Henrik'}
            ],
            dir: 0
        }
    },

    methods: {
        beginGame() {
            this.showStartMenu = false
            this.startGame = true
        },

        // REMOVE
        // onKeyPressed(event) {
        //     switch (event.key) {
        //         case 'ArrowLeft':
        //         case 'a':
        //             console.log("Lower Level")
        //             break
        //         case 'ArrowRight':
        //         case 'd':
        //             console.log("Higher Level")
        //             break
        //      }
        // },

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
        }
    },

    created() {
        window.addEventListener('keydown', this.onKeyPressed)
    },

    beforeDestroy() {
        window.removeEventListener('keydown', this.onKeyPressed)
    },
}