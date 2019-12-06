export default {

    props: ['score'],

    template: `
        <div>Diamonds collected {{ collectedDiamonds }}</div>
    `,


    data() {
        return {
            collectedDiamonds: 0
        }
    },

    methods: {
        pickupDiamond() {
            collectedDiamonds += 1
        }
    },
}