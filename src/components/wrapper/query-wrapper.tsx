import { UseQueryResult } from '@tanstack/react-query';
import React from 'react';
import handleError from '../../lib/utils/error.ts';

const QueryWrapper = ({
  queryResults,
  queryFnName,
  children,
}: {
  queryResults: UseQueryResult;
  queryFnName: string;
  children: React.ReactNode;
}) => {
  /*
    ToDo
    - apply loading component
    - apply error component
   */

  const { isPending, isError, error } = queryResults;
  if (isPending) return <div>loading</div>;
  if (isError) {
    handleError(error, queryFnName, 'PRINT');
    return <div>error</div>;
  }
  return children;
};

export default QueryWrapper;
