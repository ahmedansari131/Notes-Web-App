console.log("So, here I am going to write first JS code");
showNotes();



// Creating function for adding the notes =>
let addBtn = document.getElementById('addNote');
addBtn.addEventListener('click', function(e) {
    let addTxt = document.getElementById('textarea');
    let addTitle = document.getElementById('title');
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(notes);
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    noteObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(noteObj));
    addTxt.value = "";
    addTitle.value = "";
    // console.log(noteObj);
    showNotes();
});

// Creating Function to show the notes =>
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(notes);
    }
    let html = '';
    noteObj.forEach(function(element, index) {
        html += `
        <div class="cards card">
        <div class="title">
           <h2>${element.title}</h2> 
        </div> 
        <p>
            ${element.text}
        </p>
        <button class = "delBtn btn" id = "${index} "onclick = "delNote(this.id)">Delete Note</button>
    </div> `;
    });

    let notesElm = document.getElementById('notes');
    if (notesElm.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show here! Please write some note above.`;
    }
    // console.log(notesElm);
}

// Creating the function to delete the notes =>
function delNote(index) {
    // console.log("I am deleting", index);

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        noteObj = [];
    } else {
        noteObj = JSON.parse(notes);
    }

    noteObj.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(noteObj));
    showNotes();
}


// Code for filtering the search =>
let search = document.getElementById('searchTxt');
search.addEventListener('input', function(){
    let inputVal = search.value;
    let noteCard = document.getElementsByClassName('cards');
    // let titlecard = document.getElementsByClassName('title');
    Array.from(noteCard).forEach(function(element){
        let cardTxt = element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    })
    // console.log(inputVal);
});