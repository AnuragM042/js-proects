const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const recipecontainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn")

const fetchRecipes = async (query) => {
    recipecontainer.innerHTML = "<h2>Presenting You your Cheat meal..</ h2>"
    try {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response = await  data.json();

    // console.log(response);  to check is Api is working
recipecontainer.innerHTML = ""; 
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> DISH </p>
            <p>Belongs to <span>${meal.strCategory}</span> Category </p>

        `
        const button = document.createElement('button');
        button.textContent ="View Recipe";
        recipeDiv.appendChild(button);

        // Adding EventListner for pop up
        button.addEventListener('click',()=>{
            openRecipePopup(meal);

        });

        recipecontainer.appendChild(recipeDiv);
    });
} catch (error) {
    recipecontainer.innerHTML = "<h2>Error in Fetching Recipies..  Try Cake ,Cheese..etc</ h2>"
}
    
}

// Function to fetch ingredients and measurements 
const fecthIngredients = (meal) => {
    let ingredientsList = "";
    for(let i =1; i<20;i++){
        const ingredient =  meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`

        }
        else {
            break;
        }
    }
    return ingredientsList;
}

 const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients</h3>
        <ul class="ingredientsList">${fecthIngredients(meal)}</ul>
         <div class="recipeInstructions">
             <h3>Instructions:</h3>
             <p>${meal.strInstructions}</p>
         </div> 
            `
    recipeDetailsContent.parentElement.style.display = "block";
 }

 recipeCloseBtn.addEventListener('click',()=>{
        recipeDetailsContent.parentElement.style.display = "none";

 });


searchBtn.addEventListener('click', (e)=>{
    e.preventDefault();          // prevent reloading when btn is pressed 
    const searchInput = searchBox.value.trim();
    if(!searchInput){
        recipecontainer.innerHTML =`<h2>Some Random Meals <h2>`
    }
    fetchRecipes(searchInput);
   // console.log("buton  click");
});