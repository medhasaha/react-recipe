const express = require("express");
const fetch = require("node-fetch");
const router = express.Router();

const SPOONACULAR_API_KEY = "88d6bd105d8a4761a1bc59956a91bbad";
const BASE_URL = "https://api.spoonacular.com/recipes"

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
	let query = req.query.query
	let queryURL = BASE_URL + `/complexSearch?query=${query}&number=20&apiKey=${SPOONACULAR_API_KEY}`;
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
