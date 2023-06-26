import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createInvestmentStrategy } from 'apiSdk/investment-strategies';
import { Error } from 'components/error';
import { investmentStrategyValidationSchema } from 'validationSchema/investment-strategies';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { FinTechInterface } from 'interfaces/fin-tech';
import { getFinTeches } from 'apiSdk/fin-teches';
import { InvestmentStrategyInterface } from 'interfaces/investment-strategy';

function InvestmentStrategyCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: InvestmentStrategyInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createInvestmentStrategy(values);
      resetForm();
      router.push('/investment-strategies');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<InvestmentStrategyInterface>({
    initialValues: {
      name: '',
      fin_tech_id: (router.query.fin_tech_id as string) ?? null,
    },
    validationSchema: investmentStrategyValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Investment Strategy
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<FinTechInterface>
            formik={formik}
            name={'fin_tech_id'}
            label={'Select Fin Tech'}
            placeholder={'Select Fin Tech'}
            fetcher={getFinTeches}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'investment_strategy',
  operation: AccessOperationEnum.CREATE,
})(InvestmentStrategyCreatePage);
