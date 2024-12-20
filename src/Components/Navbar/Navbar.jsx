import React, { useContext } from 'react'
import styles from './Navbar.module.css'
import logo from '../../assets/freshcart-logo.svg'
import { Link } from 'react-router-dom'
import { cartContext } from '../../Context/CartContext.js'
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher.jsx'
import { Toaster } from 'react-hot-toast'

export default function Navbar({ userData, logOut }) {

    let { numOfCartItems, numOfFavoriteItems } = useContext(cartContext);

    return <>
        <Toaster position="top-right" />
        <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt="Fresh Cart" height="30" />
                </Link>
                <button className="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
                    aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="collapsibleNavId">
                    {userData !== null ?
                        <ul className="navbar-nav me-auto mt-2 mt-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link" to="products">Products</Link>
                            </li>
                            
                            <li className="nav-item">
                                <Link className="nav-link" to="allorders">Orders</Link>
                            </li>

                        </ul> : null}

                    {/* <ul className="navbar-nav mx-auto mt-2 mt-lg-0">
                        <li className="nav-item d-flex align-items-center">
                            <i className='fab fa-facebook mx-2'></i>
                            <i className='fab fa-twitter mx-2'></i>
                            <i className='fab fa-instagram mx-2'></i>
                            <i className='fab fa-tiktok mx-2'></i>
                            <i className='fab fa-linkedin mx-2'></i>
                            <i className='fab fa-youtube mx-2'></i>
                        </li>
                    </ul> */}

                    <ul className="navbar-nav ms-auto mt-2 mt-lg-0">

                        {userData == null ?
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="register">Register</Link>
                                </li>
                            </> : <>
                                <li className="nav-item position-relative">
                                    <Link className="nav-link" to="wishlist">
                                        <i className="fa-solid fa-heart fa-xl" style={{color: 'var(--favorite-color)'}}></i>
                                        {
                                            numOfFavoriteItems > 0 ? <span className='badge bg-main text-white position-absolute top-0 end-0'>{numOfFavoriteItems}</span> : null
                                        }
                                    </Link>
                                </li>
                                <li className="nav-item position-relative">
                                    <Link className="nav-link" to="cart">
                                        <i className='fas fa-shopping-cart fa-xl nav-icon'></i>
                                        {
                                            numOfCartItems > 0 ? <span className='badge bg-main text-white position-absolute top-0 end-0'>{numOfCartItems}</span> : null
                                        }
                                    </Link>
                                </li>

                                <li className="nav-item d-flex align-items-center">
                                    <ThemeSwitcher logOut={logOut} />
                                </li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </nav>

    </>
}
