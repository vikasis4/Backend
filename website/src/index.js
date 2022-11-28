import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ProfileState from './context/profile/ProfileState';
import VerifyState from './context/verify/VerifyState'
import PaymentState from './context/paymentportal/PaymentState'
import CourseState from './context/course/CourseState'
import { hydrateRoot } from 'react-dom/client';


const container = document.getElementById('root');
const root = hydrateRoot(container,
    <BrowserRouter>
        <ProfileState >
            <VerifyState >
                <PaymentState>
                    <CourseState>
                        <App />
                    </CourseState>
                </PaymentState>
            </VerifyState>
        </ProfileState>
    </BrowserRouter>
);