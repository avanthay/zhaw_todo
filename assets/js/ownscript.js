$("#button1").on("click", function () {
    $(".formfields").css("border-color", "#D74B46");
    $(".formfields").css("box-shadow", "#D74B46 0px 0px 3px 0px");
    prio = 1;
});

$("#button2").on("click", function () {
    $(".formfields").css("border-color", "#F9A329");
    $(".formfields").css("box-shadow", "#F9A329 0px 0px 3px 0px");
    prio = 2;
});

$("#button3").on("click", function () {
    $(".formfields").css("border-color", "#5BB75B");
    $(".formfields").css("box-shadow", "#5BB75B 0px 0px 3px 0px");
    prio = 3;
});

$(function onload () {
    var standardDate = $.datepicker.formatDate("dd.mm.yy", new Date());
    document.getElementById('datepicker').value = standardDate;
    $("#datepicker").datepicker({
        minDate: 0,
        showWeek: true,
        firstDay: 1,
        dateFormat: "dd.mm.yy",
    });
    $('#button3').click();
});

$('#extend-button').click(function () {
    var eyeIcon = document.getElementById("eye-icon");
    if (eyeIcon.getAttribute("class") == "icon-eye-open") {
        eyeIcon.removeAttribute("class", "icon-eye-open");
        eyeIcon.setAttribute("class", "icon-eye-close");
    } else {
        eyeIcon.removeAttribute("class", "icon-eye-close");
        eyeIcon.setAttribute("class", "icon-eye-open");
    }
});

$('#extend-button').tooltip();

var hoi = null;
var taskArray = new Array();


$("#validateButton").click(function () {
    hoi++;
    var taskID = document.createElement("p");
    taskID.setAttribute("class", "formfields");
    taskID.setAttribute("id", "row" + hoi);
    document.getElementById("taskList").appendChild(taskID);
    createDate();
    createTask();
});

$('#about').click(function () {
    registerTask();
});

function registerTask() {
    var dateValue = document.getElementById("datepicker");
    var taskValue = document.getElementById("taskName");
    var task = {
        id: hoi,
        prio: prio,
        date: dateValue.value,
        name: taskValue.value,
        log: new Date().getTime()
    }
    taskArray.push(task); 
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