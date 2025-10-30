export default class ItemsOfCustomer {
  constructor(itemCode, itemName, price, itemQty, total) {
    this._itemCode = itemCode;
    this._itemName = itemName;
    this._price = price;
    this._itemQty = itemQty;
    this._total = total;
  }

  get itemCode() {
    return this._itemCode;
  }

  get itemName() {
    return this._itemName;
  }

  get price() {
    return this._price;
  }

  get itemQty() {
    return this._itemQty;
  }

  get total() {
    return this._total;
  }

  set itemCode(value) {
    this._itemCode = value;
  }

  set itemName(value) {
    this._itemName = value;
  }

  set price(value) {
    this._price = value;
  }

  set itemQty(value) {
    this._itemQty = value;
  }

  set total(value) {
    this._total = value;
  }
}
