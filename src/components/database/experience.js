import {
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  collection,
  query,
  where,
  getFirestore,
  orderBy,
  getDocs,
  getDoc,
} from "firebase/firestore";
import app from "./connection.js";

const db = getFirestore(app);

const getAllExperiences = async () => {
  const q = query(
    collection(db, "experience"),
    where("active", "==", true),
    orderBy("manualOrder", "asc")
  );

  const querySnapshot = await getDocs(q);
  const experiences = [];

  querySnapshot.forEach((doc) => {
    experiences.push({ ...doc.data(), id: doc.id });
  });
  return experiences;
};

const getAllAdminExperiences = async () => {
  const q = query(collection(db, "experience"), orderBy("manualOrder", "asc"));

  const querySnapshot = await getDocs(q);
  const experiences = [];

  querySnapshot.forEach((doc) => {
    experiences.push({ ...doc.data(), id: doc.id });
  });
  return experiences;
};

const checkIfExperienceExists = async (id) => {
  const q = doc(db, "experience", id);

  const docSnap = await getDoc(q);
  return docSnap.exists();
};

const getExperience = async (id) => {
  const q = doc(db, "experience", id);

  const experience = [];
  const docSnap = await getDoc(q);

  if(docSnap.exists()) {
    experience.push({ ...docSnap.data(), id: docSnap.id });
  } else {
    console.log("No such document!");
  }

  return experience;
};

const addExperience = async (experience) => {
  try {
    await addDoc(collection(db, "experience"), experience);
  } catch (e) {
    console.error("Error adding experience: ", e);
  }
};

const updateExperience = async (id, experienceData) => {
  try {
    await updateDoc(doc(db, "experience", id), {
      title: experienceData.title,
      about: experienceData.about,
      date_started: experienceData.date_started,
      date_ended: experienceData.date_ended,
      responsibilities: experienceData.responsibilities,
      manualOrder: experienceData.manualOrder,
    });
  } catch (e) {
    console.error("Error updating experience: ", e);
  }
};

const updateExperienceStatus = async (id, active) => {
  try {
    await updateDoc(doc(db, "experience", id), {
      active: !active,
    });
  } catch (e) {
    console.error("Error updating experience status: ", e);
  }
};

const deleteExperience = async (id) => {
  try {
    await deleteDoc(doc(db, "experience", id));
  } catch (e) {
    console.error("Error deleting experience: ", e);
  }
};

export {
  getAllExperiences,
  getAllAdminExperiences,
  getExperience,
  checkIfExperienceExists,
  addExperience,
  updateExperience,
  updateExperienceStatus,
  deleteExperience,
};
