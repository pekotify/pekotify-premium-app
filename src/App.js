import './App.css';
import './css/bulma/bulma.css';
import './css/index.css';
import Register from './Register';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Home from './Home';
import AdminPage from './AdminPage';
import AdminRoute from './AdminRoute';
import SingerRoute from './SingerRoute';
import SingerPage from './SingerPage';
import NonPrivateRoute from './NonPrivateRoute';
import DetailSong from './DetailSong';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={
                            <NonPrivateRoute>
                                <Register />
                            </NonPrivateRoute>
                        }
                        />
                        <Route path="/login" element={
                            <NonPrivateRoute>
                                <Login />
                            </NonPrivateRoute>
                        }
                        />
                        <Route
                            path="/admin-page"
                            element={
                                <AdminRoute>
                                    <AdminPage />
                                </AdminRoute>
                            }
                        />
                        <Route
                            path="/singer-page"
                            element={
                                <SingerRoute>
                                    <SingerPage />
                                </SingerRoute>
                            }
                        />
                        <Route
                            path="/singer-page/detail-song"
                            element={
                                <SingerRoute>
                                    <DetailSong />
                                </SingerRoute>
                            }
                        />
                        <Route
                            path="/singer-page/detail-song/edit/:id"
                            state={{ from: 'edit' }}
                            element={
                                <SingerRoute>
                                    <DetailSong />
                                </SingerRoute>
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;