import React, {Component} from 'react';
import {bookmarkRecipeAPI} from '../ServiceClass.js'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import BookmarkEmptyIcon from '@material-ui/icons/BookmarkBorder';
import BookmarkFilledIcon from '@material-ui/icons/Bookmark';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Cookbook from '../Assets/Icons/Cookbook.svg'
import CookbookColored from '../Assets/Icons/CookbookColored.svg'

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
	},
	cookbookCard : {
		borderRadius : "4px",
		backgroundColor: "#fff",
		boxShadow : "none",
		padding : "20px 0px",
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
		height : "25%",
		width : "30%",
		padding : "20px"
	}
})

class RecipeCard extends Component {
	constructor(props){
		super(props);
		// console.log("RecipeCard: ",props)
		this.state = {
			results : [],
			isLoaded : false,
			isBookmarked : props.bookMarkedRecipes && props.bookMarkedRecipes.includes(props.id) || false,
			openDialog : false,
		}
	}

	componentDidMount(){

	}

	bookmarkClickHandler = () => {
		this.setState({
			// isBookmarked : !(this.state.isBookmarked)
			openDialog : true
		})
	}

	cookbookClickHandler = (cookbook_id) => {
		bookmarkRecipeAPI(cookbook_id, this.props.id, this.props.title, "jpg")
		.then(res => {
			if(res.success){
				this.setState({
					isBookmarked : true,
					openDialog : false
				})
			}
		})
	}

	dialogJSX = () => {
		const { classes } = this.props;
		const ck = sessionStorage.getItem('cookbooks');
		const cookbooks = JSON.parse(ck)
		return(
			<Grid container spacing = {4}>
			{cookbooks.length > 0 && cookbooks.map(item => (
				<Grid item xs = {3}>
					<Card className = {classes.cookbookCard} onClick = {() => {this.cookbookClickHandler(item.cookbook_id)}}>
						<Grid item xs = {12}  className = {classes.gridCenter}>
							<img src = {Cookbook} 
									className = {classes.logo}/>
						</Grid>
						<Grid item xs = {12}  className = {classes.gridCenter}>
							<Typography variant = "subtitle1" className = {classes.cookbookName}>
								{item.cookbook_name}
							</Typography>
						</Grid>
					</Card>	
				</Grid>
			))}
		</Grid>
		)
	}

  render(){
		const { classes } = this.props;
		return(
			<React.Fragment>
				<Card className = {classes.card} 
							style = {{position : "relative"}}>
					<img className={classes.image} src = {this.props.image}/>
					<Grid container style = {{margin : "10px", width : "auto"}}>
						<div className = {classes.titleDiv}>
							<Typography variant = "h6" className = {classes.title} 
												onClick = {() => this.props.redirectToRecipeDetails(this.props.id)}>
								{this.props.title}
							</Typography>
						</div>
					</Grid>
					<BookmarkEmptyIcon className = {classes.bookmarkIcon}
														onClick = {this.bookmarkClickHandler} 
														style = {{display : this.state.isBookmarked ? "none" : "block"}}/>
					<BookmarkFilledIcon className = {classes.bookmarkIcon} 
															onClick = {this.bookmarkClickHandler} 
															style = {{display : this.state.isBookmarked ? "block" : "none"}}/>
				</Card>	

				<Dialog classes = {{paper : classes.dialog}}
				        onClose={() => { this.setState({openDialog : false}) }} 
				        open={this.state.openDialog}>
				  <DialogTitle>Choose Cookbook</DialogTitle>
						{this.dialogJSX()}
			  </Dialog>
			</React.Fragment>
		)
	}
}

export default withStyles(style, {withTheme: true})(RecipeCard);