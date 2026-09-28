/* =========================================================
   DOM REFERENCES
   ========================================================= */
const enterButton = document.querySelector("#enterButton");
const welcomeScreen = document.querySelector("#welcomeScreen");
const nameInput = document.querySelector("#nameInput");
const welcomeMessage = document.querySelector("#welcomeMessage");
const nameQuestion = document.querySelector("#nameQuestion");
const dashboard = document.querySelector("#dashboard");
const speakButton = document.querySelector("#speakButton");
const createCategoryBtn = document.querySelector("#createCategory");

// This holds whatever text was last spoken/shown, so the speak
// button can repeat it later.
let welcomeText = "";


/* =========================================================
   CATEGORIES  (create / display / delete)
   ========================================================= */

// Load saved categories once, at the top — single source of truth.
let categories = JSON.parse(localStorage.getItem("categories")) || [];

function saveCategories() {
  localStorage.setItem("categories", JSON.stringify(categories));
}

function goTo(url) {
  window.location.href = url;
}

// Creates one category "card" (button + delete button) and appends it.
function createCategoryButton(label, url) {
  const categoryContainer = document.createElement("div");

  const newButton = document.createElement("button");
  newButton.textContent = label;
  newButton.addEventListener("click", () => goTo(url));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => {
    categoryContainer.remove();

    categories = categories.filter((category) => category.name !== label);
    saveCategories();
  });

  categoryContainer.append(newButton, deleteButton);
  document.body.append(categoryContainer);
}

// Render every saved category on page load.
for (const category of categories) {
  createCategoryButton(category.name, category.url);
}

// "+ Create Category" button -> builds a small inline form.
createCategoryBtn.addEventListener("click", () => {
  const newForm = document.createElement("form");

  const nameLabel = document.createElement("label");
  nameLabel.textContent = "Category name:";
  const nameField = document.createElement("input");
  nameField.placeholder = "e.g chess";

  const urlLabel = document.createElement("label");
  urlLabel.textContent = "Youtube Url:";
  const urlField = document.createElement("input");
  urlField.placeholder = "e.g Youtube URL";

  const submitBtn = document.createElement("button");
  submitBtn.type = "button"; // correct — stops it submitting/reloading the page
  submitBtn.textContent = "Create";

  submitBtn.addEventListener("click", () => {
    const categoryName = nameField.value.trim();
    const url = urlField.value.trim();

    

    categories.push({ name: categoryName, url });
    saveCategories();
    createCategoryButton(categoryName, url);
    newForm.remove();
  });

  newForm.append(nameLabel, nameField, urlLabel, urlField, submitBtn);
  document.body.append(newForm);
});


/* =========================================================
   WELCOME SCREEN
   ========================================================= */

function showWelcomeMessage(text) {
  welcomeText = text;
  welcomeMessage.textContent = text;
  welcomeMessage.classList.add("welcomeAnimation");

  nameQuestion.style.display = "none";
  nameInput.style.display = "none";
  enterButton.style.display = "none";

  const speech = new SpeechSynthesisUtterance(text);
  speech.lang = "en-US";
  speechSynthesis.speak(speech);
}

// Dashboard is hidden until the welcome animation finishes.
dashboard.style.display = "none";
welcomeMessage.addEventListener("animationend", () => {
  dashboard.style.display = "block";
  welcomeScreen.style.display = "none";
});

// First-time visitor: they type a name and press Enter.
enterButton.addEventListener("click", () => {
  const typedName = nameInput.value;
  localStorage.setItem("userName", typedName);
  showWelcomeMessage(`welcome Mister, ${typedName}!`);
});

// Returning visitor: greet them using the name already saved.
const savedUserName = localStorage.getItem("userName");
if (savedUserName) {
  showWelcomeMessage(`Welcome back Mister, ${savedUserName}!`);
}

// Speak button repeats whatever the last welcome text was.
speakButton.addEventListener("click", () => {
  const speech = new SpeechSynthesisUtterance(welcomeText);
  speech.lang = "en-US";
  speechSynthesis.speak(speech);
});





//audio buttons 
const clickSound = new Audio("sounds/universfield-ui-button-click-147358.mp3");

document.addEventListener("click", (event) => {
  if(event.target.tagName === "BUTTON") {
    clickSound.play();
  }
});
