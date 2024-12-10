import React, { useState } from 'react';

// Import data from REDUX
import { useSelector } from 'react-redux';

// Import components
import Notifications from '../components/Notifications.jsx';

// User & Products Pages
import Users from '../features/users/pages/Users.jsx';
import Products from '../features/products/pages/Products.jsx';
import SignInForm from '../features/users/components/SignInForm.jsx';
import { Navigate } from 'react-router-dom';

function AreaCMS() {

    // Access user state from Redux to check if logged in
    const user = useSelector((state) => state.user);
    const isLoggedIn = !!user.token;
    const userRole = user.role;
    // States for notifications
    const [notificationModal, setNotificationModal] = useState(false);
    const [notificationType, setNotificationType] = useState('');

    // NOTIFICATION. Show create modal
    const notification = (type) => {
        setNotificationType(type);
        setNotificationModal(true);
    };
    // Close Notification
    const closeNotification = () => {
        setNotificationModal(false);
    }

    // If user is not logged in, show sign-in modal
    if (!isLoggedIn) {
        return (
            <SignInForm
                onSignInSuccess={() => {
                    notification('user-signin');
                }}
            />
        );
    }
    // Redirect unauthorized users
    if (isLoggedIn && userRole !== 'employee') {
        return <Navigate to="/" replace />;
    }

    return (
        <div className='page'>
            <div className='layout-cms'>
                <Users />
                <Products />
                {notificationModal && (
                    <Notifications
                        type={notificationType}
                        onCloseNotification={closeNotification}
                    />
                )}
            </div>
        </div>
    )
}

export default AreaCMS