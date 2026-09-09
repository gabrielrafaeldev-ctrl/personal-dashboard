function goTo(URL) {
  window.location.href = URL;

}

//function to create a buttton with a label and a url   and delete button to delete the button and remove it from local storage
function createButton(label, url) {
  const newButton = document.createElement("button");
  const categoryContainer = document.createElement("div")

  
  newButton.addEventListener("click", () => {
    window.location.href = url;
  })
  

  newButton.textContent = label;
  categoryContainer.append(newButton);

  const deleteButton= document.createElement("button");
  deleteButton.textContent = "Delete";

  categoryContainer.append(deleteButton);

  document.body.append(categoryContainer);

  deleteButton.addEventListener("click", () => {
    categoryContainer.remove();
    //remove from local storage

    categories = categories.filter(category => category.name !== label);
    localStorage.setItem("categories", JSON.stringify(categories));
  })




}

//createButton("Chess", "https://www.youtube.com/watch?v=ylpAHvPlafc&list=PLRYw2W3Uwbgs")



const createCategory = document.querySelector("#createCategory");


createCategory.addEventListener("click", () => {

  console.log("Create button clicked")

  const newForm = document.createElement("form");
  document.body.append(newForm);

  const input = document.createElement("input");
  

  const label = document.createElement("label");
  label.textContent = "Category name:"
  newForm.append(label);
  newForm.append(input);

  input.placeholder = "e.g chess";

  const urlInput = document.createElement("input");
  const youtubeLabel = document.createElement("label");

  youtubeLabel.textContent = "Youtube Url:"

  newForm.append(youtubeLabel);
  newForm.append(urlInput);

  urlInput.placeholder = "e.g Youtube URL";


  const createButtonElement = document.createElement("button");

  createButtonElement.type = "button";

  createButtonElement.textContent = "Create";

  newForm.append(createButtonElement);

  createButtonElement.addEventListener("click", () => {
    const categoryName = input.value;
    const url = urlInput.value;

    categories.push({name: categoryName, url: url});

    localStorage.setItem("categories", JSON.stringify(categories));

    createButton(categoryName, url);

    newForm.remove();

  })

})







//loading categories from local storage
const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];
let categories = savedCategories;

//displaying buttons when page is loaded
for(const category of savedCategories){
  createButton(category.name, category.url);

}



const enterButton = document.querySelector("#enterButton");
const welcomeScreen = document.querySelector("#welcomeScreen");
const nameInput = document.querySelector("#nameInput");

//welcome screen adding functionality to the welcome screen  html elements
enterButton.addEventListener("click", () => {
  dashboard.style.display = "block";

  welcomeScreen.style.display = "none";

  const  WelcomeScreenInput = nameInput.value;

  localStorage.setItem("userName", WelcomeScreenInput);
})



const dashboard = document.querySelector("#dashboard");

dashboard.style.display = "none";


