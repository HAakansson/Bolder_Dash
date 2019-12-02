import Grid from './Grid.js'

export default {
    components: {
        Grid
    },
    template: `
        <div>
        
            <div v-if="startSection" class="start">

                <h1>Start Menu</h1>
                <br>
                <div class="start info-box">
                    <h2 class="made-by">Created by:</h2>
                    <ul class="mady-by-list">
                        <li class="list" v-for="creator in creators">{{ creator.name }}</li>
                    </ul>
                </div>
                <button class="begin" @click="beginGame">Start Game</button>
            </div>



            <div v-if="gameSection">
                <grid/>
            </div>
        
        </div>

        
    `,
    data() {
        return {
            startSection: true,
            gameSection: false,
            creators: [
                { name: 'Niklas Håkansson'},
                { name: 'Anton ' },
                { name: 'Yusra'},
                { name: 'Henrik'}
            ]
        }
    },
    methods: {
        beginGame() {
            this.startSection = false,
            this.gameSection = true
        }
    },

}