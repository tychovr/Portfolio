import { useState, useEffect } from "react";
import { getAllProjects } from "../../components/database/project";
import Tag from "../../components/tag/tag";
import "./projects.scss";

const Projects = () => {
  
  const [data, setData] = useState<any>([]);

  const getProjects = async () => {
    const projects = await getAllProjects();
    setData(projects);
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
    document.title = "My Projects | Tycho's Portfolio";

    getProjects();
  }, []);

  return (
    <div className="projects-container">
      <div className="projects-content">
        <div className="projects">
          {data.map((project: any) => (
            <div className="project" key={project.id}>
              <div className="project-image">
                <img src={project.image} alt="project" />
              </div>

              <div className="project-title">
                <h3>{project.title}</h3>
              </div>
              <div className="project-description">
                <p>{project.about}</p>
              </div>

              <div className="bottom">
                <div className="project-tags">
                  {project.tags.map((tag: string) => (
                    <div className="project-tag" key={tag}>
                      <Tag color={tagColors[tag]}>
                        {tag.toLocaleUpperCase()}
                      </Tag>
                    </div>
                  ))}
                </div>

                <div className="project-links">
                  <div className="project-link">
                    <li className="fa fa-github"></li>
                    {project.github !== "N/A" ? (
                      <a href={project.github} target="_blank" rel="norefferer">
                        Github
                      </a>
                    ) : null}
                  </div>
                  {project.website !== "N/A" ? (
                    <div className="project-link">
                      <li className="fa fa-globe"></li>
                      <a
                        href={project.website}
                        target="_blank"
                        rel="norefferer"
                      >
                        Website
                      </a>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mobile-notlandscape">
        <img src="assets/rotatedevice.gif" />
        <h2>Please rotate your device for a better experience.</h2>
      </div>
    </div>
  );
};

export default Projects;
