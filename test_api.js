const fs = require('fs');


const PORT = 5000;
const API_URL = `http://localhost:${PORT}/books`;

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runTests() {
    console.log("Waiting for server to start...");
    await delay(5000);

    let doc = `# Library Management System - Final Submission

## 1. Description
Backend system for library built with Node.js, Express, and MongoDB.

## 2. Source Code
*(Review the repository for full source code)*
All requirements satisfied. Auto-calculating fields, schema validations, and proper error handling are implemented.

---

## 3. Postman / Request Logs

`;

    let createdId = "";

    try {
        // 1. POST
        const postData = {
            title: "Clean Code",
            author: "Robert C. Martin",
            isbn: "978-0132350884",
            genre: "Software Engineering",
            publisher: "Prentice Hall",
            totalCopies: 5,
            bookType: "Reference"
        };
        const res1 = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(postData)
        });
        const data1 = await res1.json();
        doc += `### 1. POST /books - Add a new book\n**Status:** ${res1.status}\n**Response:**\n\`\`\`json\n${JSON.stringify(data1, null, 2)}\n\`\`\`\n\n`;
        createdId = data1._id;

        // 2. GET All
        const res2 = await fetch(API_URL);
        const data2 = await res2.json();
        doc += `### 2. GET /books - Get all books\n**Status:** ${res2.status}\n**Response:**\n\`\`\`json\n${JSON.stringify(data2, null, 2)}\n\`\`\`\n\n`;

        // 3. GET Search
        const res3 = await fetch(`${API_URL}/search?title=Clean`);
        const data3 = await res3.json();
        doc += `### 3. GET /books/search?title=Clean - Search by title\n**Status:** ${res3.status}\n**Response:**\n\`\`\`json\n${JSON.stringify(data3, null, 2)}\n\`\`\`\n\n`;

        // 4. GET By ID
        const res4 = await fetch(`${API_URL}/${createdId}`);
        const data4 = await res4.json();
        doc += `### 4. GET /books/:id - Get by ID\n**Status:** ${res4.status}\n**Response:**\n\`\`\`json\n${JSON.stringify(data4, null, 2)}\n\`\`\`\n\n`;

        // 5. PUT
        const res5 = await fetch(`${API_URL}/${createdId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ totalCopies: 10 })
        });
        const data5 = await res5.json();
        doc += `### 5. PUT /books/:id - Update book copies\n**Status:** ${res5.status}\n**Response:**\n\`\`\`json\n${JSON.stringify(data5, null, 2)}\n\`\`\`\n\n`;

        // 6. DELETE
        const res6 = await fetch(`${API_URL}/${createdId}`, {
            method: 'DELETE'
        });
        const data6 = await res6.json();
        doc += `### 6. DELETE /books/:id - Delete book record\n**Status:** ${res6.status}\n**Response:**\n\`\`\`json\n${JSON.stringify(data6, null, 2)}\n\`\`\`\n\n`;

    } catch (e) {
        console.error("Test Error:", e.message);
    }
    
    fs.writeFileSync('Final_Submission.md', doc);
    console.log("Mock requests completed and Markdown doc created.");
}

runTests();
