import axios from 'axios';
import queryString from 'query-string';
import { InvestmentStrategyInterface, InvestmentStrategyGetQueryInterface } from 'interfaces/investment-strategy';
import { GetQueryInterface } from '../../interfaces';

export const getInvestmentStrategies = async (query?: InvestmentStrategyGetQueryInterface) => {
  const response = await axios.get(`/api/investment-strategies${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createInvestmentStrategy = async (investmentStrategy: InvestmentStrategyInterface) => {
  const response = await axios.post('/api/investment-strategies', investmentStrategy);
  return response.data;
};

export const updateInvestmentStrategyById = async (id: string, investmentStrategy: InvestmentStrategyInterface) => {
  const response = await axios.put(`/api/investment-strategies/${id}`, investmentStrategy);
  return response.data;
};

export const getInvestmentStrategyById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/investment-strategies/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteInvestmentStrategyById = async (id: string) => {
  const response = await axios.delete(`/api/investment-strategies/${id}`);
  return response.data;
};
