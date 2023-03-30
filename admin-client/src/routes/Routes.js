import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from "../pages/userList/UserList";
import User from "../pages/user/User";
import NewUser from "../pages/newUser/NewUser";
import ProductList from "../pages/productList/ProductList";
import Product from "../pages/product/Product";
import NewProduct from "../pages/newProduct/NewProduct";
import Layout from '../components/Layout';
import Home from '../pages/home/Home';
import Login from '../pages/login';
import RequireAuth from '../context/authContext/requireAuth';
import ListsList from '../pages/ListsList';
import List from '../pages/List';
import NewList from '../pages/NewList/';

const RoutesApp = ({ user }) => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/login"
                    element={user ? <Navigate to="/" replace /> : <Login />}
                />
                <Route
                    path="/"
                    element={
                        <RequireAuth>
                            <Layout>
                                <Home />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/users"
                    element={
                        <RequireAuth>
                            <Layout>
                                <UserList />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/user/:id"
                    element={
                        <RequireAuth>
                            <Layout>
                                <User />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/newUser"
                    element={
                        <RequireAuth>
                            <Layout>
                                <NewUser />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/movies"
                    element={
                        <RequireAuth>
                            <Layout>
                                <ProductList />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/product/:id"
                    element={
                        <RequireAuth>
                            <Layout>
                                <Product />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/newproduct"
                    element={
                        <RequireAuth>
                            <Layout>
                                <NewProduct />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/lists"
                    element={
                        <RequireAuth>
                            <Layout>
                                <ListsList />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/list/:id"
                    element={
                        <RequireAuth>
                            <Layout>
                                <List />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/newlist"
                    element={
                        <RequireAuth>
                            <Layout>
                                <NewList />
                            </Layout>
                        </RequireAuth>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp