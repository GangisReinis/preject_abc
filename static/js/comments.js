function selectComment(id, comment) {
    console.log({"id": id, "comment": comment})
    var ele = document.getElementById("selected-comment")
    ele.innerText = `[${id}]=> ${comment}`
}
