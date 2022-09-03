/* Shell order and merge order */
let list = [1, 5, 9, 2, 7, 53, 45, 8, 3, 21, 6, 17, 12, 0, 32, 10, 25]

function shellSort (list) {
    gap = calcGap( list.length )
    while ( gap >= 1 ) {
        for ( let index = 0; index < list.length - gap; index++ ) {
            for ( let regret = index + gap; regret > index; regret-- ) {
                let previousValue = list[regret - 1], currentValue = list[regret]
                if ( previousValue > currentValue ) {
                    [list[regret - 1], list[regret]] = swap (list[regret - 1], list[regret])
                }
            }
        }
        gap = calcGap( gap )
    }
    return list
}

const calcGap = value => { return Math.floor(value / 2) }

function swap (valueA, valueB) {
    let referenceA = valueA, referenceB = valueB
    valueA = referenceB; valueB = referenceA
    return [valueA, valueB]
}

function mergeSort (list) {
    let middle = calcGap(list.length)
    let leftList = list.slice(0, middle)
    let rightList = list.slice(middle, )
    if (list.length > 1) {
        mergeSort(leftList)
        mergeSort(rightList)
    }
    let leftIndex = 0, rightIndex = 0, listIndex = 0

    while (leftIndex < leftList.length && rightIndex < rightList.length) {
        if (leftList[leftIndex] < rightList[rightIndex]) {
            list[listIndex] = leftList[leftIndex]
            leftIndex++
        }
        else {
            list[listIndex] = rightList[rightIndex]
            rightIndex++
        }
        listIndex++
    }

    while (leftIndex < leftList.length) {
        list[listIndex] = leftList[leftIndex]
        leftIndex++
        listIndex++
    }

    while (rightIndex < rightList.length) {
        list[listIndex] = rightList[rightIndex]
        rightIndex++
        listIndex++
    }
    return list
}


let shellList = shellSort(list)
console.log(shellList)
list = [7, -5, -7, 14, 21, 16, 5, 6]
let mergeList = mergeSort(list)
console.log(mergeList)