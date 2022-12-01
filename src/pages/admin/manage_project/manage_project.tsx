import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, useParams } from "react-router-dom";
import { auth } from "../../../components/database/login";
import Tag from "../../../components/tag/tag";
import {
  getProject,
  addProject,
  updateProject,
  updateProjectStatus,
  deleteProject,
  checkIfProjectExists,
} from "../../../components/database/project";
import "./manage_project.scss";

const Manage_Project = () => {
  const [project, setProject] = useState<any>([]);

  const [title, setTitle] = useState("");
  const [about, setAbout] = useState("");
  const [image, setImage] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [tags, setTags] = useState<any>([]);
  const [active, setActive] = useState(true);

  const [loading, user] = useAuthState(auth);

  const navigate = useNavigate();

  const { id } = useParams();

  const getProjectData = async () => {
    const projectData = await getProject(id);

    setProject(projectData?.[0]);
  };

  const addProjectData = async (e: any) => {
    e.preventDefault();

    const projectData = {
      title: title,
      about: about,
      image: image,
      github: github,
      website: website,
      tags: tags,
      active: active,
    };
    await addProject(projectData);
    navigate("/admin");
  };

  const updateProjectData = async (e: any) => {
    e.preventDefault();

    const projectExists = await checkIfProjectExists(project.id);

    if (projectExists) {
      const projectData = {
        title: title,
        about: about,
        image: image,
        github: github,
        website: website,
        tags: tags,
        active: active,
      };
      await updateProject(id, projectData);
      navigate("/admin");
      
    } else {
      addProjectData(project);
    }
  };

  const sortTags = (e: any) => {
    const sortedTags = tags.sort((a: any, b: any) => {
      return a - b;
    });
    setTags(sortedTags);
  };

  const setDefaultData = (project: any) => {
    setTitle(project.title);
    setAbout(project.about);
    setImage(project.image);
    setGithub(project.github);
    setWebsite(project.website);
    setTags(project.tags);
    setActive(project.active);
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
    document.title = "Manage Project | " + project.title;

    getProjectData();

    if (user) {
      return;
    }
    if (loading) {
      navigate("/admin/login");
    }
  }, [user, loading]);

  return (
    <div className="manage-project-container">
      <div className="manage-project-content">
        <div className="manage-project">
          <div className="project" key={project.id}>
            <form className="project-form" onSubmit={updateProjectData}>
              <div className="project-left">
                <div className="project-image">
                  <img
                    src="https://via.placeholder.com/350x150"
                    alt="project"
                  />
                </div>

                <div className="project-title">
                  <input
                    type="text"
                    defaultValue={project.title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="project-description">
                  <textarea
                    defaultValue={project.about}
                    maxLength={125}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </div>

                <div className="project-tags">
                  {project.tags?.map((tag: string, index: any) => (
                    <div
                      className="project-tag"
                      onClick={() => {
                        project.tags?.splice(index, 1);
                        setTags(project.tags);
                        setProject(project);
                      }}
                      key={tag}
                    >
                      <Tag color={tagColors[tag]}>
                        {tag.toLocaleUpperCase()}
                      </Tag>
                    </div>
                  ))}

                  <div className="add-tag" date-mate-select="active">
                    <select
                      name="tags"
                      id="tags"
                      defaultValue="Add Tag"
                      onChange={(e: any) => {
                        if (
                          !project.tags?.includes(
                            e.target[e.target.selectedIndex].value
                          )
                        ) {
                          setTags([
                            ...tags,
                            e.target[e.target.selectedIndex].value,
                          ]);
                          setProject((currentProject: { tags: any }) => ({
                            ...currentProject,
                            tags: [
                              ...currentProject.tags,
                              e.target[e.target.selectedIndex].value,
                            ],
                          }));
                          sortTags(project.tags);
                        } else {
                          alert("Tag already exists");
                        }
                      }}
                    >
                      <option value="Add Tag" disabled hidden>
                        Add Tag
                      </option>
                      <option value="html">HTML</option>
                      <option value="css">CSS</option>
                      <option value="scss">SCSS</option>
                      <option value="sass">SASS</option>
                      <option value="javascript">JAVASCRIPT</option>
                      <option value="reactjs">REACTJS</option>
                      <option value="node">NODE</option>
                      <option value="firebase">FIREBASE</option>
                      <option value="mongodb">MONGODB</option>
                      <option value="express">EXPRESS</option>
                      <option value="python">PYTHON</option>
                      <option value="django">DJANGO</option>
                      <option value="mysql">MYSQL</option>
                      <option value="c#">C#</option>
                      <option value="asp.net">ASP.NET</option>
                      <option value="crud">CRUD</option>
                    </select>
                  </div>
                </div>

                <div className="project-links">
                  {project.github !== "N/A" ? (
                    <div className="project-link">
                      <li className="fa fa-github"></li>
                      <a href={project.github} target="_blank">
                        Github
                      </a>
                    </div>
                  ) : null}
                  {project.website !== "N/A" ? (
                    <div className="project-link">
                      <li className="fa fa-globe"></li>
                      <a href={project.website} target="_blank">
                        Website
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="project-right">
                <div className="project-input-links">
                  <div className="project-input-link">
                    <li className="fa fa-image"></li>
                    <input
                      type="text"
                      placeholder="Image Path"
                      defaultValue={project.image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </div>
                  <div className="project-input-link">
                    <li className="fa fa-github"></li>
                    <input
                      type="text"
                      placeholder="Github Link"
                      defaultValue={project.github}
                      onChange={(e) => setGithub(e.target.value)}
                    />
                  </div>
                  <div className="project-input-link">
                    <li className="fa fa-globe"></li>
                    <input
                      type="text"
                      placeholder="Website Link"
                      defaultValue={project.website}
                      onChange={(e) => {
                        setWebsite(e.target.value);
                        console.log(id);
                      }}
                    />
                  </div>
                </div>

                <div className="project-buttons">
                  {id !== undefined ? (
                    <div className="project-button">
                      <li className="fa fa-save">
                        <button type="submit">Update</button>
                      </li>
                    </div>
                  ) : id === undefined ? (
                    <div className="project-button">
                      <li className="fa fa-plus">
                        <button type="submit">Add</button>
                      </li>
                    </div>
                  ) : null}
                  <div className="project-button">
                    <li className="fa fa-trash">
                      <button
                        onClick={() => {
                          deleteProject(id);
                          navigate("/admin");
                        }}
                      >
                        Delete
                      </button>
                    </li>
                  </div>
                  <div className="project-button">
                    <li className="fa fa-eye">
                      <button
                        onClick={() => {
                          updateProjectStatus(id, project.active);
                          navigate("/admin");
                        }}
                      >
                        {project.active ? "Disable" : "Enable"}
                      </button>
                    </li>
                  </div>
                  <div className="project-button">
                    <li className="fa fa-bug">
                      <button
                        onClick={() => {
                          setDefaultData(project);
                        }}
                      >
                        Solve Bug
                      </button>
                    </li>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Manage_Project;
