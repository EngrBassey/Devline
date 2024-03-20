import React from 'react';

const StudentAuth = {

    register: async (username, email, password) => {
        try {
            const response = await fetch('http://devline.live/api/student/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email, password })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error registering student:', error);
            return { success: false, message: 'An error occurred while registering' };
        }
    },

    login: async (username, password) => {
        try {
            const response = await fetch('http://devline.live/api/student/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });
            const data = await response.json();
            localStorage.setItem('student_id', data.id)
            localStorage.setItem('student_name', data.username)

            return data;
        } catch (error) {
            console.error('Error logging in student:', error);
            return { success: false, message: 'An error occurred while logging in' };
        }
    },

    logout: async () => {
        try {
            const response = await fetch('http://devline.live/api/student/logout');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error logging out student:', error);
            return { success: false, message: 'An error occurred while logging out' };
        }
    },

    getProfile: async () => {
        try {
            const id = localStorage.getItem('student_id');
            const response = await fetch('http://devline.live/api/student/profile/', {
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

    updateProfile: async (username, email) => {
        try {
            const response = await fetch('http://devline.live/api/student/profile/', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, email })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error updating student profile:', error);
            return { success: false, message: 'An error occurred while updating profile' };
        }
    },

    deleteAccount: async () => {
        try {
            const response = await fetch('http://devline.live/api/student/delete', {
                method: 'DELETE'
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error deleting student account:', error);
            return { success: false, message: 'An error occurred while deleting account' };
        }
    },

    getRequests: async () => {
        const id = localStorage.getItem('student_id');
        console.log(id)
        try {
            const response = await fetch('http://devline.live/api/student/requests', {
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


    searchMentor: async (subject) => {
        const id = localStorage.getItem('student_id');
        try {
            const response = await fetch('http://devline.live/api/student/search/mentors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subject)
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error searching for mentors:', error);
            return { success: false, message: 'An error occurred while searching for mentors' };
        }
    },

    sendMentorshipRequest: async (mentorId, subjectId, message) => {
        const id = localStorage.getItem('student_id');
        try {
            const response = await fetch('http://devline.live/api/student/request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${id}`
                },
                body: JSON.stringify({ mentor_id: mentorId, subject: subjectId, message })
            });
            const data = await response.json();
            console.log(data)
            return data;
        } catch (error) {
            console.error('Error sending mentorship request:', error);
            return { success: false, message: 'An error occurred while sending mentorship request' };
        }
    },

    getMentor: async (mentorId) => {
        try {
            const response = await fetch('http://devline.live/api/mentor/mentor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mentor_id: mentorId })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error completing request:', error);
            return { success: false, message: 'An error occurred while completing request' };
        }
    },

    completeRequest: async (requestId) => {
        const id = localStorage.getItem('student_id');
        try {
            const response = await fetch('http://devline.live/api/student/request/complete', {
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
    },

    reviewMentor: async (requestId, rating, reviewText) => {
        const id = localStorage.getItem('student_id');
        try {
            const response = await fetch('http://devline.live/api/student/review/mentor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${id}`
                },
                body: JSON.stringify({ request_id: requestId, rating, review_text: reviewText })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error reviewing mentor:', error);
            return { success: false, message: 'An error occurred while reviewing mentor' };
        }
    },

    resetPasswordMessage: async (email) => {
        try {
            const response = await fetch('http://devline.live/api/student/reset-password-message', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error initializing password reset:', error);
            return { success: false, message: 'An error occurred while initializing password reset' };
        }
    }
};

export default StudentAuth;
