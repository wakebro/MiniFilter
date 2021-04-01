// Fetch the items from the JSON file
function loadItems() {
  return fetch("./data/data.json") //
    .then((response) => response.json())
    .then((json) => json.items);
}

// Update the list with the given items
function displayitem(items) {
  const container = document.querySelector(".items");
  container.innerHTML = items.map((item) => createHTMLString(item)).join("");
}

// Create HTML list item from the given data item
function createHTMLString(item) {
  return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>`;
}

//
function setEventListeners(items) {
  const logo = document.querySelector(".logo");
  const buttons = document.querySelector(".buttons");
  logo.addEventListener("click", () => {
    displayitem(items);
  });
  buttons.addEventListener("click", (event) => {
    onButtonClick(event, items);
  });
}

function onButtonClick(event, items) {
  const dataset = event.target.dataset;
  const key = dataset.key;
  const value = dataset.value;
  if (key == null || value == null) {
    return;
  }
  const filtered = items.filter((item) => item[key] === value);
  //   console.log(key);
  //   console.log(value);
  //   console.log(items);
  //   console.log(filtered);
  displayitem(filtered);
}

// main
loadItems() //
  .then((items) => {
    displayitem(items);
    setEventListeners(items);
  })
  .catch(console.log);
