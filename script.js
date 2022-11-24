const cardCount = 10;
const container = document.querySelector(".container");

fetch(
  `https://api.unsplash.com/photos/random?client_id=W4Ve29x57Bt3IJ6C7M8k1ywiPEueoYlfZVjQnEHeAb4&count=${cardCount}&orientation=landscape&query=dark`
)
  .then((res) => res.json())
  .then((res) => {
    res.forEach((element) => {
      const card = document.createElement("div");
      card.className = "card";
      card.style.background = `url("${element.urls.regular}") no-repeat center center/cover`;
      card.innerHTML = `
        <div class="createdBy">
        <img class="profileImg" src="${element.user.profile_image.small}">
        <h3>${element.user.first_name + " " + element.user.last_name}</h3> 
        <span class="badge"><i class="fa-solid fa-heart"></i> ${
          element.likes
        }</span>
        </div>`;
      container.appendChild(card);
    });
  })
  .then(() => {
    document.querySelectorAll(".card").forEach((card) => {
      console.log(card.getBoundingClientRect().bottom, window.innerHeight);
      if (card.getBoundingClientRect().bottom > window.innerHeight) {
        card.style.transition = "transform 0.3s ease-in";
      } else {
        card.classList.add("show");
      }
    });
    const cards = document.querySelectorAll(".card");
    document.addEventListener("scroll", () => {
      cards.forEach((card) => {
        console.log(card.getBoundingClientRect().top);
        if (card.getBoundingClientRect().top < (window.innerHeight / 5) * 4) {
          card.classList.add("show");
        }
        else {
            card.classList.remove("show");
        }
      });
    });
  });
