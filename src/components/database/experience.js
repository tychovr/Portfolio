import db from "./connection.js";

const getAllExperiences = async () => {
  const { data, error } = await db
    .from("experiences")
    .select()
    .eq("active", true)
    .order("manualOrder", { ascending: true });

  if (error) {
    console.log("Error getting experiences: ", error);
  }

  return data;
};

const getAllAdminExperiences = async () => {
  const { data, error } = await db
    .from("experiences")
    .select()
    .order("manualOrder", { ascending: true });

  if (error) {
    console.log("Error getting experiences: ", error);
  }

  return data;
};

const getExperience = async (id) => {
  const { data, error } = await db
    .from("experiences")
    .select()
    .eq("id", id);

  if (data) {
    return data;
  } else {
    console.log("No such experience!");
  }

  if (error) {
    console.log("Error getting experience: ", error);
  }
};

const addExperience = async (experience) => {
  const { error } = await db
    .from("experiences")
    .insert([
      {
        title: experience.title,
        about: experience.about,
        date_started: experience.date_started,
        date_ended: experience.date_ended,
        responsibilities: experience.responsibilities,
        manualOrder: experience.manualOrder,
        active: experience.active,
      },
    ])
    .single();
  if (error) {
    console.error("Error adding experience: ", error);
  }
};

const updateExperience = async (id, experienceData) => {
  const { error } = await db
    .from("experiences")
    .update([
      {
        title: experienceData.title,
        about: experienceData.about,
        date_started: experienceData.date_started,
        date_ended: experienceData.date_ended,
        responsibilities: experienceData.responsibilities,
        manualOrder: experienceData.manualOrder,
        active: experienceData.active,
      },
    ])
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error updating experience: ", error);
  }
};

const updateExperienceStatus = async (id, active) => {
  const { error } = await db
    .from("experiences")
    .update([
      {
        active: active,
      },
    ])
    .eq("id", id)
    .single();
  if (error) {
    console.error("Error updating experience status: ", error);
  }
};

const deleteExperience = async (id) => {
  const { error } = await db.from("experiences").delete().eq("id", id).single();

  if (error) {
    console.error("Error deleting experience: ", error);
  }
};

export {
  getAllExperiences,
  getAllAdminExperiences,
  getExperience,
  addExperience,
  updateExperience,
  updateExperienceStatus,
  deleteExperience,
};
