class Parser {
    constructor(stream) {
        this.stream = stream
        this.bp = {
            '=': 1,
            '+': 2,
            '-': 2,
            '*': 3,
            '/': 3,
            '%': 3
        }
    }
    expr(rbp = 0) {
        let left = this.stream.next()
        if (left.type == 'groupStart') {
            let str = ''
            while (this.stream.peek().type != 'groupEnd') {
                str += this.stream.next().value
            }
            this.stream.next()
            return this.led(new Parser(new Lexer(new charStream(str))).expr(), this.stream.next())
        }
        while (this.bp[this.stream.peek().value] > rbp) {
            left = this.led(left, this.stream.next())
        }
        return left
    }
    led(left, operator) {
        return {
            left: left,
            operator: operator,
            right: this.expr(this.bp[operator.value])
        }
    }
}
