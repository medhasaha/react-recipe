import React, {Component} from 'react';
import {recipeDetailsAPI, similarRecipesAPI} from '../ServiceClass.js';
import CONFIG from '../Config.js'
import RecipeCard from './RecipeCard.js'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import BookmarkEmptyIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkFilledIcon from '@material-ui/icons/Bookmark';

const style = theme => ({

})

class RecipeDetails extends Component {
	constructor(props){
		super(props);
		console.log("RecipeDetails: ",props)

		this.state = {
			details : null,
			similarRecipes : [],
			isLoaded : false
		}
	}

	componentDidMount(){
		this.getRecipeDetails(this.props.match.params.id)
	}

	getRecipeDetails = (id) => {
		Promise.all([recipeDetailsAPI(id), similarRecipesAPI(id)])
		// recipeDetailsAPI()
		.then(res => {
			console.log(res)
			this.setState({
				details : res[0],
				similarRecipes : res[1].slice(0,5),
				isLoaded : true
			})
		})
	}

	redirectToRecipeDetails = (id) => {
		this.props.history.push({
			pathname: `${this.props.baseURL}/details/${id}`,
		});
	}

  render(){
		const { classes } = this.props;
		return(
		 <Grid container>
			<Grid item xs = {9}>
			</Grid>
			<Grid item xs = {3}>
				<Grid container>
					{this.state.isLoaded && this.state.similarRecipes.length > 0 && 
						this.state.similarRecipes.map(item => (
						<Grid item xs = {12}>
							<RecipeCard id = {item.id} 
													image = {CONFIG.IMAGE_URL_RECIPE + item.id + "-312x231." + item.imageType}
													title = {item.title}
							            redirectToRecipeDetails = {this.redirectToRecipeDetails}/>
						</Grid>
					))}
				</Grid>
			</Grid>
		 </Grid>
		)
	}
}

export default withStyles(style, {withTheme: true})(RecipeDetails);