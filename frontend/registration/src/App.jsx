import { useEffect, useState } from "react";

const App = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const res = await fetch("http://localhost:8080/test");
    const result = await res.json();
    setData(result);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:8080/users", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    setForm({ username: "", password: "" });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <span>User Name</span>
        <input type="text" name="username" onChange={handleFormChange} />
        <span>Password</span>
        <input type="password" name="password" onChange={handleFormChange} />
        <input type="submit" value="Submit" />
      </form>
      <div>
        {data.map((user) => (
          <div key={user._id}>{user.username}</div>
        ))}
      </div>
    </>
  );
};

export default App;
