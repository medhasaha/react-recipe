import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import { Card, TextField, Grid, Button } from '@material-ui/core';
import signupBackground from '../Assets/Images/background/signup_background.jpg';
import LogoIcon from '../Assets/Icons/Logo.svg'

const style = theme => ({
	root : {
		backgroundImage : `url(${signupBackground})`,
		height : "100vh",
		backgroundAttachment: "fixed",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center center",
		alignItems : "center",
		// justifyContent : "center",
		display : "flex"
	},
	card : {
		height : "70vh",
		width : "300px",
		margin : "15vw",
		border: "1px solid #fff",
		borderRadius: "15px",
		boxShadow: "0 0 1rem 0 rgba(0, 0, 0, 0.2)",
		// backdropFilter: "blur(5px) saturate(100%) contrast(45%) brightness(130%)",
		backdropFilter: "blur(5px)",
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		alignItems : "center",
		justifyContent : "center",
		display : "flex",
		padding : "20px"
	},
	
	textField : {
		marginBottom : "30px",
		width : "100%",
		"& .MuiFormLabel-root": {
			color: "#fff"
		},
		"& .Mui-focused" : {
			color : "#932432",
		},
		"& .MuiOutlinedInput-notchedOutline" : {
			borderColor : "#fff"
		},
		"&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "#932432"
    },
	},
	gridCenter : {
		textAlign : "center"
	},
	button : {
		marginBottom : "20px",
		width : "100%",
		color : "#fff",
		border: "1px solid #932432",
	},
	signupLink : {
		cursor : "pointer",
		textAlign : "center"
	},
	signupText : {
		"&:hover" : {
			textDecoration : "underline"
		}
	},
	title: {
		margin : "0px 0px 20px 0px",
		fontFamily : "Oleo Script Swash Caps",
		color : "#fff",
		fontSize : "10rem"
	},
	logo : {
		height : "42px", 
		width : "42px", 
		verticalAlign : "sub"
	},
	subHeading: {
		color : "#fff",
	},
})

class SignUp extends Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}

	redirectToSignup = () => {
		this.props.history.push({
			pathname: `${this.props.baseURL}/login`,
		});
	}

  render(){
		const { classes } = this.props;
		return(
			<div className = {classes.root}>
				<Card className = {classes.card}>
					<Grid container>
						<Grid item xs = {12}>
							<TextField label="User Name" variant="outlined" color = "secondary" className = {classes.textField}/>
						</Grid>
						<Grid item xs = {12}>
							<TextField label="Email" variant="outlined" color = "secondary" className = {classes.textField}/>
						</Grid>
						<Grid item xs = {12}>
						  <TextField label="Password" variant="outlined" color = "secondary" className = {classes.textField}/>
						</Grid>	
						<Grid item xs = {12}>
						  <TextField label="Confirm Password" variant="outlined" color = "secondary" className = {classes.textField}/>
					  </Grid>
						<Grid item xs = {12} className = {classes.gridCenter}>
							<Button variant="contained" className = {classes.button} color = "secondary">Signup</Button>
						</Grid>
						<Grid item xs = {12} className = {classes.signupLink} onClick = {() => {this.redirectToSignup()}}>
							<Typography variant="caption" color = "secondary" className = {classes.signupText}>
								Already have an Account? Login Now!
							</Typography>
						</Grid>
					</Grid>
				</Card>

				<Grid container style = {{width : "500px"}}>
					<Grid item xs = {12} className = {classes.gridCenter}>
						<Typography className={classes.title} variant="h1" noWrap>
							Recipe
					  </Typography>
					</Grid>
					<Grid item xs = {12} className = {classes.gridCenter}>
						<Typography className={classes.subHeading} variant="h4">
						  Register for a free account to save your favourite recipes to your recipe box !
					  </Typography>
					</Grid>
				</Grid>
			</div>
		)
	}
}

export default withStyles(style, {withTheme: true})(SignUp);