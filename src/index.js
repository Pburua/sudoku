module.exports = function solveSudoku(matrix) {

    let emptyElementsCoordinates = getEmptyElementsCoordinates(matrix);

    // console.log(emptyElementsCoordinates);

    for (let i = 0; i < emptyElementsCoordinates.length; i++) {

        // console.log('iteration');

        let curRow = emptyElementsCoordinates[i][0];
        let curCol = emptyElementsCoordinates[i][1];
        let emptyElement = matrix[curRow][curCol];


        let nextPossibleElementValue = getNextPossibleElementValue(matrix, emptyElement, curRow, curCol);

        matrix[curRow][curCol] = nextPossibleElementValue;

        // console.log(nextPossibleElementValue);

        if (nextPossibleElementValue === 0) {
            // console.log('?!');
            i -= 2;
        }

    }

    return matrix;


};

function getEmptyElementsCoordinates(matrix) {
    let emptyElementsCoordinates = [];

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            if (matrix[i][j] === 0) {
                emptyElementsCoordinates.push([i, j]);
            }
        }
    }

    return emptyElementsCoordinates;
}

function getNextPossibleElementValue(matrix, emptyElement, curRow, curCol) {

    for (let i = emptyElement; i < 10; i++) {

        if (isPossible(matrix, curRow, curCol, i)) {
            return i;
        }
    }
    return 0;
}

function isPossible(matrix, curRow, curCol, value) {

    return !!(checkRow(matrix, curRow, curCol, value) &&
        checkCol(matrix, curRow, curCol, value) &&
        checkBox(matrix, curRow, curCol, value));

}

function checkRow(matrix, curRow, curCol, value) {
    for (let i = 0; i < 9; i++) {
        if (matrix[curRow][i] === value)
            return false;
    }
    return true;
}

function checkCol(matrix, curRow, curCol, value) {
    for (let i = 0; i < 9; i++) {
        if (matrix[i][curCol] === value)
            return false;
    }
    return true;
}

function checkBox(matrix, curRow, curCol, value) {

    let leftBorder = (Math.floor((curCol) / 3) * 3);
    let rightBorder = (9 - (Math.floor((9 - (curCol + 1)) / 3) * 3)) - 1;

    let topBorder = (Math.floor((curRow) / 3) * 3);
    let bottomBorder = (9 - (Math.floor((9 - (curRow + 1)) / 3) * 3)) - 1;

    // console.log(leftBorder);
    // console.log(rightBorder);
    // console.log(topBorder);
    // console.log(bottomBorder);

    for (let i = topBorder; i <= bottomBorder; i++) {
        for (let j = leftBorder; j <= rightBorder; j++) {

            if (matrix[i][j] === value){
                return false;
            }

        }
    }
    return true;

}
