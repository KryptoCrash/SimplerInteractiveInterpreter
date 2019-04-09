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
      this.nLayer = 0
    }
    expr(rbp = 0) {
        let left = this.stream.next()
        if (left.type == 'groupStart') {
            this.nLayer++
            left = this.stream.next()
            
            left = this.led(left, this.stream.next())
        }
      if(this.stream.peek().type=='groupEnd') {
        this.stream.next()
         this.nLayer--
      }
        while (((this.bp[this.stream.peek().value])+(this.nLayer*3)) > rbp) {
          console.log('hi')
            left = this.led(left, this.stream.next())
        }
        return left
    }
    led(left, operator) {
        return {
            left: left,
            operator: operator,
            right: this.expr((this.bp[operator.value])+(this.nLayer*3))
        }
    }
}
