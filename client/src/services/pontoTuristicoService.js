import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL + '/pontosturisticos';
const IBGE_URL = 'https://servicodados.ibge.gov.br/api/v1/localidades';

// API Backend
export const obterPontos = async (busca = '', pagina = 1, tamanhoPagina = 5) => {
    const response = await axios.get(BASE_URL, {
        params: { busca, pagina, tamanhoPagina }
    });
    return response.data;
};

export const obterPontoPorId = async (id) => {
    const response = await axios.get(`${BASE_URL}/${id}`);
    return response.data;
};

export const criarPonto = async (ponto) => {
    const response = await axios.post(BASE_URL, ponto);
    return response.data;
};

export const atualizarPonto = async (id, ponto) => {
    const response = await axios.put(`${BASE_URL}/${id}`, ponto);
    return response.data;
};

export const deletarPonto = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`);
};

// API IBGE
export const obterEstados = async () => {
    const response = await axios.get(`${IBGE_URL}/estados?orderBy=nome`);
    return response.data;
};

export const obterCidadesPorEstado = async (uf) => {
    const response = await axios.get(`${IBGE_URL}/estados/${uf}/municipios?orderBy=nome`);
    return response.data;
};