import React, { useMemo } from 'react';
import { getUsers } from '../../../../api/APIs/User';
import AutocompleteField from '../AutocompleteField/AutocompleteField';

const optionsMapper = ({ username, firstName, lastName, id }) => ({
  label: username ? username : `${(firstName, lastName)}`,
  value: id,
});

const UsersAutocomplete = (props) => {
  const dataFetchFilterOptions = useMemo(
    () => ({ $take: 15, isActive: 1 }),
    []
  );

  return (
    <AutocompleteField
      {...props}
      fetchDataCall={getUsers}
      dataFetchFilterOptions={dataFetchFilterOptions}
      optionsMapper={optionsMapper}
    />
  );
};

export default UsersAutocomplete;
