import React, {Component} from 'react';
import { withRouter } from "react-router";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import LogoIcon from '../Assets/Icons/Logo.svg'

const style = theme => ({
	root : {
		flexGrow : "1"
	},
	appBar : {
	color: "#fff",
	position : "fixed",
	zIndex : "1400"
	// backgroundColor: "#0d1010",
    // backgroundColor: "#932432",
	},
	title: {
		padding : "0px 20px 0px 0px",
		margin : "0px 20px 0px 0px",
		fontFamily : "Oleo Script Swash Caps",
		cursor : "pointer"
		// borderRight : "2px solid white",
	},
	appBarItems : {
		flexGrow: 1,
	},
	logo : {
		height : "32px", 
		width : "32px", 
		verticalAlign : "sub"
	},
	search: {
		position: 'relative',
		borderRadius: theme.shape.borderRadius,
		backgroundColor: "rgba(255, 255, 255, 0.15)",
		'&:hover': {
			backgroundColor: "rgba(255, 255, 255, 0.25);",
		},
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: "8px",
			width: 'auto',
		},
	},
	searchIcon: {
		padding: "0px 16px",
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
		padding : "8px 8px 8px 0px",
    transition : "width 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    paddingLeft : "calc(1em + 32px)",
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
	},
	login : {
		// padding : "0px 0px 0px 20px",
		margin : "0px 0px 0px 20px",
		// borderRight : "2px solid white",
		color : "#932432",
		border: "1px solid #932432",
		// backgroundColor : "#932432"
	}
})

class NavBar extends Component {
	constructor(props){
		// console.log(props)
		super(props);
		this.state = {
			query : ""
		}
	}

	getToken = () => {
		const tokenString = sessionStorage.getItem('session');
		const userToken = JSON.parse(tokenString);
		// console.log("NavBar", userToken ? true : false)
		return userToken ? true : false
	}

	redirect = () => {
		let isUserLoggedIn = this.getToken() ;
		isUserLoggedIn 
		? this.props.history.push({
				pathname: `/recipe/dashboard`,
			})
		: this.props.history.push({
				pathname: `/recipe/login`,
			});
	}

	redirectToHome = () => {
		this.props.history.push({
			pathname: `/recipe/home`,
		});
	}

	inputBaseChangeHandler = (e) => {
		this.setState({
			query : e.target.value
		})
	}

	handleKeyPress = e => {
    if (e.key === "Enter") {
      if (this.state.query.length > 0)
				this.props.history.push({
					pathname: `/recipe/search-results`,
					search: `?query=${this.state.query}&cuisine=&diet=&intolerances=&mealType=&ingredient=&sortParameter=`,
				});
    }
  };

  render(){
		const { classes } = this.props;
		let isUserLoggedIn = this.getToken() ;
		return(
			<div className={classes.root}>
				<AppBar position="static" className = {classes.appBar} style = {{backgroundColor : this.props.home === true ? "#0d1010" : "#932432"}}>
					<Toolbar>
					  <div>
							<Typography className={classes.title} variant="h4" noWrap onClick = {this.redirectToHome}>
								Recipe 	<img src = {LogoIcon} className = {classes.logo}/>
							</Typography>
						</div>
						<div className = {classes.appBarItems}>
						  
						</div>
						{this.props.search &&
							<div className={classes.search}>
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
								<InputBase placeholder="Search…"
									onChange = {this.inputBaseChangeHandler}
									onKeyDown={this.handleKeyPress}
									classes={{ root: classes.inputRoot, input: classes.inputInput, }}
									inputProps={{ 'aria-label': 'search' }}/>
							</div>}
						<div>
							<Button className = {classes.login} variant="outlined" noWrap
							        onClick = {this.redirect}>
							  {	isUserLoggedIn ? "Dashboard" : "Login/ Signup"}
						  </Button>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}

export default withRouter(withStyles(style, {withTheme: true})(NavBar));