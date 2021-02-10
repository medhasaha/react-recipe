import React, {Component, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {loginAPI} from '../ServiceClass.js';

import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import loginBackground from '../Assets/Images/background/login_background.jpg';
import { Card, TextField, Grid, Button} from '@material-ui/core';
import LogoIcon from '../Assets/Icons/LogoColor.svg'

const style = theme => ({
	root : {
		backgroundImage : `url(${loginBackground})`,
		height : "100vh",
		backgroundAttachment: "fixed",
		backgroundRepeat: "no-repeat",
		backgroundSize: "cover",
		backgroundPosition: "center center",
		alignItems : "center",
		justifyContent : "center",
		display : "flex"
	},
	card : {
		height : "70vh",
		width : "400px",
		border: "1px solid #fff",
		borderRadius: "15px",
		boxShadow: "0 0 1rem 0 rgba(0, 0, 0, 0.2)",
		// backdropFilter: "blur(5px) saturate(100%) contrast(45%) brightness(130%)",
		backdropFilter: "blur(5px)",
		backgroundColor: "rgba(255, 255, 255, 0.3)",
		// textAlign : "center",
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
		"&:hover .MuiFormLabel-root": {
			color: "#932432"
		},
		"& .MuiInputBase-input" : {
			color : "#fff",
		},
		"&:hover .MuiInputBase-input" : {
			color : "#932432",
		},
		"& .Mui-focused .MuiInputBase-input" : {
			color : "#932432"
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
		// padding : "0px 20px 0px 0px",
		margin : "0px 0px 20px 0px",
		fontFamily : "Oleo Script Swash Caps",
		color : "#932432",
	},
	logo : {
		height : "42px", 
		width : "42px", 
		verticalAlign : "sub"
	},
})

const LogIn = (props) => {
	let [email, setEmail] = useState('');
	let [password, setPassword] = useState('');

	const redirectToSignup = () => {
		props.history.push({
			pathname: `${props.baseURL}/signup`,
		});
	}

	const redirectToDashboard = () => {
		console.log(email, password)
		loginAPI(email, password)
		.then(res => {
			console.log(res)
			if(res && res.success){
				sessionStorage.setItem('session', JSON.stringify(res.sessionID));
				sessionStorage.setItem('cookbooks', JSON.stringify(res.results))
				props.history.push({
					pathname: `${props.baseURL}/home`,
				});
			}
		})
	}

	const emailChangeHandler = (event) => {
		setEmail(event.target.value)
	}

	const passwordChangeHandler = (event) => {
		setPassword(event.target.value)
	}

		const { classes, theme } = props;
		return(
			<div className = {classes.root}>
				<Card className = {classes.card}>
					<Grid container>
					  <Grid item xs = {12} className = {classes.gridCenter}>
							<Typography className={classes.title} variant="h3" noWrap>
									Recipe 	<img src = {LogoIcon} className = {classes.logo}/>
							</Typography>
						</Grid>
						<Grid item xs = {12}>
							<TextField label="Email" 
												 variant="outlined" 
												 color = "secondary" 
												 className = {classes.textField}
												 value = {email}
												 onChange = {(e) => {emailChangeHandler(e)}}/>
						</Grid>
						<Grid item xs = {12}>
							<TextField label="Password" 
												 variant="outlined" 
												 color = "secondary" 
												 className = {classes.textField}
												 value = {password}
												 onChange = {(e) => {passwordChangeHandler(e)}}/>
						</Grid>
						<Grid item xs = {12} className = {classes.gridCenter}>
							<Button variant="contained" 
											className = {classes.button} 
											color = "secondary"
											onClick = {() => redirectToDashboard()}>
								Login
							</Button>
						</Grid>
						<Grid item xs = {12} 
						      className = {classes.signupLink} 
						      onClick = {() => {redirectToSignup()}}>
							<Typography variant="caption" color = "secondary" className = {classes.signupText}>
								Don't have an Account? Signup Now!
							</Typography>
						</Grid>
					</Grid>
				</Card>
			</div>
		)
}

export default withStyles(style, {withTheme: true})(LogIn);