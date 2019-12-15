export default class Enemey {

    static oldEnemyPos = null
    static direction = ['right', 'down', 'left', 'up']
    static index = 0
    static hitAnObstacle = false
    static inTheOpenCounter = 0

    static move(enemyPos, playerPos, grid, level) {

        console.log(this.direction[this.index])

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
       return {x: enemyPos.x + 1, y: enemyPos.y, background: enemyPos.background}
    }

    static moveLeft(enemyPos) {
        return {x: enemyPos.x - 1, y: enemyPos.y, background: enemyPos.background}
    }

    static moveUp(enemyPos) {
        return {x: enemyPos.x, y: enemyPos.y - 1, background: enemyPos.background}
    }

    static moveDown(enemyPos) {
        return {x: enemyPos.x, y: enemyPos.y + 1, background: enemyPos.background}
    }

    static ifHitAnObstacle(enemyPos) {
        if (this.oldEnemyPos === enemyPos) {
            return true
        } else {
            return false
        }
    }

    static inACorridor(enemyPos, grid, direction) {

        let tileAbove = grid[enemyPos.y - 1][enemyPos.x]
        let tileDown = grid[enemyPos.y + 1][enemyPos.x]
        let tileRight = grid[enemyPos.y][enemyPos.x + 1]
        let tileLeft = grid[enemyPos.y][enemyPos.x - 1]

        switch(direction) {
            
            case 'up':
            case 'down':
                if(tileRight.background !== 0 && tileLeft.background !== 0 && tileAbove.background === 0 && tileDown.background == 0) {
                    return true
                } else {
                    return false
                }
            case 'right':
            case 'left':
                if(tileAbove.background !== 0 && tileDown.background !== 0 && tileRight.background === 0 && tileLeft.background == 0) {
                    return true
                } else {
                    return false
                }
        }
    }

    static inTheOpen(enemyPos,grid) {

        let tileAbove = grid[enemyPos.y - 1][enemyPos.x]
        let tileDown = grid[enemyPos.y + 1][enemyPos.x]
        let tileRight = grid[enemyPos.y][enemyPos.x + 1]
        let tileLeft = grid[enemyPos.y][enemyPos.x - 1]

        if(
            tileAbove.background === 0 && tileDown.background === 0 &&
            tileRight.background === 0 && tileLeft.background === 0) {
            return true
        } else {
            return false
        }
    }

    static inATCrossing(enemyPos, grid, direction) {
        
        let tileAbove = grid[enemyPos.y - 1][enemyPos.x]
        let tileDown = grid[enemyPos.y + 1][enemyPos.x]
        let tileRight = grid[enemyPos.y][enemyPos.x + 1]
        let tileLeft = grid[enemyPos.y][enemyPos.x - 1]
        
        switch (direction) {
            
            case 'right':
                if(tileAbove.background === 0 && tileDown.background === 0 && tileRight.background !== 0 && tileLeft.background === 0) {
                    return true
                } else if((tileAbove.background === 0 || tileDown.background === 0) && tileRight.background === 0 && tileLeft.background === 0) {
                    return true
                } else {
                    return false
                }
            case 'left':
                if(tileAbove.background === 0 && tileDown.background === 0 && tileLeft.background !== 0 && tileRight.background === 0) {
                    return true
                } else if((tileAbove.background === 0 || tileDown.background === 0) && tileRight.background === 0 && tileLeft.background === 0) {
                    return true
                } else {
                    return false
                }
            case 'up':
                if(tileRight.background === 0 && tileLeft.background === 0 && tileAbove.background !== 0 && tileDown.background === 0) {
                    return true
                } else if((tileRight.background === 0 || tileLeft.background === 0) && tileAbove.background === 0 && tileDown.background === 0) {
                    return true
                } else {
                    return false
                }
            case 'down':
                if(tileRight.background === 0 && tileLeft.background === 0 && tileDown.background !== 0 && tileAbove.background === 0) {
                    return true
                } else if((tileRight.background === 0 || tileLeft.background === 0) && tileDown.background === 0 && tileAbove.background === 0) {
                    return true
                } else {
                    return false
                }
        }
    }

    static inACorner(enemyPos, grid, direction) {

        let tileAbove = grid[enemyPos.y - 1][enemyPos.x]
        let tileDown = grid[enemyPos.y + 1][enemyPos.x]
        let tileRight = grid[enemyPos.y][enemyPos.x + 1]
        let tileLeft = grid[enemyPos.y][enemyPos.x - 1]

        switch(direction) {
            case 'right':
                if((tileDown.background === 0 || tileAbove.background === 0) && tileLeft.background === 0 && tileRight.background !== 0) {
                    return true
                } else {
                    return false
                }
            case 'left':
                if((tileDown.background === 0 || tileAbove.background === 0) && tileRight.background === 0 && tileLeft.background !== 0) {
                    return true
                } else {
                    return false
                }
            case 'up':
                if((tileRight.background === 0 || tileLeft.background === 0) && tileDown.background === 0 && tileAbove.background !== 0) {
                    return true
                } else {
                    return false
                }
            case 'down':
                if((tileRight.background === 0 || tileLeft.background === 0) && tileAbove.background === 0 && tileDown.background !== 0) {
                    return true
                } else {
                    return false
                }
        }

    }

    static inADeadEnd(enemyPos, grid, direction) {

        let tileAbove = grid[enemyPos.y - 1][enemyPos.x]
        let tileDown = grid[enemyPos.y + 1][enemyPos.x]
        let tileRight = grid[enemyPos.y][enemyPos.x + 1]
        let tileLeft = grid[enemyPos.y][enemyPos.x - 1]

        switch(direction) {

            case 'left':
                if(tileAbove.background !== 0 && tileDown.background !== 0 && tileLeft.background !== 0 && tileRight.background === 0) {
                    return true
                } else {
                    return false
                }
            case 'right':
                if(tileAbove.background !== 0 && tileDown.background !== 0 && tileRight.background !== 0 && tileLeft.background === 0) {
                    return true
                } else {
                    return false
                }
            case 'up':
                if(tileRight.background !== 0 && tileLeft.background !== 0 && tileAbove.background !== 0 && tileDown.background === 0) {
                    return true
                } else {
                    return false
                }
            case 'down':
                if(tileRight.background !== 0 && tileLeft.background !== 0 && tileDown.background !== 0 && tileAbove.background === 0) {
                    return true
                } else {
                    return false
                }
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

    static level2Enemy (enemyPos, grid) {

        let tileAbove = grid[enemyPos.y - 1][enemyPos.x]
        let tileDown = grid[enemyPos.y + 1][enemyPos.x]
        let tileRight = grid[enemyPos.y][enemyPos.x + 1]
        let tileLeft = grid[enemyPos.y][enemyPos.x - 1]

        if(!this.inACorridor(enemyPos, grid, this.direction[this.index])){
            if(this.inTheOpen(enemyPos, grid)){
                console.log('In the open')
                if(this.inTheOpenCounter < 1) {
                    switch(Math.floor(Math.random() * 4)){

                    case 0:
                        this.index = 0
                    case 1:
                        this.index = 1
                    case 2: 
                        this.index = 2
                    case 3:
                        this.index = 3
                   
                    }
                    this.inTheOpenCounter++
                } else {
                    this.inTheOpenCounter = 0
                } 
            } else {
                if(this.inATCrossing(enemyPos, grid, this.direction[this.index])) {
                    console.log('In a T Crossing')
                    switch(this.direction[this.index]) {

                        case 'left': 
                        case 'right':
                            if(Math.random() > 0.5) {
                                this.index = 3
                                return this.moveUp(enemyPos)
                            } else {
                                this.index = 1
                                return this.moveDown(enemyPos)  
                            }  
                        case 'up':
                        case 'down':
                            if(Math.random() > 0.5) {
                                this.index = 0
                                return this.moveRight(enemyPos)
                            } else {
                                this.index = 2
                                return this.moveLeft(enemyPos)  
                            } 
                    }
                } else if (this.inACorner(enemyPos, grid, this.direction[this.index])) {
                    console.log('In a corner')

                    switch(this.direction[this.index]) {

                        case 'left': 
                        case 'right':
                            if(tileAbove.background !== 0) {
                                this.index = 1
                                return this.moveDown(enemyPos)
                            } else if(tileDown.background !== 0) {
                                this.index = 3
                                return this.moveUp(enemyPos)
                            }
                        case 'up':
                        case 'down':
                            if(tileRight.background !== 0) {
                                this.index = 2
                                return this.moveLeft(enemyPos)
                            } else if(tileLeft.background !== 0) {
                                this.index = 0
                                return this.moveRight(enemyPos)
                            }
                    }
                } else if(this.inADeadEnd(enemyPos, grid, this.direction[this.index])) {    
                    console.log('In a dead end')
                    switch(this.direction[this.index]) {

                        case 'left': 
                            this.index = 0
                            break
                        case 'right':
                            this.index = 2
                            break
                        case 'up':
                            this.index = 1
                            break
                        case 'down':
                            this.index = 3
                            break
                    }
                }  
            }
        } 

        switch (this.direction[this.index]) {

            case 'left': 
                return this.moveLeft(enemyPos)
            case 'right':
                return this.moveRight(enemyPos)
            case 'up':
                return this.moveUp(enemyPos)
            case 'down':
                return this.moveDown(enemyPos)
        }
        // if(this.ifHitAnObstacle(enemyPos)) {
        //     if(this.index < this.direction.length - 1) {
        //         this.index++
        //     } else {
        //         this.index = 0
        //     }
        // } else {
        //     this.oldEnemyPos = enemyPos
        // }

    }

    static level3Enemy (enemyPos, playerPos, grid) {
        

    }
}