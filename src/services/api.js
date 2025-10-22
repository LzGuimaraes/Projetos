const API_BASE_URL = 'https://improved-space-orbit-ww5xvw7w79725v76-8080.app.github.dev/projetos';

export const api = {
  getAllProjects: async () => {
    const response = await fetch(`${API_BASE_URL}/all`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    return response.json();
  },
  
  getProjectByNumber: async (numeroProjeto) => {
    const response = await fetch(`${API_BASE_URL}/all/${numeroProjeto}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    return response.json();
  }
};