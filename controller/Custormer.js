import { customer_array } from "../db/Db.js";
import Customer from "../model/CustormerObject.js";

const runmethodAllwas = () => {
  const customer_id = $("#InputCustormerId");
  if (customer_array.length === 0) {
    customer_id.val("100-0001");
  } else {
    const lastCustomer = customer_array[customer_array.length - 1];
    const custId = lastCustomer.custormerid;

    const lastLetter = custId.slice(-1);
    if (/\d/.test(lastLetter)) {
      const newNumber = parseInt(lastLetter) + 1;
      customer_id.val(`100-000${newNumber}`);
    } else {
      console.log(" lastLetter is not a number");
    }
  }
};


runmethodAllwas();

$(document).on("click", ".btn-edit", function () {
  const index = $(this).data("index");

  const customer = customer_array[index];
  $("#InputCustormerId").val(customer.custormerid);
  $("#InputCustormerName").val(customer.custormername);
  $("#InputCustormerAddress").val(customer.custormeraddress);
  $("#InputCustormerSalary").val(customer.custormersalary);
});

$(document).on("click", ".btn-delete", function () {
  const index = $(this).data("index");

  const res = confirm(`Are you sure you want to delete ?`);
  if (res) {
    customer_array.splice(index, 1);
    lodeTable();
  }
});

const lodeTable = () => {
  if (customer_array.length > 0) {
    $("#tableBodyId").empty();
    customer_array.forEach((customer, index) => {
      const dataElement = `
    <tr>
      <td>${customer.custormerid}</td>
      <td>${customer.custormername}</td>
      <td>${customer.custormeraddress}</td>
      <td>${customer.custormersalary}</td>
      <td>
        <button class="btn btn-warning btn-edit" data-index="${index}">Edit</button>
        <button class="btn btn-danger btn-delete" data-index="${index}">Delete</button>
      </td>
    </tr>`;

      $("#tableBodyId").append(dataElement);
    });
  }
};
$("#savebtnId").on("click", (e) => {
  e.preventDefault();
  const customer_id = $("#InputCustormerId").val();
  const customer_name = $("#InputCustormerName").val();
  const customer_address = $("#InputCustormerAddress").val();
  const customer_salary = $("#InputCustormerSalary").val();

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

  if (!customer_id) {
    return;
  } else if (!customer_name) {
    flashField("#InputCustormerName", "#lablenameIdUnder");
    return;
  } else if (!customer_address) {
    flashField("#InputCustormerAddress", "#lableAdressIdUnders");
    return;
  } else if (!customer_salary) {
    flashField("#InputCustormerSalary", "#lblUnderSalary");
    return;
  } else {
    if (/^100-000/.test(customer_id)) {
      const lastLetter = customer_id.slice(-1);
      if (!/\d/.test(lastLetter)) {
        alert("Input does not match for the numbers");
        return;
      }
    } else {
      alert("Input does not start with 100-000!");
      return;
    }
  }

  const customer_id1 = $("#InputCustormerId").val();
  const customer_name2 = $("#InputCustormerName").val();
  const customer_address3 = $("#InputCustormerAddress").val();
  const customer_salary4 = $("#InputCustormerSalary").val();

  try {
    const custormer = new Customer(
      customer_id1,
      customer_name2,
      customer_address3,
      customer_salary4
    );
    customer_array.push(custormer);
    console.log("Customer added successfully:", custormer);
    console.log(customer_array[0].custormerid);
    runmethodAllwas();

    $("#InputCustormerName").val("");
    $("#InputCustormerAddress").val("");
    $("#InputCustormerSalary").val("");
    lodeTable();
  } catch (error) {
    console.log(error);
  }
});

const updateAction = $("#updatebtnId").on("click", () => {
  const custormerId = $("#InputCustormerId").val();
  const custormerName = $("#InputCustormerName").val();
  const custormerAdress = $("#InputCustormerAddress").val();
  const custormerSalary = $("#InputCustormerSalary").val();

  if (!custormerId || !custormerName || !custormerAdress || !custormerSalary) {
    console.log("Please select the row to edit properly");
    alert("Please select the row to edit properly");
    return;
  } else {
    let indexnumber = "no";
    // customer_array.forEach((custormer, index) => {
    //   const custormerId2 = custormer.custormerid;
    //   if (custormerId == custormerId2) {
    //     indexnumber = index;

    //     break
    //   }
    // });

    //in this place i cloud not stop the loop from using break key word. so i used  some(()=>{}); insted of forEach(()=>{});
    customer_array.some((customer, index) => {
      if (custormerId === customer.custormerid) {
        indexnumber = index;
        return true;
        //tru nam brek wenawa loop eka naththan digatama wnawa
      }
      return false;
    });

    const confarm = confirm("Do you wont to Update This ?");

    if (indexnumber != "no") {
      customer_array[indexnumber].custormerid = custormerId;
      customer_array[indexnumber].custormername = custormerName;
      customer_array[indexnumber].custormeraddress = custormerAdress;
      customer_array[indexnumber].custormersalary = custormerSalary;

      $("#InputCustormerName").val("");
      $("#InputCustormerAddress").val("");
      $("#InputCustormerSalary").val("");
      lodeTable();
    }
    lodeTable();
    runmethodAllwas();
  }
});
