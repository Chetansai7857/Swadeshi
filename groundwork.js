function validation(){
    var validate = document.getElementsByTagName("input")[2].value.length;
    if(validate<8){
       alert("Your Password should contain atleast 8 characters");
    }
}
// document.querySelector(".end2").addEventListener("onclick",function(){
//     alert("hello!");
// });