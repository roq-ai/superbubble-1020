import axios from 'axios';
import queryString from 'query-string';
import { AssetClassInterface, AssetClassGetQueryInterface } from 'interfaces/asset-class';
import { GetQueryInterface } from '../../interfaces';

export const getAssetClasses = async (query?: AssetClassGetQueryInterface) => {
  const response = await axios.get(`/api/asset-classes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAssetClass = async (assetClass: AssetClassInterface) => {
  const response = await axios.post('/api/asset-classes', assetClass);
  return response.data;
};

export const updateAssetClassById = async (id: string, assetClass: AssetClassInterface) => {
  const response = await axios.put(`/api/asset-classes/${id}`, assetClass);
  return response.data;
};

export const getAssetClassById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/asset-classes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAssetClassById = async (id: string) => {
  const response = await axios.delete(`/api/asset-classes/${id}`);
  return response.data;
};
