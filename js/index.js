
document.addEventListener('DOMContentLoaded', (event) => {
    // console.log('DOM fully loaded');

    const formSearch = document.getElementById("github-form")

    formSearch.addEventListener("submit", submitForm)
    formSearch.addEventListener("submit", renderRepo)

    

    searchBar = document.querySelector("input")
    repoList = document.getElementById("repos-list") 


})

let userName

let repoList 

let searchBar 

let userLogin = document.createElement('li')
let userImgLink = document.createElement('li')
let userLink = document.createElement('li')
let repoLi = document.createElement('li')


function submitForm(event){
    event.preventDefault()

    userLogin.innerHTML = ""
    userImgLink.innerHTML = ""
    userLink.innerHTML = ""
    
    // console.log(event.target.search.value) 
    // console.log(event.target[0].value) 
    // console.log(event.target[1].value) 
    userName = event.target.search.value 
    
    // fecth("https://api.github.com/search/users?q=" + userName)

    fetch(`https://api.github.com/search/users?q=${userName}`, 
    { headers: 
        {'Accept' : 'application/vnd.github.v3+json'
    
    }})
    .then(response => response.json())
    .then(data => 
        
        renderUser(data)
        
        // console.log(data.items) 
    
    )

    searchBar.value = ""

    let lis = document.getElementById("repos-list").querySelectorAll("li")
    for(let i=0; li=lis[i]; i++){
        li.parentNode.removeChild(li);
    }


}

//renderUser

function renderUser(data){
    // console.log(userName)
    // console.log(data.items)
    
    const userList = document.getElementById("user-list") 
    
    data.items.forEach(element => {
        // console.log(element)
        if(element.login === userName){
            // console.log("GO")
            userLogin.innerHTML = "Login: " + `${element.login}`
            userImgLink.innerHTML = "ImgLink: " + `${element.avatar_url}`
            userLink.innerHTML = "URL: " + `${element.url}`
            userList.append(userLogin)
            userList.append(userImgLink)
            userList.append(userLink)
            }
            
        }
    )


}
        
//renderRepo
function renderRepo(){

    fetch(`https://api.github.com/users/${userName}/repos`, {                               
    headers: {
    'Accept' : 'application/vnd.github.v3+json'
            }
        })
        .then(response => response.json())
        .then(data => 
            
        // console.log(data)
            
        data.forEach(element => {
            // console.log(element.owner.login)
            if(element.owner.login === userName){
                // console.log(element.owner.login, "=we equal each other=", userName)

                repoLi = document.createElement('li')
        
                repoLi.innerHTML = "Repo Name: " + `${element.name}`

                repoList.append(repoLi)
                
            }

        })

    )
   
}
 