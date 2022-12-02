import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  getAllAdminProjects,
  updateProjectStatus,
  deleteProject,
} from "../../components/database/project";
import {
  getAllAdminExperiences,
  updateExperienceStatus,
  deleteExperience,
} from "../../components/database/experience";
import Tag from "../../components/tag/tag";
import "./admin.scss";

const Admin = () => {
  const [allProjects, setAllProjects] = useState<any>([]);
  const [allExperiences, setAllExperiences] = useState<any>([]);

  const navigate = useNavigate();

  const getProjects = async () => {
    const projects = await getAllAdminProjects();
    setAllProjects(projects);
    console.log(projects);
  };

  const getExperiences = async () => {
    const experiences = await getAllAdminExperiences();
    setAllExperiences(experiences);
    console.log(experiences);
  };

  const tagColors: any = {
    html: "#e34c26",
    css: "#264de4",
    scss: "#c6538c",
    sass: "#c6538c",
    javascript: "#f0db4f",
    reactjs: "#06206e",
    node: "#3c873a",
    firebase: "#ffca28",
    mongodb: "#47a248",
    express: "#000000",
    python: "#3776ab",
    django: "#092e20",
    mysql: "#4479a1",
    "c#": "#00599c",
    "asp.net": "#512bd4",
    crud: "#56a526",
  };

  useEffect(() => {
    document.title = "Admin Panel | Tycho's Portfolio";

    getProjects();
    getExperiences();

    if (!localStorage.getItem("user")) {
      navigate("/admin/login");
    }
  }, []);

  return (
    <div className="admin-container">
      <div className="admin-content">
        <div className="admin">
          <div className="admin-projects">
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Tags</th>
                  <th>Github</th>
                  <th>Website</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allProjects.map((project: any) => (
                  <tr>
                    <td>{project.title}</td>
                    <td className="tags">
                      {project.tags.map((tag: any) => (
                        <div className="tag" key={tag}>
                          <Tag color={tagColors[tag]}>{tag}</Tag>
                        </div>
                      ))}
                    </td>
                    <td>{project.github}</td>
                    <td>{project.website}</td>
                    <td>
                      <div className="action-buttons">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            navigate("/admin/manage-project/" + project.id)
                          }
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteProject(project.id)}
                        >
                          Delete
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            updateProjectStatus(project.id, project.active);
                            getProjects();
                          }}
                        >
                          {project.active ? "Disable" : "Enable"}
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="admin-add-button">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/admin/manage-project")}
              >
                Add Project
              </motion.button>
            </div>
          </div>

          <div className="admin-experiences">
            <table>
              <thead>
                <tr>
                  <th>Experience</th>
                  <th>Date Started</th>
                  <th>Date Ended</th>
                  <th>Responsibilities</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {allExperiences.map((experience: any) => (
                  <tr key={experience.id}>
                    <td>{experience.title}</td>
                    <td>{experience.date_started}</td>
                    <td>{experience.date_ended}</td>
                    <td>
                      <ul>
                        {experience.responsibilities.map(
                          (responsibility: any) => (
                            <li>{responsibility}</li>
                          )
                        )}
                      </ul>
                    </td>
                    <td>
                      <div className="action-buttons">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() =>
                            navigate(
                              "/admin/manage-experience/" + experience.id
                            )
                          }
                        >
                          Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={(e) => {
                            deleteExperience(experience.id);
                          }}
                        >
                          Delete
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            updateExperienceStatus(
                              experience.id,
                              experience.active
                            );
                            getExperiences();
                          }}
                        >
                          {experience.active ? "Disable" : "Enable"}
                        </motion.button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="admin-add-button">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => navigate("/admin/manage-experience")}
              >
                Add Experience
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
