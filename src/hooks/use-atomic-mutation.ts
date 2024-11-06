import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { useRef } from 'react';

type OptionType = UseMutationOptions & {
  requestId: number;
};

const useAtomicRequest = () => {
  const requestIdSet = useRef(new Set<number>());

  const startRequest = (requestId: number) => {
    if (requestIdSet.current.has(requestId)) return false;
    requestIdSet.current.add(requestId);
    return true;
  };

  const endRequest = (requestId: number) => {
    requestIdSet.current.delete(requestId);
  };

  return { startRequest, endRequest };
};

const useAtomicMutation = (options: OptionType) => {
  const { startRequest, endRequest } = useAtomicRequest();

  return useMutation({
    ...options,
    onMutate: async (variables) => {
      const isCallableRequest = startRequest(options.requestId);
      if (!isCallableRequest) throw new Error('중복된 요청');

      if (options.onMutate) await options.onMutate(variables);
    },
    onSuccess: async (data, variables, context) => {
      endRequest(options.requestId);

      if (options.onSuccess) await options.onSuccess(data, variables, context);
    },
  });
};

export default useAtomicMutation;
