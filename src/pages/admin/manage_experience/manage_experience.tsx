import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../../components/database/login";
import {
  getExperience,
  updateExperience,
  updateExperienceStatus,
  deleteExperience,
  checkIfExperienceExists,
  addExperience,
} from "../../../components/database/experience";
import "./manage_experience.scss";

const Manage_Experience = () => {
  const [experience, setExperience] = useState<any>([]);

  const [title, setTitle] = useState<any>("");
  const [dateStarted, setDateStarted] = useState<any>("");
  const [dateEnded, setDateEnded] = useState<any>("");
  const [about, setAbout] = useState<any>("");
  const [responsibilities, setResponsibilities] = useState<any>([]);
  const [active, setActive] = useState<any>("");

  const [responsibility, setResponsibility] = useState<any>("");

  const [loading, user] = useAuthState(auth);

  const navigate = useNavigate();

  const { id } = useParams();

  const getExperienceData = async () => {
    const ExperienceData = await getExperience(id);

    setExperience(ExperienceData?.[0]);
  };

  const addExperienceData = async (e: any) => {
    e.preventDefault();

    const experienceData = {
      title: title,
      dateStarted: dateStarted,
      dateEnded: dateEnded,
      about: about,
      responsibilities: responsibilities,
      active: active,
    };
    await addExperience(experienceData);
    navigate("/tychovanrosmalen/verysecreturl/admin");
  };

  const updateExperienceData = async (e: any) => {
    e.preventDefault();

    const experienceExists = await checkIfExperienceExists(experience.id);

    if (experienceExists) {
        
      const experienceData = {
        title: title,
        date_started: dateStarted,
        date_ended: dateEnded,
        about: about,
        responsibilities: responsibilities,
        active: active,
      };
      await updateExperience(id, experienceData);
      navigate("/tychovanrosmalen/verysecreturl/admin");
    } else {
      addExperienceData(experience);
    }
  };

  const addResponsibility = (e: any) => {
    e.preventDefault();

    setResponsibilities([...responsibilities, responsibility]);

    setExperience((currentExperience: { responsibilities: any }) => ({
      ...currentExperience,
      responsibilities: [...currentExperience.responsibilities, responsibility],
    }));
    sortResponsibilities(experience.responsibilities);
  };

  const sortResponsibilities = (e: any) => {
    const sortedResponsibilities = responsibilities.sort((a: any, b: any) => {
      return a - b;
    });
    setResponsibilities(sortedResponsibilities);
  };

  const setDefaultData = (experience: any) => {
    setTitle(experience.title);
    setAbout(experience.about);
    setDateStarted(experience.date_started);
    setDateEnded(experience.date_ended);
    setResponsibilities(experience.responsibilities);
    setActive(experience.active);
  };

  useEffect(() => {
    document.title = "Manage Experience | " + experience.title;

    getExperienceData();

    if (user) {
      return;
    }
    if (loading) {
      navigate("/tychovanrosmalen/verysecreturl/admin/login");
    }
  }, [user, loading]);

  return (
    <div className="manage-experience-container">
      <div className="manage-experience-content">
        <div className="timeline" key={experience.id}>
          <form onSubmit={updateExperienceData}>
            <div className="entry" key={experience.id}>
              <div className="left-side">
                <div className="title">
                  <input
                    type="text"
                    defaultValue={experience.title}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="date">
                  <input
                    type="text"
                    defaultValue={experience.date_started}
                    placeholder="Date Started"
                    onChange={(e) => setDateStarted(e.target.value)}
                  />{" "}
                  -{" "}
                  <input
                    type="text"
                    defaultValue={experience.date_ended}
                    placeholder="Date Ended"
                    onChange={(e) => setDateEnded(e.target.value)}
                  />
                </div>
              </div>
              <div className="body">
                <textarea
                  defaultValue={experience.about}
                  placeholder="About"
                  onChange={(e) => setAbout(e.target.value)}
                />

                <p>My responsibilities include:</p>
                <ul>
                  {experience.responsibilities?.map(
                    (responsibility: any, index: any) => (
                      <li
                        key={responsibility.id}
                        onClick={(e) => {
                          experience.responsibilities?.splice(index, 1);
                          setResponsibilities(experience.responsibilities);
                          setExperience(experience);
                        }}
                      >
                        {responsibility}
                      </li>
                    )
                  )}
                  <div className="add-responsibility">
                    <form onSubmit={addResponsibility}>
                      <p>- </p>
                      <input
                        type="text"
                        placeholder="Add responsibility"
                        onChange={(e) => setResponsibility(e.target.value)}
                      />
                    </form>
                  </div>
                </ul>

                <div className="experience-buttons">
                  {id !== undefined ? (
                    <div className="experience-button">
                      <li className="fa fa-save">
                        <button type="submit">Update</button>
                      </li>
                    </div>
                  ) : id === undefined ? (
                    <div className="experience-button">
                      <li className="fa fa-plus">
                        <button type="submit">Add</button>
                      </li>
                    </div>
                  ) : null}
                  <div className="experience-button">
                    <li className="fa fa-trash">
                      <button
                        onClick={() => {
                          deleteExperience(id);
                          navigate("/tychovanrosmalen/verysecreturl/admin");
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  </div>
                  <div className="experience-button">
                    <li className="fa fa-eye">
                      <button
                        onClick={() => {
                          updateExperienceStatus(id, experience.active);
                          navigate("/tychovanrosmalen/verysecreturl/admin");
                        }}
                      >
                        {experience.active ? "Disable" : "Enable"}
                      </button>
                    </li>
                  </div>
                  <div className="experience-button">
                    <li className="fa fa-bug">
                      <button
                        onClick={() => {
                          setDefaultData(experience);
                        }}
                      >
                        Solve Bug
                      </button>
                    </li>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Manage_Experience;
