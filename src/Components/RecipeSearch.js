import React, {Component} from 'react';
import {recipeSearchAPI} from '../ServiceClass.js'
import RecipeCard from './RecipeCard.js'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

const sample = {
	"results": [
	{
	"id": 1161745,
	"title": "Cake Balls",
	"image": "https://spoonacular.com/recipeImages/1161745-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 636754,
	"title": "Cake De Naranja",
	"image": "https://spoonacular.com/recipeImages/636754-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 1499853,
	"title": "Cake Mix Donuts",
	"image": "https://spoonacular.com/recipeImages/1499853-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 636756,
	"title": "Cake Batter Chocolates",
	"image": "https://spoonacular.com/recipeImages/636756-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 636768,
	"title": "Cake with wine and olive oil",
	"image": "https://spoonacular.com/recipeImages/636768-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 1025438,
	"title": "Cake Mix Cookie Bars Brownie",
	"image": "https://spoonacular.com/recipeImages/1025438-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 636766,
	"title": "Cake with lemon, rosewater and pistachios",
	"image": "https://spoonacular.com/recipeImages/636766-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 641745,
	"title": "Dump Cake",
	"image": "https://spoonacular.com/recipeImages/641745-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 656444,
	"title": "Plum Cake",
	"image": "https://spoonacular.com/recipeImages/656444-312x231.jpg",
	"imageType": "jpg"
	},
	{
	"id": 654018,
	"title": "Oreo Cake",
	"image": "https://spoonacular.com/recipeImages/654018-312x231.jpg",
	"imageType": "jpg"
	}
	],
	"offset": 0,
	"number": 10,
	"totalResults": 453
	}
const style = theme => ({

})

class RecipeSearch extends Component {
	constructor(props){
		super(props);
		console.log("RecipeSearch: ",props)
		this.state = {
			results : [],
			isLoaded : false
		}
	}

	componentDidMount(){
		if (this.props && this.props.location && this.props.location.state && this.props.location.state.data) {
      this.setState({
        results: this.props.location.state.data.results && this.props.location.state.data.results,
        isLoaded: true
      });
    } else this.recipeSearchMethod(this.props.match.params.query);
		// this.setState({
		// 	results : sample.results,
		// 	isLoaded : true
		// })
	}

	componentDidUpdate() {

	}

	recipeSearchMethod = (value) => {
		console.log(value)
		recipeSearchAPI(value)
		.then(res => {
			console.log(res)
			this.setState({
				results : res.results,
				isLoaded : true
			}
			, () => {
				this.props.history.replace(this.props.history.location.pathname,{ data: { results: res.results}});
			}
			)
		}).catch(err => console.log(err))
	}

	redirectToRecipeDetails = (id) => {
		this.props.history.push({
			pathname: `${this.props.baseURL}/details/${id}`,
		});
	}

  render(){
		const { classes } = this.props;
		return(
			this.state.isLoaded && this.state.results.length > 0 &&
			  <Grid container className = {classes.root} spacing = {2}>
					{this.state.results.map(item => (
						<Grid item xs = {2}>
							<RecipeCard id = {item.id} 
													image = {item.image}
													title = {item.title} 
							            redirectToRecipeDetails = {this.redirectToRecipeDetails}/>
						</Grid>
					))}
			  </Grid>
		)
	}
}

export default withStyles(style, {withTheme: true})(RecipeSearch);