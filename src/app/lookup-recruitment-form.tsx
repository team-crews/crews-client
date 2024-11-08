import { Form, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { readRecruitmentSearch } from '../apis/base-api.ts';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

import { z } from 'zod';
import { RecruitmentSearchResultSchema } from '../lib/schemas/recruitment-schema.ts';
import Autocomplete, {
  AutocompleteOption,
} from '../components/atom/autocomplete.tsx';
import useDebounce from '../hooks/use-debounce.ts';

const READ_RECRUITMENT_SEARCH_QUERY_KEY = 'readRecruitmentSearch';

const LOOKUP_RECRUITMENT_LIMIT = 15;

type RecruitmentSearchResult = z.infer<typeof RecruitmentSearchResultSchema>;

const DEBOUNCE_DELAY = 150;

const LookupRecruitmentForm = () => {
  const navigate = useNavigate();

  const { watch, register, resetField } = useForm<{
    searchCrew: string;
  }>({
    defaultValues: {
      searchCrew: '',
    },
  });

  const prefix = watch('searchCrew');

  const debouncedPrefix = useDebounce(prefix, DEBOUNCE_DELAY);

  const isEmpty = !debouncedPrefix.trim();

  const { data } = useQuery({
    queryKey: [READ_RECRUITMENT_SEARCH_QUERY_KEY, debouncedPrefix],
    queryFn: () =>
      readRecruitmentSearch(debouncedPrefix, LOOKUP_RECRUITMENT_LIMIT),
    enabled: !isEmpty,
    placeholderData: keepPreviousData,
  });

  const handleSelect = (option: AutocompleteOption) => {
    //TODO: Implement navigation to recruitment page
    navigate('/recruitment/info?title=' + option.value);
    resetField('searchCrew');
  };

  const getOptions = (data: RecruitmentSearchResult[] | undefined) => {
    if (!data) return [];

    return data.map((recruitment) => ({
      label: recruitment.title,
      value: recruitment.title,
    }));
  };

  // 입력을 한번에 지우면, enable 조건으로 인해 쿼리를 하지 않고, keepPreviousData로 이전 데이터를 유지하는 이슈로 필터링 추가
  const options = !isEmpty ? getOptions(data) : [];

  return (
    <Form action="/recruitment">
      <Autocomplete
        options={options}
        registerReturns={register('searchCrew')}
        onSelect={handleSelect}
        onClearInput={() => resetField('searchCrew')}
        isEmpty={isEmpty}
      />
    </Form>
  );
};

export default LookupRecruitmentForm;
