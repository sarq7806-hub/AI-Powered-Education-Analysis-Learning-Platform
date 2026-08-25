// ================================
// Expense Tracker Data & Functions
// ================================

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Save transactions to local storage
function saveTransactions() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Add a new transaction
function addTransaction() {
    const description = document.getElementById("description").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;

    if (description === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter valid details.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description,
        amount,
        type,
        category
    };

    transactions.push(transaction);
    saveTransactions();
    displayTransactions();
    clearForm();
}

// Display transactions
function displayTransactions() {
    const list = document.getElementById("transactionList");
    list.innerHTML = "";

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach((transaction) => {
        const row = document.createElement("tr");

        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }

        const sign = transaction.type === "income" ? "+" : "-";

        row.innerHTML = `
            <td>${transaction.description}</td>
            <td class="${transaction.type}">${sign} ₹${transaction.amount.toFixed(2)}</td>
            <td>${transaction.type}</td>
            <td>${transaction.category}</td>
            <td>
                <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
            </td>
        `;

        list.appendChild(row);
    });

    const balance = totalIncome - totalExpense;

    document.getElementById("totalIncome").innerText = "₹" + totalIncome.toFixed(2);
    document.getElementById("totalExpense").innerText = "₹" + totalExpense.toFixed(2);
    document.getElementById("balance").innerText = "₹" + balance.toFixed(2);
}

// Delete a transaction
function deleteTransaction(id) {
    if (!confirm("Delete this transaction?")) return;
    transactions = transactions.filter(t => t.id !== id);
    saveTransactions();
    displayTransactions();
}

// Clear form inputs
function clearForm() {
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("type").value = "income";
    document.getElementById("category").value = "Food";
}

// Initial load
displayTransactions();

// ================================
// Library Books Data & Functions
// ================================

let books = JSON.parse(localStorage.getItem("libraryBooks")) || [];
let selectedBookId = null;

// Save books to local storage
function saveBooks() {
    localStorage.setItem("libraryBooks", JSON.stringify(books));
}

// Show books in table
function showBooks() {
    const tableBody = document.querySelector("#bookTable tbody");
    tableBody.innerHTML = "";

    books.forEach((book) => {
        const row = document.createElement("tr");
        if (book.id === selectedBookId) {
            row.classList.add("selected");
        }
        row.innerHTML = `
            <td>${book.id}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.year}</td>
        `;
        row.onclick = () => selectBook(book.id);
        tableBody.appendChild(row);
    });
}

// Add a new book
function addBook() {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const year = document.getElementById("year").value.trim();

    if (title === "" || author === "" || year === "") {
        alert("Please fill all fields.");
        return;
    }

    const newBook = {
        id: books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1,
        title,
        author,
        year
    };

    books.push(newBook);
    saveBooks();
    showBooks();
    clearFields();
    alert("Book added successfully!");
}

// Select a book
function selectBook(id) {
    const book = books.find(b => b.id === id);
    if (!book) return;
    selectedBookId = id;
    document.getElementById("title").value = book.title;
    document.getElementById("author").value = book.author;
    document.getElementById("year").value = book.year;
    showBooks();
}

// Update a book
function updateBook() {
    if (selectedBookId === null) {
        alert("Please select a book.");
        return;
    }
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const year = document.getElementById("year").value.trim();

    if (title === "" || author === "" || year === "") {
        alert("Please fill all fields.");
        return;
    }

    const book = books.find(b => b.id === selectedBookId);
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

// Delete selected book
function deleteBook() {
    if (selectedBookId === null) {
        alert("Please select a book.");
        return;
    }
    if (!confirm("Are you sure you want to delete this book?")) return;
    books = books.filter(b => b.id !== selectedBookId);
    selectedBookId = null;
    saveBooks();
    showBooks();
    clearFields();
    alert("Book deleted successfully!");
}

// Clear input fields
function clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("year").value = "";
    selectedBookId = null;
    showBooks();
}

// Initial load
showBooks();