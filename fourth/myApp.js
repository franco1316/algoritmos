function sumEvenFibonacci(
    n,
    previous = 1,
    current = 1,
    sum = 0
) {
    if (n >= 4000000 || current > n) return sum;
    if (current % 2 === 0) sum += current;
    let temporal = previous;
    previous = current;
    current += temporal;
    return sumEvenFibonacci(n, previous, current, sum);
}
let test = sumEvenFibonacci(5);
console.log(test); // 1 1 2 3 5 = 2
test = sumEvenFibonacci(21);
console.log(test); // 1 1 2 3 5 8 13 21 = 10
test = sumEvenFibonacci(40);
console.log(test); // 1 1 2 3 5 8 13 21 34 = 44
