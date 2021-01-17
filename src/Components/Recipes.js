import React, {Component} from 'react';
import {recipeAutocompleteAPI} from '../ServiceClass.js'

import background1 from '../Assets/Images/background/background1.jpg';
import background2 from '../Assets/Images/background/background2.jpg';
import background3 from '../Assets/Images/background/background3.jpg';
import background4 from '../Assets/Images/background/background4.jpg';
import background5 from '../Assets/Images/background/background5.jpg';
import background6 from '../Assets/Images/background/background6.jpg';
import background7 from '../Assets/Images/background/background7.jpg';
import background8 from '../Assets/Images/background/background8.jpg';
import background9 from '../Assets/Images/background/background9.jpg';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';


const backgroundArray = [background1, background2, background3, background4, background5, background6, background7, background8, background9];
const sample = [
	{
	"id": 133439,
	"title": "cake",
	"imageType": "jpg"
	},
	{
	"id": 165381,
	"title": "chai",
	"imageType": "jpg"
	},
	{
	"id": 495920,
	"title": "cups",
	"imageType": "jpg"
	},
	{
	"id": 34150,
	"title": "chili",
	"imageType": "jpg"
	},
	{
	"id": 1125636,
	"title": "crema",
	"imageType": "jpg"
	},
	{
	"id": 102861,
	"title": "cacik",
	"imageType": "jpg"
	},
	{
	"id": 630955,
	"title": "craig",
	"imageType": "jpg"
	},
	{
	"id": 117905,
	"title": "champ",
	"imageType": "png"
	},
	{
	"id": 234120,
	"title": "calas",
	"imageType": "jpg?itok=m1zglj97"
	},
	{
	"id": 376278,
	"title": "clams",
	"imageType": "jpeg"
	}
	]
const style = theme => ({
	root : {

	},
	bgGrid : {
		position: "relative",
		margin: "0 auto",
		width: "100%",
		height: "600px",
	},
	bgDiv : {
		width : "100%",
		height : "600px",
		opacity: 0,
		animation: "$fade-in-out 81s linear infinite"
	},
	bgImage : {
		width : "100%",
		height : "100%",
		objectFit : "cover",
		objectPosition : "center center",
		position: "absolute",
		left: 0,
		top: 0,
	},
	attribution : {
		position: "absolute",
		right : 10,
		bottom : 0,
		zIndex : "100",
		color : "white",
		textShadow: "0 0 1px black, 0 0 1px black, 0 0 1px black, 0 0 1px black"
	},
	attributionLink : {
		textDecoration : "none",
		color : "white",
		"&:hover": {
      textDecoration : "underline"
    }
	},
	"@keyframes fade-in-out" : {
		"0%" : { opacity: 0 } ,
		"01.23%" : { opacity: 1 },
		"02.46%" : { opacity: 1 },
		"03.69%" : { opacity: 1 },
		"04.92%" : { opacity: 1 },
		"06.15%" : { opacity: 1 },
		"07.38%" : { opacity: 1 },
		"08.61%" : { opacity: 1 },
		"09.84%" : { opacity: 1 },
		"19.68%" : { opacity: 0 },
		"100%" : { opacity: 0 }
	},
	autocompleteGrid : {
		position : "absolute",
		top : "40%",
	},
	gridCenter : {
		alignItems : "center",
		justifyContent : "center",
		display : "flex"
	},
	autocomplete : {
		backgroundColor : "white",
		display : "inline-flex",
		margin : "0px 2px 0px 0px"
	},
	searchButton : {
		height  : "100%",
		border: "3px solid #fff",
    backgroundColor: "rgba(255,255,255,0.2)",
	},
	searchIcon : {
		color : "white",
		fontSize : "2rem"
	}
})

class Recipes extends Component {
	constructor(props){
		super(props);
		console.log(this.props)
		this.state = {
			autocompleteOptions : [],
			value : "",
			inputValue : "",
			loading : false,
			open : false,
		}
	}

	componentDidMount(){

	}

	componentWillUnmount() {

	}

	recipeAutocompleteMethod = (value) => {
		recipeAutocompleteAPI(value)
		.then(res => {
			console.log(res)
			this.setState({
				autocompleteOptions : sample,
				loading : false
			})
		}).catch(err => console.log(err))
	}

	autocompleteChangeHandler = (e, newValue) => {
		// console.log("newValue",newValue)
		this.setState({
			value : newValue,
			loading : this.state.open === true && this.state.autocompleteOptions.length > 0 ? true : false,
		})
	}

	autocompleteInputChangeHandler = (e, newInputValue) => {
		// console.log("newInputValue",newInputValue)
		this.setState({
			inputValue : newInputValue
		}
		// , () => {this.recipeAutocompleteMethod(this.state.value)}
		, () => {
			this.setState({
				autocompleteOptions : sample,
				loading : false
			})
		}
		)
	}

	redirectToSearch = () => {
		this.props.history.push({
			pathname: `${this.props.baseURL}/search-results/${this.state.inputValue}`,
		});
	}

	sliderJSX = () => {
		const { classes } = this.props;
		return(
			<React.Fragment>
				<div style = {{ "animationDelay": "0s" }} className = {classes.bgDiv}>
					<img src = {background1} className = {classes.bgImage} />
					<span className = {classes.attribution}>
					  Photo by <a href="https://unsplash.com/@brookelark?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Brooke Lark</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
				<div style = {{ "animationDelay": "9s" }} className = {classes.bgDiv}>
					<img src = {background2} className = {classes.bgImage}/>
					<span className = {classes.attribution}>
						Photo by <a href="https://unsplash.com/@lvnatikk?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Lily Banse</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
				<div style = {{ "animationDelay": "18s" }} className = {classes.bgDiv}>
					<img src = {background3} className = {classes.bgImage} />
					<span className = {classes.attribution}>
					  Photo by <a href="https://unsplash.com/@therachelstory?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Rachel Park</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
				<div style = {{ "animationDelay": "27s" }} className = {classes.bgDiv}>
					<img src = {background4} className = {classes.bgImage} />
						<span className = {classes.attribution}>
							Photo by <a href="https://unsplash.com/@annapelzer?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Anna Pelzer</a> 
							{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
						</span>
				</div>
				<div style = {{ "animationDelay": "36s" }} className = {classes.bgDiv}>
					<img src = {background5} className = {classes.bgImage} />
					<span className = {classes.attribution}>
						Photo by <a href="https://unsplash.com/@alexmunsell?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Alex Munsell</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
				<div style = {{ "animationDelay": "45s" }} className = {classes.bgDiv}>
					<img src = {background6} className = {classes.bgImage} />
					<span className = {classes.attribution}>
						Photo by <a href="https://unsplash.com/@1ncreased?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Lidye</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
				<div style = {{ "animationDelay": "54s" }} className = {classes.bgDiv}>
					<img src = {background7} className = {classes.bgImage} />
					<span className = {classes.attribution}>
						Photo by <a href="https://unsplash.com/@eaterscollective?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Eaters Collective</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
				<div style = {{ "animationDelay": "63s" }} className = {classes.bgDiv}>
					<img src = {background8} className = {classes.bgImage} />
					<span className = {classes.attribution}>
						Photo by <a href="https://unsplash.com/@carissagan?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Carissa Gan</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
				<div style = {{ "animationDelay": "72s" }} className = {classes.bgDiv}>
					<img src = {background9} className = {classes.bgImage} />
					<span className = {classes.attribution}>
					  Photo by <a href="https://unsplash.com/@abhishek_sanwa?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Abhishek Sanwa Limbu</a> 
						{' '} on <a href="https://unsplash.com/s/photos/food?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText" className = {classes.attributionLink}>Unsplash</a>
					</span>
				</div>
			</React.Fragment>
		)
	}

  render(){
		const { classes } = this.props;
		return(
			<Grid container className = {classes.root}>
				<Grid item xs = {12} className = {classes.bgGrid}>
					{this.sliderJSX()}
						<Grid container className = {classes.autocompleteGrid}>
						  <Grid item xs = {12} className = {classes.gridCenter}>
							<Autocomplete
								options={this.state.autocompleteOptions}
								getOptionLabel={(option) => option.title}
								onOpen={() => {this.setState({open : true}) }}
								onClose={() => { this.setState({open : false}) }}
								loading = {this.state.loading}
								style={{ width: "45%" }}
								className = {classes.autocomplete}
								freeSolo
								disableClearable
								value = {this.state.value}//value selected by the user
								onChange = {(e, newValue) => this.autocompleteChangeHandler(e, newValue)}
								inputValue = {this.state.inputValue} //value displayed in textbox
								onInputChange = {(e, newInputValue) => {this.autocompleteInputChangeHandler(e, newInputValue)}}
								renderInput={(params) => 
									<TextField {...params} variant="outlined"
																				InputProps={{...params.InputProps,
																											endAdornment: (
																												<React.Fragment>
																													{this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
																													{params.InputProps.endAdornment}
																												</React.Fragment>),
																										}} />} />
							{/*<IconButton disabled color="primary" className = {classes.searchButton}>*/}
							<Button variant="contained" disableElevation className = {classes.searchButton} onClick = {this.redirectToSearch}>
							  <SearchIcon className = {classes.searchIcon}/>
						  </Button>
							{/*</IconButton>*/}
							</Grid>
						</Grid>
				</Grid>
			</Grid>
		)
	}
}

export default withStyles(style, {withTheme: true})(Recipes);