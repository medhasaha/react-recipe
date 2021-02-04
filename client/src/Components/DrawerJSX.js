import React, {Component, useState} from 'react';
import {cuisineList, dietList, intoleranceList, mealTypeList} from '../ServiceClass.js'

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button, Typography, List, ListItem, ListItemText, ListItemIcon, Collapse, Divider, Checkbox } from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const style = theme => ({
	text : {
		fontFamily : "Fira Sans",
		fontSize : "17px"
	},
	textSmall : {
		fontFamily : "Fira Sans",
		fontSize : "14px",
		textTransform : "capitalize",
	},
	list : {
		padding : "0px"
	},
	listItemRoot : {
		paddingTop : "2px",
		paddingBottom : "2px"
	},
	listItemIcon : {
		minWidth : "40px"
	},
	checkBox : {
		padding : "4px"
	},
	button : {
		marginTop : "20px",
		marginBottom : "114px",
		marginRight : "5px",
		width : "-webkit-fill-available",
		color : "#fff",
		border: "1px solid #932432",
	}

})

const DrawerJSX = (props) => {
	const [cuisine, setCuisine] = useState(false)
	const [diet, setDiet] = useState(false)
	const [intolerance, setIntolerance] = useState(false)
	const [mealType, setMealType] = useState(false)

	const [selectedCuisine, setSelectedCuisine] = useState([])
	const [selectedDiet, setSelectedDiet] = useState([])
	const [selectedIntolerance, setSelectedIntolerance] = useState([])
	const [selectedMealType, setSelectedMealType] = useState([])

	const cuisineCollapseHandler = () =>{
		setCuisine(current => !current)
		setDiet(false)
		setIntolerance(false)
		setMealType(false)
	}

	const dietCollapseHandler = () =>{
		setDiet(current => !current)
		setCuisine(false)
		setIntolerance(false)
		setMealType(false)
	}

	const intoleranceCollapseHandler = () =>{
		setIntolerance(current => !current)
		setDiet(false)
		setCuisine(false)
		setMealType(false)
	}

	const mealCollapseHandler = () =>{
		setMealType(current => !current)
		setDiet(false)
		setIntolerance(false)
		setCuisine(false)
	}

	const cuisineSelectHandler = (selectedIndex) => {
		const values = selectedCuisine.some( index => index === selectedIndex)
									 ? selectedCuisine.filter( i => i !== selectedIndex)
									 : selectedCuisine.concat([selectedIndex]);	
		setSelectedCuisine(values)
	}

	const dietSelectHandler = (selectedIndex) => {
		const values = selectedDiet.some( index => index === selectedIndex)
									 ? selectedDiet.filter( i => i !== selectedIndex)
									 : selectedDiet.concat([selectedIndex]);	
		setSelectedDiet(values)
	}

	const intoleranceSelectHandler = (selectedIndex) => {
		const values = selectedIntolerance.some( index => index === selectedIndex)
									 ? selectedIntolerance.filter( i => i !== selectedIndex)
									 : selectedIntolerance.concat([selectedIndex]);	
		setSelectedIntolerance(values)
	}

	const mealTypeSelectHandler = (selectedIndex) => {
		const values = selectedMealType.some( index => index === selectedIndex)
									 ? selectedMealType.filter( i => i !== selectedIndex)
									 : selectedMealType.concat([selectedIndex]);	
		setSelectedMealType(values)
	}

	const applyFilters = () => {
		console.log(selectedCuisine, selectedDiet, selectedMealType, selectedIntolerance)
	}

	const { classes } = props;
	return(
		<React.Fragment>

			<List className = {classes.list}>
				<ListItem button onClick = {() => cuisineCollapseHandler()}>
					<ListItemText primary="Cuisine" classes = {{primary : classes.text}}/>
					{cuisine ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={cuisine} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{cuisineList.map((item,index) => (
							<ListItem button className={classes.nested} 
												classes = {{root : classes.listItemRoot}}
												onClick = {() => {cuisineSelectHandler(index)}}>
								<ListItemIcon className = {classes.listItemIcon}>
									<Checkbox
										checked={selectedCuisine.some( i => i === index)}
										tabIndex={-1}
										className = {classes.checkBox}
										disableRipple/>
								</ListItemIcon>
								<Typography variant = "subtitle2" className = {classes.textSmall}>{item}</Typography>
							</ListItem>
						))}
					</List>
				</Collapse>
			</List>

			<Divider width = "100%"/>

			<List className = {classes.list}>
				<ListItem button onClick = {() => dietCollapseHandler()}>
					<ListItemText primary="Diet" classes = {{primary : classes.text}}/>
					{diet ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={diet} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{dietList.map((item, index) => (
							<ListItem button className={classes.nested} 
												classes = {{root : classes.listItemRoot}}
												onClick = {() => {dietSelectHandler(index)}}>
								<ListItemIcon className = {classes.listItemIcon}>
									<Checkbox
										checked={selectedDiet.some( i => i === index)}
										tabIndex={-1}
										className = {classes.checkBox}
										disableRipple/>
								</ListItemIcon>
							  <Typography variant = "subtitle2" className = {classes.textSmall}>{item}</Typography>
						  </ListItem>
						))}
					</List>
				</Collapse>
			</List>

			<Divider width = "100%"/>

			<List className = {classes.list}>
				<ListItem button onClick = {() => intoleranceCollapseHandler()}>
					<ListItemText primary="Intolerance" classes = {{primary : classes.text}}/>
				  {intolerance ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={intolerance} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{intoleranceList.map((item, index) => (
							<ListItem button className={classes.nested} 
												classes = {{root : classes.listItemRoot}}
												onClick = {() => {intoleranceSelectHandler(index)}}>
								<ListItemIcon className = {classes.listItemIcon}>
									<Checkbox
										checked={selectedIntolerance.some( i => i === index)}
										tabIndex={-1}
										className = {classes.checkBox}
										disableRipple/>
								</ListItemIcon>
								<Typography variant = "subtitle2" className = {classes.textSmall}>{item}</Typography>
							</ListItem>
						))}
					</List>
				</Collapse>
			</List>

			<Divider width = "100%"/>

			<List className = {classes.list} >
				<ListItem button onClick = {() => mealCollapseHandler()}>
					<ListItemText primary="Meal Type" classes = {{primary : classes.text}}/>
				  {mealType ? <ExpandLess /> : <ExpandMore />}
				</ListItem>
				<Collapse in={mealType} timeout="auto" unmountOnExit>
					<List component="div" disablePadding>
						{mealTypeList.map((item, index) => (
							<ListItem button className={classes.nested} 
												classes = {{root : classes.listItemRoot}}
												onClick = {() => {mealTypeSelectHandler(index)}}>
								<ListItemIcon className = {classes.listItemIcon}>
									<Checkbox
										checked={selectedMealType.some( i => i === index)}
										tabIndex={-1}
										className = {classes.checkBox}
										disableRipple/>
								</ListItemIcon>
								<Typography variant = "subtitle2" className = {classes.textSmall}>{item}</Typography>
							</ListItem>
						))}
					</List>
				</Collapse>
			</List>

			<Divider width = "100%"/>

			<Button variant="contained" 
							className = {classes.button} 
							color = "secondary"
							onClick = {() => {applyFilters()}}>
				Apply
			</Button>

		</React.Fragment>
	)
}

export default withStyles(style, {withTheme: true})(DrawerJSX);