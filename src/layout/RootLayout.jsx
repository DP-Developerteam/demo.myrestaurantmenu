// import libs
import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
// import READUX
import { useDispatch } from 'react-redux';
import { sessionSignInThunk } from '../features/users/userSlice';
// import components
import { ScrollToTop, BackTopButton } from '../components/Common';
import Header from '../components/Header';
import Footer from '../components/Footer';
import BottomNav from '../components/BottomNav';

function RootLayout() {
    // REDUX declarations
    const dispatch = useDispatch();

    // Check auth status when layout mounts
    useEffect(() => {
        dispatch(sessionSignInThunk());
    }, [dispatch]);

    // Declare location for useLocation
    const location = useLocation();
    // Paths where BottomNav should not be rendered
    const excludedPaths = ['/', '/cms'];

    return (
        <div className='dp-wrapper'>
            <ScrollToTop/>
            <BackTopButton />
            <Header />
            <div className='dp-content'>
                <Outlet />
            </div>
            {!excludedPaths.includes(location.pathname) && <BottomNav  />}
            <Footer />
        </div>
    )
}

export default RootLayout