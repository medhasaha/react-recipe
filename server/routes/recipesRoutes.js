const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

// const SPOONACULAR_API_KEY = "8d6fde0e4d744979a6e7407da45536c0";
const SPOONACULAR_API_KEY = "88d6bd105d8a4761a1bc59956a91bbad";
const BASE_URL = "https://api.spoonacular.com/recipes"
const BASE_URL_FOOD = "https://api.spoonacular.com/food"


router.get('/recipeAutocomplete',(req,res) => {
	let query = req.query.query
	let queryURL = BASE_URL + `/autocomplete?query=${query}&number=10&apiKey=${SPOONACULAR_API_KEY}`;
	return fetch(queryURL)
	.then(response => {
		return response.json();
	})
	.then(data => {
		res.status(200).json({results : data})
	})
	.catch(error => {
		console.log("recipeAutocomplete error",error)
		res.status(500).json({err : "Server Error"})
	})
})

router.get('/getRecipes', (req,res) => {
	let query = req.query.query || ""
	let cuisine = req.query.cuisine || ""
	let diet = req.query.diet || ""
	let intolerances = req.query.intolerances || ""
	let mealType = req.query.mealType || ""
	let sortParameter = req.query.sortParameter || ""
	let number = req.query.number || 20
	let offset = req.query.offset || 0

	let queryURL = BASE_URL + `/complexSearch?query=${query}&cuisine=${cuisine}&diet=${diet}&intolerances=${intolerances}&type=${mealType}&sort=${sortParameter}&number=${number}&offset=${offset}&apiKey=${SPOONACULAR_API_KEY}`;
	return fetch(queryURL)
	.then(response => {
		return response.json();
	})
	.then(data => {
		res.status(200).json({results : data})
	})
	.catch(error => {
		console.log("getRecipes error",error)
		res.status(500).json({err : "Server Error"})
	})
})

router.get('/getRecipeVideos', (req,res) => {
	let query = req.query.query || ""
	let cuisine = req.query.cuisine || ""
	let diet = req.query.diet || ""
	let mealType = req.query.mealType || ""
	let number = req.query.number || 20
	let offset = req.query.offset || 0

	let queryURL = BASE_URL_FOOD + `/videos/search?query=${query}&cuisine=${cuisine}&diet=${diet}&type=${mealType}&number=${number}&offset=${offset}&apiKey=${SPOONACULAR_API_KEY}`;
	return fetch(queryURL)
	.then(response => {
		return response.json();
	})
	.then(data => {
		res.status(200).json({results : data})
	})
	.catch(error => {
		console.log("getRecipeVideos error",error)
		res.status(500).json({err : "Server Error"})
	})
})

router.get('/getMenuItems', (req,res) => {
	let query = req.query.query || ""
	let number = req.query.number || 20
	let offset = req.query.offset || 0

	let queryURL = BASE_URL_FOOD + `/menuItems/search?query=${query}&number=${number}&offset=${offset}&apiKey=${SPOONACULAR_API_KEY}`;
	return fetch(queryURL)
	.then(response => {
		return response.json();
	})
	.then(data => {
		res.status(200).json({results : data})
	})
	.catch(error => {
		console.log("getRecipes error",error)
		res.status(500).json({err : "Server Error"})
	})
})

router.get('/getProducts', (req,res) => {
	let query = req.query.query || ""
	let number = req.query.number || 20
	let offset = req.query.offset || 0

	let queryURL = BASE_URL_FOOD + `/products/search?query=${query}&number=${number}&offset=${offset}&apiKey=${SPOONACULAR_API_KEY}`;
	return fetch(queryURL)
	.then(response => {
		return response.json();
	})
	.then(data => {
		res.status(200).json({results : data})
	})
	.catch(error => {
		console.log("getRecipes error",error)
		res.status(500).json({err : "Server Error"})
	})
})

router.get('/getRandomRecipes', (req,res) => {
	let queryURL = BASE_URL + `/random?number=6&apiKey=${SPOONACULAR_API_KEY}`;
	return fetch(queryURL)
	.then(response => {
		return response.json();
	})
	.then(data => {
		res.status(200).json({results : data})
	})
	.catch(error => {
		console.log("getRandomRecipes error",error)
		res.status(500).json({err : "Server Error"})
	})
})

router.get('/getRecipesByIngredient', (req,res) => {
	let ingredient = req.query.ingredient || ""
	let number = req.query.number || 20
	let offset = req.query.offset || 0

	let queryURL = BASE_URL + `/findByIngredients?ingredients=${ingredient}&number=${number}&offset=${offset}&apiKey=${SPOONACULAR_API_KEY}`;
	return fetch(queryURL)
	.then(response => {
		return response.json();
	})
	.then(data => {
		res.status(200).json({results : data})
	})
	.catch(error => {
		console.log("getRecipes error",error)
		res.status(500).json({err : "Server Error"})
	})
})

router.get('/getRecipeDetails', (req,res) => {
	let id = req.query.id;
	let queryURL = BASE_URL + `/${id}/information?includeNutrition=true&apiKey=${SPOONACULAR_API_KEY}`
	return fetch(queryURL)
	.then(response => {
		return response.json();
	})
	.then(data => {
		res.status(200).json({results : data})
	})
	.catch(error => {
		console.log("getRecipeDetails error",error)
		res.status(500).json({err : "Server Error"})	
	})
})

router.get('/getSimilarRecipes', (req,res) => {
	let id = req.query.id;
	let queryURL = BASE_URL + `/${id}/similar?apiKey=${SPOONACULAR_API_KEY}`
		return fetch(queryURL)
		.then(response => {
			return response.json();
		})
		.then(data => {
			res.status(200).json({results : data})
		})
		.catch(error => {
			console.log("getSimilarRecipes error",error)
			res.status(500).json({err : "Server Error"})
		})
})

router.get('/getRecipeEquipments', (req,res) => {
	let id = req.query.id;
	let queryURL = BASE_URL + `/${id}/equipmentWidget.json?apiKey=${SPOONACULAR_API_KEY}`
	return fetch(queryURL)
	.then(response => {
		return response.json();
	})
	.then(data => {
		res.status(200).json({results : data})
	})
	.catch(error => {
		console.log("getRecipeEsquipments error",error)
		res.status(500).json({err : "Server Error"})	})
})

module.exports = router;
