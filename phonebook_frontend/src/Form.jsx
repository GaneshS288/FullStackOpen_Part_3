function Form({
  handleSubmit,
  setNewName,
  setNewPhoneNumber,
  newName,
  newPhoneNumber,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New</h2>
      <div>
        name:
        <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>
        phone:
        <input
          value={newPhoneNumber}
          type="tel"
          maxLength={10}
          onChange={(e) => setNewPhoneNumber(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

export default Form;
