export const getAllClients = () => {
  return fetch("http://localhost:8000/clients", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  }).then((response) => response.json());
};

export const createClient = (client) => {
  return fetch("http://localhost:8000/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
    body: JSON.stringify(client),
  }).then((response) => response.json());
};

export const getClient = (id) => {
  return fetch(`http://localhost:8000/clients/${id}`, {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  }).then((response) => response.json());
};

export const updateClient = (id, client) => {
  return fetch(`http://localhost:8000/clients/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
    body: JSON.stringify(client),
  }).then((response) => response.json());
};

export const deleteClient = (id) => {
  return fetch(`http://localhost:8000/clients/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  });
};
