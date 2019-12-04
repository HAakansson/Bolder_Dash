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
                    <h2 class="made-by">Created by:</h2> <!-- Kolla egna hemsidan links  --->
                    <ul class="mady-by-list">
                        <li class="list" v-for="creator in creators">{{ creator.name }}</li>
                    </ul>

                    <highscore/>
                </div>

                <!-- v-on:keyup -->
                <!--<button>Previos</button>
                <h1>Level 1</h1>
                <button>Next</button>-->
                <button @click="nextLevel">Level {{ currentLevel }}</button>

                <button class="begin" @click="beginGame">Start Game</button>
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