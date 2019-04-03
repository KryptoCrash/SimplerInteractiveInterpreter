class lexer {
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
    while(this.continue() &&callback(this.stream.peek())) {
      str += this.stream.next()
    }
    return str
  }
  tokenizeNext() {
    let token = this.stream.peek()
    if((/[a-z]/i).test(token)) return {type: 'var', value: this.readWhile(this.isLetter)}
    if((/\d/).test(token)) return {type: 'digit', value: this.readWhile(this.isDigit)}
    if((/[-+*/%]/).test(token)) return {type: 'operator', value: this.stream.next()}
    if((/[()]/).test(token)) return {type: token=='(' ? 'groupStart' : 'groupEnd', value: this.stream.next()}
    if(token==='=') return {type: 'assign', value: this.stream.next()}
    throw new Error('Invalid Token: '+token)
  }
  next() {
    return this.tokenizeNext()
  }
  continue() {
    return this.stream.continue()
  }
}
