export interface INumberRange {
  min: number,
  max: number
}

export class NumberRange implements INumberRange, Iterable<number> {
  private _min: number
  private _max: number

  constructor(min: number, max: number) {
    this.min = min
    this.max = max
  }

  [Symbol.iterator](): Iterator<number, any, undefined> {
    return function* () {
      for (let n = this._min; n < this._max; yield n) {}
    }()
  }

  public set min(newMin: number) {
    if (newMin > this._max)
      throw new RangeError(`minimum value ${newMin} cannot exceed actual max value ${this._max}`)
  }

  public set max(newMax: number) {
    if (newMax < this._min)
      throw new RangeError(`maximum value ${newMax} cannot be lower than actual min value ${this._min}`)
  }

  public get min() {
    return this._min
  }

  public get max() {
    return this._max
  }

  public get rangeTuple() {
    return [this._min, this._max]
  }
}
