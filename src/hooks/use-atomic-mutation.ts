import {
  DefaultError,
  useMutation,
  UseMutationOptions,
} from '@tanstack/react-query';
import { useRef } from 'react';

type OptionType<TData, TError, TVariables, TContext> = UseMutationOptions<
  TData,
  TError,
  TVariables,
  TContext
> & {
  requestName: string;
};

/**
 * Thx, GPT :)
 * @template TData - API 호출 시 성공적인 응답 데이터의 형태를 나타냅니다.
 *
 * @template TError - mutation 실패 시 발생할 수 있는 오류 타입입니다. 기본값 - DefaultError
 *
 * @template TVariables - mutation 함수에 전달되는 변수(인자)의 타입입니다.
 *
 * @template TContext - `onMutate` 단계에서 반환할 수 있는 컨텍스트 객체의 타입입니다.
 * 이 컨텍스트는 이후 `onError`나 `onSettled`에서 참조할 수 있어 상태 관리에 유용합니다.
 * 예를 들어, 낙관적 업데이트(optimistic update)를 구현할 때, 이전 상태를 저장하고
 * 오류 발생 시 이를 복구하는 데 활용할 수 있습니다.
 *
 * @param {OptionType<TData, TError, TVariables, TContext>} options - mutation 설정 옵션으로,
 * 요청 ID 및 mutation 이벤트에 대한 핸들러를 포함합니다.
 */
function useAtomicMutation<
  TData = unknown,
  TError = DefaultError,
  TVariables = void,
  TContext = unknown,
>(options: OptionType<TData, TError, TVariables, TContext>) {
  const { startRequest, endRequest } = useAtomicRequest();

  return useMutation({
    ...options,
    onMutate: async (variables) => {
      const isCallableRequest = startRequest(options.requestName);
      if (!isCallableRequest) return Promise.reject(new Error('중복된 요청'));

      if (options.onMutate) return await options.onMutate(variables);
    },
    onSettled: async (data, error, variables, context) => {
      endRequest(options.requestName);

      if (options.onSettled)
        return await options.onSettled(data, error, variables, context);
    },
  });
}

const useAtomicRequest = () => {
  const requestIdSet = useRef(new Set<string>());

  const startRequest = (requestId: string) => {
    if (requestIdSet.current.has(requestId)) return false;
    requestIdSet.current.add(requestId);
    return true;
  };

  const endRequest = (requestId: string) => {
    requestIdSet.current.delete(requestId);
  };

  return { startRequest, endRequest };
};

export default useAtomicMutation;
