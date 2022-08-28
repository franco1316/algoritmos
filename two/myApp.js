class Node{
    constructor (value = null) {
        this.node = value
        this.next = null
    }

    getNode () {
        return this.node
    }

    getNext () {
        return this.next
    }

    setNode () {
        this.node = this.next
        this.next = null
    }

    setNext (value) {
        this.next = value
    }
}

class UnorderedList{
    constructor () {
        this.head = null
        this.length = 0
    }

    add (item) {
        let newItem = new Node(item)
        newItem.setNext(this.head)
        this.head = newItem
        this.length++
    }

    search (item) {
        let current = this.head, found = false

        while (current !== null && !found){
            if (current.getNode() === item) found = true
            else current = current.getNext()
        }

        return found
    }

    remove (item) {
        let current = this.head, previous = null, found = false

        while (!found) {
            if (current.getNode() !== item) {
                previous = current
                current = current.getNext()
            }
            else {
                found = true
                this.length--
            }
        }

        if (previous !== null) previous.setNext(current.getNode())
        else this.head = current.getNext()
    }

    is_empty () {
        return this.head === null
    }

    size () {
        return this.length
    }

    append (item) {
        let current = this.head
        if (current?.next) {
            while (current.next){
                current = current.next
            }
            let newNode = new Node(item)
            current?.setNext(newNode)
            this.length++
         }
    }

    index (item) {
        let position = 0, current = this.head
        while (current.next && current.node !== item){
            current = current.next
            position++
        }
        return position
    }

    insert (pos, item) {
        let current = this.head, position = 0, flag = true
        while (current.next && flag){
            if (pos === position + 1) {
                let newNode = new Node(item)
                newNode.setNext(current.next)
                current.setNext(newNode)
                flag = false
            }
            current = current.next
            position++
        }
        this.length++
    }

    pop2 (pos){
        let current = this.head, position = 0, posItem
        if (current?.next) {
            while (current.next){
                if (pos > position + 1) current = current.next
                else if (pos === position + 1) {
                    posItem = current.next.getNode()
                    let newList = new Node(current.getNode())
                    newList.setNext(current.next.getNext())
                    current.setNext(newList)
                }
                else break
                position++
            }
        }
        this.length--
        return posItem
    }

    pop1 () {
        let current = this.head, posItem
        while (current.next.next){
            current = current.next
        }
        posItem = current.next.getNode()
        current.setNext(null)

        this.length--
        return posItem
    }

    showNodes (position) {
        let nLength = this.length
        let show = this.head
        while (position < nLength && position != 0) {
            show = show.next
            nLength--
        }
        return show.node
    }
}

function testAppend (myList) {
    isTestAppend = true
    myList.append(-2)
    myList.append(-1)
    console.log(myList.head?.next.next.next.next)
    myList.add(6)
    console.log(myList.head)
}

function testIndex (myList) {
    let answers = []
    if (isTestAppend) for (let i = 6; i >= -2; i--) answers.push(myList.index(i))
    else for (let i = 5; i >= 0; i--) answers.push(myList.index(i))
    console.log(answers)
}

function testInsert (myList) {
    console.log(myList.head.next)
    myList.insert(2, 9)
    console.log(myList.head.next)
}

function testPopPos (myList) {
    console.log(myList.head.next)
    console.log(myList.pop2(2))
    console.log(myList.head.next)
}

function testPop (myList) {
    console.log(myList.head.next.next.next)
    console.log(myList.pop1())
    console.log(myList.head.next.next.next)
}


let myList = new UnorderedList()
for (let i = 0; i < 6; i++) myList.add(i)

let isTestAppend = false
// testAppend(myList)
// testIndex(myList)
// testInsert(myList)
// testPopPos(myList)
// testPop(myList)