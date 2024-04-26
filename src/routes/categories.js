const express = require('express');
const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const app = express();
const port = 3000;

// Configurações do Supabase
const supabaseUrl = 'https://nbabichutvzptjaozrkl.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// URL base da sua API Supabase
const API_URL = `${supabaseUrl}/rest/v1`;

// Endpoint para recuperar as categorias
const endpoint = '/categories';

// Middleware para obter o token de autenticação do usuário logado
app.use(async (req, res, next) => {
  try {
    const { user, session } = await supabase.auth.api.getUserByCookie(req);
    if (user && session) {
      req.authToken = session.access_token;
    } else {
      req.authToken = null;
    }
    next();
  } catch (error) {
    console.error('Erro ao obter o token de autenticação:', error);
    req.authToken = null;
    next();
  }
});

// Rota para recuperar as categorias
app.get('/categories', async (req, res) => {
  try {
    const authToken = req.authToken;
    if (!authToken) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }
    
    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    };

    const response = await axios.get(`${API_URL}${endpoint}`, config);
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao recuperar categorias:', error);
    res.status(500).json({ error: 'Erro ao recuperar categorias' });
  }
});

// Rota para atualizar uma categoria específica
app.put('/categories/:id', async (req, res) => {
  try {
    const authToken = req.authToken;
    if (!authToken) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const categoryId = req.params.id;
    const newData = req.body;

    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      }
    };

    // Faz uma solicitação PUT para atualizar a categoria no Supabase
    const response = await axios.put(`${API_URL}${endpoint}/${categoryId}`, newData, config);
    
    // Retorna os dados atualizados da categoria
    res.json(response.data);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    res.status(500).json({ error: 'Erro ao atualizar categoria' });
  }
});
// Rota para excluir uma categoria específica
app.delete('/categories/:id', async (req, res) => {
  try {
    const authToken = req.authToken;
    if (!authToken) {
      return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const categoryId = req.params.id;
    const config = {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    };

    // Faz uma solicitação DELETE para excluir a categoria do Supabase
    await axios.delete(`${API_URL}${endpoint}/${categoryId}`, config);
    
    // Retorna uma resposta de sucesso
    res.json({ success: true, message: 'Categoria excluída com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir categoria:', error);
    res.status(500).json({ error: 'Erro ao excluir categoria' });
  }
});



// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
