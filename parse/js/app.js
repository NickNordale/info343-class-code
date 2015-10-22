/*
    script for the index.html file
*/

Parse.initialize("h5IkRnHX9wy81q0G87x7q4f03ZuWbDMuaTL2cQBg", "9pgTStXZBRn8tYnKGCkNkcpSeDKfNsfuBPEy5zJH");

$(function() {
    'use strict';

    // new Task class for parse
    var Task = Parse.Object.extend('Task');
    // new query that will return all tasks ordered by createdAt
    var tasksQuery = new Parse.Query(Task);
    tasksQuery.ascending('createdAt');
    tasksQuery.notEqualTo('done', true);

    //reference to the taks list element
    var tasksList = $('#tasks-list');

    //reference to the error message alert
    var errorMessage = $('#error-message');

    //create variable for current set of tasks
    var tasks = [];

    function displayError(err) {
        errorMessage.text(err.message);
        errorMessage.fadeIn();
    }

    function clearError() {
        errorMessage.hide();
    }

    function showSpinner() {
        $('.fa-spin').show();
    }

    function hideSpinner() {
        $('.fa-spin').hide();
    }

    function fetchTasks() {
        showSpinner();
        tasksQuery.find().then(onData, displayError).always(hideSpinner);
    }

    function onData(results) {
        tasks = results;
        renderTasks();
    }

    function renderTasks() {
        tasksList.empty();
        tasks.forEach(function(task) {
            $(document.createElement('li'))
                .text(task.get('title') + ' : ' + task.get('rating'))
                .addClass(task.get('done') ? 'completed-task' : '')
                .appendTo(tasksList)
                .click(function() {
                    task.set('done', !task.get('done'));
                    task.save().then(renderTasks, displayError);
                });
        });
    }

    //when the user submits the new task form
    $('#new-task-form').submit(function(evt) {
        evt.preventDefault();

        var titleInput = $(this).find('[name="title"]');
        var title = titleInput.val();
        var task = new Task();


        task.set('title', title);
        task.set('rating', $("#rating").raty('score'));


        task.save().then(fetchTasks, displayError).then(function() {
            titleInput.val('');
            $("#rating").raty('set', true);
        });

        return false;
    });

    //go and fetch tasks from Parse
    fetchTasks();

    $('#rating').raty();

    //This following line sends a request to Parse every 10 seconds to update the task list
    //window.setInterval(fetchTasks, 10000);
});

