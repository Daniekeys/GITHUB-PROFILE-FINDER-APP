const APIURL = "https://api.github.com/users/";
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

async function getUser (username) {
const resp = await fetch(APIURL + username);
const respData = await resp.json();
createUserCard(respData);

getRepos(username);


}
// ASYN FUNCTIONS

async function getRepos (username) {
const resp = await fetch(APIURL + username + '/repos');
const respData = await resp.json();

addReposToCard(respData);

// console.log(respData);

}


getUser("daniekeys");

function createUserCard(user) {
// const card = document.createElement('div');
// card.classList.add('card');
const cardHTML = `
<div class="card">
<div class="img-container" > 
<img src="${user.avatar_url}" alt="${user.name} " class="avatar" />
</div>
<div class="user-info">
<h2> ${user.name}</h2>
<p>${user.bio} </p>
<ul class="info">
<li>${user.followers} <strong>followers</strong>  </li> 
<li>${user.following} <strong>following</strong></li> 
<li>${user.public_repos} <strong>repos</strong> </li>
</ul> 

<div  id="repos"> 

</div>
</div>
</div>
`;

main.innerHTML = cardHTML;
}


// ADD REPOS TO CARD 
function addReposToCard(repos_Info) {

    const reposEl = document.getElementById('repos');
    repos_Info.sort((a,b) => b.stargazers_count - a.stargazers_count).slice(0, 10).forEach( (repo) => {
        const repoEl = document.createElement('a');
        repoEl.classList.add('repo');
        repoEl.href = repo.html_url;
        repoEl.target = "_blank";
        repoEl.innerText = repo.name;
        reposEl.appendChild(repoEl);
    });


}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const user = search.value;

    if (user) {
        getUser(user);
        search.value = "";
    }
});