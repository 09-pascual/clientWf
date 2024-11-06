export const getAllGroups = () => {
  return fetch("http://localhost:8000/groups", {
    headers: {
      Authorization: `Token ${
        JSON.parse(localStorage.getItem("workflow_token")).token
      }`,
    },
  }).then((response) => response.json());
};
