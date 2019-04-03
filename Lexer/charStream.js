class charStream {
  constructor(program) {
    this.index = 0
    this.program = program.split('').filter(c => !((/\s/).test(c)))
  }
  next() {
    return this.program[this.index++]
  }
  peek() {
    return this.program[this.index]
  }
  continue() {
    return !!(this.peek())
  }
}
