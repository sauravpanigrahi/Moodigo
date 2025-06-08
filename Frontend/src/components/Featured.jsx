import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';  // Import Grid for responsive layout

const FeaturedProduct = () => {
    // Product data array
    const products = [
        {
            title: 'Relaxed Fit T-shirt',
            description: 'Experience comfort and style with our relaxed fit T-shirt, crafted from soft, breathable fabric — perfect for everyday wear.',
            image: '/Relax.jpg'
        },
        {
            title: 'Classic Denim Jacket',
            description: 'Timeless and versatile, this classic denim jacket adds a cool edge to any outfit with its durable fabric and stylish fit.',
            image: '/Classic Denim Jacket.png'
        },
        {
            title: 'Leather Crossbody Bag',
            description: 'Stay chic and hands-free with this premium leather crossbody bag, combining function and fashion for your daily essentials.',
            image: '/Leather Crossbody Bag.png'
        },
        {
            title: 'High-Rise Jeans',
            description: 'Flatter your silhouette with these high-rise jeans, designed for a perfect fit and all-day comfort.',
            image: '/High-Rise Jeans.png'
        }
    ];

    // Render a single product card
    const renderProductCard = (product) => {
        return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.title}>
                <Card sx={{ maxWidth: 300, height: 450, marginTop: 4 }} className='move'>
                    <CardMedia
                        component="img"
                        alt={product.title}
                        height="250"
                        image={product.image}
                        sx={{ height: '250px', objectFit: 'contain' }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {product.title}
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {product.description}
                        </Typography>
                    </CardContent>
                    {/* <CardActions>
                    <Button variant="contained">Add to cart</Button>
                        
                    </CardActions> */}
                </Card>
            </Grid>
        );
    };

    return (
        <div>
            <div className="featured d-flex flex-column justify-content-center align-items-center mt-5 p-4">
                <h2>Featured Products</h2>

                {/* Grid container for responsive layout */}
                <Grid container spacing={4} justifyContent="center">
                    {products.map(renderProductCard)}
                </Grid>
            </div>
        </div>
    );
};

export default FeaturedProduct;
