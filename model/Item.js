export class item {
  constructor(code, name, qty, unitPrice) {
    this._code = code;
    this._name = name;
    this._qty = qty;
    this._unitPrice = unitPrice;
  }

  set itemcode(code) {
    this._code = code;
  }

  set itemname(name) {
    this._name = name;
  }
  set itemqty(qty) {
    this._qty = qty;
  }
  set itemunitPrice(unitPrice) {
    this._unitPrice = unitPrice;
  }

  get itemcode() {
    return this._code;
  }

  get itemname() {
    return this._name;
  }
  get itemqty() {
    return this._qty;
  }
  get itemunitPrice() {
    return this._unitPrice;
  }
}
