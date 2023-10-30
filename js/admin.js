const form = document.forms[0]

const backend = {
    login: "boo",
    password: "foo"
}

form.addEventListener("submit", function(e){
    e.preventDefault()
const checkResult = form.log.value == backend.login && form.psw.value == backend.password

location.href = "index.html" + (checkResult? "#admin=true" : "")

})