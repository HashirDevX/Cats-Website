let Arrdata = [];
let cardContainer = document.querySelector(".card-container");
let loadMore = document.querySelector("#load-more");
let limit = 10;

async function GetData() {
  const url = `https://api.freeapi.app/api/v1/public/cats?limit=${limit}`;
  const options = { method: "GET", headers: { accept: "application/json" } };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data.data.data);
    return data;
  } catch (error) {
    console.error(error);
  }
}

loadMore.onclick = async () => {
  limit += 10;
  console.log("New limit:", limit);
  await setCardData(); // <-- Only this
};

async function setCardData() {
  cardContainer.innerHTML = "";
  Arrdata = await GetData();
  Arrdata.data.data.forEach((d) => {
    let card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${d.image}" alt="">
      <h1>${d.name}</h1>
      <p>${d.description}</p>
      <a href="detail-page.html?id=${d.id}">Learn More</a>
    `;

    cardContainer.appendChild(card);
  });
}

setCardData();
