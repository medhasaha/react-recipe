import React, {Component} from 'react';
import { withRouter } from "react-router";
import BookmarkDialog from './BookmarkDialog.js'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import BookmarkEmptyIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkFilledIcon from '@material-ui/icons/Bookmark';
import Dialog from '@material-ui/core/Dialog';

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
		textTransform : "capitalize",
		// color : "#932432",
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
	cookbookCard : {
		borderRadius : "4px",
		backgroundColor: "#fff",
		boxShadow : "none",
		// padding : "20px 0px",
		cursor : "pointer"
	},
	gridCenter : {
  	alignItems : "center",
		justifyContent : "center",
		display : "flex"
	},
	logo : {
		height : "70px",
		width : "70px",
	},
	dialog : {
		height : "auto",
		maxHeight : "50%",
		width : "40%",
		padding : "20px",
		"&::-webkit-scrollbar" : {
			width: "0.3em",
		},
		"&::-webkit-scrollbar-track" : {
			boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
		},
		"&::-webkit-scrollbar-thumb" : {
			backgroundColor: "darkgrey",
			outline: "1px solid slategrey",
		}
	},
	deleteButton : {
		color : "#932432",
		border: "1px solid #932432",
		float : "right"
	}
})

class RecipeCard extends Component {
	constructor(props){
		super(props);
		// console.log("RecipeCard: ",props)
		const recipes = sessionStorage.getItem('recipes');
		const savedRecipes = JSON.parse(recipes)
		let isBookmarked = savedRecipes && savedRecipes.length > 0 && savedRecipes.includes(props.id) || false;
		this.state = {
			results : [],
			isLoaded : false,
			isBookmarked : isBookmarked,
			goToDialog : false
		}
	}

	goToDialogMethod = () => {
		this.setState({
			goToDialog : false
		},() => {
			this.setState({
				goToDialog : true
			})
		})
	}

	returnBookmarkState = (isBookmarked) => {
		this.setState({
			isBookmarked : isBookmarked,
		})
	}

  render(){
		const { classes } = this.props;
		return(
			<React.Fragment>
				<Card className = {classes.card} 
							style = {{position : "relative"}}>
					<img className={classes.image} src = {this.props.image}/>
					<Grid container style = {{margin : "10px", width : "auto"}}>
						<div className = {classes.titleDiv} style = {{maxWidth : this.props.maxSize ? this.props.maxSize : "160px"}}>
							<Typography variant = "h6" className = {classes.title} 
												onClick = {() => this.props.redirectToRecipeDetails(this.props.id)}>
								{this.props.title}
							</Typography>
						</div>
					</Grid>
					<BookmarkEmptyIcon className = {classes.bookmarkIcon}
					                   onClick = {this.goToDialogMethod}
														style = {{display : this.state.isBookmarked ? "none" : "block"}}/>
					<BookmarkFilledIcon className = {classes.bookmarkIcon} 
															onClick = {this.goToDialogMethod}
															style = {{display : this.state.isBookmarked ? "block" : "none"}}/>
				</Card>	

				{this.state.goToDialog &&
					<BookmarkDialog isBookmarked = {this.state.isBookmarked} 
													id = {this.props.id} 
													title = {this.props.title}
													returnBookmarkState = {this.returnBookmarkState}/>}

			</React.Fragment>
		)
	}
}

export default withRouter(withStyles(style, {withTheme: true})(RecipeCard));