//? Instructions to follow:

//* Average of time that one task wait in a queue.
//* The students can print one task from 1 to 20 pages of length.
//* 10 students each one print 2 times.
//* 20 task / 1 hour = 1 task / 3 minutes.
//* Simulate the possibility generating one random number between 1-180 &&
//* If (number === 180) create 1 task. (I supposed its create with the copy included)
//* Considering a lazy as real as you can. (I considered the delay between 1-5 seconds)

//? Variables that you must use:

/*
!timer -> every task have one timer when these are created
!secondCurrent -> when the task has print
!class Printer
!class Task
!class Print Spooler
!function simulation
*/

//? define the queue class, Im not define a stack class because for what I did was not mandatory
class Queue {
    //? create a queue array model in the instance of the class
    constructor () { this.queue = [] }

    //? define the allowed methods for our new array (the functionality)
    //* receive an item and put it in the last position of our array
    enqueue (item) { this.queue.push(item) }

    //* no receive and return the first item in our array and with this method we create a Fifo structure
    dequeue () { return this.queue.shift() }

    //* I think in these method for see the info in production more quickly
    //* (show our dear array which name is queue)
    show () { console.log('My queue', this.queue) }
}

//! say these I'll not comment again what is the purpose of have a class, method or queue and I'll
//! apply this rule in the rest of the file

class Printer{
    //? the constructor method can receive parameters too and with this we make reference
    //? to the object created in the instance of the class
    constructor (totalTime, taskNumber) {
        this.numberPagesInQueue = taskNumber //* represent the pages waiting for be printed
        this.numberPagesPrint = 0 //* represent the pages already printed
        this.totalTime = totalTime //* quantity of the time of all the print-time
        this.timesStart = 0 //* the relative time at the print process start
        this.timesEnd = 0 //* the relative time at the print process end
    }
    //* to get the total number of pages in queue and already print in a one array,
    //* Look that the array ain't a queue for this time,
    //* these because don't need the functionality of one queue structure
    getNumberPages () {  return [this.numberPagesInQueue, this.numberPagesPrint] }

    //* just a check by a boolean value if the print have pages pending or have all ready for the next task
    isEmpty () { return (this.numberPagesInQueue === 0) ? true : false }

    //* the most important method in these class, logically the most large method until now
    print () {
        //* time is an auxiliary variable for don't lost the value of this.TotalTime[0],
        //* the followings assigns is for sync up all the values at the one and same point of reference
        let time = this.totalTime[0]
        this.timesStart = time
        this.timesEnd = time
        // console.log('Prints starts')

        //* as the name says while the time be less than the total time and
        //* there are still pages waiting, times increase in one by one at the same
        //* time with the timesEnd increase in the same amount
        while (time < this.totalTime[1] && this.numberPagesInQueue > 0){
            if (getRandom(0, 180) === 180) {
                //* calculate the extra time for print one by one the pages of this task
                //* one task was end of print at all
                //* the pages waiting becomes in pages printed and the queue is empty now
                // console.log('Task has print', this.numberPagesInQueue)
                //* the delay is 3 seconds
                const delay = 3
                const extraTime = this.numberPagesInQueue * delay
                time += extraTime
                this.timesEnd += extraTime
                this.numberPagesPrint = this.numberPagesInQueue
                this.numberPagesInQueue = 0
            }

            time++
            this.timesEnd++
        }
        //*update the time of the end for becomes the time of start for the next tasks of other student
        this.totalTime[1] = this.timesEnd

        //* Not forget that the time could 0 before end with all the tasks
        if (time === 0) return
            `Times up, the last print was ${this.numberPagesPrint}\n`+
            ` Total of time was ${this.totalTime}`

        //* get the time of print this task
        let difference = this.timesEnd - this.timesStart
        return 'The printer is empty in ' + difference + ' seconds'
    }
}

//? if the previous class was the most large in the file this is the shortest class
class Task{
    //*gets a random number between 1-20 to be a number of the task of one student in the future
    constructor (time = 0) {
        this.task = getRandom(1, 20)
        this.timer = time
        this.secondCurrent = time
    }
}

//? the last class of this adventure! Figured out what's have hide inside of itself
class PrintSpooler{
    constructor(students, time = 0){
        //* Look at this there are a couple of queues together, so good looking
        this.students = new Queue()
        this.tasks = new Queue()
        students.forEach(student => {
            //* mmmm so here these two classes are using
            //* seriously, currentTask is the container of the number of pages in a task
            //* each student have one task assigned
            let currentTask = new Task(time).task
            this.students.enqueue(student)
            this.tasks.enqueue(currentTask)
        })
    }
}

//! well well my favorite part functions everywhere

//* Get numbers between two inclusive numbers passed as an separate arguments
const getRandom = (min, max) => Math.floor(min + Math.random() * (max + 1 - min))

//* .toFixed(2) don't do all the functionality I want to have for example:
//? 32.toFixed(2) = 32.00 but roundPersonal(32) = 32
function roundPersonal(num, decimalNum=2) { return +(Math.round(num + `e+${decimalNum}`)  + `e-${decimalNum}` )}

//* extra function mainly do that all names are written in a good way
const validateStudents = students => students.forEach( student => {
    if (student.length <= 0) return false
    firstLetter = student[0].toUpperCase()
    restOfName = student.slice(1).toLowerCase()
    laboratoryStudents.push(firstLetter + restOfName)
} ) !== false ? true: false

//* I can get result by result of each user joined at this important function
function printByUser (user, timeHasPassed, pages) {
    //* I make sure that the time isn't more than 1 hour before start the party
    if (timeHasPassed >= 3600) return timeHasPassed
    //* I make a new recipe the important here is userPrints and printResponse
    const taskNumber = pages, numberOfCopies = 2, totalTime = 3600, delayBetweenUsers = 5
    let userPrints = new Printer([timeHasPassed+delayBetweenUsers, totalTime], taskNumber*numberOfCopies)
    let pagesBefore = userPrints.getNumberPages()
    let printResponse = userPrints.print()
    let pagesAfter = userPrints.getNumberPages()
    // console.log(printResponse)
    // console.log('Start:', pagesBefore, '=>', 'End:', pagesAfter)
    //* save all similar dates in collections and I'll becoming in a pro collector
    const totalTimes = [userPrints.totalTime, userPrints.timesStart, userPrints.timesEnd]
    const totalPages = [userPrints.numberPagesInQueue, userPrints.numberPagesPrint]
    //* show the info in a more organized form
    const result = {'time': totalTimes[0], 'prints': totalPages[1], 'user': user}
    return (result.time === undefined) ? null : result
}

//* That the function-name says is what this function do, I think it was descriptive enough
function calculateAverage(prints, times, users){
    let bool = true, pagesPrinted = 0, waitTime = 0
    for (let pages of prints) typeof(pages) === 'number' ? pagesPrinted += pages : bool = false
    for (let time of times) waitTime += time

    //? Average = (Time passed / Number of users) : float with 2 decimal numbers
    average = roundPersonal(waitTime / users.length)
    let responsePrint = average + ' seconds for ' + pagesPrinted + ' prints between the students'
    //* complete the msg including the students when times up
    if (printSpooler.students.queue.length !== users.length) users.map(user=>responsePrint = `${responsePrint} ${user},`)
    else responsePrint = `${responsePrint.replace(' between the students', '')}, all done!`
    responsePrint = responsePrint.slice(0, -1)
    response = { 'print': responsePrint }
    //* if bool === false is because one or more tasks are not a number and it's only a mistake
    return bool ? response : false
}

//* Im conscious about I call one variable inside this scope equal than one of the parameters of this function
function simulation (printSpooler, timeInSeconds, times=1) {
    //* for save all the answers in the case of times>1
    if (times<1) return null
    answers = []
    for (let i = 0; i < times; i++){
        let time = 0, index = 0, prints = [], times = [], users = []
        printSpooler.students.queue.map(student => {
            if (time < timeInSeconds) {
                let pages = printSpooler.tasks.queue[index]
                //* the most important here calls to print the task of the next student
                result = (printByUser(student, time, pages))
                if (result !== null){
                    time = result.time[1]
                    prints.push(result.prints)
                    times.push(result.time[1] - result.time[0]) // Is important get the difference for the average calculate
                    users.push(result.user)
                }
                index++ //* to keep the pages up to date
            }
        })
        //* the answer at the main question of this adventure (exercise)
        answer = calculateAverage(prints, times, users)
        if (!answer) return false
        //* our collection of multiply times simulating these behavior
        answers.push(answer.print)
    }
    return answers
}

const students = [
    'Sergio', 'Alvaro', 'maría', 'FernanDa', 'Juan',
    'Gerald', 'Ariana', 'Sofía', 'Daniela', 'Christian',
    'Francisco', 'Max', 'Ana', 'Selena', 'Bruno',
    'Kevin', 'Alex', 'Alexandra', 'Ximena', 'Daniela',
]

//* the next logic is only for have students 50% boys and 50% girls and the names well written
let countGirls = 0, countBoys = 0, laboratoryStudents = []
students.map(student => (student.slice(-1) === 'a') ? countGirls++ : countBoys++ )
if (countGirls !== countBoys || students.length === 0) return false
if (!validateStudents(students)) return false

//* these group of student now becoming in the students that want print in our amazing and unique printer
//* We need the class PrintSpooler to give supply
printSpooler = new PrintSpooler(laboratoryStudents)
// console.log(printSpooler)
// amazingSimulation = simulation(printSpooler, 3600, 10)
amazingSimulation = simulation(printSpooler, 3600)
amazingSimulation.map(currentSimulation => console.log(currentSimulation))
//Return 300 of average after many simulations
// let answerSimulation = simulation(printSpooler, 3600, 50000) // min: 107, max: 911, average: 241.2 (seconds)
// //! I execute exclusive the previous line x10 times at least getting nothing to find the min a max value possible
// sum = 0
// answerSimulation.map(currentAS => {
//     answerShow = parseInt(currentAS.split(' ')[0])
//     sum += answerShow
    // if (answerShow <= 107 || answerShow >= 911) console.log(answerShow)
// })
// console.log(sum/50000);
//? this function delay from start to end around 2 minutes 38 seconds
// let answerSimulation = simulation(printSpooler, 3600, 3000000) // min: 88, max: 1795, average: 239.17 (seconds)
//! I execute exclusive the previous line x3 times at least getting nothing to find the min a max value possible
// sum = 0
// answerSimulation.map(currentAS => {
//     answerShow = parseInt(currentAS.split(' ')[0])
//     if (answerShow <= 88 || answerShow >= 1795) console.log(answerShow)
//     sum += answerShow
// })

// console.log('Average', roundPersonal(sum/3000000))