import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from '../ActionTypes';

export const addToWishlist = data => ({
    type: ADD_TO_WISHLIST,
    payload: data,
});

export const removeFromWishlist = index => ({
    type: REMOVE_FROM_WISHLIST,
    payload: index,
});