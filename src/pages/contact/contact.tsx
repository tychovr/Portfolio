import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import "./contact.scss";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [timer, setTimer] = useState(0);

  const [state, handleSubmitForm] = useForm("xrgdjalb");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    handleSubmitForm(e);

    if (state.succeeded) {
      setTimer(60);
      setEmail("");
      setSubject("");
      setMessage("");
    }
    if (!state.succeeded && state.errors.length > 0) {
      setTimer(5);
    }
  };

  useEffect(() => {
    timer > 0 &&
      setTimeout(() => {
        localStorage.setItem("cooldown", timer.toString());
        setTimer(timer - 1);
      }, 1000);
  });

  useEffect(() => {
    document.title = "Contact | Tycho's Portfolio";

    const cooldown = localStorage.getItem("cooldown");
    const cooldownInt = parseInt(cooldown!);
    if (cooldownInt > 30) {
      setTimer(5);
    }
    if (cooldownInt > 1 && cooldownInt < 30) {
      setTimer(cooldownInt);
    }
  }, []);

  return (
    <div className="contact-container">
      <div className="contact-content">
        <div className="contact">
          <div className="contact-info">
            <h1>Contact</h1>
            <p>Feel free to contact me at any time!</p>
            <div className="contact-links">
              <div className="contact-link">
                <li className="fa fa-envelope"></li>
                <a href="mailto:tychovanrosmalen12@gmail.com?subject=Contact from website&body=Hello Tycho,">
                  Email
                </a>
              </div>
              <div className="contact-link">
                <li className="fa fa-linkedin"></li>
                <a href="https://www.linkedin.com/in/tycho-van-rosmalen-9398031b2/">
                  LinkedIn
                </a>
              </div>
              <div className="contact-link">
                <li className="fa fa-github"></li>
                <a
                  href="https://github.com/tychovr
                            "
                >
                  Github
                </a>
              </div>
            </div>

            {state.succeeded && timer > 0 && (
              <div className="contact-success">
                <i className="fa fa-check-circle alert__icon"></i>
                <p className="success-message">
                  Your message has been sent successfully!
                </p>
              </div>
            )}

            {!state.succeeded && timer > 0 && (
              <div className="contact-error">
                <i className="fa fa-exclamation-circle alert__icon"></i>
                <p className="error-message">
                  An error occurred while sending your message.
                </p>
              </div>
            )}

            {timer > 0 && (
              <div className="timer">
                <i className="fa fa-exclamation-circle alert__icon"></i>
                {state.succeeded && (
                <p className="cooldown">
                  You can send another message in {timer} seconds.
                </p>
                )}
                {!state.succeeded && (
                <p className="cooldown">
                  Please try again in {timer} seconds.
                </p>
                )}
              </div>
            )}
          </div>

          <div className="contact-form">
            <form
              onSubmit={handleSubmit}
              method="POST"
              encType="text/plain"
              className="contact-form"
            >
              <div className="contact-form-input">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />

                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  color="red"
                />

                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  onChange={(e) => setSubject(e.target.value)}
                  value={subject}
                  required
                />

                <ValidationError
                  prefix="Subject"
                  field="subject"
                  errors={state.errors}
                  color="red"
                />

                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={9}
                  cols={50}
                  maxLength={200}
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  disabled={timer > 0 ? true : false}
                  required
                ></textarea>

                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  color="red"
                />

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  disabled={timer > 0 ? true : false}
                >
                  Send
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="mobile-notlandscape">
        <img src="assets/rotatedevice.gif" alt="rotate device" />
        <h2>Please rotate your device for a better experience.</h2>
      </div>
    </div>
  );
};

export default Contact;
