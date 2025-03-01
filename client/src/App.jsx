//Importamos los componentes
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Toaster } from 'react-hot-toast';

//Importamos las páginas
import HomePage from './pages/HomePage';
import NewHackathonPage from './pages/NewHackathonPage';
import NotFound from './pages/NotFound';
import DetailHackathonPage from './pages/DetailHackathonPage';
import RegisterPage from './pages/RegisterPage';
import PrivateUserProfilePage from './pages/PrivateUserProfilePage';
import ChangePassword from './pages/ChangePassword';
import EditHackathonPage from './pages/EditHackathonInfoPage';

//Definimos el componente principal
const App = () => {
    return (
        <>
            <Header />

            {/* Aquí va el Toaster */}
            <Toaster
                position="top-center"
                toastOptions={{
                    duration: 5000,
                }}
            />

            {/* Aquí irán los endpoints dentro del componente Routes */}
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route
                    path="/users/profile"
                    element={<PrivateUserProfilePage />}
                />
                <Route
                    path="/users/password/change"
                    element={<ChangePassword />}
                />
                <Route path="/hackathon/new" element={<NewHackathonPage />} />
                <Route
                    path="/details/:hackathonId"
                    element={<DetailHackathonPage />}
                />
                <Route
                    path="/details/:hackathonId/edit"
                    element={<EditHackathonPage />}
                />

                <Route path="*" element={<NotFound />} />
            </Routes>

            <Footer />
        </>
    );
};

export default App;
