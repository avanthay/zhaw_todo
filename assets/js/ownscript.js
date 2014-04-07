//variablen
var taskArray;

$('a').tooltip();

$("#button1").on("click", function() {
    $(".formfields").css("border-color", "#D74B46");
    $(".formfields").css("box-shadow", "#D74B46 0px 0px 3px 0px");
    prio = 1;
});

$("#button2").on("click", function() {
    $(".formfields").css("border-color", "#F9A329");
    $(".formfields").css("box-shadow", "#F9A329 0px 0px 3px 0px");
    prio = 2;
});

$("#button3").on("click", function() {
    $(".formfields").css("border-color", "#5BB75B");
    $(".formfields").css("box-shadow", "#5BB75B 0px 0px 3px 0px");
    prio = 3;
});

$('#aboutButton').click(function() {
    $('#errorTitle').html("About");
    $('#errorTitle').css('color', 'blue');
    $('#errorText').html('<p>product version: 0.4.5 </p><p>project: webprogrammieren 1</p><quote>This program is free software. You can redistribute it and/or modify it under the terms of the Dave Public License as published by the Dave Fundation</quote><p style="font-size: small; margin-top: 30px;">created by dave</p>');
    $('#errorBox').modal();
});

$('#extend-button').click(function() {
    $('#eye-icon').toggleClass("icon-eye-close icon-eye-open");
});

$("#validateButton").click(function() {
    saveTask();
});

//enter-Taste
$(document).keypress(function(e) {
    if (e.which === 13) {
        if ($('#errorBox').hasClass('in')) {
            $('#errorBoxOkButton').click();
        } else {
            $('#validateButton').click();
        }
    }
});

//esc-Taste
$(document).keyup(function(e) {
    if (e.which === 27) {
        $('#errorBoxOkButton').click();
    }
});



function setButtons(taskLog) {
    $('#del-button-' + taskLog).on('click', function() {
        taskArray.splice(taskArray.indexOf(getTaskByLog(taskLog)), 1);
        $('#task-' + taskLog).remove();
        toLocalStorage();
    });

    $('#edit-button-' + taskLog).on('click', function() {
        $('#button' + getTaskByLog(taskLog).prio).click();
        $('#datepicker').val(getTaskByLog(taskLog).date);
        $('#taskName').val(getTaskByLog(taskLog).name);
        $('#del-button-' + taskLog).click();
    });

    $('#done-button-' + taskLog).on('click', function() {
        $('#task-' + taskLog).remove();
        getTaskByLog(taskLog).open = false;
        createTask(getTaskByLog(taskLog));
        toLocalStorage();
    });

    $('#reopen-button-' + taskLog).on('click', function() {
        $('#task-' + taskLog).remove();
        getTaskByLog(taskLog).open = true;
        createTask(getTaskByLog(taskLog));
        toLocalStorage();
    });
}
;



function onLoad() {
    resetFields();
    $("#datepicker").datepicker({
        minDate: 0,
        showWeek: true,
        firstDay: 1,
        dateFormat: "dd.mm.y"
    });
    taskArray = new Array();
    if (localStorage.taskStorage !== undefined)
        fromLocalStorage();
//allfällige Tasks erstellen
    for (var i = 0; i < taskArray.length; i++) {
        createTask(taskArray[i]);
    }
}
;




function saveTask() {
    if (validateTask() === true) {
        var task = registerTask();
        resetFields();
        createTask(task);
    }
}
;



function validateTask() {
    if ($('#taskName').val() === "") {
        errorMessage('Please enter a task !');
        return false;
    } else {
        //hier wird geprüft ob der Taskname bereits existiert!
        for (var i = 0; i < taskArray.length; i++) {
            if (taskArray[i].name === $('#taskName').val()) {
                errorMessage('Task already exist !');
                return false;
            }
        }
        return true;
    }
}
;

function registerTask() {
    var task = {
        prio: prio,
        date: $('#datepicker').val(),
        name: $('#taskName').val(),
        open: true,
        log: new Date().getTime()
    };
    taskArray.push(task);
    //taskArray in Localstorage speichern
    toLocalStorage();
    return task;
}
;

function toLocalStorage() {
    localStorage.taskStorage = JSON.stringify(taskArray);
}
;

function fromLocalStorage() {
    taskArray = JSON.parse(localStorage.taskStorage);
}
;

function resetFields() {
    $('#button3').click();
    $('#datepicker').val($.datepicker.formatDate("dd.mm.y", new Date()));
    $('#taskName').val(null);
}
;

function createTask(task) {
    if (task.open === true)
        createActiveTask(task);
    else
        createDoneTask(task);
    setButtons(task.log);
}
;

function createActiveTask(task) {
    var htmlTask = (['<div class="alert alert-', getPrio(task), '"', 'id="task-', task.log, '">',
        '<ul class="inline free-buttons">',
        '<li>',
        '<button type="button" class="close done-button" id="done-button-', task.log, '">',
        '<i class="icon-ok"></i>',
        '</button>',
        '</li>',
        '<li>',
        '<button type="button" class="close edit-button" id="edit-button-', task.log, '">',
        '<i class="icon-pencil"></i>',
        '</button>',
        '</li>',
        '<li>',
        '<button type="button" class="close del-button" id="del-button-', task.log, '">',
        '<i class="icon-remove"></i>',
        '</button>',
        '</li>',
        '</ul>',
        '<ul class="inline">',
        '<li class="hidden-phone">', task.date, '</li>',
        '<li class="hidden-phone">|</li>',
        '<li>', task.name, '</li>',
        '</ul>',
        '</div>'].join(''));
    $('#taskList').append(htmlTask);
    $('#taskListTitle').removeAttr('style');
}
;

function createDoneTask(task) {
    var htmlTask = (['<div class="alert alert-', getPrio(task), '"', 'id="task-', task.log, '">',
        '<ul class="inline free-buttons">',
        '<li>',
        '<button type="button" class="close reopen-button" data-placement="left" id="reopen-button-', task.log, '">',
        '<i class="icon-share-alt"></i>',
        '</button>',
        '</li>',
        '</ul>',
        '<ul class="inline">',
        '<li class="hidden-phone">', task.date, '</li>',
        '<li class="hidden-phone">|</li>',
        '<li>', task.name, '</li>',
        '</ul>',
        '</div>'].join(''));
    $('#doneList').append(htmlTask);
    $('#doneListTitle').removeAttr('style');
}
;


function getPrio(task) {
    if (task.prio === 1) {
        return 'danger';
    } else if (task.prio === 2) {
        return 'warning';
    } else if (task.prio === 3) {
        return 'success';
    }
}
;


function getTaskByName(name) {
    for (var i = 0; i < taskArray.length; i++)
        if (taskArray[i].name === name) {
            return taskArray[i];
        }
}
;

function getTaskByLog(log) {
    for (var i = 0; i < taskArray.length; i++)
        if (taskArray[i].log === log) {
            return taskArray[i];
        }
}
;

function errorMessage(message) {
    $('#errorTitle').html("Error");
    $('#errorTitle').css('color', 'red');
    $('#errorText').html(message);
    $('#errorBox').modal();
}
;

window.onload = onLoad;

//not-reset (für mobile devices ohne Konsole)
$('#resetTasks').click(function() {
    localStorage.clear();
});