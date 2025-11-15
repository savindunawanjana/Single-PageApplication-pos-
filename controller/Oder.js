import { Oder_array } from "../db/Db.js";
import Order from "../model/OderObject.js";
import ItemsOfCustomer from "../model/ItemOfcustormerObject.js";
import { customer_array } from "../db/Db.js";
import { item_array } from "../db/Db.js";
import Customer from "../model/CustormerObject.js";
$("#lblUnderoderqty").hide();
const ItemOfCustormer_Arry = [];

export function loadCustomerOptions() {
  const select = document.getElementById("customerSelectelimentId");
  select.innerHTML = "";
  console.log("---------");
  console.log(customer_array.length === 0);

  if (customer_array.length === 0) {
    console.log("No customers found");
  } else {
    console.log("Loading customers...");
    customer_array.forEach((customer, index) => {
      const optionew = document.createElement("option");
      optionew.value = customer.custormerid; 
      optionew.text = customer.custormerid;
      optionew.setAttribute("data-index", index);
      optionew.setAttribute("class", "optionClass");
      $("#customerSelectelimentId").append(optionew);
  
    });
  }
}

// $("#customerSelectelimentId").on("change", function () {
//   const selectedValue = $(this).val();

//   if (selectedValue == null || selectedValue == "") {
//   } else {
//     for (let i = 0; i < Oder_array.length; i++) {
//       const customer = Oder_array[i];
//       if (selectedValue == customer.custormerid) {
//         const custname = $("#inputCustormerName");
//         custname.value(customer.custormername);
//         const custId = $("#inputCustormerId");
//         custId.value(selectedValue);

//         break;
//       }
//     }
//   }

//   console.log("Selected value:", selectedValue);
// });
$("#customerSelectelimentId").on("change", function () {
  const selectedValue = $(this).val();

  if (!selectedValue) return;

 
  const selectedCustomer = customer_array.find(
    (c) => c.custormerid === selectedValue
  );

  if (selectedCustomer) {
  
    $("#inputCustormerId").val(selectedCustomer.custormerid);
    $("#inputCustormerName").val(selectedCustomer.custormername);
    $("#inputCustormerAddress").val(selectedCustomer.custormeraddress);
    $("#inputCustormerSalary").val(selectedCustomer.custormersalary);
  } else {
    console.log("No matching customer found!");
  }

  console.log("Selected value:", selectedValue);
});

export function loadItemsOptions() {
  const select = document.getElementById("ItemCodeSelectelimentId");
  select.innerHTML = "";

  if (item_array.length === 0) {
    console.log("No items found");
  } else {
    console.log("Loading items...");
    item_array.forEach((item, index) => {
      const option = document.createElement("option");
      option.value = item.itemcode;
      option.text = `${item.itemcode} - ${item.itemname}`; 
      option.setAttribute("data-index", index);
      option.setAttribute("class", "optionClass");

      select.appendChild(option);
    
    });
  }
}

$("#ItemCodeSelectelimentId").on("change", function () {
  const selectedValue = $(this).val();

  if (!selectedValue) return;

 
  const selectedItem = item_array.find((i) => i.itemcode === selectedValue);

  if (selectedItem) {
 
    $("#inputItemCode").val(selectedItem.itemcode);
    $("#inputitemName").val(selectedItem.itemname);
    $("#inputitemQty").val(selectedItem.itemqty);
    $("#inputitemPrice").val(selectedItem.itemunitPrice);
  } else {
    console.log("No matching item found!");
  }

  console.log("Selected Item:", selectedValue);
});

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

$("#AddItemButtenId").on("click", () => {
  const itemCode = $("#inputItemCode").val();

  if (!itemCode) {
    alert("Please Select a Item from the Selection...");
    return;
  }

  const oderQty = $("#inputoderqty").val();

  if (!oderQty) {
    alert("Please Enter Oder Count ");
    return;
  }

  const itemContyty = $("#inputitemQty").val();


  if (oderQty > itemContyty || oderQty == 0) {
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        $("#lblUnderoderqty").show();
        $("#lblUnderoderqty").css("color", i % 2 === 0 ? "white" : "red");
        if (i == 4) {
          $("#lblUnderoderqty").hide();
        }
      }, i * 500);
    }
    $("#lblUnderoderqty").text("Pleas enter relevent oder count ");
    return;
  }

  const itemcode = $("#inputItemCode").val();
  const itemName = $("#inputitemName").val();
  const price = $("#inputitemPrice").val();
  const itemQty = $("#inputoderqty").val();
  // ====================================================
  var toalprice = price * itemQty;
  // ====================================================
  const total = toalprice;

  const itemcustormerObject = new ItemsOfCustomer(
    itemcode,
    itemName,
    price,
    itemQty,
    total
  );

  ItemOfCustormer_Arry.push(itemcustormerObject);
  $("#itemtableBodyIditem").empty();
  ItemOfCustormer_Arry.forEach((item, index) => {
    const dataElement = `
    <tr>
      <td>${item.itemCode}</td>
      <td>${item.itemName}</td>
      <td>${item.price}</td>
      <td>${item.itemQty}</td>
      <td>${item.total}</td>
    </tr>`;

    $("#itemtableBodyIditem").append(dataElement);
    let totalepay = 0;
    ItemOfCustormer_Arry.forEach((item) => {
      totalepay += parseFloat(item.total);
    });
    $("#labltotle").text(`Rs ${totalepay}`);
    $("#lableSubtotleid").text(`Rs ${totalepay}`);
    // ============================================

    // ====================
  });
});

// $("#PurchesButten").on("click", () => {
//   const discount = $("#inputDiscount").val();
//   if (!labltotle) {
//     alert("Pleas select Items for Purches");
//   } else {
//     if (!discount) {
//     } else {
//       let originalValue = $("labltotle").val();
//       const discount = $("#inputDiscount").val();
//       let twentyFivePercent = originalValue * discount * 0.01;
//       console.log(twentyFivePercent);
//       $("#lableSubtotleid").text(`Rs ${twentyFivePercent}`);
//     }
//   }
// });

$("#PurchesButten").on("click", () => {
  const discountInput = $("#inputDiscount").val(); 
  const totalText = $("#labltotle").text(); 
  if (!ItemOfCustormer_Arry.length) {
    alert("Please select Items for Purchase");
    return;
  }

  if (!discountInput) {
  } else {
   
    let originalValue = parseFloat(totalText.replace("Rs ", ""));
    let discountPercent = parseFloat(discountInput);

    let discountAmount = (originalValue * discountPercent) / 100;

    $("#lableSubtotleid").text(`Rs ${discountAmount.toFixed(2)}`);
    console.log("Discount amount:", discountAmount);
  }
});
