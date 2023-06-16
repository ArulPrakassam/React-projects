const projectContainer = document.querySelector(".projects-container");

const fetchData = async () => {
  const response = await fetch("data.json");
  const data = await response.json();
  let displayData = data.map((item) => {
    const { title, link, img } = item;
    return `<a href="${link}" target="_blank">
        <div class="project-single-item">
            <img
              src="${img}"
              alt="${title}"
              class="img"
            />
            <p class="title">${title}</p>
          </div>
        </a>
        `;
  });
  displayData = displayData.join(" ");

  projectContainer.innerHTML = displayData;
};

const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

fetchData();
