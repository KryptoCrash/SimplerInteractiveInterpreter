class Lexer {
    constructor(stream) {
        this.stream = stream
    }
    isDigit(char) {
        return (/\d/).test(char)
    }
    isLetter(char) {
        return (/[a-z]/i).test(char)
    }
    readWhile(callback) {
        let str = ''
        while (this.continue() && callback(this.stream.peek())) {
            str += this.stream.next()
        }
        return str
    }
    tokenizeNext() {
        let token = this.stream.peek()
        if ((/[a-z]/i).test(token)) return {
            type: 'var',
            value: this.readWhile(this.isLetter)
        }
        if ((/\d/).test(token)) return {
            type: 'digit',
            value: this.readWhile(this.isDigit)
        }
        if ((/[-+*/%]/).test(token)) return {
            type: 'operator',
            value: this.stream.next()
        }
        if ((/[()]/).test(token)) return {
            type: token == '(' ? 'groupStart' : 'groupEnd',
            value: this.stream.next()
        }
        if (token === '=') return {
            type: 'assign',
            value: this.stream.next()
        }
        throw new Error('Invalid Token: ' + token)
    }
    tokenizePeek() {
        let token = this.stream.peek()
        let i = this.stream.index
        if ((/[a-z]/i).test(token)) {
            let x = {
                type: 'var',
                value: this.readWhile(this.isLetter)
            }
            this.stream.index = i
            return x
        }
        if ((/\d/).test(token)) {
            let x = {
                type: 'digit',
                value: this.readWhile(this.isDigit)
            }
            this.stream.index = i
            return x
        }
        if ((/[-+*/%]/).test(token)) {
            let x = {
                type: 'operator',
                value: this.stream.next()
            }
            this.stream.index = i
            return x
        }
        if ((/[()]/).test(token)) {
            let x = {
                type: token == '(' ? 'groupStart' : 'groupEnd',
                value: this.stream.next()
            }
            this.stream.index = i
            return x
        }
        if (token === '=') {
            let x = {
                type: 'assign',
                value: this.stream.next()
            }
            this.stream.index = i
            return x
        }
    }
    peek() {
        return this.tokenizePeek()
    }
    next() {
        return this.tokenizeNext()
    }
    continue () {
        return this.stream.continue()
    }
}
