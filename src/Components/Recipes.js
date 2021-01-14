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

const backgroundArray = [background1, background2, background3, background4, background5, background6, background7, background8, background9];

const style = theme => ({
	root : {

	},
	background : {
		// backgroundImage : `url(${background9})`,
		backgroundRepeat: "no-repeat",
		backgroundSize : "cover",
		backgroundPosition : "center center",
		height : "600px",
		width : "100%",
		"-webkit-animation": "$fadeinout 8s ease",
		"animation": "$fadeinout 8s ease",
		"animation-iteration-count" : "infinite",
		"animation-delay":"3s"
		// transition: "background-image 2.5s ease-in-out"
	},
	"@-webkit-keyframes fadeinout" : {
		"0%" :  { opacity: 0.3 },
		"100%" : { opacity: 0.3},
		"50%" : { opacity: 1 }
	},
	"@keyframes fadeinout" : {
		"0%" : { opacity: 0.3 },
		"100%" : { opacity: 0.3},
		"50%" : { opacity: 1 }
	},
	autocomplete : {
		backgroundColor : "white",
		margin : "auto",
		position : "relative",
		top : "40%"
	},
})

class Recipes extends Component {
	constructor(props){
		super(props);

		this.state = {
			currentBackgroundIndex : 0,
			intervalId : 0,
			autocompleteOptions : [],
			input : "",
			loading : false,
			open : false,
			currentCount : 10
		}
	}

	componentDidMount(){
		var intervalId = setInterval(this.timer, 8000);
   // store intervalId in the state so it can be accessed later:
   this.setState({intervalId: intervalId});
	}

	componentWillUnmount() {
		// use intervalId from the state to clear the interval
		clearInterval(this.state.intervalId);
	}
	
	timer = () => {
		// setState method is used to update the state
		var newIndex = this.state.currentBackgroundIndex + 1;
		if(newIndex <= 8) { 
			this.setState({ currentBackgroundIndex : newIndex });
		} else {
			// clearInterval(this.state.intervalId);
			this.setState({ currentBackgroundIndex : 0 });
		}
	}

	recipeAutocompleteMethod = (input) => {
		recipeAutocompleteAPI(input)
		.then(res => {
			console.log(res)
			this.setState({
				autocompleteOptions : res,
				loading : false
			})
		})
	}

	autocompleteChangeHandler = (e) => {
		this.setState({
			input : e.target.value,
			loading : this.state.open === true && this.state.autocompleteOptions.length > 0 ? true : false,
		}
		, () => {this.recipeAutocompleteMethod(this.state.input)}
		)
	}

  render(){
		const { classes } = this.props;
		console.log(this.state.currentBackgroundIndex)
		return(
			<Grid container className = {classes.root}>
				<Grid item xs = {12} 
				      className = {classes.background} 
							style = {{backgroundImage : `url(${backgroundArray[this.state.currentBackgroundIndex]})`}}>
					<Autocomplete
						options={this.state.autocompleteOptions}
						getOptionLabel={(option) => option.title}
						onOpen={() => {
							this.setState({
								open : true
							})
						}}
						onClose={() => {
							this.setState({
								open : false
							})
						}}
						loading = {this.state.loading}
						style={{ width: "50%" }}
						className = {classes.autocomplete}
						renderInput={(params) => <TextField {...params} 
																				variant="outlined" 	value = {this.state.input}
																				InputProps={{
																					...params.InputProps,
																					endAdornment: (
																						<React.Fragment>
																							{this.state.loading ? <CircularProgress color="inherit" size={20} /> : null}
																							{params.InputProps.endAdornment}
																						</React.Fragment>
																					),
																				}}					
						                            onChange = {(e) => this.autocompleteChangeHandler(e)}
						/>}/>
				</Grid>
			</Grid>
		)
	}
}

export default withStyles(style, {withTheme: true})(Recipes);