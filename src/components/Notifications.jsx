//Import styles and libraries
import './__components.scss';
import React, { useEffect } from 'react';

// Import assets
import iconClose from '../assets/img/icon-close.svg';

function Notifications({type, onCloseNotification}) {
    // Automatically close notification after 5 seconds
    useEffect(() => {
        if (type) {
            const timer = setTimeout(() => {
                onCloseNotification();
            }, 5000);
            // Cleanup timeout on component unmount or when notificationModal changes
            return () => clearTimeout(timer);
        }
    });
    // Define a message based on the type
    const notificationMessage
        = type === 'user-signin'
        ? "User SIGNIN successfully"
        : type === 'user-edit'
        ? "User EDITED successfully"
        : type === 'user-delete'
        ? "User DELETED successfully"
        : type === 'user-create'
        ? "User CREATED successfully"
        : type === 'task-edit'
        ? "Task EDITED successfully"
        : type === 'task-delete'
        ? "Task DELETED successfully"
        : type === 'task-create'
        ? "Task CREATED successfully"
        : "Notification";

    return (
        <div className='notifications' role="alert" aria-live="polite">
            <header className='notification-header'>
                <p className='bold'>Hey!</p>
                <button onClick={onCloseNotification} className="notification-close">
                    <img className='icon' src={iconClose} alt='delete icon' width='20px' height='20px'/>
                </button>
            </header>
            <div className='notification-body'>
                <div className='notification-text'>
                    {notificationMessage}
                </div>
            </div>
        </div>
    )
}

export default Notifications