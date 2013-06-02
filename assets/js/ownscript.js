$('button').tooltip();

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

$(function onload() {
    var standardDate = $.datepicker.formatDate("dd.mm.y", new Date());
    document.getElementById('datepicker').value = standardDate;
    $("#datepicker").datepicker({
        minDate: 0,
        showWeek: true,
        firstDay: 1,
        dateFormat: "dd.mm.y"
    });
    $('#button3').click();
});

$('#extend-button').click(function() {
    $('#eye-icon').toggleClass("icon-eye-close icon-eye-open");
});

//variablen
var hoi = null;
var taskArray = new Array();


$("#validateButton").click(function() {
    saveTask();
});
$('#taskName').keyup(function(e) {
    if (e.which === 13)
        saveTask();
});


function saveTask() {
    if (validateTask() === true) {
        registerTask();
        resetFields();
        createTask();
}};



function validateTask() {
    if ($('#taskName').val() === "") {
        $('#errorMissingName').modal();
        return false;
    } else {
        return true;
    }
}
;

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
    };
    taskArray.push(task);
}
;

function resetFields() {
    $('#button3').click();
    var standardDate = $.datepicker.formatDate("dd.mm.y", new Date());
    document.getElementById('datepicker').value = standardDate;
    var taskValue = document.getElementById("taskName");
    taskValue.value = null;
}
;

function createTask(){
  //tasks einzelauslesen
  createActiveTask(taskArray[0]);
};

function createActiveTask(task) {
    if(task.prio === 1){
        var taskPrio = 'danger';
    } else if(task.prio === 2){
        var taskPrio = 'warning';
    } else if(task.prio === 3){
        var taskPrio = 'success';
    }
    var divActiveTask = document.createElement( 'div' );
    divActiveTask.class = 'alert alert-' + taskPrio;
    divActiveTask.id = task.name;
    
    $('#taskList').append(divActiveTask);
    
    
    ('<ul class="inline free-buttons">\
                                <li>\
                                    <button type="button" class="close" title="task done" id="done-button">\
                                        <i class="icon-ok"></i>\
                                    </button>\
                                </li>\
                                <li>\
                                    <button type="button" class="close" title="edit task" id="edit-button">\
                                        <i class="icon-pencil"></i>\
                                    </button>\
                                </li>\
                                <li>\
                                    <button type="button" class="close" title="delete task" id="del-button">\
                                        <i class="icon-remove"></i>\
                                    </button>\
                                </li>\
                            </ul>\
                            <ul class="inline">\
                                <li>prio</li>\
                                <li>date</li>\
                                <li>task name</li>\
                            </ul>');


}
;

function createDoneTask(task) {

}
;

//testfunction
$('.navbar-fixed-top').click(function() {
    $('#errorMissingName').modal();
});