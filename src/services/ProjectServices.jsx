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

export const updateProject = (id, project) => {
  return fetch(`http://localhost:8000/projects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
    body: JSON.stringify(project),
  }).then((response) => response.json());
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
