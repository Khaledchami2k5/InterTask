import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const { email, logout, token } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
      axios
        .get("https://reqres.in/api/users")
        .then((res) => setUsers(res.data.data))
        .catch((err) => console.error(err));
  }, [token, email , navigate]);

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("https://reqres.in/api/users", { name, job });
      setSuccess("User added successfully!");
    } catch (err) {
      setSuccess("Failed to add user.");
      console.log(err.response ? err.response.data : err.message);
      
    }
  };

  return (
    <div>
      <h2>Welcome {email}</h2>
      <button onClick={logout}>Logout</button>

      {/* {email === "admin@example.com" && ( */}
        <>
          <h3>All Users:</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.first_name} {user.last_name}
              </li>
            ))}
          </ul>

          <h3>Add New User:</h3>
          <form onSubmit={handleAddUser}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              required
            />
            <input
              value={job}
              onChange={(e) => setJob(e.target.value)}
              placeholder="Job"
              required
            />
            <button type="submit">Add User</button>
          </form>
          {success && <p>{success}</p>}
        </>
      {/* )} */}
    </div>
  );
};

export default Home;
