import { FinTechInterface } from 'interfaces/fin-tech';
import { GetQueryInterface } from 'interfaces';

export interface InvestmentStrategyInterface {
  id?: string;
  name: string;
  fin_tech_id?: string;
  created_at?: any;
  updated_at?: any;

  fin_tech?: FinTechInterface;
  _count?: {};
}

export interface InvestmentStrategyGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  fin_tech_id?: string;
}
