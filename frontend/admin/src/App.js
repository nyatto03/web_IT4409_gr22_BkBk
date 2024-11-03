import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./style/dark.scss";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/">
                        <Route index element={<h1>homepage</h1>} />
                        <Route path="users">
                            <Route index element={<h1>userpage</h1>} />
                            <Route
                                path=":userId"
                                element={<h1>userpage/userId</h1>}
                            />
                            <Route path="new" element={<h1>newpage</h1>} />
                        </Route>
                        <Route path="hotels">
                            <Route index element={<h1>hotelspage</h1>} />
                            <Route
                                path=":productId"
                                element={<h1>hotelspage/productId</h1>}
                            />
                            <Route
                                path="new"
                                element={<h1>hotelspage/new</h1>}
                            />
                        </Route>
                        <Route path="rooms">
                            <Route index element={<h1>rooms</h1>} />
                            <Route
                                path=":productId"
                                element={<h1>rooms/productId</h1>}
                            />
                            <Route path="new" element={<h1>rooms/new</h1>} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
