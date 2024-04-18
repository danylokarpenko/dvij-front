import * as Yup from 'yup';

const getValidationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required('Game name is required'),
  });
};

export default getValidationSchema;
