function goTo(URL) {
  window.location.href = URL;

}


function createButton(label, url) {
  const newButton = document.createElement("button");

  
  newButton.addEventListener("click", () => {
    window.location.href = url;
  })

  newButton.textContent = label;
  document.body.append(newButton);

}

createButton("Chess", "https://www.youtube.com/watch?v=ylpAHvPlafc&list=PLRYw2W3Uwbgs")



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

    console.log(categoryName);
    console.log(url);

    createButton(categoryName, url);

    console.log("before remove;", newForm.isConnected);

    newForm.remove();

    console.log("after remove;", newForm.isConnected);
  })

})


const categories = [];

//Saving categories to local storage
createCategory.addEventListener("click", () => {
  categories.push({name: categoryName, url: url});


  localStorage.setItem("categories", JSON.stringify(categories));


   
})


//loading categories from local storage
const savedCategories = JSON.parse(localStorage.getItem("categories")) || [];