import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "./context/AuthContext";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Single from "./pages/single/Single";
import New from "./pages/new/New";
import NewHotel from "./pages/newHotel/NewHotel";
import NewRoom from "./pages/newRoom/NewRoom";

import "./style/dark.scss";



function App() {
    const ProtectedRoute = ({ children }) => {
        const { user } = useContext(AuthContext);

        if (!user) {
            return <Navigate to="/login" />;
        }

        return children;
    };

    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route path="login" element={<Login />} />
                        <Route
                            index
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route path="users">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":userId"
                                element={
                                    <ProtectedRoute>
                                        <Single />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <ProtectedRoute>
                                        <New />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path="hotels">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":productId"
                                element={
                                    <ProtectedRoute>
                                        <Single />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <ProtectedRoute>
                                        <NewHotel />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                        <Route path="rooms">
                            <Route
                                index
                                element={
                                    <ProtectedRoute>
                                        <List />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path=":productId"
                                element={
                                    <ProtectedRoute>
                                        <Single />
                                    </ProtectedRoute>
                                }
                            />
                            <Route
                                path="new"
                                element={
                                    <ProtectedRoute>
                                        <NewRoom />
                                    </ProtectedRoute>
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
