document.addEventListener('DOMContentLoaded', () => {

    const addBtn = document.getElementById('add');

    const addTask = document.getElementById('addTask');
    addTask.style.display = 'none';

    addBtn.addEventListener('click', function () {

        addTask.style.display = 'block';

        addTask.addEventListener('keyup', addNewTask);
     });

    function addNewTask(){
        if (event.keyCode === 13) {
            if(addTask.value.length > 0){
            createLi();
            }
        }
    };

    function createLi() {
        const newLi = document.createElement('li');
        newLi.className = 'ListItem';
        const newCheckDiv = document.createElement('div');
        newCheckDiv.className = 'Checkbox';
        const newCheckBox = document.createElement('input');
        const newTaskDiv = document.createElement('div');
        newTaskDiv.className = 'Task';
        const newP = document.createElement('p');
        newP.className = 'Todo';
        const newA = document.createElement('a');
        const newImg = document.createElement('img');

        newCheckBox.setAttribute("type", "checkbox");
        newImg.setAttribute("src", "./img/trash.png");

        const newTitle = addTask.value;
        newP.innerText = addTask.value;
        addTask.value = '';
        addTask.style.display = 'none';

        const data = {
            "title": newTitle,
            "description": "",
            "isComplete": false
        };

        postData(data);


        newCheckDiv.appendChild(newCheckBox);
        newTaskDiv.appendChild(newP);
        newA.appendChild(newImg);
        newTaskDiv.appendChild(newA);
        newLi.appendChild(newCheckDiv);
        newLi.appendChild(newTaskDiv);

        const taskList = document.querySelector('#taskList');
        taskList.appendChild(newLi);

        addTask.removeEventListener('keyup', addNewTask);
    }

    function createDawnlodedLi(data) {

        data.sort((a,b) => {
            return a.id - b.id;
        });

        data.forEach( todo => {
        const newLi = document.createElement('li');
        newLi.className = 'ListItem';
        newLi.dataset.id = todo.id;
        const newCheckDiv = document.createElement('div');
        newCheckDiv.className = 'Checkbox';
        const newCheckBox = document.createElement('input');
        const newTaskDiv = document.createElement('div');
        newTaskDiv.className = 'Task';
        const newP = document.createElement('p');
        newP.className = 'Todo';
        const newA = document.createElement('a');
        const newImg = document.createElement('img');

        newCheckBox.setAttribute("type", "checkbox");
        newImg.setAttribute("src", "./img/trash.png");

        newA.addEventListener('click', () => deleteTask(todo.id));

        newCheckBox.addEventListener('change', function(){
            if(this.checked){
                this.parentElement.nextSibling.firstElementChild.style.textDecoration = 'line-through';
                this.parentElement.nextSibling.firstElementChild.style.color = '#9eb2c0';
            } else {
                this.parentElement.nextSibling.firstElementChild.style.textDecoration = 'none';
                this.parentElement.nextSibling.firstElementChild.style.color = '#2e3641';
            }
        });

        newP.innerText = todo.title;

        newCheckDiv.appendChild(newCheckBox);
        newTaskDiv.appendChild(newP);
        newA.appendChild(newImg);
        newTaskDiv.appendChild(newA);
        newLi.appendChild(newCheckDiv);
        newLi.appendChild(newTaskDiv);

        const taskList = document.querySelector('#taskList');
        taskList.appendChild(newLi);

        })
    }

    function getData(){
        fetch('https://todo-simple-api.herokuapp.com/todos?page=1&page_size=10')
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                createDawnlodedLi(response.data);
            })
            .catch(function(error) {
                console.log('Request failed', error)
            });
    }

    function postData(data){
        fetch('https://todo-simple-api.herokuapp.com/todos',
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(function(){
                const taskList = document.querySelector('#taskList');
                taskList.innerHTML = '';
                getData();
            })
            .catch(function(response){ console.log(response) });
    }

    function deleteTask(id){
        fetch(`https://todo-simple-api.herokuapp.com/todos/${id}`,
            { method: "DELETE" })
            .then(function(response){
                const taskList = document.querySelector('#taskList');
                taskList.innerHTML = '';
                getData();
            })
            .catch(function(response){ console.log(response) });
    }

    getData();
});