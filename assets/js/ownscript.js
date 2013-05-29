$("#button1").on("click", function () {
    $(".formfields").css("border-color", "#5BB75B");
    $(".formfields").css("box-shadow", "#5BB75B 0px 0px 3px 0px");
});

$("#button2").on("click", function () {
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

var hoi = 0;

$("#validatebutton").click(function () {
    hoi++;
    var taskID = document.createElement("div");
    taskID.setAttribute("class", "row");
    taskID.setAttribute("id", "row" + hoi);
    var wo = document.getElementById("taskList");
    wo.appendChild(taskID);
    createDate();
    createTask();
});

function createPrio() {
    //get prio

};

function createTask() {
    //task auslesen
    var taskValue = document.getElementById("taskName");
    //neues Feld bauen
    var taskField = document.createElement("input");
    taskField.setAttribute("type", "text");
    taskField.setAttribute("value", taskValue.value);
    taskField.setAttribute("class", "formfields");
    var wo = document.getElementById("row" + hoi);
    wo.appendChild(taskField);
    taskValue.value = null;
};

function createDate() {
    //datum auslesen
    var dateValue = document.getElementById("datepicker");
    //neues Feld bauen
    var dateField = document.createElement("input");
    dateField.setAttribute("type", "text");
    dateField.setAttribute("value", dateValue.value);
    dateField.setAttribute("class", "formfields");
    var wo = document.getElementById("row" + hoi);
    wo.appendChild(dateField);
    dateValue.value = null;
};