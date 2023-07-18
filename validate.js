const validate = () =>{
    alert("hi")
    const name1 = document.getElementById("name").value;
    const password = document.getElementById("password").value;
    const error = document.getElementById("error"); 
    const form = document.getElementById("form");
    const sub = document.getElementById("sub");

    let messages = []
    if(name1.value === ''|| name1.value== null){
        messages.push('name is required');
    }
    if(messages.length > 0){
        e.preventDefault()
        error.innerText = messages.join(', ')
    }
}