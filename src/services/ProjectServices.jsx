import { json } from "react-router-dom";

// services/ProjectServices.js
export const getAllProjects = () => {
  return fetch("http://localhost:8000/projects", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  }).then((response) => response.json());
};

export const getProjectById = (id) => {
  return fetch(`http://localhost:8000/projects/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  }).then((response) => response.json());
};

export const updateProject = (projectId, updatedProject) => {
  return fetch(`http://localhost:8000/projects/${projectId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },

    body: JSON.stringify(updatedProject),
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  });
};

export const deleteProject = (id) => {
  return fetch(`http://localhost:8000/projects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  });
};

export const createProject = (project) => {
  return fetch("http://localhost:8000/projects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
    body: JSON.stringify(project),
  }).then((response) => response.json());
};
