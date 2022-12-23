
// Test function to select and display the comment with id
function selectComment(id, comment) {
    console.log({ "id": id, "comment": comment })
    var ele = document.getElementById("selected-comment")
    ele.innerText = `[${id}]=> ${comment}`
}

function showComments(payload) {
    const content = eval(JSON.parse(payload))

    for (let i = 0; i < content.length; i++) {
        var ul = document.getElementById("box-list")
        var li = document.createElement("li")

        li.appendChild(document.createTextNode(content[i].comment))
        ul.appendChild(li)
    }

    const slideDown = elem => elem;

    slideDown(document.getElementsByClassName("box-container"));


}