export default {

    template: `
        <div>
            <h2>Highscores</h2>
            <ol>
                <li v-for="score in highestScores">{{ score.name }}: {{ score.score }}</li>
            </ol>
        </div>
    `,
    data() {
        return {
            // Skriv endast ut fem högsta
            highestScores: [
                { name: 'ABC', score: 123},
                { name: 'BCD', score: 234},
                { name: 'CDE', score: 345},
                { name: 'DEF', score: 456},
                { name: 'EFG', score: 567},
            ] 
        }
    },

    methods: {
        
    },

}