
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));

let books = [
    { id: 1, name: "Java Programming", author: "James Gosling" },
    { id: 2, name: "Python Basics", author: "Guido van Rossum" }
];

app.get('/', (req, res) => {
    let html = `
    <html>
    <head>
        <title>Book Library</title>
    </head>
    <body>
        <h1>Book Library Management System</h1>

        <h2>Add New Book</h2>

        <form action="/add" method="POST">
            <input type="number" name="id" placeholder="Book ID" required>
            <input type="text" name="name" placeholder="Book Name" required>
            <input type="text" name="author" placeholder="Author Name" required>
            <button type="submit">Add Book</button>
        </form>

        <h2>Available Books</h2>

        <table border="1" cellpadding="10">
            <tr>
                <th>ID</th>
                <th>Book Name</th>
                <th>Author</th>
                <th>Action</th>
            </tr>

            ${books.map(book => `
                <tr>
                    <td>${book.id}</td>
                    <td>${book.name}</td>
                    <td>${book.author}</td>
                    <td>
                        <form action="/delete/${book.id}" method="POST">
                            <button type="submit">Delete</button>
                        </form>
                    </td>
                </tr>
            `).join('')}

        </table>
    </body>
    </html>
    `;

    res.send(html);
});

app.post('/add', (req, res) => {
    books.push({
        id: Number(req.body.id),
        name: req.body.name,
        author: req.body.author
    });

    res.redirect('/');
});

app.post('/delete/:id', (req, res) => {
    books = books.filter(book => book.id != req.params.id);
    res.redirect('/');
});

app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});
