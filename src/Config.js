const BASE_URL = "https://api.spoonacular.com"
const SPLASH_URL = "https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText";
let id = 1;
const IMAGE_URL_RECIPE = " https://spoonacular.com/recipeImages/";
const IMAGE_URL_PRODUCT = "https://spoonacular.com/productImages/"

const RECIPE_SEARCH_URL = BASE_URL + `/recipes/complexSearch`;
const INGREDIENT_SEARCH = BASE_URL + `/recipes/findByIngredients`
const RECIPE_DETAILS_URL = BASE_URL + `/recipes`;
const SIMILAR_RECIPES_URL = BASE_URL + `/recipes`;
const RANDOM_RECIPES = BASE_URL + `/recipes/random`;
const RECIPES_AUTOCOMPLETE = BASE_URL + `/recipes/autocomplete`;
const RECIPE_TASTE = BASE_URL + `/recipes/${id}/tasteWidget.json`;
const RECIPE_NUTRITION = BASE_URL + `/recipes/${id}/nutritionWidget.json`;
const RECIPE_INSTRUCTION = BASE_URL + `/recipes/${id}/analyzedInstructions`;
const RECIPE_EQUIPMENTS = BASE_URL + `/recipes`;

export default {
	RECIPES_AUTOCOMPLETE,
  RECIPE_SEARCH_URL,
  INGREDIENT_SEARCH,
	RECIPE_DETAILS_URL,
	SIMILAR_RECIPES_URL,
	RANDOM_RECIPES,
	RECIPE_TASTE,
	RECIPE_NUTRITION,
	RECIPE_INSTRUCTION,
	RECIPE_EQUIPMENTS,
	SPLASH_URL,
	IMAGE_URL_RECIPE,
	IMAGE_URL_PRODUCT
};