import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserList from "../pages/userList/UserList";
import User from "../pages/user/User";
import NewUser from "../pages/newUser/NewUser";
import MovieList from "../pages/movieList";
import Movie from "../pages/movie";
import NewMovie from "../pages/newMovie";
import Layout from '../components/Layout';
import Home from '../pages/home/Home';
import Login from '../pages/login';
import RequireAuth from '../context/authContext/requireAuth';
import ListsList from '../pages/ListsList';
import List from '../pages/List';
import NewList from '../pages/newList';

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
                                <MovieList />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/movie/:id"
                    element={
                        <RequireAuth>
                            <Layout>
                                <Movie />
                            </Layout>
                        </RequireAuth>
                    }
                />
                <Route
                    path="/newmovie"
                    element={
                        <RequireAuth>
                            <Layout>
                                <NewMovie />
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