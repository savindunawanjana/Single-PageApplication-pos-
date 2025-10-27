emailId, passwordId;
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
