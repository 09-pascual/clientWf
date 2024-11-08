export const getWorkerProjects = () => {
  return fetch("http://localhost:8000/projects", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  }).then((response) => response.json());
};
export const getAllWorkers = () => {
  return fetch("http://localhost:8000/workers", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  }).then((response) => response.json());
};

export const getWorkerById = (id) => {
  return fetch(`http://localhost:8000/workers/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  }).then((response) => response.json());
};

export const updateWorker = (workerId, worker) => {
  return fetch(`http://localhost:8000/workers/${workerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
    body: JSON.stringify(worker),
  }).then((response) => response.json());
};

export const createWorker = (worker) => {
  return fetch("http://localhost:8000/workers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
    body: JSON.stringify(worker),
  }).then((response) => response.json());
};
