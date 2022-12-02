import db from "./connection.js";

const getAllProjects = async () => {
  const { data, error } = await db
    .from("projects")
    .select()
    .eq("active", true)
    .order("title", { ascending: true });

    if(error) {
      console.log("Error getting projects: ", error);
    }

  return data;
};

const getAllAdminProjects = async () => {
  const { data, error } = await db
    .from("projects")
    .select()
    .order("title", { ascending: true });

    if(error) {
      console.log("Error getting projects: ", error);
    }

  return data;
};

const getProject = async (id) => {
  const { data, error } = await db
  .from("projects")
  .select()
  .eq("id", id);

  if (data) {
    return data;
  } else {
    console.log("No such project!");
  }

  if (error) {
    console.log("Error getting project: ", error);
  }
};

const addProject = async (project) => {
  const { error } = await db
      .from("projects")
      .insert([
        {
          title: project.title,
          about: project.about,
          image: project.image,
          github: project.github,
          website: project.website,
          tags: project.tags,
          active: project.active,
        },
      ])
      .single();

  if (error) {
    console.error("Error adding project: ", error);
  }
};

const updateProject = async (id, projectData) => {
    const { error } = await db
      .from("projects")
      .update([
        {
          title: projectData.title,
          about: projectData.about,
          image: projectData.image,
          github: projectData.github,
          website: projectData.website,
          tags: projectData.tags,
          active: projectData.active,
        },
      ])
      .eq("id", id)
      .single();
  if (error) {
    console.error("Error updating project: ", error);
  }
};

const updateProjectStatus = async (id, active) => {
    const { error } = await db
      .from("projects")
      .update([
        {
          active: active,
        },
      ])
      .eq("id", id)
      .single();
  if (error) {
    console.error("Error updating project: ", error);
  }
};

const deleteProject = async (id) => {
  const { error } = await db
      .from("projects")
      .delete()
      .eq("id", id)
      .single();
 if (error) {
    console.error("Error deleting project: ", error);
  }
};

export {
  getAllProjects,
  getAllAdminProjects,
  getProject,
  addProject,
  updateProject,
  updateProjectStatus,
  deleteProject,
};
