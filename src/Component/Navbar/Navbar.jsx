import React from 'react'
import {AppBar , Toolbar  , IconBar , Badge , MenuItem , Menu , Typography , IconButton} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './styles';
const Navbar = ({number}) => {
    const classes = useStyles();
    return (
        <>  
        <AppBar>
            <Toolbar postion="fixed" className="classes.appBar" color="inherit">
                <Typography variant="h6" className={classes.title} color ="inherit">
                    {/* <img src="" alt="shopping" className={classes.image} /> */}
                    MOKI
                </Typography>
                <div className="{classes.grow}"/>
                <div className="{classes.button}"/>
                <IconButton aria-label="Show cart items" color ="inherit">
                    <Badge badgeContent={number} color="secondary">
                        <ShoppingCart />
                    </Badge>
                </IconButton>
            </Toolbar>
        </AppBar>
            
        </>
    )
}

export default Navbar;
