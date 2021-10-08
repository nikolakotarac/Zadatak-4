const headerMode = document.querySelector(".header-mode");
const modeBtn = document.querySelector(".mode-btn");
const modeTxt = document.querySelector(".mode-txt");
const body = document.querySelector("body");

const searchInput = document.querySelector(".search");
const searchBtn = document.querySelector(".search-btn");
const errMsg = document.querySelector(".result-err");
let form = document.getElementById("form");
const searchForm = document.querySelectorAll(".search");

const avatar = document.querySelector(".avatar");
const userHead = document.querySelector(".name");
const username = document.querySelector(".username");
const join = document.querySelector(".join");
const about = document.querySelector(".about");

const repos = document.querySelector(".repos");
const followers = document.querySelector(".followers");
const following = document.querySelector(".following");
const area = document.querySelector(".location");
const twitter = document.querySelector(".twitter");
const website = document.querySelector(".website");
let company = document.querySelector(".company");

headerMode.addEventListener("click", function () {
  if (body.classList.contains("dark")) {
    modeBtn.src = "./assets/icon-moon.svg";
    modeTxt.textContent = "DARK";
    body.classList.remove("dark");
    body.style.backgroundColor = "#f2f2f2";
  } else {
    modeBtn.src = "./assets/icon-sun.svg";
    modeTxt.textContent = "LIGHT";
    body.classList.add("dark");
    body.style.backgroundColor = "#141D2F";
  }
});
function fetchAPI(user) {
  fetch(`https://api.github.com/users/` + user)
    .then((response) => {
      if (response.status === 404) {
        errMsg.style.display = "block";
        fetchAPI("octocat");
      } else {
        if(user !== "octocat") {
          errMsg.style.display = "none";
        }

        return response.json();
      }
    })
    .then((data) => {
      userHead.textContent = data.name; 
      username.textContent = `@${data.login}`;
      join.textContent = `Joined ${data.created_at.slice(0, 10)}`;
      about.textContent = data.bio ? data.bio : `This profile has no bio`;
      avatar.setAttribute("src", data.avatar_url);

      repos.textContent = data.public_repos;
      followers.textContent = data.followers;
      following.textContent = data.following;

      if (data.location) {
        area.textContent = data.location;
      } else {
        area.textContent = `Not Available`;
        area.style.opacity = "0.6";
      }
      if (data.twitter_user) {
        twitter.textContent = data.twitter_user;
        twitter.style.opacity = "1";
      } else {
        twitter.textContent = `Not Available`;
        twitter.style.opacity = "0.6";
      }
      website.textContent = data.html_url;
      website.href = data.html_url;
      if (website.textContent == `Not Available`) {
        website.style.opacity = "0.6";
      }
      if (data.company) {
        company.href = "https://github.com/${company}"
        company.textContent = data.company;
      } else {
        company.textContent = `Not Available`;
        company.style.opacity = "0.6";
      }
    });
}
fetchAPI("octocat");

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  if (searchInput.value === "") {
    if (errMsg.style.display = "block") errMsg.style.display = "none";

    return;
  } else {
    fetchAPI(searchInput.value);
  }
});
