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
