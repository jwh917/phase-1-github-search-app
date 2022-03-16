window.addEventListener('DOMContentLoaded', (event) => {
    // console.log('DOM fully loaded');

    const formSearch = document.getElementById("github-form")

    // console.log(formSearch)

    const searchBar = document.querySelector("input")

    const userList = document.getElementById("user-list") 

    const repoList = document.getElementById("repos-list")   
    
    let userLogin = document.createElement('li')
    let userImgLink = document.createElement('li')
    let userLink = document.createElement('li')



    formSearch.addEventListener("submit", (event) => {
        event.preventDefault() 
        let searchBarValue = searchBar.value
        // console.log(searchBarValue)

        
        // after fetch is made make it a function have it called after the form is submitted.

        fetch('https://api.github.com/search/users?q=octocat', {
            headers: {
                'Accept' : 'application/vnd.github.v3+json'
            }})
        .then(response => response.json())
        .then(data => 
            
            data.items.forEach(element => {
                // console.log(element)
                if(element.login === searchBarValue){
                // console.log(element)
              
                userLogin.innerHTML = "Login: " + `${element.login}`
                userImgLink.innerHTML = "ImgLink: " + `${element.avatar_url}`
                userLink.innerHTML = "URL: " + `${element.url}`


                userList.append(userLogin)
                userList.append(userImgLink)
                userList.append(userLink)
                

                }
               


            })
            
        )


        fetch('https://api.github.com/users/octocat/repos', {
            headers: {
                'Accept' : 'application/vnd.github.v3+json'
            }})
        .then(response => response.json())
        .then(data => 
            
            // console.log(data)
            
            data.forEach(element => {
                console.log(element.owner.login)
                if(element.owner.login === searchBarValue){


                let repoLi = document.createElement('li')
                
                // console.log(element.name)


                repoLi.innerHTML = "Repo Name: " + `${element.name}`

                repoList.append(repoLi)
                
                
            }})

            
            ) 


        // console.log(searchBarValue)


    })



})




// fetch('https://api.github.com', {
//     headers: {
//         'Accept' : 'application/vnd.github.v3+json'
//     }})
// .then(response => response.json())
// .then(data => data) 
    
