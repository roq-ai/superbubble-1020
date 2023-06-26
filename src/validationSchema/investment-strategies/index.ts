import * as yup from 'yup';

export const investmentStrategyValidationSchema = yup.object().shape({
  name: yup.string().required(),
  fin_tech_id: yup.string().nullable(),
});
