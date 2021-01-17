import React, {Component} from 'react';
import {recipeSearchAPI} from '../ServiceClass.js'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import BookmarkEmptyIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkFilledIcon from '@material-ui/icons/Bookmark';

const style = theme => ({
	card : {
		height : "300px",
		width : "200px",
		position: "relative",
	},
	image : {
		width : "100%",
		height : "75%",
		objectFit : "cover",
		objectPosition : "center center",
	},
	title : {
		margin : "10px",
		lineHeight: "1.3rem !important",
		textOverflow: "ellipsis",
		overflow: "hidden",
		"-webkit-line-clamp": 2,
		"-webkit-box-orient": "vertical",
		maxHeight: "3rem",
		display: "-webkit-box",
		cursor : "pointer",
	},
	bookmarkIcon : {
		position: "absolute",
		top: "10px",
		right : "10px",
		fontSize : "40px",
		color : "white",
		cursor : "pointer",
		backgroundColor: "rgba(0,0,0,0.5)",
	}
})

class RecipeCard extends Component {
	constructor(props){
		super(props);
		// console.log("RecipeCard: ",props)
		this.state = {
			results : [],
			isLoaded : false,
			isBookmarked : false
		}
	}

	componentDidMount(){

	}

	bookmarkClickHandler = () => {
		this.setState({
			isBookmarked : !(this.state.isBookmarked)
		})
	}

  render(){
		const { classes } = this.props;
		return(
	    <Card className = {classes.card}>
				<img className={classes.image} src = {this.props.image}/>
				<Tooltip title = {this.props.title}>
					<Typography variant = "h6" className = {classes.title} 
					            onClick = {() => this.props.redirectToRecipeDetails(this.props.id)}>
						{this.props.title}
					</Typography>
				</Tooltip>
				<BookmarkEmptyIcon className = {classes.bookmarkIcon}
				                   onClick = {this.bookmarkClickHandler} 
				                   style = {{display : this.state.isBookmarked ? "none" : "block"}}/>
				<BookmarkFilledIcon className = {classes.bookmarkIcon} 
														onClick = {this.bookmarkClickHandler} 
				                    style = {{display : this.state.isBookmarked ? "block" : "none"}}/>
			</Card>	
		)
	}
}

export default withStyles(style, {withTheme: true})(RecipeCard);