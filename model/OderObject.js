export default class Order {
  constructor(orderId, date, customerId, itemList = []) {
    this._orderId = orderId;
    this._date = date;
    this._customerId = customerId;
    this._itemList = itemList;
  }

  set orderId(value) {
    this._orderId = value;
  }

  set date(value) {
    this._date = value;
  }

  set customerId(value) {
    this._customerId = value;
  }

  set itemList(value) {
    this._itemList = value;
  }
  get orderId() {
    return this._orderId;
  }

  get date() {
    return this._date;
  }

  get customerId() {
    return this._customerId;
  }

  get itemList() {
    return this._itemList;
  }
}
