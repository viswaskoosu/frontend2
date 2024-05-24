import React from 'react';
import './Product.css';
import { useStateValue } from '../../Context/StateProvider';
import { Link } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Product({ id, title, image, price, rating }) {
  const [{ basket, favouriteItems }, dispatch] = useStateValue();

  const addToBasket = () => {
    if (!basket.some(item => item.id === id)) {
      dispatch({
        type: 'ADD_TO_BASKET',
        item: {
          id: id,
          title: title,
          image: image,
          price: price,
          rating: rating,
          quantity: 1,
        },
      });
    }
  };

  const removeFromBasket = () => {
    dispatch({
      type: 'REMOVE_FROM_BASKET',
      id: id,
    });
  };

  const addToFavourites = () => {
    const isInFavourites = favouriteItems.some(item => item.id === id);

    if (!isInFavourites) {
      dispatch({
        type: 'ADD_TO_FAVOURITES',
        item: {
          id: id,
          title: title,
          image: image,
          price: price,
          rating: rating,
        },
      });
    } else {
      dispatch({
        type: 'REMOVE_FROM_FAVOURITES',
        id: id,
      });
    }
  };

  return (
    <div className="product">
      <Link to={`/product/${id}`} className="product_link">
        <img src={image} alt={title} /> {/* Use the image prop here */}
        <div className="product_info">
          <p>{title}</p>
          <p className="product_price">
            <small>₹</small>
            <strong>{price}</strong>
          </p>
          <div className="product_rating">
            {Array(rating)
              .fill()
              .map((_, index) => (
                <p key={index}>⭐</p>
              ))}
          </div>
        </div>
      </Link>
      <div className="product_actions">
        <p className="favouriteIcon" onClick={addToFavourites}>
          {favouriteItems.some(item => item.id === id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </p>
        {basket.some(item => item.id === id) ? (
          <button onClick={removeFromBasket}>Remove from cart</button>
        ) : (
          <button onClick={addToBasket}>Add to Basket</button>
        )}
      </div>
    </div>
  );
}

export default Product;
