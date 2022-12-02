import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getExperience,
  updateExperience,
  updateExperienceStatus,
  deleteExperience,
  addExperience,
} from "../../../components/database/experience";
import "./manage_experience.scss";

const Manage_Experience = () => {
  const [experience, setExperience] = useState<any>({
    title: "",
    date_started: "",
    date_ended: "",
    about: "",
    responsibilities: [],
    manualOrder: 0,
    active: true,
  });

  const [title, setTitle] = useState<any>("");
  const [dateStarted, setDateStarted] = useState<any>("");
  const [dateEnded, setDateEnded] = useState<any>("");
  const [about, setAbout] = useState<any>("");
  const [responsibilities, setResponsibilities] = useState<any>([]);
  const [active, setActive] = useState<any>(true);

  const [responsibility, setResponsibility] = useState<any>("");

  const navigate = useNavigate();

  const { id } = useParams();

  const getExperienceData = async () => {
    const ExperienceData = await getExperience(id);

    setExperience(ExperienceData?.[0]);
  };

  const addExperienceData = async (e: any) => {
    await addExperience(experience);
    navigate("/admin");
  };

  const updateExperienceData = async (e: any) => {
    e.preventDefault();

    if (id) {
      await updateExperience(id, experience);
      navigate("/admin");
    } else {
      addExperienceData(experience);
    }
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

    if (id) {
      getExperienceData();
      setDefaultData(experience);
    }

    if (!id) {
      setExperience({
        title: "Unnamed experience",
        date_started: "",
        date_ended: "",
        about: "No description",
        responsibilities: [],
        manualOrder: 0,
        active: true,
      });
    }

    if (!localStorage.getItem("user")) {
      navigate("/admin/login");
    }
  }, []);

  useEffect(() => {
    setExperience({
      title: title,
      date_started: dateStarted,
      date_ended: dateEnded,
      about: about,
      responsibilities: responsibilities,
      active: active,
    });
  }, [title, dateStarted, dateEnded, about, responsibilities, active]);

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
                    <p>- </p>
                    <input
                      type="text"
                      placeholder="Add responsibility"
                      onChange={(e) => setResponsibility(e.target.value)}
                    />
                    <div className="add-responsibility-button">
                      <button
                        onClick={(e: any) => {
                          e.preventDefault();

                          if (
                            !experience.responsibilities?.includes(
                              responsibility
                            )
                          ) {
                            setResponsibilities([
                              ...experience.responsibilities,
                              responsibility,
                            ]);
                          } else {
                            console.log(experience.responsibilities);
                            alert("Responsibility already exists");
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
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
                          navigate("/admin");
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
                          navigate("/admin");
                        }}
                      >
                        {experience.active ? "Disable" : "Enable"}
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
