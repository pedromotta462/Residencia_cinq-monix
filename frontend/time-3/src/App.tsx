import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

function App() {
  const supabase = createClient(
    "https://nbabichutvzptjaozrkl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iYWJpY2h1dHZ6cHRqYW96cmtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxODYwMDQsImV4cCI6MjAyNzc2MjAwNH0.O6-ogr3wfgwJ_rJXt27O9fYPD95ISLmUsrPgRDNUtzM"
  );

  const [users, setUsers] = useState<any>([]);

  const [user, setUser] = useState({
    name: "",
    age: "",
  });

  const [user2, setUser2] = useState<any>({
    id: "",
    name: "",
    age: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    const { data }: any = await supabase.from("users").select("*");
    setUsers(data);
  }

  function handleChange(e: any) {
    setUser((prevFormData: any) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleChange2(e: any) {
    setUser2((prevFormData: any) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function createUser() {
    await supabase.from("users").insert({ name: user.name, age: user.age });

    fetchUsers();
  }

  async function deleteUser(userId: any) {
    const { data, error } = await supabase
      .from("users")
      .delete()
      .eq("id", userId);

    fetchUsers();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }
  }

  function displayUser(userId: any) {
    users.map((user: any) => {
      if (user.id == userId) {
        setUser2({ id: user.id, name: user.name, age: user.age });
      }
    });
  }

  async function updateUser(userId: any) {
    const { data, error } = await supabase
      .from("users")
      .update({ id: user2.id, name: user2.name, age: user2.age })
      .eq("id", userId);

    fetchUsers();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }
  }

  return (
    <>
      <div>
        {/* FORM 1 */}
        <form onSubmit={createUser}>
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            onChange={handleChange}
          />
          <input
            type="number"
            placeholder="idade"
            name="age"
            onChange={handleChange}
          />
          <button type="submit">Criar</button>
        </form>

        {/* FORM 2 */}
        <form onSubmit={() => updateUser(user2.id)}>
          <input
            type="text"
            name="name"
            onChange={handleChange2}
            defaultValue={user2.name}
          />
          <input
            type="number"
            name="age"
            onChange={handleChange2}
            defaultValue={user2.age}
          />
          <button type="submit">Salvar</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Age</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>
                  <button
                    onClick={() => {
                      deleteUser(user.id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      displayUser(user.id);
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
