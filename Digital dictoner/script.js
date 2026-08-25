const note = document.getElementById("note");
const fileInput = document.getElementById("fileInput");
const dateElement = document.getElementById("date");


// ---------------- DATE ----------------

function updateDate() {

    const now = new Date();

    dateElement.innerText =
        now.toLocaleDateString() +
        "  " +
        now.toLocaleTimeString();
}

updateDate();


// ---------------- NEW NOTE ----------------

function newNote() {

    note.value = "";

    note.focus();
}


// ---------------- CLEAR NOTE ----------------

function clearNote() {

    if (note.value.trim() === "") {

        alert("Diary is already empty.");

        return;
    }

    const confirmClear =
        confirm("Clear the diary?");

    if (confirmClear) {

        note.value = "";

    }
}


// ---------------- SAVE NOTE ----------------

function saveNote() {

    const content =
        note.value.trim();

    if (content === "") {

        alert("Diary is empty!");

        return;
    }

    const now = new Date();

    const date =
        now.toLocaleString();

    const diaryContent =
`Digital Diary
========================================
Date: ${date}

${content}`;


    const blob =
        new Blob(
            [diaryContent],
            { type: "text/plain" }
        );

    const url =
        URL.createObjectURL(blob);

    const link =
        document.createElement("a");

    link.href = url;

    link.download =
        "Digital_Diary.txt";

    link.click();

    URL.revokeObjectURL(url);

    alert("Diary saved successfully!");
}


// ---------------- OPEN NOTE ----------------

function openNote() {

    fileInput.click();
}


fileInput.addEventListener(
    "change",
    function() {

        const file =
            fileInput.files[0];

        if (!file) {
            return;
        }

        const reader =
            new FileReader();

        reader.onload =
            function(event) {

                note.value =
                    event.target.result;

            };

        reader.readAsText(file);

    }
);