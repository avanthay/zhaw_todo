$("#button1").on("click", function () {
    $(".formfields").css("border-color", "#5BB75B");
    $(".formfields").css("box-shadow", "#5BB75B 0px 0px 3px 0px");
});

$("#button2").click( function () {
    $(".formfields").css("border-color", "#F9A329");
    $(".formfields").css("box-shadow", "#F9A329 0px 0px 3px 0px");
});

$("#button3").on("click", function (event) {
    $(".formfields").css("border-color", "#D74B46");
    $(".formfields").css("box-shadow", "#D74B46 0px 0px 3px 0px");
});

$("#btn-group").tooltip();


$(function () {
    $("#datepicker").datepicker({
        minDate: 0,
        showWeek: true,
        firstDay: 1,
        dateFormat: "dd.mm.yy",
    });
});