import axios from 'axios';
import queryString from 'query-string';
import { FinTechInterface, FinTechGetQueryInterface } from 'interfaces/fin-tech';
import { GetQueryInterface } from '../../interfaces';

export const getFinTeches = async (query?: FinTechGetQueryInterface) => {
  const response = await axios.get(`/api/fin-teches${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFinTech = async (finTech: FinTechInterface) => {
  const response = await axios.post('/api/fin-teches', finTech);
  return response.data;
};

export const updateFinTechById = async (id: string, finTech: FinTechInterface) => {
  const response = await axios.put(`/api/fin-teches/${id}`, finTech);
  return response.data;
};

export const getFinTechById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/fin-teches/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFinTechById = async (id: string) => {
  const response = await axios.delete(`/api/fin-teches/${id}`);
  return response.data;
};
