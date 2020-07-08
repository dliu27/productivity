var input = document.getElementById("toDoInput");

input.addEventListener("keyup", function (e) {
    if (e.keyCode === 13) {
        e.preventDefault();
        console.log('hi')
        toDoList.innerText += String(input.value)

        // localStorage.setItem("Todo", String(input.value))
    
        input.value = ''



    }
});
