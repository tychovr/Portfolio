import app from "./connection.js";
import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  getDoc,
  getFirestore,
  collection,
  query,
  where,
  orderBy,
} from "firebase/firestore";

const db = getFirestore(app);

const getAllProjects = async () => {
  const q = query(
    collection(db, "project"),
    where("active", "==", true),
    orderBy("title", "asc")
  );

  const querySnapshot = await getDocs(q);
  const projects = [];

  querySnapshot.forEach((doc) => {
    projects.push({ ...doc.data(), id: doc.id });
  });
  return projects;
};

const getAllAdminProjects = async () => {
  const q = query(collection(db, "project"), orderBy("title", "asc"));

  const querySnapshot = await getDocs(q);
  const projects = [];
  
  querySnapshot.forEach((doc) => {
    projects.push({ ...doc.data(), id: doc.id });
  });
  return projects;
};

const getProject = async (id) => {
  const q = doc(db, "project", id);

  const project = [];
  const docSnap = await getDoc(q);

  if (docSnap.exists()) {
    project.push({ ...docSnap.data(), id: docSnap.id });
  } else {
    console.log("No such document!");
  }

    return project;
};

const checkIfProjectExists = async (id) => {
  const q = doc(db, "project", id);

  const docSnap = await getDoc(q);
  return docSnap.exists();
};

const addProject = async (project) => {
  try {
    await addDoc(collection(db, "project"), project);
  } catch (e) {
    console.error("Error adding project: ", e);
  }
};

const updateProject = async (id, projectData) => {
  
  try {
    await updateDoc(doc(db, "project", id), {
      title: projectData.title,
      about: projectData.about,
      image: projectData.image,
      github: projectData.github,
      website: projectData.website,
      tags: projectData.tags,
    });
  } catch (e) {
    console.error("Error updating project: ", e);
  }
};

const updateProjectStatus = async (id, active) => {
  try {
    await updateDoc(doc(db, "project", id), {
      active: !active,
    });
  } catch (e) {
    console.error("Error updating project: ", e);
  }
};

const deleteProject = async (id) => {
  try {
    await deleteDoc(doc(db, "projects", id));
  } catch (e) {
    console.error("Error deleting project: ", e);
  }
};

export {
  getAllProjects,
  getAllAdminProjects,
  getProject,
  checkIfProjectExists,
  addProject,
  updateProject,
  updateProjectStatus,
  deleteProject,
};
