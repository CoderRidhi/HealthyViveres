const appId= "fc3ea3a5";
const apiKey= "0abb51ae1f909bb10309ceefd44b73f4";
const baseUrl = `https://api.edamam.com/api/recipes/v2?type=public&app_id=fc3ea3a5&app_key=0abb51ae1f909bb10309ceefd44b73f4`;
const recipeContainer=document.querySelector("#recipe-container");
const txtSearch = document.querySelector("#txtSearch");
const btnFind=document.querySelector(".btn");
const loadingEle=document.querySelector("#loading");

btnFind.addEventListener("click",()=>loadRecipes(txtSearch.value));

txtSearch.addEventListener("keyup",(e) => {
    const inputVal = txtSearch.value;
    if(e.keycode == 13){
        loadRecipes(inputVal);
    }
});
const toggleLoad=(element, isShow)=>{
    element.classList.toggle("hide",isShow);

};
const setScrollPosition = () => {
    recipeContainer.scrollTo({top:0,behavior:"smooth"});
};

function loadRecipes(type="paneer") {
    toggleLoad(loadingEle, false);
    const url = baseUrl + `&q=${type}`;
    fetch(url)
        .then(res => res.json())
        .then((data) => {
            renderRecipies(data.hits);
            toggleLoad(loadingEle, true);})
        .catch((error) => toggleLoad(loadingEle, true))
        .finally(() => setScrollPosition());

}
loadRecipes();

const getRecipeStepsStr=(ingredientLines=[]) => {
    let str = "";
    for(var step of ingredientLines){
        str=str+`<li>${step}</li>`
    }
    return str;
}

const renderRecipies = (recipeList=[]) => {
    recipeContainer.innerHTML="";
    recipeList.forEach(recipeObj => {
        const { label:recipeTitle,
             ingredientLines ,
             image:recipeImage} = recipeObj.recipe;
             const recipeStepStr=getRecipeStepsStr(ingredientLines);
        
             const htmlStr=`<div class="recipe">
        <div class="recipe-title">${recipeTitle}</div>
        <div class="recipe-image">
            <img src="${recipeImage}" alt="Recipe">
        </div>
        <div class="recipe-text">
            <ul>
            ${recipeStepStr}
            </ul>
        </div>
    </div>`;
    recipeContainer.insertAdjacentHTML("beforeend",htmlStr)
});

};