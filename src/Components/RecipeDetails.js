import React, {Component} from 'react';
import {recipeDetailsAPI, similarRecipesAPI, recipeEquipmentsAPI} from '../ServiceClass.js';
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
	recipeImage : {
		width : "300px",
		height : "300px",
		objectFit : "cover",
		objectPosition : "center center",
		borderRadius : "50%"
	},
	gridCenter : {
		alignItems : "center",
		justifyContent : "center",
		display : "flex"
	},
})

class RecipeDetails extends Component {
	constructor(props){
		super(props);
		console.log("RecipeDetails: ",props)

		this.state = {
			details : null,
			similarRecipes : [],
			equipments : [],
			isLoaded : false
		}
	}

	componentDidMount(){
		this.getRecipeDetails(this.props.match.params.id)
	}

	componentDidUpdate(prevProps, prevState) {
		if ( prevProps.match.params.id && this.props.match.params.id && prevProps.match.params.id !== this.props.match.params.id){
      if (this.props.location.state && this.props.location.state.data) {
        this.setState({ 
					...this.props.location.state.data 
				}, () => {
          this.setState({
            isLoaded: true
          });
        });
      } else {
        this.getRecipeDetails(this.props.match.params.id);
      }
    }
	}

	getRecipeDetails = (id) => {
		Promise.all([recipeDetailsAPI(id), similarRecipesAPI(id), recipeEquipmentsAPI(id)])
		.then(res => {
			console.log(res)
			this.setState({
				details : res[0],
				similarRecipes : res[1].slice(0,5),
				equipments : res[2],
				isLoaded : true
			}
			, () => {
				this.props.history.replace(this.props.history.location.pathname,
					{ data: 
						{ 
						  details: this.state.details,
							similarRecipes : this.state.similarRecipes,
			        equipments : this.state.equipments,
						}
					});
			})
		})
	}

	redirectToRecipeDetails = (id) => {
		this.props.history.push({
			pathname: `${this.props.baseURL}/details/${id}`,
		});
	}

	detailsJSX = () => {
		const { classes } = this.props;
		return (
			<Grid container>
				<Grid item xs = {4} className = {classes.gridCenter}>
					<img src = {this.state.details.image} className = {classes.recipeImage}/>
				</Grid>
				<Grid item xs = {8} className = {classes.gridCenter}>
					<Typography variant = "h3">{this.state.details.title}</Typography>
				</Grid>
			</Grid>
		)
	}

  render(){
		return(
		this.state.isLoaded && 
		  <Grid container spacing = {2}>
				<Grid item xs = {10}>
				  {this.detailsJSX()}
				</Grid>
				<Grid item xs = {2}>
					<Grid container spacing = {2}>
						{this.state.similarRecipes.length > 0 && 
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