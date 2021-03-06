export default class Player {

    static right(tiles, Tile, playerPos) {
        const row = playerPos.row;
        const col = playerPos.col
        const tile = tiles[row][col];

        const tileToTheRight = tiles[row][col + 1];
        const tile2StepsToTheRight = tiles[row][col + 2]
        const newPlayerPos = { row, col: col + 1, heading: 'right' };

        if (tileToTheRight.background !== Tile.brick &&
            tileToTheRight.background !== Tile.boulder) {

            tile.background = Tile.empty;
            tileToTheRight.background = Tile.player;

            return playerPos = newPlayerPos;
        } else if (tileToTheRight.background === Tile.boulder &&
            tile2StepsToTheRight.background === Tile.empty) {

            tileToTheRight.background = Tile.player;
            tile2StepsToTheRight.background = Tile.boulder;
            tile.background = Tile.empty;

            return playerPos = newPlayerPos;
        }
        return playerPos
    }

    static up(tiles, Tile, playerPos) {
        const row = playerPos.row;
        const col = playerPos.col
        const tile = tiles[row][col];
        const moveUp = tiles[row - 1][col]
        const newPlayerPos = { row: row - 1, col };

        if (moveUp.background !== Tile.brick &&
            moveUp.background !== Tile.boulder) {
            tile.background = Tile.empty;
            moveUp.background = Tile.player;

            return playerPos = newPlayerPos;
        }
        return playerPos
    }


    static left(tiles, Tile, playerPos) {
        const row = playerPos.row;
        const col = playerPos.col
        const tile = tiles[row][col];
        const moveLeft = tiles[row][col - 1];
        const checkIfEmpty = tiles[row][col - 2];
        const newPlayerPos = { row, col: col - 1, heading: 'left' };
        if (moveLeft.background !== Tile.brick &&
            moveLeft.background !== Tile.boulder) {
            tile.background = Tile.empty;
            moveLeft.background = Tile.player;
            return playerPos = newPlayerPos;

        } else if (moveLeft.background === Tile.boulder &&
            checkIfEmpty.background === Tile.empty) {
            moveLeft.background = Tile.player;
            checkIfEmpty.background = Tile.boulder;
            tile.background = Tile.empty;

            return playerPos = newPlayerPos;
        }
        return playerPos
    }

    static down(tiles, Tile, playerPos) {
        const row = playerPos.row;
        const col = playerPos.col
        const tile = tiles[row][col];
        const moveDown = tiles[row + 1][col];
        const newPlayerPos = { row: row + 1, col, heading: 'down' };

        if (moveDown.background !== Tile.brick &&
            moveDown.background !== Tile.boulder) {
            tile.background = Tile.empty;
            moveDown.background = Tile.player;

            return playerPos = newPlayerPos;
        }
        return playerPos
    }

    static ifStuck(tiles, Tile, playerPos){
        const row = playerPos.row;
        const col = playerPos.col

        let tileToTheRight = tiles[row][col + 1]
        let tile2StepsToTheRight = tiles[row][col + 2]
        let tileUnder = tiles[row + 1][col]
        let tileToTheLeft = tiles[row][col - 1]
        let tile2StepsToTheLeft = tiles[row][col - 2]
        let tileAbove = tiles[row - 1][col]
        if (
            (tileToTheRight.background === Tile.brick || tileToTheRight.background === Tile.boulder) &&
            (tile2StepsToTheRight.background === Tile.brick || tile2StepsToTheRight.background === Tile.boulder || tile2StepsToTheRight.background === Tile.dirt || tile2StepsToTheLeft.background === Tile.diamonds) &&
            (tileUnder.background === Tile.brick || tileUnder.background === Tile.boulder) &&
            (tileToTheLeft.background === Tile.brick || tileToTheLeft.background === Tile.boulder) &&
            (tile2StepsToTheLeft.background === Tile.brick || tile2StepsToTheLeft.background === Tile.boulder || tile2StepsToTheLeft.background === Tile.dirt || tile2StepsToTheLeft.background === Tile.diamonds) &&
            (tileAbove.background === Tile.brick || tileAbove.background === Tile.boulder)
        ) {
            return true
        }
        return false
    }
}