// import { loadCustomerOptions } from "../controller/Oder.js";
// import { loadCustomerOptions } from "./controller/Oder.js";
import { loadCustomerOptions } from "../../controller/Oder.js";
import { loadItemsOptions } from "../../controller/Oder.js";
// emailId, passwordId;
$("#emailId").val("");
$("#passwordId").val("");
$("#loginButtenId").on("click", () => {
  if ($("#emailId").val() != "" && $("#passwordId").val() != "") {
    alert("ok");
    $("#loginPageId").css("display", "none");
  } else {
    alert("no");
    return;
  }
});

$(".navLink").on("click", function (e) {
  e.preventDefault();
  $(".page").hide();
  const target = $(this).data("target");
  $(`#${target}`).fadeIn(1000);
});

// ================naviget-to-section-from the - dashbord================

$(".naveLink").on("click", function (e) {
  e.preventDefault();
  $(".sectionConteiner").hide();
  const target = $(this).data("target");
  console.log("===================");
  // console.log(target);
  if (target == "OderPageId") {
    console.log(target);
    loadCustomerOptions();
    loadItemsOptions();
  }

  console.log("===================");

  $(`#${target}`).fadeIn(500);
});

// ================naviget-to-section-from the - dashbord- end -task=====
