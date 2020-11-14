const addBtn = document.getElementById("addBtn");

// Grabs all notes objects that exists in the storage 
const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
    notes.forEach((note) => {
        addNewNote(note);
    });
}

addBtn.addEventListener("click", () => {
    addNewNote();
});

function addNewNote(text = "") {
    const note = document.createElement("div");
    note.classList.add("note");
    console.log(note)
 
    note.innerHTML = `
        <div class="notes">
            <div class="tools">
                <button class="editBtn"><i class="fas fa-edit"></i></button>
                <button class="deleteBtn"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="main ${text ? "" : "hidden"}"></div>
            <textarea class="${text ? "hidden" : ""}"></textarea>
        </div>
    `;

    
    const editBtn = note.querySelector(".editBtn");
    const deleteBtn = note.querySelector(".deleteBtn");

    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");

    textArea.value = text;
    main.innerHTML = marked(text);

    // Toggles between the different modes a note can be in (hidden when you're not written anything)
    editBtn.addEventListener("click", () => {
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    });

    deleteBtn.addEventListener("click", () => {
        note.remove();
        updateLocalStorage();
    });

    textArea.addEventListener("input", (e) => {
        const { value } = e.target;
        main.innerHTML = marked(value);
        updateLocalStorage();
    });

    document.body.appendChild(note);
}

function updateLocalStorage() {
    const notesText = document.querySelectorAll("textarea");

    const notes = [];

    notesText.forEach((note) => {
        notes.push(note.value);
    });
    console.log(notesText)

    localStorage.setItem("notes", JSON.stringify(notes));
}
