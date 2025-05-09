const Person = ({ name, number, id, handleDelete }) => {
  return (
    <div>
      <p>
        {name} - {number}
      </p>

      <button type="button" onClick={() => handleDelete(id, name)}>
        Delete
      </button>
    </div>
  );
};

function PeopleInfo({ persons, handleDelete }) {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          id={person.id}
          handleDelete={handleDelete}
        ></Person>
      ))}
    </div>
  );
}

export default PeopleInfo;
