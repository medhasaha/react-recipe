import React, {Component} from 'react';
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
    backgroundColor: "#0d1010",
	},
	title: {
		padding : "0px 20px 0px 0px",
		margin : "0px 20px 0px 0px",
		fontFamily : "Oleo Script Swash Caps"
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
		super(props);
		this.state = {
		}
	}

  render(){
		const { classes } = this.props;
		return(
			<div className={classes.root}>
				<AppBar position="static" className = {classes.appBar}>
					<Toolbar>
					  <div>
							<Typography className={classes.title} variant="h4" noWrap>
								Recipe 	<img src = {LogoIcon} className = {classes.logo}/>
							</Typography>
						</div>
						<div className = {classes.appBarItems}>
						  
						</div>
						<div className={classes.search}>
							<div className={classes.searchIcon}>
								<SearchIcon />
							</div>
							<InputBase placeholder="Search…"
								classes={{ root: classes.inputRoot, input: classes.inputInput, }}
								inputProps={{ 'aria-label': 'search' }}/>
						</div>
						<div>
							<Button className = {classes.login} variant="outlined" noWrap>
							  Login/ Signup
						  </Button>
						</div>
					</Toolbar>
				</AppBar>
			</div>
		)
	}
}

export default withStyles(style, {withTheme: true})(NavBar);