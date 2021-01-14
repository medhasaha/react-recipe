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
	bgGrid : {
		position: "relative",
		margin: "0 auto",
		width: "100%",
		height: "600px",
	},
	bgImage : {
		width : "100%",
		height : "600px",
		objectFit : "cover",
		objectPosition : "center center",
		position: "absolute",
		left: 0,
		top: 0,
		opacity: 0,
		animation: "$fade-in-out 81s linear infinite",
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
	autocomplete : {
		backgroundColor : "white",
		position : "absolute",
		top : "40%",
		left : "25%"
	},
})

class Recipes extends Component {
	constructor(props){
		super(props);

		this.state = {
			autocompleteOptions : [],
			input : "",
			loading : false,
			open : false,
		}
	}

	componentDidMount(){

	}

	componentWillUnmount() {

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
		return(
			<Grid container className = {classes.root}>
				<Grid item xs = {12} className = {classes.bgGrid}>
				  <img src = {background1} className = {classes.bgImage} style = {{ "animationDelay": "0s" }}/>
					<img src = {background2} className = {classes.bgImage} style = {{ "animationDelay": "9s" }}/>
					<img src = {background3} className = {classes.bgImage} style = {{ "animationDelay": "18s" }}/>
					<img src = {background4} className = {classes.bgImage} style = {{ "animationDelay": "27s" }}/>
					<img src = {background5} className = {classes.bgImage} style = {{ "animationDelay": "36s" }}/>
					<img src = {background6} className = {classes.bgImage} style = {{ "animationDelay": "45s" }}/>
					<img src = {background7} className = {classes.bgImage} style = {{ "animationDelay": "54s" }}/>
					<img src = {background8} className = {classes.bgImage} style = {{ "animationDelay": "63s" }}/>
					<img src = {background9} className = {classes.bgImage} style = {{ "animationDelay": "72s" }}/>

					<Autocomplete
						options={this.state.autocompleteOptions}
						getOptionLabel={(option) => option.title}
						onOpen={() => {this.setState({open : true}) }}
						onClose={() => { this.setState({open : false}) }}
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