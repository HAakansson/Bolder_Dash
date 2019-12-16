export default class Boulder {

    static Falling(gridHeight, gridWidth, tiles, Tile, canKill, ) {
        var boulderFall = new Audio('Sound/BoulderFall.mp3');
        for (let row = this.gridHeight - 1; row >= 0; row--) {
            for (let col = 0; col < this.gridWidth; col++) {
                const tile = this.tiles[row][col];

                if (tile.background === Tile.boulder || tile.background === Tile.diamond) {
                    let tempTile = tile.background;
                    const tileUnder = this.tiles[row + 1][col]
                    const tileAbove = this.tiles[row - 1][col]
                    if (tileUnder.background === Tile.boulder || tileUnder.background === Tile.diamond) {
                        const tileLeft = this.tiles[row][col - 1];
                        const tileRight = this.tiles[row][col + 1];
                        tileAbove.canKill = false;
                        tileUnder.canKill = false;
                        tile.canKill = false;
                        if (tileRight.background == Tile.empty) {
                            const tileRightUnder = this.tiles[row + 1][col + 1];
                            if (tileRightUnder.background == Tile.empty) {
                                tile.background = Tile.empty;
                                tileRight.background = tempTile;
                                //tileRight.playerHasMoved = true;
                                this.forceRender();
                            }
                        } else if (tileLeft.background == Tile.empty) {
                            const tileLeftUnder = this.tiles[row + 1][col - 1];
                            if (tileLeftUnder.background == Tile.empty) {
                                tile.background = Tile.empty;
                                tileLeft.background = tempTile;
                                //tileLeft.playerHasMoved = true;
                                this.forceRender();
                            }
                        }
                    } else if (tileUnder.background === Tile.empty) {
                        boulderFall.play();
                        tile.canKill = false
                        tileUnder.canKill = true
                        tileUnder.background = tempTile;
                        tile.background = Tile.empty;
                        //tile.playerHasMoved = true
                        this.forceRender();
                    } else if (tileUnder.background === Tile.player && tile.canKill === true) {
                        boulderFall.play();
                        tileUnder.background = tempTile;
                        tile.background = Tile.empty;
                        this.explodes(tileUnder)
                        this.forceRender();

                    } else {
                        tile.canKill = false
                    }
                }
            }
        }

    }
}