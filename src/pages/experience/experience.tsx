import { useState, useEffect } from "react";
import { getAllExperiences } from "../../components/database/experience";
import Navbar from "../../components/navbar/navbar";
import "./experience.scss";

const Experience = () => {
  const [data, setData] = useState<any>([]);

  const getExperiences = async () => {
    const experiences = await getAllExperiences();
    setData(experiences);
    console.log(experiences[0].responsibilities[0].id);
  };

  useEffect(() => {
    document.title = "My Experience | Tycho's Portfolio";

    getExperiences();
  }, []);

  return (
    <div className="experience-container">
      <Navbar />
      <div className="experience-content">
        <div className="timeline">
          {data.map((experience: any) => (
            <div className="entry" key={experience.id}>
              <div className="title">
                <h2>{experience.title}</h2>
                <div className="date">
                  <p>{experience.date_started}</p>
                  <p className="divider">-</p>
                  <p>{experience.date_ended}</p>
                </div>
              </div>
              <div className="body">
                <p>{experience.description}</p>

                <p>My responsibilities include:</p>
                <ul>
                  {experience.responsibilities.map((responsibility: any) => (
                    <li key={responsibility.id}>{responsibility}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;