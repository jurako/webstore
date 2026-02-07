import { isObjectEmpty } from './helpers'

class Validator {
  static errorClasses = ['border-red-600', 'border-2']

  constructor(items) {
    this.#validateArgument(items)

    this.errors = {}
    this.items = items
  }

  validate() {
    this.errors = {}

    for (const item of this.items) {
      for (const [field, ref] of Object.entries(item.fields)) {
        if (item.rule.fails(ref.value)) {
          this.errors[field] = item.rule.errorMsg
        }
      }

      if (Object.keys(this.errors).length) break
    }
  }

  #validateArgument(items) {
    if (items?.constructor?.name != 'Array') throw new Error('Passed value is not an Array')

    if (!items.length) throw new Error('Validator must contain atleast one validation item')

    for (const item of items) {
      if (isObjectEmpty(item)) throw new Error('Invalid validation item value, must be an Object')

      if (!item.hasOwnProperty('rule') || !item.hasOwnProperty('fields'))
        throw new Error('Validation item must contain rule and fields properties')

      if (isObjectEmpty(item.fields))
        throw new Error("Validation item's field property is missing values")
    }
  }
}

class ValidationRule {
  fails(value) {
    throw new Error('This method must be overridden by subclasses')
  }
}

class isEmptyRule extends ValidationRule {
  errorMsg = 'Please fill in all fields'

  fails(value) {
    return !value
  }
}

class isInvalidEmailRule extends ValidationRule {
  static #emailRegExp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
  errorMsg = 'Please enter a valid email address'

  fails(value) {
    return !isInvalidEmailRule.#emailRegExp.test(value)
  }
}
export const isEmpty = new isEmptyRule()
export const isInvalidEmail = new isInvalidEmailRule()
export { Validator }
