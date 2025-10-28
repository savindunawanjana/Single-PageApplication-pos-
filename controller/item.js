import { item_array } from "../db/Db.js";
import item from "../model/ItemObject.js";

const runmethodAllwas = () => {
  const item_id = $("#InputItemCode");
  if (item_array.length === 0) {
    item_id.val("100-0001");
  } else {
    const lastItemCode = item_array[item_array.length - 1];
    const itemId = lastItemCode.itemcode;

    const lastLetter = itemId.slice(-1);
    if (/\d/.test(lastLetter)) {
      const newNumber = parseInt(lastLetter) + 1;
      item_id.val(`100-000${newNumber}`);
    } else {
      console.log(" lastLetter is not a number");
    }
  }
};
// (function init() {
//   runmethodAllwas();
//   console.log(" This runs immediately when the file loads!");
//
// })();

runmethodAllwas();

$(document).on("click", ".edit", function () {
  const index = $(this).data("index");

  const item = item_array[index];
  $("#InputItemCode").val(item.itemcode);
  $("#InputItemName").val(item.itemname);
  $("#InputItemQty").val(item.itemqty);
  $("#InputItemPrice").val(item.itemunitPrice);
});

$(document).on("click", ".btn-delete", function () {
  const index = $(this).data("index");

  const res = confirm(`Are you sure you want to delete ?`);
  if (res) {
    item_array.splice(index, 1);
    lodeTable();
  }
});

const lodeTable = () => {
  console.log(item_array.length > 0);
  console.log("===========");
  if (item_array.length > 0) {
    $("#itemtableBodyId").empty();
    item_array.forEach((item, index) => {
      const dataElement = `
    <tr>
      <td>${item.itemcode}</td>
      <td>${item.itemname}</td>
      <td>${item.itemqty}</td>
      <td>${item.itemunitPrice}</td>
      <td>
        <button class="btn btn-warning edit" data-index="${index}">Edit</button>
        <button class="btn btn-danger btn-delete" data-index="${index}">Delete</button>
      </td>
    </tr>`;

      $("#itemtableBodyId").append(dataElement);
    });
  }
};
$("#itemsavebtnId").on("click", (e) => {
  e.preventDefault();
  console.log("ebuwa");
  const item_code = $("#InputItemCode").val();
  const item_name = $("#InputItemName").val();
  const Item_Qty = $("#InputItemQty").val();
  const itemPrice = $("#InputItemPrice").val();

  function flashField(selector, lableId) {
    let times = 0;
    function flash() {
      if (times >= 2) {
        return;
      }
      $(selector).css("border", "2px solid red");
      $(lableId).css("display", "block");
      setTimeout(() => {
        $(selector).css("border", "1px solid #ccc");
        $(lableId).css("display", "none");
        times++;
        setTimeout(flash, 400);
      }, 400);
    }
    flash();
  }

  if (!item_code) {
    return;
  } else if (!item_name) {
    flashField("#InputItemName", "#lblUnderForItemName");
    return;
  } else if (!Item_Qty) {
    flashField("#InputItemQty", "#lblUnderForQty");
    return;
  } else if (!itemPrice) {
    flashField("#InputItemPrice", "#lblUnderForUntPrice");
    return;
  } else {
    if (/^100-000/.test(item_code)) {
      const lastLetter = item_code.slice(-1);
      if (!/\d/.test(lastLetter)) {
        alert("Input does not match for the numbers");
        return;
      }
    } else {
      alert("Input does not start with 100-000!");
      return;
    }
  }

  const item_code1 = $("#InputItemCode").val();
  const item_name2 = $("#InputItemName").val();
  const item_Qty3 = $("#InputItemQty").val();
  const item_price4 = $("#InputItemPrice").val();

  try {
    const itemnew = new item(item_code1, item_name2, item_Qty3, item_price4);
    item_array.push(itemnew);
    console.log("Item added successfully:", itemnew);
    console.log(item_array[0].itemcode);
    runmethodAllwas();

    $("#InputItemName").val("");
    $("#InputItemQty").val("");
    $("#InputItemPrice").val("");
    lodeTable();
  } catch (error) {
    console.log(error);
  }
});

const updateAction = $("#itemupdatebtnId").on("click", () => {
  const itemCode = $("#InputItemCode").val();
  const itemName = $("#InputItemName").val();
  const itemQty = $("#InputItemQty").val();
  const itemPrice = $("#InputItemPrice").val();

  if (!itemCode || !itemName || !itemQty || !itemPrice) {
    console.log("Please select the row to edit properly");
    alert("Please select the row to edit properly");
    return;
  } else {
    let indexnumber = "no";

    //in this place i cloud not stop the loop from using break key word. so i used  some(()=>{}); insted of forEach(()=>{});
    item_array.some((items, index) => {
      if (itemCode === items.itemcode) {
        indexnumber = index;
        return true; // ✅ stops loop
      }
      return false;
    });

    const confarm = confirm("Do you wont to Update This ?");

    if (indexnumber != "no") {
      item_array[indexnumber].itemcode = itemCode;
      item_array[indexnumber].itemname = itemName;
      item_array[indexnumber].itemqty = itemQty;
      item_array[indexnumber].itemunitPrice = itemPrice;

      $("#InputItemName").val("");
      $("#InputItemQty").val("");
      $("#InputItemPrice").val("");
      lodeTable();
      runmethodAllwas();
    }
    lodeTable();
    runmethodAllwas();
  }
});
