import { useState, useEffect } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./App.css";
import { createClient } from "@supabase/supabase-js";

function App() {
  const supabase = createClient(
    "https://nbabichutvzptjaozrkl.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iYWJpY2h1dHZ6cHRqYW96cmtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxODYwMDQsImV4cCI6MjAyNzc2MjAwNH0.O6-ogr3wfgwJ_rJXt27O9fYPD95ISLmUsrPgRDNUtzM"
  );

  const [users, setUsers] = useState<any>([]);
  const [accounts, setAccounts] = useState<any>([]);

  const [goals, setGoals] = useState<any>([]);

  const [user, setUser] = useState({
    nome: "",
    email: "",
    telefone: "",
    password: "",
    rg: "",
    cpf: "",
    profissao: "",
    orgao_emissor: "",
    cep: "",
    endereco: "",
    data_nascimento: "",
  });

  const [user2, setUser2] = useState({
    id: "",
    nome: "",
    email: "",
    telefone: "",
    password: "",
    rg: "",
    cpf: "",
    profissao: "",
    orgao_emissor: "",
    cep: "",
    endereco: "",
    data_nascimento: "",
  });

  const [account, setAccount] = useState({
    user_id: "",
    name: "",
  });

  const [account2, setAccount2] = useState({
    id: "",
    user_id: "",
    name: "",
  });

  useEffect(() => {
    fetchUsers();
    fetchAccount();
    fetchGoals();
  }, []);

  async function fetchUsers() {
    const { data }: any = await supabase.from("users").select("*");
    setUsers(data);
  }

  async function fetchAccount() {
    const { data }: any = await supabase.from("accounts").select("*");
    setAccounts(data);
  }

  async function fetchGoals() {
    const { data }: any = await supabase.from("goals").select("*");
    setGoals(data);
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

  function handleChange3(e: any) {
    setAccount((prevFormData: any) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  function handleChange4(e: any) {
    setAccount2((prevFormData: any) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }

  async function createUser(e: any) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("users").insert(user);
      if (error) {
        console.error("Error inserting user:", error);
      } else {
        console.log("Inserted user data:", data);
        fetchUsers();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  async function createAccount(e: any) {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("accounts").insert(account);
      if (error) {
        console.error("Error inserting account:", error);
      } else {
        console.log("Inserted account data:", data);
        fetchAccount();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
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

  async function deleteAccount(accountId: any) {
    const { data, error } = await supabase
      .from("accounts")
      .delete()
      .eq("id", accountId);

    fetchAccount();

    if (error) {
      console.log(error);
    }

    if (data) {
      console.log(data);
    }
  }

  function displayUser(userId: any, e: any) {
    e.preventDefault();
    const selectedUser = users.find((user: any) => user.id === userId);
    setUser2(selectedUser);
  }

  function displayAccount(accountId: any, e: any) {
    e.preventDefault();
    const selectedAccount = accounts.find(
      (account: any) => account.id === accountId
    );
    setAccount2(selectedAccount);
  }

  async function updateUser(userId: any, e: any) {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("users")
        .update(user2)
        .eq("id", userId);

      if (error) {
        console.error("Error updating user:", error);
      } else {
        console.log("Updated user data:", data);
        fetchUsers();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  async function updateAccount(accountId: any, e: any) {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("accounts")
        .update(account2)
        .eq("id", accountId);

      if (error) {
        console.error("Error updating account:", error);
      } else {
        console.log("Updated account data:", data);
        fetchAccount();
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    }
  }

  function downloadPDF() {
    const doc = new jsPDF();

    doc.text("Objetivos", 14, 22);

    const tableColumn = ["Id", "User_ID", "Objetivo", "Valor Inicial", "Prazo", "Valor Desejado"];
    const tableRows: any = [];

    goals.forEach((goal: { id: any; user_id: any; objetivo: any; valor_inicial: any; prazo: any; valor_desejado: any; }) => {
      const goalData = [
        goal.id,
        goal.user_id,
        goal.objetivo,
        goal.valor_inicial,
        goal.prazo,
        goal.valor_desejado,
      ];
      tableRows.push(goalData);
    });

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
    });

    doc.save("objetivos.pdf");
  }

  console.log("user:", user);
  console.log("user2:", user2);

  console.log("account:", account);
  console.log("account2:", account2);

  return (
    <>
      <div>
        {/* FORM 1 */}
        <h1>Criar User</h1>
        <form onSubmit={createUser} style={{ margin: "1em" }}>
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            value={user.nome}
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            placeholder="Telefone"
            name="telefone"
            value={user.telefone}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="RG"
            name="rg"
            value={user.rg}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="CPF"
            name="cpf"
            value={user.cpf}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Profissão"
            name="profissao"
            value={user.profissao}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="CEP"
            name="cep"
            value={user.cep}
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Endereço"
            name="endereco"
            value={user.endereco}
            onChange={handleChange}
          />
          <input
            type="date"
            placeholder="Data de Nascimento"
            name="data_nascimento"
            value={user.data_nascimento}
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Senha"
            name="password"
            value={user.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Criar</button>
        </form>

        <h1>Alterar User</h1>
        <form
          onSubmit={() => updateUser(user2.id, event)}
          style={{ margin: "1em" }}
        >
          <input
            type="text"
            placeholder="Nome"
            name="nome"
            value={user2.nome}
            onChange={handleChange2}
          />
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            value={user2.email}
            onChange={handleChange2}
            required
          />
          <input
            type="tel"
            placeholder="Telefone"
            name="telefone"
            value={user2.telefone}
            onChange={handleChange2}
          />
          <input
            type="text"
            placeholder="RG"
            name="rg"
            value={user2.rg}
            onChange={handleChange2}
          />
          <input
            type="text"
            placeholder="CPF"
            name="cpf"
            value={user2.cpf}
            onChange={handleChange2}
          />
          <input
            type="text"
            placeholder="Profissão"
            name="profissao"
            value={user2.profissao}
            onChange={handleChange2}
          />
          <input
            type="text"
            placeholder="CEP"
            name="cep"
            value={user2.cep}
            onChange={handleChange2}
          />
          <input
            type="text"
            placeholder="Endereço"
            name="endereco"
            value={user2.endereco}
            onChange={handleChange2}
          />
          <input
            type="date"
            placeholder="Data de Nascimento"
            name="data_nascimento"
            value={user2.data_nascimento}
            onChange={handleChange2}
          />
          <button type="submit">Salvar</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>RG</th>
              <th>CPF</th>
              <th>Profissão</th>
              <th>Endereço</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.telefone}</td>
                <td>{user.rg}</td>
                <td>{user.cpf}</td>
                <td>{user.profissao}</td>
                <td>{user.endereco}</td>
                <td>
                  <button onClick={() => deleteUser(user.id)}>Delete</button>
                  <button onClick={() => displayUser(user.id, event)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div>
        {/* FORM 2 */}
        <h1>Criar Account</h1>
        <form onSubmit={createAccount} style={{ margin: "1em" }}>
          <input
            type="text"
            placeholder="Nome"
            name="name"
            value={account.name}
            onChange={handleChange3}
            required
          />
          <input
            type="text"
            placeholder="User_id"
            name="user_id"
            value={account.user_id}
            onChange={handleChange3}
            required
          />
          <button type="submit">Criar</button>
        </form>

        <h1>Alterar Account</h1>
        <form
          onSubmit={() => updateAccount(account2.id, event)}
          style={{ margin: "1em" }}
        >
          <input
            type="text"
            placeholder="Nome"
            name="name"
            value={account2.name}
            onChange={handleChange4}
          />
          <input
            type="text"
            placeholder="User_id"
            name="user_id"
            value={account2.user_id}
            onChange={handleChange4}
            required
          />
          <button type="submit">Salvar</button>
        </form>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>User_ID</th>
              <th>Name</th>
            </tr>
          </thead>

          <tbody>
            {accounts.map((account: any) => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.user_id}</td>
                <td>{account.name}</td>
                <td>
                  <button onClick={() => deleteAccount(account.id)}>
                    Delete
                  </button>
                  <button onClick={() => displayAccount(account.id, event)}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h1>Objetivos</h1>
      <button onClick={downloadPDF}>Baixar PDF</button>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>User_ID</th>
            <th>Objetivo</th>
            <th>Valor Inicial</th>
            <th>Prazo</th>
            <th>Valor Desejado</th>
          </tr>
        </thead>

        <tbody>
          {goals.map((goal: any) => (
            <tr key={goal.id}>
              <td>{goal.id}</td>
              <td>{goal.user_id}</td>
              <td>{goal.objetivo}</td>
              <td>{goal.valor_inicial}</td>
              <td>{goal.prazo}</td>
              <td>{goal.valor_desejado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default App;
