$('#extend-button').tooltip();
$('.task-buttons').tooltip();

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
    var standardDate = $.datepicker.formatDate("dd.mm.y", new Date());
    document.getElementById('datepicker').value = standardDate;
    $("#datepicker").datepicker({
        minDate: 0,
        showWeek: true,
        firstDay: 1,
        dateFormat: "dd.mm.y",
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

$('.navbar-fixed-top').click(function () {
    createAlert();
    validateTask();
    registerTask();
    resetFields();
});

function validateTask() {
    
};


function createAlert() {
    var alert = document.createElement("div");
    alert.setAttribute("class", "alert alert-error");
    var button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "close");
    button.setAttribute("data-dismiss", "alert");
    var buttonContent = document.createElement("i");
    buttonContent.setAttribute("class", "icon-remove");
    var list = document.createElement("ul");
    list.setAttribute("class", "inline");
    var listEl1 = document.createElement("li");
    var title = document.createElement("strong");
    title.innerText = "Fehler";
    var listEl2 = document.createElement("li");
    var text = document.createElement("span");
    text.innerText = "Bitte bereinigen Sie den Fehler";
    var wo = document.getElementById("top-of-page");
    button.appendChild(buttonContent);
    alert.appendChild(button);
    listEl1.appendChild(title);
    list.appendChild(listEl1);
    listEl2.appendChild(text);
    list.appendChild(listEl2);
    alert.appendChild(list);
    wo.appendChild(alert);
};

function registerTask() {
    var dateValue = document.getElementById("datepicker");
    var taskValue = document.getElementById("taskName");
    var task = {
        id: hoi,
        prio: prio,
        date: dateValue.value,
        name: taskValue.value,
        open: true,
        log: new Date().getTime()
    }
    taskArray.push(task);
};

function resetFields() {
    $('#button3').click();
    var standardDate = $.datepicker.formatDate("dd.mm.y", new Date());
    document.getElementById('datepicker').value = standardDate;
    var taskValue = document.getElementById("taskName");
    taskValue.value = null;
};


//nicht mehr verwendet
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

//nicht mehr verwendet
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