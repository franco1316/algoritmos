function sumEvenFibonacci(n, previous = 1, current = 1, arrayFibonacci = [1]) {
    if (current > n) return arrayFibonacci;
    var temporal = previous;
    previous = current;
    current += temporal;
    arrayFibonacci.push(previous)
    return sumEvenFibonacci(n, previous, current, arrayFibonacci);
}

let show = sumEvenFibonacci(1000)
console.log(show)
