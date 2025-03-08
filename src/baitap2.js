let POST_URL = "http://localhost:3000/posts";
let AUTHOR_URL = "http://localhost:3000/authors";
var globalPosts, globalAuthors;
LoadSync();
LoadAuthorsSync();

// Load danh sách bài viết
async function LoadSync() {
    try {
        let response = await fetch(POST_URL);
        let posts = await response.json();
        globalPosts = posts.filter(p => !p.isDeleted);
        let body = document.getElementById("postBody");
        body.innerHTML = "";
        for (const post of globalPosts) {
            body.innerHTML += ConvertPostToHTML(post);
        }
    } catch (error) {
        console.log(error);
    }
}

// Load danh sách tác giả
async function LoadAuthorsSync() {
    try {
        let response = await fetch(AUTHOR_URL);
        let authors = await response.json();
        globalAuthors = authors;
        let body = document.getElementById("authorBody");
        body.innerHTML = "";
        let authorSelect = document.getElementById("author");
        authorSelect.innerHTML = "";
        for (const author of globalAuthors) {
            body.innerHTML += ConvertAuthorToHTML(author);
            authorSelect.innerHTML += `<option value="${author.name}">${author.name}</option>`;
        }
    } catch (error) {
        console.log(error);
    }
}

// Hiển thị bài viết ra HTML
function ConvertPostToHTML(post) {
    return `<tr>
        <td>${post.id}</td>
        <td>${post.title}</td>
        <td>${post.views}</td>
        <td>${post.author}</td>
        <td>${post.isPublished ? "✅" : "❌"}</td>
        <td><button onclick="DeletePost(${post.id});return false">Delete</button></td>
    </tr>`;
}

// Hiển thị tác giả ra HTML
function ConvertAuthorToHTML(author) {
    return `<tr>
        <td>${author.id}</td>
        <td>${author.name}</td>
        <td>${author.postCount}</td>
    </tr>`;
}

// Kiểm tra bài viết tồn tại
function CheckPostExist(id) {
    return globalPosts.find(p => p.id == id);
}

// Kiểm tra tác giả tồn tại
function CheckAuthorExist(name) {
    return globalAuthors.find(a => a.name === name);
}

// Lấy ID bài viết lớn nhất
function getMaxPostId() {
    let ids = globalPosts.map(p => Number.parseInt(p.id));
    return Math.max(...ids, 0);
}

// Lưu bài viết mới
async function SavePost() {
    let id = document.getElementById("id").value;
    if (id.length == 0 || isNaN(id)) {
        id = (getMaxPostId() + 1) + "";
    }
    let post = {
        id: id,
        title: document.getElementById("title").value,
        views: document.getElementById("views").value,
        author: document.getElementById("author").value,
        isPublished: document.getElementById("isPublished").checked
    };

    let author = CheckAuthorExist(post.author);
    if (!author) {
        alert("Tác giả không tồn tại!");
        return;
    }

    let method = CheckPostExist(id) ? 'PUT' : 'POST';
    let url = method === 'PUT' ? `${POST_URL}/${id}` : POST_URL;

    await fetch(url, {
        method: method,
        body: JSON.stringify(post),
        headers: { "Content-Type": "application/json" }
    });
    
    // Tăng postCount của tác giả
    author.postCount += 1;
    await fetch(`${AUTHOR_URL}/${author.id}`, {
        method: "PATCH",
        body: JSON.stringify({ postCount: author.postCount }),
        headers: { "Content-Type": "application/json" }
    });

    LoadSync();
    LoadAuthorsSync();
}

// Xóa mềm bài viết
async function DeletePost(id) {
    let post = CheckPostExist(id);
    if (post) {
        post.isDeleted = true;
        await fetch(`${POST_URL}/${id}`, {
            method: "PUT",
            body: JSON.stringify(post),
            headers: { "Content-Type": "application/json" }
        });
        LoadSync();
    }
}
