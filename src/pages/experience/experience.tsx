import { useState, useEffect } from "react";
import { getAllExperiences } from "../../components/database/experience";
import "./experience.scss";

const Experience = () => {
  const [data, setData] = useState<any>([]);

  const getExperiences = async () => {
    const experiences = await getAllExperiences();
    setData(experiences);
  };

  useEffect(() => {
    document.title = "My Experience | Tycho's Portfolio";

    getExperiences();
  }, []);

  return (
    <div className="experience-container">
      <div className="experience-content">
        <div className="timeline">
          {data.map((experience: any) => (
            <div className="entry" key={experience.id}>
              <div className="title">
                <h2>{experience.title}</h2>
                <div className="date">
                  <p>{experience.date_started}</p>
                  <p className="divider-nonmobile">-</p>
                  <div className="divider"></div>
                  <p>{experience.date_ended}</p>
                </div>
              </div>
              <div className="body">
                <p className="about">{experience.about}</p>

                <p>My responsibilities include:</p>
                <ul>
                  {experience.responsibilities.map((responsibility: any, index: any) => (
                    <div className="responsibility" key={index}>
                      <li>{responsibility}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mobile-notlandscape">
        <img src="assets/rotatedevice.gif" alt="rotate device" />
        <h2>Please rotate your device for a better experience.</h2>
      </div>
    </div>
  );
};

export default Experience;
