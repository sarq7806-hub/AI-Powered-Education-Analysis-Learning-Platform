let books =
    JSON.parse(
        localStorage.getItem("libraryBooks")
    ) || [];

let selectedBookId = null;


// ================================
// SAVE DATA
// ================================

function saveBooks() {

    localStorage.setItem(
        "libraryBooks",
        JSON.stringify(books)
    );
}


// ================================
// DISPLAY BOOKS
// ================================

function showBooks() {

    const table =
        document.getElementById("bookTable");

    table.innerHTML = "";

    books.forEach(function(book) {

        const row =
            document.createElement("tr");

        if (book.id === selectedBookId) {
            row.classList.add("selected");
        }

        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
        `;

        row.onclick = function() {
            selectBook(book.id);
        };

        table.appendChild(row);

    });
}


// ================================
// ADD BOOK
// ================================

function addBook() {

    const title =
        document.getElementById("title")
            .value.trim();

    const author =
        document.getElementById("author")
            .value.trim();

    const year =
        document.getElementById("year")
            .value.trim();


    if (
        title === "" ||
        author === "" ||
        year === ""
    ) {

        alert("Please fill all fields.");

        return;
    }


    const newBook = {

        id:
            books.length > 0
                ? Math.max(
                    ...books.map(book => book.id)
                ) + 1
                : 1,

        title: title,

        author: author,

        year: year
    };


    books.push(newBook);

    saveBooks();

    showBooks();

    clearFields();

    alert("Book added successfully!");
}


// ================================
// SELECT BOOK
// ================================

function selectBook(id) {

    const book =
        books.find(
            book => book.id === id
        );

    if (!book) {
        return;
    }

    selectedBookId = id;

    document.getElementById("title").value =
        book.title;

    document.getElementById("author").value =
        book.author;

    document.getElementById("year").value =
        book.year;

    showBooks();
}


// ================================
// UPDATE BOOK
// ================================

function updateBook() {

    if (selectedBookId === null) {

        alert("Please select a book.");

        return;
    }


    const title =
        document.getElementById("title")
            .value.trim();

    const author =
        document.getElementById("author")
            .value.trim();

    const year =
        document.getElementById("year")
            .value.trim();


    if (
        title === "" ||
        author === "" ||
        year === ""
    ) {

        alert("Please fill all fields.");

        return;
    }


    const book =
        books.find(
            book => book.id === selectedBookId
        );


    if (book) {

        book.title = title;

        book.author = author;

        book.year = year;
    }


    saveBooks();

    showBooks();

    clearFields();

    alert("Book updated successfully!");
}


// ================================
// DELETE BOOK
// ================================

function deleteBook() {

    if (selectedBookId === null) {

        alert("Please select a book.");

        return;
    }


    const confirmDelete =
        confirm(
            "Are you sure you want to delete this book?"
        );


    if (!confirmDelete) {
        return;
    }


    books =
        books.filter(
            book => book.id !== selectedBookId
        );


    selectedBookId = null;

    saveBooks();

    showBooks();

    clearFields();

    alert("Book deleted successfully!");
}


// ================================
// CLEAR FIELDS
// ================================

function clearFields() {

    document.getElementById("title").value = "";

    document.getElementById("author").value = "";

    document.getElementById("year").value = "";

    selectedBookId = null;

    showBooks();
}


// ================================
// INITIAL LOAD
// ================================

showBooks();