// import libs
import { Outlet, useLocation } from 'react-router-dom';

// import components
import { ScrollToTop, BackTopButton } from '../components/Common';
import Header from '../components/Header';
import BottomNav from '../components/BottomNav';

function RootLayout() {
    // const to know page location of the user
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
        </div>
    )
}

export default RootLayout