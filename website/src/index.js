import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ProfileState from './context/profile/ProfileState';
import VerifyState from './context/verify/VerifyState'
import PaymentState from './context/paymentportal/PaymentState'
import CourseState from './context/course/CourseState'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <ProfileState >
            <VerifyState >
                <PaymentState>
                    <CourseState>
                        <BrowserRouter>
                            <App />
                        </BrowserRouter>
                    </CourseState>
                </PaymentState>
            </VerifyState>
        </ProfileState>
);