
document.querySelector(".todoContainer").addEventListener("click", async function (e) {
    const item = e.target;
      const edit = document.querySelector(".patch");
    //e.preventDefault
    //console.log(item);
    if (item.classList[0] === "delete") {
        item.parentElement.parentElement.classList.add("swapOut");
        item.parentElement.parentElement.addEventListener("transitionend", async ()=> {
            await item.parentElement.remove();
        })
      
    }
    if (item.classList[0] === "edit" && item.parentElement.classList[1]!=="cut") {
        const edit = item.previousElementSibling;
        edit.removeAttribute("hidden");
    }
    else if (item.parentElement.classList[1] === "cut") {
        edit.setAttribute("hidden", "true");
    }
})

document.querySelector(".todoContainer").addEventListener("dblclick", async(e) =>{
    const item = e.target;
    const edit = document.querySelector(".patch");
    e.preventDefault
    //console.log(item);
    if (item.classList[1] !== "cut" && item.classList[0] === "todoElement") {
        item.classList.add("cut");
        edit.setAttribute("hidden", "true");
     
        const dd=item.children[0].children[0];
       dd.value = "true";
        item.children[0].submit();
    }
    else if (item.classList[1] == "cut" && item.classList[0] === "todoElement") {
        item.classList.remove("cut");
        edit.setAttribute("hidden", "true");
     
         const dd=item.children[0].children[0];
       dd.value = "false";
        item.children[0].submit();
    }
})



// document.querySelector("body").addEventListener("click", function (e) {
//     console.log(e.target);
// })