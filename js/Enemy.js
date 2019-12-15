export default class Enemey {

    static oldEnemyPos = null
    static direction = ['right', 'down', 'left', 'up']
    static index = 0
    static hitAnObstacle = false

    static move(enemyPos, playerPos, grid, level) {

        let newEnemyPos = null

        /*  enemyPos and playerPos is both an object with a x, y and background value.
            The level is the level of the enemy, the higher the level, the smarter it moves.*/

        switch (level) {
            case 1:
                newEnemyPos = this.level1Enemy(enemyPos)
                break
            case 2:
                newEnemyPos = this.level2Enemy(enemyPos, grid)
                break
            case 3:
                newEnemyPos = this.level3Enemy(enemyPos, playerPos, grid)
                break
        }
        return newEnemyPos
    }

    static moveRight(enemyPos) {
        return { x: enemyPos.x + 1, y: enemyPos.y, background: enemyPos.background }
    }

    static moveLeft(enemyPos) {
        return { x: enemyPos.x - 1, y: enemyPos.y, background: enemyPos.background }
    }

    static moveUp(enemyPos) {
        return { x: enemyPos.x, y: enemyPos.y - 1, background: enemyPos.background }
    }

    static moveDown(enemyPos) {
        return { x: enemyPos.x, y: enemyPos.y + 1, background: enemyPos.background }
    }

    static ifHitAnObstacle(enemyPos) {
        if (this.oldEnemyPos === enemyPos) {
            return true
        } else {
            return false
        }
    }

    static level1Enemy(enemyPos) {

        let randomNumber = (Math.floor(Math.random() * 4))
        switch (randomNumber) {
            case 0:
                return this.moveLeft(enemyPos)
            case 1:
                return this.moveUp(enemyPos)
            case 2:
                return this.moveRight(enemyPos)
            case 3:
                return this.moveDown(enemyPos)
        }
    }

    static level2Enemy(enemyPos, grid) {

        let tileAbove = grid[enemyPos.y - 1][enemyPos.x]
        let tileDown = grid[enemyPos.y + 1][enemyPos.x]
        let tileRight = grid[enemyPos.y][enemyPos.x + 1]
        let tileLeft = grid[enemyPos.y][enemyPos.x - 1]

        let changeDirectionLoop = false

        if (this.ifHitAnObstacle(enemyPos)) {
            if (this.index < this.direction.length - 1) {
                this.index++
            } else {
                this.index = 0
            }
        } else {
            this.oldEnemyPos = enemyPos
        }

        console.log(this.direction[this.index])

        switch (this.direction[this.index]) {

            case 'left':
                return this.moveLeft(enemyPos)
            case 'up':
                return this.moveUp(enemyPos)
            case 'right':
                return this.moveRight(enemyPos)
            case 'down':
                return this.moveDown(enemyPos)
        }
    }

    static level3Enemy() {

    }

}