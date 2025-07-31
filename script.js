showNotes();
const title = document.querySelector("#title");
const textArea = document.querySelector("#note-text");
const button = document.querySelector(".note-btn");

button.addEventListener("click", function (e) {
    if (title.value.trim() === '' || textArea.value.trim() === '') {
        alert("Please enter both name and date before adding a schedule.");
        return;
    }

    let notes = localStorage.getItem("notes");
    let notesObj = notes == null ? [] : JSON.parse(notes);

    let myObj = {
        title: title.value,
        textArea: textArea.value
    };

    notesObj.push(myObj);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    textArea.value = '';
    title.value = '';
    showNotes();
});

function showNotes() {
    let notes = localStorage.getItem("notes");
    let notesObj = notes == null ? [] : JSON.parse(notes);

    let html = '';
    notesObj.forEach(function (element, index) {
        html += `
        <div>
            <div class="card">
                <h2>${element.textArea}</h2>
                <p>${element.title}</p>
                <button onClick="deleteNote(${index})" class="deleteBtn">Delete Note</button>
            </div>
        </div>`;
    });

    let insertNotes = document.getElementById("notes");
    if (notesObj.length == 0) {
        insertNotes.innerHTML = `Nothing to show! Please click on "Schedule Batch" button to add a new class.`;
        insertNotes.style.color = "gray";
        insertNotes.style.paddingTop = "10px";
        insertNotes.style.fontSize = "15px";
    } else {
        insertNotes.innerHTML = html;
    }
}

function deleteNote(index) {
    let notes = localStorage.getItem("notes");
    let notesObj = notes == null ? [] : JSON.parse(notes);

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let searchTxt = document.getElementById("searchTxt");
searchTxt.addEventListener("input", function () {
    let inputVal = searchTxt.value.toLowerCase();
    let cards = document.getElementsByClassName("card");

    Array.from(cards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName('h2')[0].innerText.toLowerCase();
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});
