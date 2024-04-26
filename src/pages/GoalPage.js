import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import '../Goal.css';
import { useLocation } from 'react-router-dom';

// Configurar o cliente Supabase
const supabaseUrl = "https://nbabichutvzptjaozrkl.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5iYWJpY2h1dHZ6cHRqYW96cmtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIxODYwMDQsImV4cCI6MjAyNzc2MjAwNH0.O6-ogr3wfgwJ_rJXt27O9fYPD95ISLmUsrPgRDNUtzM";

const supabaseClient = createClient(supabaseUrl, supabaseKey);

const Goal = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    id: null,
    user_id: null,
    objetivo: '',
    valor_inicial: '',
    prazo: '',
    valor_desejado: ''
  });
  const [editingId, setEditingId] = useState(null);

  // Usar useLocation para obter o estado da localização
  const location = useLocation();
  // Extrair user_id do estado da localização
  const userId = location.state ? location.state.userId : null;

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      let { data: goals, error } = await supabaseClient
        .from('goals')
        .select('*')
        .eq('user_id', userId); // Filtrar os goals pelo user_id

      if (error) {
        throw error;
      } else {
        setGoals(goals);
      }
    } catch (error) {
      console.error('Error fetching goals:', error.message);
    }
  };

  const createGoal = async () => {
    try {
      const { data, error } = await supabaseClient
        .from('goals')
        .insert([
          {
            user_id: userId, // Definir o user_id com o id do usuário autenticado
            objetivo: newGoal.objetivo,
            valor_inicial: parseFloat(newGoal.valor_inicial),
            prazo: newGoal.prazo,
            valor_desejado: parseFloat(newGoal.valor_desejado)
          }
        ]);

      if (error) {
        throw error;
      } else {
        console.log('Item created:', data);
        fetchGoals();
      }
    } catch (error) {
      console.error('Error creating item:', error.message);
    }
  };

  const updateGoal = async (id) => {
    try {
      const { data, error } = await supabaseClient
        .from('goals')
        .update({
          other_column: 'otherValue'
        })
        .eq('id', id)
        .select();

      if (error) {
        throw error;
      } else {
        console.log('Item updated:', data);
        fetchGoals();
      }
    } catch (error) {
      console.error('Error updating item:', error.message);
    }
  };

  const deleteGoal = async (id) => {
    try {
      const { error } = await supabaseClient
        .from('goals')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      } else {
        console.log('Item deleted:', id);
        fetchGoals();
      }
    } catch (error) {
      console.error('Error deleting item:', error.message);
    }
  };

  const handleCreateGoal = async () => {
    await createGoal();
    setNewGoal({
      id: null,
      user_id: null,
      objetivo: '',
      valor_inicial: '',
      prazo: '',
      valor_desejado: ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewGoal({
      ...newGoal,
      [name]: value
    });
  };

  const handleUpdateClick = (id) => {
    setEditingId(id);
  };

  return (
    <div className="goal-container">
      <div className="form-container">
        <h2>Create New Goal</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          handleCreateGoal();
        }}>
          <input
            type="text"
            name="objetivo"
            value={newGoal.objetivo}
            onChange={handleChange}
            placeholder="Goal name"
          />
          <input
            type="number"
            name="valor_inicial"
            value={newGoal.valor_inicial}
            onChange={handleChange}
            placeholder="Initial value"
          />
          <input
            type="date"
            name="prazo"
            value={newGoal.prazo}
            onChange={handleChange}
            placeholder="Deadline"
          />
          <input
            type="number"
            name="valor_desejado"
            value={newGoal.valor_desejado}
            onChange={handleChange}
            placeholder="Desired value"
          />
          <button type="submit">Create Goal</button>
        </form>
      </div>

      <div className="panel-container">
        <h2>Goal Panel</h2>
        <table className="goal-table">
          <thead>
            <tr>
              <th>Goal</th>
              <th>Initial Value</th>
              <th>Deadline</th>
              <th>Desired Value</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {goals.map((goal) => (
              <tr key={goal.id}>
                <td>{editingId === goal.id ? <input type="text" value={goal.objetivo} onChange={(e) => {}} /> : goal.objetivo}</td>
                <td>{editingId === goal.id ? <input type="text" value={goal.valor_inicial} onChange={(e) => {}} /> : goal.valor_inicial}</td>
                <td>{editingId === goal.id ? <input type="text" value={goal.prazo} onChange={(e) => {}} /> : goal.prazo}</td>
                <td>{editingId === goal.id ? <input type="text" value={goal.valor_desejado} onChange={(e) => {}} /> : goal.valor_desejado}</td>
                <td>
                  {editingId === goal.id ? <button onClick={() => updateGoal(goal.id)}>Save</button> : <button onClick={() => handleUpdateClick(goal.id)}>Update</button>}
                  <button onClick={() => deleteGoal(goal.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Goal;
