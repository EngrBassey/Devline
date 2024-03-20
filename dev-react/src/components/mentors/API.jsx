import React from 'react';

const MentorAuth = {

    register: async (userData) => {
        try {
            const response = await fetch('http://devline.live/api/mentor/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error registering mentor:', error);
            return { success: false, message: 'An error occurred while registering' };
        }
    },

    login: async (username, password) => {
        try {
            const response = await fetch('http://devline.live/api/mentor/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            localStorage.setItem('mentor_id', data.id);
            localStorage.setItem('name', data.name);
            console.log(localStorage.getItem('mentor_id'))
            return data;
        } catch (error) {
            console.error('Error logging in mentor:', error);
            return { success: false, message: 'An error occurred while logging in' };
        }
    },

    logout: async () => {
        try {
            const response = await fetch('http://devline.live/api/mentor/logout');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error logging out mentor:', error);
            return { success: false, message: 'An error occurred while logging out' };
        }
    },

    getProfile: async () => {
        try {
            const id = localStorage.getItem('mentor_id');
            const response = await fetch('http://devline.live/api/mentor/profile/', {
                headers: {
                    'Authorization': `${id}`
                }
                });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting student profile:', error);
            return { success: false, message: 'An error occurred while fetching profile' };
        }
    },

    deleteAccount: async () => {
        try {
            const response = await fetch('http://devline.live/api/mentor/delete', {
                method: 'DELETE'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting mentor account:', error);
            return { success: false, message: 'An error occurred while deleting account' };
        }
    },

    getRequests: async () => {
        const id = localStorage.getItem('mentor_id');
        try {
            console.log(id)
            const response = await fetch('http://devline.live/api/mentor/requests', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${id}`
                }
            });
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error('Error getting mentorship requests:', error);
            return { success: false, message: 'An error occurred while fetching mentorship requests' };
        }
    },

    getRequest: async (requestId) => {
        const id = localStorage.getItem('mentor_id');
        try {
            const response = await fetch('http://devline.live/api/mentor/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${id}`
                },
                body: JSON.stringify({ request_id: requestId })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting mentorship request:', error);
            return { success: false, message: 'An error occurred while fetching mentorship request' };
        }
    },

    acceptRequest: async (requestId) => {
        const id = localStorage.getItem('mentor_id');
        try {
            const response = await fetch('http://devline.live/api/mentor/accept', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${id}`
                },
                body: JSON.stringify({ request_id: requestId })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error accepting mentorship request:', error);
            return { success: false, message: 'An error occurred while accepting mentorship request' };
        }
    },

    completeRequest: async (requestId) => {
        const id = localStorage.getItem('mentor_id');
        try {
            const response = await fetch('http://devline.live/api/mentor/request/complete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${id}`
                },
                body: JSON.stringify({ request_id: requestId })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error completing request:', error);
            return { success: false, message: 'An error occurred while completing request' };
        }
    }
};

export default MentorAuth;
