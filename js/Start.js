import Grid from './Grid.js'
import Highscore from './Highscore.js'

//TEST
import Countdown from './Countdown.js'

export default {
    components: {
        Grid,
        Highscore,
        Countdown
    },
    template: `
        <div @keyup.ArrowLeft="pressedKey">
            <!--<Countdown/>-->

            <div v-if="startSection" class="start">

                <h1 class="game-title" data-text="[Bolder_Dash]">[Bolder_Dash]</h1>
                <br>
                <div class="start info-box">
                    <highscore class="highscore"/>
                </div>


                <div class="buttons">

                </div>
                <button class="next-level" @click="nextLevel">Level {{ currentLevel }}</button>
                <button class="start-level" @click="beginGame">Start Game</button>


                <div class="creators-list">
                    <h2>Creators:</h2> 
                    <h3 class="creators-name" v-for="creator in creators"> || {{ creator.name }}  </h3>
                </div>


            </div>



            <div v-if="startGame">
                <h2 class="hud">Level {{ currentLevel }} <Countdown/> </h2>
                <!--<Countdown/>-->
            </div>

            <div v-if="currentLevel==1&&startGame">
                <grid/>
            </div>

            <div v-if="currentLevel==2&&startGame">
                
            </div>
        
        </div>

        
    `,
    data() {
        return {
            currentLevel: 1,
            maxNumberOfLevels: 2,
            startSection: true,
            startGame: false,
            //firstLevel: false,
            //secondLevel: false,
            creators: [
                { name: 'Niklas'},
                { name: 'Anton' },
                { name: 'Yusra'},
                { name: 'Henrik'}
            ]
        }
    },
    methods: {
        beginGame() {
            this.startSection = false
            this.startGame = true
        },

        onKeyPressed(event) {

            switch (event.key) {
                case 'ArrowLeft':
                case 'a':
                    console.log("Lower Level")
                    break
                case 'ArrowRight':
                case 'd':
                    console.log("Higher Level")
                    break
            }
        },

        nextLevel() {
            this.currentLevel = this.currentLevel >= this.maxNumberOfLevels ? 1 : this.currentLevel + 1
            
            
        }
    },


    created: function () {
        window.addEventListener('keyup', this.onKeyPressed)
    },
}