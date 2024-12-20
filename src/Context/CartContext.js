import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import toast from 'react-hot-toast';



export let cartContext = createContext();

export function CartContextProvider(props) {


    let headers = {
        token: localStorage.getItem('userToken'),
    }

    // Define API functions
    const addToCartApi = async (productId) => {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId: productId
        }, { headers });
    };

    const removeFromCartApi = async (productId) => {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, 
            { headers }
        );
    };

    const addToWishListApi = async (productId) => {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId: productId
        }, { headers });
    };

    const removeFromWishListApi = async (productId) => {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, 
            { headers }
        );
    };

    // ----------->> Cart <<----------- 

    const [cartId, setCartId] = useState(null);
    const [numOfCartItems, setNumOfCartItems] = useState(0);
    const [cartDetails, setCartDetails] = useState(null);

    async function addToCart(productId) {
        try {
            const response = await addToCartApi(productId);
            if (response?.data?.status === 'success') {
                setNumOfCartItems(response.data.numOfCartItems);
                setCartId(response.data.data._id);
                setCartDetails(response.data.data);
            }
            return response;
        } catch (error) {
            toast.error('Failed to add to cart');
            return error;
        }
    }

    async function getLoggedUserCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((res) => res)
            .catch((error) => error);
    }

    async function removeItemFromCart(productId) {
        try {
            const response = await removeFromCartApi(productId);
            if (response?.data?.status === 'success') {
                toast.success('Removed from cart');
                setNumOfCartItems(response.data.numOfCartItems);
                setCartDetails(response.data.data);
            }
            return response;
        } catch (error) {
            toast.error('Failed to remove from cart');
            return error;
        }
    }

    async function updateProductCount(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count: count,
        }, { headers })
            .then((res) => res)
            .catch((error) => error);
    }

    async function onlinePayment(cartId, shippingAddress) {
        const url = `${window.location.protocol}//${window.location.host}`;
        console.log(url);
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`, {
            shippingAddress: shippingAddress,
        }, { headers })
            .then((res) => res)
            .catch((error) => error);
    }

    async function cashPayment(cartId, shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`, {
            shippingAddress: shippingAddress,
        }, { headers })
            .then((res) => res)
            .catch((error) => error);
    }

    async function removeCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
            .then((res) => res)
            .catch((error) => error);
    }

    async function getLoggedUserOrders(userId) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
            .then((res) => res)
            .catch((error) => error);
    }






    // ----------->> Wish List <<-----------

    const [numOfFavoriteItems, setNumOfFavoriteItems] = useState(0);
    const [wishListDetails, setWishListDetails] = useState([]);

    async function getLoggedWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
            .then((res) => res)
            .catch((error) => error);
    }

    async function addToWishList(productId) {
        try {
            const response = await addToWishListApi(productId);
            if (response?.data?.status === 'success') {
                toast.success('Added to wishlist!');
                setNumOfFavoriteItems(response.data.data.length);
                setWishListDetails(response.data.data);
                return response;
            }
        } catch (error) {
            toast.error('Failed to add to wishlist');
            return error;
        }
    }

    async function removeItemFromWishList(productId) {
        try {
            const response = await removeFromWishListApi(productId);
            if (response?.data?.status === 'success') {
                toast.success('Removed from wishlist');
                setNumOfFavoriteItems(response.data.data.length);
                setWishListDetails(response.data.data);
                return response;
            }
            return response;
        } catch (error) {
            toast.error('Failed to remove from wishlist');
            return error;
        }
    }

    

    return <cartContext.Provider value={{
        cartId,
        setCartId,
        cartDetails,
        setCartDetails,
        numOfCartItems,
        setNumOfCartItems,
        addToCart,
        getLoggedUserCart,
        removeItemFromCart,
        updateProductCount,
        onlinePayment,
        cashPayment,
        removeCart,
        getLoggedUserOrders,
        wishListDetails,
        setWishListDetails,
        numOfFavoriteItems,
        setNumOfFavoriteItems,
        getLoggedWishList,
        addToWishList,
        removeItemFromWishList,
    }} >
        {props.children}
    </cartContext.Provider>
}