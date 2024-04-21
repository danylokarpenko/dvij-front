import * as Yup from 'yup';

const getValidationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required('name name is required'),
    videoUrl: Yup.string().required('videoUrl name is required'),
    iconUrl: Yup.string().required('iconUrl name is required'),

    publisherName: Yup.string().optional(),
    publisherUrl: Yup.string().optional(),
    mainIdea: Yup.string().optional(),
    mainTask: Yup.string().optional(),
    iStoreLink: Yup.string().optional(),
    googleStoreLink: Yup.string().optional(),
    gitLink: Yup.string().optional(),
    googleDriveLink: Yup.string().optional(),
    trelloLink: Yup.string().optional(),

    releaseDate: Yup.date().optional(),
    lastPatchDate: Yup.date().optional(),

    cpi: Yup.number().optional(),
    pt: Yup.number().optional(),
    d1: Yup.number().optional(),
    d7: Yup.number().optional(),
    targetCpi: Yup.number().optional(),
    targetPt: Yup.number().optional(),
    targetRetD1: Yup.number().optional(),
    targetRetD7: Yup.number().optional(),
    dau: Yup.number().optional(),
    installs: Yup.number().optional(),
    malesGenderPercentage: Yup.number().optional(),
    minAge: Yup.number().optional(),
    maxAge: Yup.number().optional(),
  });
};

export default getValidationSchema;
