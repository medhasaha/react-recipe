import React, {Component, useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {signupAPI} from '../ServiceClass.js';


import Typography from '@material-ui/core/Typography';
import { Card, TextField, Grid, Button, InputAdornment, IconButton  } from '@material-ui/core';
import signupBackground from '../Assets/Images/background/signup_background.jpg';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
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
		"&:hover .MuiFormLabel-root": {
			color: "#932432"
		},
		"& .MuiInputBase-input" : {
			color : "#fff"
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
	iconButton : {
		color : "rgba(225, 225, 225, 0.50)",
	}
})

const SignUp = (props) => {
	let [values, setValues] = useState({
		username : '',
		email : ''
	})
	let [password, setPassword] = useState({
		value : '',
		showPassword : false
	});
	let [confirmPassword, setConfirmPassword] = useState({
		value : '',
		showPassword : false
	});


	const redirectToSignup = () => {
		this.props.history.push({
			pathname: `${this.props.baseURL}/login`,
		});
	}

	const textFieldChangeHandler = (event, id) =>{
		setValues({ ...values, [id]: event.target.value });
	}

	const passwordChangeHandler = (event) => {
		setPassword({...password, value : event.target.value})
	}

	const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword });
  };

	const confirmPasswordChangeHandler = (event) => {
		setConfirmPassword({...confirmPassword, value : event.target.value})
	}

	const handleClickShowConfirmPassword = () => {
    setConfirmPassword({ ...confirmPassword, showPassword: !confirmPassword.showPassword });
  };

	const signupUser = () => {
		console.log(values.username, values.email, password.value, confirmPassword.value);
		if(password.value === confirmPassword.value){
			signupAPI(values.username, values.email, password.value)
			.then(res => {
				if(res && res.success){
					props.history.push({
						pathname: `${props.baseURL}/login`,
					});
				}
			}).catch(err => console.log(err))
		}else{
			console.log("Incorrect Password");
		}
	}

		const { classes } = props;
		return(
			<div className = {classes.root}>
				<Card className = {classes.card}>
					<Grid container>
						<Grid item xs = {12}>
							<TextField label="User Name" 
												 variant="outlined" 
												 color = "secondary" 
												 className = {classes.textField}
												 value = {values.username}
												 onChange = {(e) => {textFieldChangeHandler(e, 'username')}}/>
						</Grid>
						<Grid item xs = {12}>
							<TextField label="Email" 
												 variant="outlined" 
												 color = "secondary" 
												 className = {classes.textField}
												 value = {values.email}
												 onChange = {(e) => {textFieldChangeHandler(e, 'email')}}/>
						</Grid>
						<Grid item xs = {12}>
							<TextField label="Password" 
												 variant="outlined" 
												 color = "secondary" 
												 className = {classes.textField}
												 type={password.showPassword ? 'text' : 'password'}
												 value = {password.value}
												 onChange = {(e) => {passwordChangeHandler(e)}}
												 InputProps={{
													endAdornment: 
														<InputAdornment position="end">
															<IconButton classes = {{root : classes.iconButton}}
																onClick={() => handleClickShowPassword()}
																onMouseDown={(e) => {e.preventDefault()}}>
																{password.showPassword ? <Visibility /> : <VisibilityOff />}
															</IconButton>
														</InputAdornment>,
												 }}/>
						</Grid>	
						<Grid item xs = {12}>
							<TextField label="Confirm Password" 
												 variant="outlined" 
												 color = "secondary" 
												 className = {classes.textField}
												 type={confirmPassword.showPassword ? 'text' : 'password'}
												 value = {confirmPassword.value}
												 onChange = {(e) => {confirmPasswordChangeHandler(e)}}
												 InputProps={{
													endAdornment: 
														<InputAdornment position="end">
															<IconButton classes = {{root : classes.iconButton}}
																onClick={() => handleClickShowConfirmPassword()}
																onMouseDown={(e) => {e.preventDefault()}}>
																{confirmPassword.showPassword ? <Visibility /> : <VisibilityOff />}
															</IconButton>
														</InputAdornment>,
												 }}/>
					  </Grid>
						<Grid item xs = {12} className = {classes.gridCenter}>
							<Button variant="contained" 
											className = {classes.button} 
											color = "secondary"
											onClick = {() => {signupUser()}}>
								Signup
							</Button>
						</Grid>
						<Grid item xs = {12} className = {classes.signupLink} onClick = {() => {redirectToSignup()}}>
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
						  Register for a free account to save your favourite recipes to your recipe box!
					  </Typography>
					</Grid>
				</Grid>
			</div>
		)
	}


export default withStyles(style, {withTheme: true})(SignUp);