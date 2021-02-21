import React, {Component} from 'react';
import {bookmarkRecipeAPI, getBookmarkedRecipesAPI, changeCookbookAPI, deleteBookmarkAPI} from '../ServiceClass.js'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';

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
		borderBottom : "6px solid #58151e"
	},
	titleDiv : {
		position : "absolute", 
		left : 0, 
		bottom : 0, 
		maxWidth : "160px",
		padding : "0px 10px 0px 10px", 
		backgroundColor : "#58151e",
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
		textTransform : "capitalize",
		// color : "#58151e",
		color : "#fff",
		fontSize : "15px"
	},
	secondaryText : {
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
	},
	gridCenter : {
  	alignItems : "center",
		justifyContent : "center",
		display : "flex"
	}
})

class VideoCard extends Component {
	constructor(props){
		super(props);
		// console.log("VideoCard: ",props)
		const recipes = sessionStorage.getItem('recipes');
		const savedRecipes = JSON.parse(recipes)
		let isBookmarked = savedRecipes && savedRecipes.length > 0 && savedRecipes.includes(props.id) || false;
		this.state = {
			results : [],
			isLoaded : false,
			isBookmarked : isBookmarked,
			openDialog : false,
			activeID : "",
			allCookbooks : [],
			openSuccessSnackbar : false,
			successMessage : "",
			openErrorSnackbar : false,
			errorMesssage : "",
		}
	}

  render(){
		const { classes } = this.props;
		return(
			<React.Fragment>
			  <a href = {"https://www.youtube.com/watch?v=" + this.props.youtubeId} target="_blank">
				<Card className = {classes.card} 
							style = {{position : "relative"}}>
					<img className={classes.image} src = {this.props.image}/>
					<Grid container style = {{margin : "10px", width : "auto"}}>
						<div className = {classes.titleDiv} style = {{maxWidth : this.props.maxSize ? this.props.maxSize : "160px"}}>
							<Typography variant = "h6" className = {classes.title}>
								{this.props.title}
							</Typography>
						</div>
					</Grid>
				</Card>	
				</a>
			</React.Fragment>
		)
	}
}

export default withStyles(style, {withTheme: true})(VideoCard);