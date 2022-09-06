import "./App.css";
import React, { useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Email from "./components/Email";
import EmailList from "./components/EmailList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SendMail from "./components/SendMail";
import { useDispatch, useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { selectUser, login } from "./features/userSlice";
import Login from "./auth/Login";
import { auth } from "./database/firebase";

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // the user is logged in
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      }
    });
  }, []);

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="App">
          <Header />
          <div className="app_body">
            <Sidebar />

            <Routes>
              <Route path="/Email" element={<Email />} />

              <Route path="/" element={<EmailList />} />
            </Routes>
            {sendMessageIsOpen && <SendMail />}
          </div>
        </div>
      )}
    </Router>
  );
}

export default App;
