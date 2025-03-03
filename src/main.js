let URL = "http://localhost:3000/posts";

// fetch(URL).then(function(data) {
//     return data.json();
// }).then(function(data) {
//     console.log(data);
// });

function load() {
    fetch(URL).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log(data);
    });
}

async function loadSync() {
    try {
        let response = await fetch(URL);
        let data = await response.json();
        for (let i = 0; i < data.length; i++) {
            console.log(convertFromObjToHTML(data[i]));
        }
    } catch (error) {
        console.log(error);
    }
}

function convertFromObjToHTML(post) {
    let string = '<st>';
    string += '<h2>' + post.title + '</h2>';
    string += '<p>' + post.content + '</p>';
    string += '</st>';
    return string;
}

loadSync();