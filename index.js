const draggable_list = document.getElementById("draggable_list");
const check = document.getElementById("check");

const moodiestSigns = [ "Cancer", "Pisces", "Scorpio", "Aries", "Libra", "Virgo"];


//stores list of items
const listItems = []; 

let dragStartIndex;

createZodiacList();

//generates list of items into Dom
function createZodiacList() {
    [...moodiestSigns]
        .map(a => ( { value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((sign, index) => {

        const listItem = document.createElement("li");

        listItem.setAttribute("data-index", index);

        listItem.innerHTML = `
        <span class="number">${index + 1}</span>
            <div class="draggable" draggable ="true">
                <p class="zodiac-sign">${sign}</p>
                <i class="fas fa-grip-lines"></i>
            </div>
            `;

            listItems.push(listItem);

            draggable_list.appendChild(listItem);
    });

    addEventListeners();
}

function dragStart() {
    // console.log("Event: ", "dragstart");
    dragStartIndex = +this.closest("li").getAttribute("data-index");
}

function dragEnter() {
    // console.log("Event: ", "dragenter");
    this.classList.add("over");
}

function dragLeave() {
    // console.log("Event: ", "dragleave");
    this.classList.remove("over");
}

function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector(".draggable");
    const itemTwo = listItems[toIndex].querySelector(".draggable");

    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
}

function checkOrder(){
    listItems.forEach((listItem, index) => {
        const zodiacSign = listItem.querySelector(".draggable").innerText.trim();
        
        if (zodiacSign !== moodiestSigns[index]) {
            listItem.classList.add("wrong");
        } else {
            listItem.classList.remove("wrong");
            listItem.classList.add("right");
        }
    });
}

function dragOver(e) {
    // console.log("Event: ", "dragover");
    e.preventDefault();
}

function dragDrop() {
    // console.log("Event: ", "drop");
    const dragEndIndex = +this.getAttribute("data-index");
    swapItems(dragStartIndex, dragEndIndex);

    this.classList.remove("over");
}

function addEventListeners() {
const draggables = document.querySelectorAll(".draggable");
const dragListItems = document.querySelectorAll(".draggable_list li");

draggables.forEach(draggable => {
    draggable.addEventListener("dragstart", dragStart);
});

dragListItems.forEach(item => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
});

}

check.addEventListener("click", checkOrder);
