export default class Customer {
  constructor(id, name, address, salary) {
    this._id = id;
    this._name = name;
    this._address = address;
    this._salary = salary;
  }

  set custormerid(id) {
    this._id = id;
  }

  set custormername(name) {
    this._name = name;
  }
  set custormeraddress(address) {
    this._address = address;
  }
  set custormersalary(salary) {
    this._salary = salary;
  }

  get custormerid() {
    return this._id;
  }

  get custormername() {
    return this._name;
  }
  get custormeraddress() {
    return this._address;
  }
  get custormersalary() {
    return this._salary;
  }
}
