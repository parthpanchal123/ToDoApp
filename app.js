

window.onload = function() {
    var form = document.getElementById("todo_form");
    var input = document.getElementById("todo_item");
    var btn = document.getElementById("add_btn");
    var list = document.getElementById("list");
    var id = 1;
    var liItem = "";
    var todoList = [];
    var btnClr = document.getElementById("btn_clr");

    btn.addEventListener("click",addToDoItem);
    list.addEventListener("click",boxChecked);
    btnClr.addEventListener("click",clear_list);

    if (localStorage.length <=0) {
        btnClr.style.display = "none"; //hide clear btn	
		console.log("button");
    }

    if(localStorage.length > 0) {
		displayList();
	}


    function addToDoItem(){

        if (input.value == ""){
            alert("You havent added anything !") ;
        }
        else {

            var text = input.value ;
            var item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;
            list.insertAdjacentHTML("beforeend",item);
            liItem = {item: text, checked: false};
            todoList.push(liItem);
            id++ ;
            addToLocalStorage()
            form.reset();
        }

    }

    function boxChecked(event){

        const element = event.target ;
        if (element.type === "checkbox"){
            element.parentNode.style.textDecoration = "line-through";
            todoList = JSON.parse(localStorage.getItem("todoList"));
			todoList[element.id.split('-')[1]-1].checked = element.checked.toString();
			localStorage.setItem("todoList", JSON.stringify(todoList));
        }

    }
    function clear_list(){
        todoList = [];
		localStorage.clear();
		list.innerHTML = "";
		btnClr.style.display = "none";
		list.style.borderTop = "";
    }

    function addToLocalStorage() {
		if(typeof(Storage) !== "undefined") {
			localStorage.setItem("todoList", JSON.stringify(todoList));
		}
		else {
			alert("browser doesn't support local storage!");
		}
    }
    
    function displayList() {
        todoList = JSON.parse(localStorage.getItem("todoList"));
        console.log(todoList);
		todoList.forEach(function(element) {
			console.log(element.item)
			var text = element.item;
			var item = `<li id="li-${id}">${text}<input id="box-${id}" class="checkboxes" type="checkbox"></li>`;
			list.insertAdjacentHTML("beforeend", item);
			//if we got a checked box, then style
			if(element.checked) {
				var li = document.getElementById("li-"+id);
				li.style.textDecoration = "line-through";
				li.childNodes[1].checked = element.checked;
			}
			id++;
		});
	}
}

