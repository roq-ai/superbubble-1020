import { AssetClassInterface } from 'interfaces/asset-class';
import { InvestmentStrategyInterface } from 'interfaces/investment-strategy';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FinTechInterface {
  id?: string;
  description?: string;
  image?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  asset_class?: AssetClassInterface[];
  investment_strategy?: InvestmentStrategyInterface[];
  user?: UserInterface;
  _count?: {
    asset_class?: number;
    investment_strategy?: number;
  };
}

export interface FinTechGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  image?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
