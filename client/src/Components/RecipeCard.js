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
		height : "215px",
		width : "100%",
		position: "relative",
		borderRadius : "4px",
		backgroundColor: "transparent",
		boxShadow : "none"
	},
	image : {
		width : "100%",
		height : "180px",
		objectFit : "cover",
		objectPosition : "center center",
		borderBottom : "6px solid #932432"
	},
	titleDiv : {
		position : "absolute", 
		left : 0, 
		bottom : 0, 
		maxWidth : "160px",
		padding : "0px 10px 0px 10px", 
		backgroundColor : "#932432",
		borderRadius : "0px"
	},
	title : {
		margin : "5px 0px 5px 0px",
		// marginBottom : "10px",
		lineHeight: "1.3rem !important",
		textOverflow: "ellipsis",
		overflow: "hidden",
		"-webkit-line-clamp": 1,
		"-webkit-box-orient": "vertical",
		maxHeight: "1.5rem",
		display: "-webkit-box",
		cursor : "pointer",
		fontFamily : "Fira Sans",
		textTransform : "capitalize",
		// color : "#932432",
		color : "#fff",
		fontSize : "15px"
	},
	secondaryText : {
		fontFamily : "Fira Sans",
		cursor : "pointer",
		display : "inline",
		fontSize : "17px"
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
			<Card className = {classes.card} 
						style = {{boxShadow : this.props.boxShadow 
																	? "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)" 
																	: "none",
											position : "relative"}}>
				<img className={classes.image} src = {this.props.image}/>
				<Grid container style = {{margin : "10px", width : "auto"}}>
					<div className = {classes.titleDiv}>
					  <Typography variant = "h6" className = {classes.title} 
											onClick = {() => this.props.redirectToRecipeDetails(this.props.id)}>
						  {this.props.title}
						</Typography>
					</div>
					{/*<Grid item xs style = {{textAlign : "center"}}>
						<Typography className = {classes.secondaryText}>{this.props.servings + " Servings / " + this.props.time + " Min"}</Typography>
					</Grid>
					<Grid item xs>
						<Typography className = {classes.secondaryText} style = {{float : "right"}}>{this.props.time + " Min"}</Typography>
					</Grid>*/}
				</Grid>
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