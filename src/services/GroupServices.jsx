export const getAllGroups = () => {
  return fetch("http://localhost:8000/groups", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  }).then((response) => response.json());
};

export const getGroupById = (id) => {
  return fetch(`http://localhost:8000/groups/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  }).then((response) => response.json());
};

export const updateGroup = (id, data) => {
  return fetch(`http://localhost:8000/groups/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};

export const createGroup = (data) => {
  return fetch(`http://localhost:8000/groups/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};
