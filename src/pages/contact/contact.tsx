import { useEffect } from "react";
import Navbar from "../../components/navbar/navbar";
import { motion } from "framer-motion";
import { useForm, ValidationError } from "@formspree/react";
import "./contact.scss";

const Contact = () => {
  const [state, handleSubmit] = useForm("xrgdjalb");

  useEffect(() => {
    document.title = "Contact | Tycho's Portfolio";
  }, []);

  return (
    <div className="contact-container">
      <Navbar />
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
                <a href="https://www.linkedin.com/in/tycho-van-rosmalen-1b1b1b1b1/">
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
                <input type="text" name="email" id="email" />

                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                />

                <label htmlFor="subject">Subject</label>
                <input type="text" name="subject" id="subject" />

                <ValidationError
                  prefix="Subject"
                  field="subject"
                  errors={state.errors}
                />

                <label htmlFor="message">Message</label>
                <textarea name="message" id="message" rows={9} cols={50} maxLength={200}>
                </textarea>

                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                />

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="submit"
                  disabled={state.submitting}
                >
                  Send
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
