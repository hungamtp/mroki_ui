import React from 'react'
import {Card , CardMedia , CardContent , CardActions  , Typography , IconButton} from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import useStyles from './styles';

const Product = ({product, onAddToCart}) => {
    const classes = useStyles();

     const handleAddToCart = () => onAddToCart(product.id, 1);
    return (
        <Card className={classes.root}>
            <CardMedia className={classes.media} image={product.thumbnail} title ={product.name} /> 
                <CardContent>
                    <div className={classes.cardContent}>
                        <Typography variant="h5" gutterBottom>
                            {product.name}
                        </Typography>
                        <Typography variant="h5">
                            {product.price}
                        </Typography>
                    </div>
                    <Typography variant="h5" color="textSecondary">
                        {product.rate}
                    </Typography>
                </CardContent>
                <CardActions disableSpacing className={classes.cardAction}>
                    <IconButton aria-label="Add to cart" onClick={handleAddToCart}>
                        <AddShoppingCart />
                    </IconButton>
                </CardActions>
        </Card>
    )
}
export default Product