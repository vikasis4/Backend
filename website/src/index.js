import React from 'react'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ProfileState from './context/profile/ProfileState';
import VerifyState from './context/verify/VerifyState'
import PaymentState from './context/paymentportal/PaymentState'
import CourseState from './context/course/CourseState'
import * as ReactDOM from 'react-dom/client';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
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
// const container = document.getElementById('root');
// const root = ReactDOM.hydrateRoot(container,
//     <React.StrictMode>
//         <Router>
//             <ProfileState >
//                 <VerifyState >
//                     <PaymentState>
//                         <CourseState>
//                             <App />
//                         </CourseState>
//                     </PaymentState>
//                 </VerifyState>
//             </ProfileState>
//         </Router>
//     </React.StrictMode>
// );