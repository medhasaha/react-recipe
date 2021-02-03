import React, {Component} from 'react';
import {recipeSearchAPI} from '../ServiceClass.js'
import RecipeCard from './RecipeCard.js';
import CONFIG from '../Config.js';
import NavBar from './NavBar.js'
import DrawerJSX from './DrawerJSX'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';

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
	root : {
		backgroundColor: "rgba(255, 255, 255, 0.65)",
		// backgroundColor: "#0d1010",
		display : "flex"
	},
	drawer : {
		width : "220px",
	},
	drawerPaper : {
		width : "220px",
		border : "none",
		marginTop : "104px",
		paddingLeft : "20px"
	}
})

class RecipeSearch extends Component {
	constructor(props){
		super(props);
		// console.log("RecipeSearch: ",props)
		this.state = {
			results : [],
			isLoaded : false,
			selectedCuisine : "",
			selectedDiet : "",
			selectedTolerance : "",
			selectedMealType : ""
		}
	}

	componentDidMount(){
		if (this.props && this.props.location && this.props.location.state && this.props.location.state.data) {
      this.setState({
        results: this.props.location.state.data.results && this.props.location.state.data.results,
        isLoaded: true
      });
    } else this.searchRecipes();
		// this.setState({
		// 	results : sample.results,
		// 	isLoaded : true
		// })
	}

	componentDidUpdate(prevProps, prevState) {
		if ( prevProps.match.params.query && this.props.match.params.query && prevProps.match.params.query !== this.props.match.params.query){
      if (this.props.location.state && this.props.location.state.data) {
        this.setState({ 
					...this.props.location.state.data 
				}, () => {
          this.setState({
            isLoaded: true
          });
        });
      } else {
        this.searchRecipes();
      }
    }
	}

	searchRecipes = () => {
		recipeSearchAPI(this.props.match.params.query,20,0)
		.then(res => {
			console.log(res)
			this.setState({
				results : res.results,
				isLoaded : true
			}
			, () => {
				this.props.history.replace(this.props.history.location.pathname,{ data: { results: res.results}});
			})
		}).catch(err => console.log(err))
	}

	redirectToRecipeDetails = (id) => {
		this.props.history.push({
			pathname: `${this.props.baseURL}/details/${id}`,
		});
	}

	cuisineChangeHandler = (e, newValue) => {
		this.setState({
			selectedCuisine : newValue,
		})
	}

  render(){
		const { classes } = this.props;
		return(
			<React.Fragment>
			  <Grid container className = {classes.root}>

					<Grid item xs = {12}>
						<NavBar/>
					</Grid>

				  <Grid item xs = {12} style = {{margin : "104px 40px 0px 260px"}}>
					{this.state.isLoaded && this.state.results.length > 0 &&
						<Grid container className = {classes.root} spacing = {4}>
							{this.state.results.map(item => (
								<Grid item xs = {3}>
									<RecipeCard id = {item.id} 
															image = {item.image}
															// image = {CONFIG.IMAGE_URL_RECIPE + item.id + "-480x360.jpg"}
															title = {item.title} 
															// servings = {item.servings}
															// time = {item.readyInMinutes}
															boxShadow = {false}
															redirectToRecipeDetails = {this.redirectToRecipeDetails}/>
								</Grid>
							))}
						</Grid>}
					</Grid>

					<Drawer className={classes.drawer} variant="persistent" open = {true} classes={{ paper: classes.drawerPaper,}}>
						<div className={classes.drawerContainer}>
							<DrawerJSX cuisineChangeHandler = {this.cuisineChangeHandler}/>
						</div>
					</Drawer>

				</Grid>
			</React.Fragment>
		)
	}
}

export default withStyles(style, {withTheme: true})(RecipeSearch);