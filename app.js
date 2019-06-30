var app = new function() {
    this.todos = [
        {title: "Go to church", completed: false}
    ];
    this.el = document.getElementById("todos");

    this.Add = function() {
        var el = document.getElementById('title');
        var title = el.value;
        if (title) {
            this.todos.push(
                {title: title.trim(), completed: false}
            );
        }
        this.LoadAll();
        el.value = '';
    }

    this.LoadAll = function() {
        if (this.todos.length > 0) {
            var todoRows = "";
            for (var i = 0; i < this.todos.length; i++) {
                var todo = this.todos[i];
                todoRows += '<tr class="'+ (todo.completed ? 'table-success' : '') + '"><td>' + (i + 1) + '</td><td>' + todo.title + '</td><td>' + todo.completed + '</td>';
                todoRows += '<td><button class="btn btn-success btn-sm" onclick="app.ToggleComplete(' + i + ')">' + (todo.completed ? 'Uncomplete' : 'Complete') + '</button></td>';
                todoRows += '<td><button class="btn btn-primary btn-sm" onclick="app.EditTodo(' + i + ')">Edit</button></td>';
                todoRows += '<td><button class="btn btn-danger btn-sm" onclick="app.DeleteTodo(' + i + ')">Delete</button></td></tr>';
            }

            this.el.innerHTML = todoRows;
        } else {
            this.el.innerHTML = '';
        }
    }

    this.ToggleComplete = function(todoIndex) {
        var todo = this.todos.length > todoIndex ? this.todos[todoIndex] : null;
        if (todo) {
            todo.completed = !todo.completed;
            this.todos.splice(todoIndex, 1, todo);
        }
        this.LoadAll();
    }

    this.EditTodo = function(todoIndex) {
        var todo = this.todos.length > todoIndex ? this.todos[todoIndex] : null;
        if (todo) {
            this.ShowEditForm();
            var el = document.getElementById('edit-input');
            el.value = todo.title;
            el.focus();
            document.getElementById('editing-id').value = todoIndex;
        }
    }

    this.UpdateTodo = function() {
        var todoIndex = document.getElementById('editing-id').value;
        var updatedTitle = document.getElementById('edit-input').value;
        var todo = this.todos[todoIndex];
        if (todo && updatedTitle) {
            todo.title = updatedTitle;
            this.todos.splice(todoIndex, 1, todo);
        }
        this.LoadAll();
        this.HidEditForm();
    }

    this.ShowEditForm = function() {
        document.getElementById('edit-form').classList = 'd-block';
        document.getElementById('add-form').classList = 'd-none';
    }

    this.HidEditForm = function () {
        document.getElementById('edit-form').classList = 'd-none';
        document.getElementById('add-form').classList = 'd-block';
    }

    this.DeleteTodo = function(todoIndex) {
        this.todos.length > todoIndex && this.todos.splice(todoIndex, 1);
        this.LoadAll();
    }
}

app.LoadAll();
