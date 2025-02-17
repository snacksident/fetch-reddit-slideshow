const submitForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')
const mainContainer = document.querySelector("#main-container")
const slideshowContainer = document.querySelector("#slideshow-container")
const slideshowDisplay = document.querySelector("#slideshow-display")
const stopButton = document.querySelector("#stop-button")
const carouselPlacement = document.querySelector("#carousel-placement")


slideshowContainer.classList.add('hidden')




let searchedObjects = []
let imageObjects = []
let carouselContainer
let carousel

submitForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    resetDisplay()
    fetchRedditData(searchInput.value)
    containerToggler()
})

stopButton.addEventListener('click',endSlideshow)

//fetch from reddit api based on given search string
const fetchRedditData = (searchString) =>{
    // const endpoint = `http://www.reddit.com/search.json?q=${searchString}+nsfw:no`
    const endpoint = `http://www.reddit.com/search.json?q=${searchString}+nsfw:no`
    //might need raw_json=1 as an arg in the endpoint to help with image handling?
    // fetch requires the api url as arg
    // fetch(endpoint) // returns fetch object
    fetch(endpoint)
    .then(fetchObj=>fetchObj.json())
    .then(jsonData=>{
        jsonData.data.children.forEach(element=>{
            //store all objects into an array
            searchedObjects.push(element)
        })
        findImageObjects()
        displayImages()
        
    })
    .catch(err=>console.log('error fetching data',err))
}

function findImageObjects(){
    //filter out all objects that directly link to an image ending in .jpg or .png- array.filter()
    for(let i = 0; i < searchedObjects.length; i++){
        if(searchedObjects[i].data.url.includes(".jpg" || ".png")){
            imageObjects.push(searchedObjects[i])
        }
    }
}

function displayImages(){
    //place new img within new div for each picture found
    imageObjects.forEach(image => {
        //debug line to see where i'm at
        console.log(image.data.url)
        //create a new img tag
        let newImg = document.createElement('img')
        //create new div for img to live in
        let newDiv = document.createElement('div')
        newDiv.classList.add('carousel-item')
        carouselPlacement.appendChild(newDiv)
        //give img new source
        newImg.src = image.data.url
        //append image to newDiv
        newDiv.appendChild(newImg)
        //append image to slideshowDisplay
    })

}

function containerToggler() {
    slideshowContainer.classList.remove('hidden')
    mainContainer.classList.add('hidden')
}
function endSlideshow(){
    slideshowContainer.classList.add('hidden')
    mainContainer.classList.remove('hidden')
}

function resetDisplay(){
    while(slideshowDisplay.firstChild){
        slideshowDisplay.removeChild(slideshowDisplay.firstChild)
    }
    searchedObjects = []
    imageObjects = []
}