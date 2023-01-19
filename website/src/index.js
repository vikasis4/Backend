import React from 'react'
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import ProfileState from './context/profile/ProfileState';
import VerifyState from './context/verify/VerifyState'
import PaymentState from './context/paymentportal/PaymentState'
import CourseState from './context/course/CourseState'
import * as ReactDOM from 'react-dom/client';
import { VideoCallSocketProvider } from './context/websockets/VideoCallSockets'
import { PeerProvider } from './context/websockets/Peer'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <ProfileState >
            <VideoCallSocketProvider>
                <PeerProvider>
                    <VerifyState >
                        <PaymentState>
                            <CourseState>
                                <App />
                            </CourseState>
                        </PaymentState>
                    </VerifyState>
                </PeerProvider>
            </VideoCallSocketProvider>
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