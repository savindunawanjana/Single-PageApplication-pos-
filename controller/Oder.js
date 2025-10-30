import { Oder_array } from "../db/Db.js";
import Order from "../model/OderObject.js";
import ItemsOfCustomer from "../model/ItemOfcustormerObject.js";
import { customer_array } from "../db/Db.js";
import Customer from "../model/CustormerObject.js";

// =========================invoisDeatilesBox-Development-start======================================

const lodeOderIdFuntion = () => {
  if (Oder_array.length === 0) {
    $("#inputOderId").val("D00-0001");
  } else {
    const lastOder = Oder_array[Oder_array.length - 1];
    const lastOderId = lastOder.orderId();

    const lastLetter = lastOderId.slice(-1);
    if (/\d/.test(lastLetter)) {
      const newNumber = parseInt(lastLetter) + 1;
      $("#inputOderId").val(`D00-000${newNumber}`);
    } else {
      console.log(" lastLetter is not a number");
      return;
    }
  }
};

lodeOderIdFuntion();

const lodeCustormerSelectionItems = () => {
  console.log("---------");
  console.log(customer_array.length === 0);
  if (customer_array.length === 0) {
  } else {
    const option = document.createElement("option");
    console.log("---------");
    customer_array.forEach((custormer, index) => {
      option.value = custormer.custormerid; //beka thanai backend ekata yanne
      option.text = custormer.custormerid; // meka user ta pena text eka
      option.setAttribute("data-index", custormer.custormerid);
      $("#customerSelectelimentId").append(option);
      console.log("======================");
    });
  }
};
console.log("dan wenawa  lodeCustormerSelectionItems()");
lodeCustormerSelectionItems();

$("#customerSelectelimentId").on("click", () => {});

// =========================invoisDeatilesBox-Development-End======================================
