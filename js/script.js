let ACTIVE = 0

const DRAGCOORDS = {
    start: null,
    end: null, 
    current: 0,
    draging: false
},dogInfo = []
,CART = []


let ID = localStorage.getItem("ID")
if(ID === null){
    ID = 1
    localStorage.setItem("ID", ID)
}

// const dogInfo = [
//     {
//         dogId: 1,
//         name: "Grahp",
//     price: 600,
//     age: 1,
//     tail: false,
//     img: "doberman.png" ,
//     },
//     {
//         dogId: 2,
//         name: "Kenzo",
//     price: 450,
//     age: 3,
//     tail: true,
//     img: "dog boxe.jpg",   
//     },
//     {
//         dogId: 3,
//         name: "Sharik",
//     price: 250,
//     age: 5,
//     tail: true,
//     img: "german shepherd.jpg",  
//     },
//     {
//         dogId: 4,
//         name: "Hardin",
//     price: 500,
//     age: 4,
//     tail: true,
//     img: "cane corso.jpg",      
//     },
//     {
//         dogId: 5,
//         name: "Sevo",
//     price: 150,
//     age: 2,
//     tail: true,
//     img: "Husky.jpg",    
//     },
//     {
//         dogId: 6,
//         name: "Recs",
//     price: 200,
//     age: 2,
//     tail: false,
//     img: "american pit bull.jpg",     
//     }
// ]


// for(let dog of dogInfo){
// localStorage.setItem("dog" + dog.dogId, JSON.stringify(dog))    
// }



const containerNoe = document.querySelector(".containerNoe")
const container = document.querySelector(".container")
const dots = document.querySelector(".dots")
const img = container.getElementsByTagName("img")
const info = document.querySelector(".info")
const foto = document.querySelector(".foto")
const fotFotoDiv = document.querySelector(".forFoto")
const nav = document.querySelector("nav")
const login = document.getElementById("login")
const cancel = document.querySelector("[value = 'Cancel']")
const dialog = document.querySelector("dialog")
const adminForm = dialog.querySelector("form")
const veil = document.querySelector(".veil")
const addtocart = document.querySelector(".addTo")
const cart = document.querySelector(".cart")
const total = document.querySelector(".total")
const shopping = document.querySelector(".shopping")
const dogB = document.querySelector(".dogB")



function getData(){
for(let i in localStorage){
if(i.startsWith("dog"))dogInfo.push(JSON.parse(localStorage.getItem(i))) 
}
}



function setfoto(){
for(let i = 0; i < dogInfo.length; i++){
const newImage = document.createElement("img")
newImage.src = "img/" + dogInfo[i].img
newImage.draggable = false
foto.appendChild(newImage) 
}
}


function setInfo(){
const dName = info.children[0]
const dPrice = info.children[1]
const dAge = info.children[2]
const dTail = info.children[3]
dName.textContent = "This beutiful piece of dog is known as " + dogInfo[ACTIVE].name
dPrice.textContent = "It's worth of $" + dogInfo[ACTIVE].price + " of your hard earned bucks"
dAge.textContent =  "It was born " + dogInfo[ACTIVE].age + " sunphases ago"
if(dogInfo[ACTIVE].tail == true ){
   dTail.textContent = "It has a tail" 
}else if(dogInfo[ACTIVE].tail == false){
   dTail.textContent = "It unfortunately, has lost it's tail"
}  

}



function forFoto(arg){
switch(arg){
   case "left":
    DRAGCOORDS.current = (ACTIVE - 1) * fotFotoDiv.children[0].offsetWidth     
      ACTIVE--
    break 
   case "right":
    DRAGCOORDS.current = (ACTIVE + 1) * fotFotoDiv.children[0].offsetWidth
      ACTIVE++ 
    break  
   default:
      ACTIVE = arg
}    
 
if(ACTIVE >= img.length){
    ACTIVE = 0
DRAGCOORDS.current = 0   
} 
if(ACTIVE < 0){
   ACTIVE =  img.length - 1
DRAGCOORDS.current = fotFotoDiv.children[0].offsetWidth * fotFotoDiv.children.length     
} 

for(let i of img){
i.style.translate = `${-ACTIVE * 100}%`
}
justDots()
setInfo()
}





function justDots(){    
const dots = document.querySelectorAll(".dot") 
   for(let i = 0; i < dots.length; i++){
dots[i].classList.remove("selected")
if(i == ACTIVE) dots[i].classList.add("selected")
   }
}


function addDog(dog){
const nweDogFace = new Image()
nweDogFace.src = "img/" + dog.img
foto.appendChild(nweDogFace)
localStorage.setItem("dog" + dog.dogId, JSON.stringify(dog))
ID++
localStorage.setItem("ID", ID)
document.querySelector(".dots").appendChild(creataDog())
forFoto(-1)
setInfo()
}


function creataDog(){
const dot = document.createElement("i") 
dot.className = "fa-solid fa-paw"  
dot.classList.add("dot")
dot.style.rotate = Math.random() * 360 + "deg"
dot.style.setProperty("--rotation", Math.round(Math.random())? "" : "-" + "360deg")
return dot
}



function setDots(){
const newDots = document.createElement("div")   
newDots.classList.add("dots")

    for(let i = 0; i < img.length; i++){

   const dot = creataDog()

i == ACTIVE && dot.classList.add("selected")   
    newDots.appendChild(dot)
    }
dots.replaceWith(newDots)  
}

function dragSlider(e){
    e.preventDefault()
for(let i of img){
i.style.translate = e.clientX - DRAGCOORDS.current - DRAGCOORDS.start + "px"
}

}

function checkAdmin(){
  if(location.hash == "#admin=true"){
const adminControls = document.createElement("button") 
const logout = document.createElement("button")  
adminControls.textContent = "AdminControls" 
logout.textContent = "Logout" 
adminControls.addEventListener("click", ()=> dialog.showModal())
logout.addEventListener("click", ()=> location.href = "file:///C:/Users/Asus/Desktop/js%20-%20project/index.html")
    login.replaceWith(adminControls, logout)
  }  
}


function updateCart(){

const newContent = document.createElement("div")   
newContent.classList.add("content")

    CART.forEach(elem => {
        const cartItemdiv = document.createElement("div")
        const itemImage = new Image()
        const itemName = document.createElement("h4")
        const itemQ = document.createElement("span")
        const itemPrice = document.createElement("p")

const plus = document.createElement("button")
const minus = document.createElement("button")

plus.dataset.role = "plus"
plus.textContent = "+"
minus.textContent = "-"
itemImage.src = "img/" + elem.img
itemName.textContent = elem.name
itemQ.textContent = elem.quantity
itemPrice.textContent = elem.price

cartItemdiv.classList.add("cartItemdiv")
cartItemdiv.dataset.dataId = elem.dogId
cartItemdiv.append(
    itemImage,
    itemName,
    plus,
    itemQ,
    minus, 
    itemPrice)

newContent.appendChild(cartItemdiv)


dogB.textContent = itemQ.textContent + " " + "dog in the basket"

    })
document.querySelector(".content").replaceWith(newContent)
total.textContent = CART.reduce((acc, elem) => acc + elem.quantity * elem.price, 0)



}


// Listeners



shopping.addEventListener("click", function(){
cart.classList.toggle("cart2")
})


cart.addEventListener("click", function(e){
    if(!e.target.matches("button"))return
const target = e.target.closest(".cartItemdiv").dataset.dataId

const dog = CART.find(elem => elem.dogId == target)

    if(e.target.dataset.role){
dog.quantity++
}else dog.quantity = Math.max(dog.quantity - 1, 0) 

updateCart()

})


addtocart.addEventListener("click", function(){
const currentDog = CART.find(elem => elem.dogId == dogInfo[ACTIVE].dogId)    
if(!currentDog)CART.push(Object.assign(dogInfo[ACTIVE], {quantity: 1}))
else currentDog.quantity++

updateCart()
})





cancel.addEventListener("click", function(){
    dialog.close()
})

adminForm.addEventListener("submit", function(e){
    const nweDog = {
   dogId: ID,  
   name: adminForm.nm.value,
   price: adminForm.pr.value,
   age: adminForm.ag.value,
   tail: adminForm.tl.checked,
   img: adminForm.dogFace.files[0]?.name,
    }
    dogInfo.push(nweDog)
    addDog(nweDog)
})



containerNoe.addEventListener("click", function(e){
    if(e.target.nodeName !== "I" && !e.target.matches(".dot")) return
    
if(e.target.classList.contains("left")) {
    forFoto("left")
}else if(e.target.classList.contains("right")) {
    forFoto("right")
}else{
const index = Array.from(document.querySelector(".dots").children).indexOf(e.target)
    forFoto(index)
}
})



veil.addEventListener("mousedown", function(e){
DRAGCOORDS.draging = true    
for(let i of img){
i.style.transitionProperty = "none"
}
    DRAGCOORDS.start = e.clientX
    window.addEventListener("mousemove", dragSlider)
})


window.addEventListener("mouseup", function(e){
    if(!DRAGCOORDS.draging) return
DRAGCOORDS.draging = false   
for(let i of img){
i.style.transitionProperty = "translate"
}    
    DRAGCOORDS.end = e.clientX
DRAGCOORDS.current += DRAGCOORDS.start - DRAGCOORDS.end

    window.removeEventListener("mousemove", dragSlider)

  
forFoto(Math.ceil(DRAGCOORDS.current / img[0].offsetWidth))
DRAGCOORDS.current = ACTIVE * img[0].offsetWidth

})


login.addEventListener("click", function(){
   location.href = "admin.html"
})

window.addEventListener("DOMContentLoaded", function(){
    getData()
    setfoto()
    setDots()
    setInfo()
    checkAdmin()
})