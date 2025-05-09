import axios from "axios";

const baseUrl = "/api/persons";

function getAllPersons() {
  const data = axios
    .get(baseUrl)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return data;
}

function addPerson(newPerson) {
  const res = axios
    .post(baseUrl, newPerson)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
}

function updatePerson(person) {
  const res = axios
    .put(`${baseUrl}/${person.id}`, person)
    .then((res) => res.data)
    .catch((err) => console.log(err));
  return res;
}

function deletePerson(id) {
  const res = axios
    .delete(`${baseUrl}/${id}`)
    .catch((err) => (err.message = "failed"));
  return res;
}

export default { getAllPersons, addPerson, deletePerson, updatePerson };
