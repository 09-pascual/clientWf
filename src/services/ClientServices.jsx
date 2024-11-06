export const getClientDetails = () => {
  return fetch("http://localhost:8000/clients", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  }).then((response) => response.json());
};
