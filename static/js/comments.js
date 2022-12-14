
// Test function to select and display the comment with id
function selectComment(id, comment) {
    console.log({"id": id, "comment": comment})
    var ele = document.getElementById("selected-comment")
    ele.innerText = `[${id}]=> ${comment}`
}
