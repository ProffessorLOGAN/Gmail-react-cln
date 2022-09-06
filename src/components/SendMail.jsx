import React from "react";
import "./SendMail.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { closeSendMessage } from "../features/mailSlice";
import { db } from "../database/firebase";
import firebase from "firebase/compat/app";

function SendMail() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    db.collection("EmailData").add({
      to: data.to,
      subject: data.subject,
      message: data.message,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
    dispatch(closeSendMessage());
  };

  const onError = () => {
    console.log("something went wrong!!!");
  };

  return (
    <div className="sendMail">
      <div className="sendMail_header">
        <h3>New Message</h3>
        <CloseIcon
          onClick={() => dispatch(closeSendMessage())}
          className="sendMail_close"
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <input
          name="to"
          placeholder="To"
          type="email"
          {...register("to", { required: true })}
        />
        {errors.to && <p className="sendMail_error"> To is Required!!</p>}

        <input
          name="subject"
          placeholder="Subject"
          type="text "
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <p className="sendMail_error"> Subject is Required!!</p>
        )}
        <input
          name="message"
          placeholder="Message"
          type="text"
          className="sendMail_message"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <p className="sendMail_error"> Meessage is Required!!</p>
        )}

        <div className="sendMail_options">
          <Button
            className="sendMail_send"
            varient="container"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
