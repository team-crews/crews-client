import { useEffect, useState } from 'react';
import { z } from 'zod';
import { ApplicationOverviewSchema } from '../../../../../lib/types/schemas/application-schema.ts';

const usePassedApplicationIds = (
  data: z.infer<typeof ApplicationOverviewSchema>[] | null,
) => {
  const [passApplicationIds, setPassApplicationIds] = useState<number[] | null>(
    null,
  );

  useEffect(() => {
    if (data) {
      setPassApplicationIds(
        data
          .filter((overview) => overview.outcome === 'PASS')
          .map((iter) => iter.id),
      );
    }
  }, [data]);

  const passId = (id: number) => {
    setPassApplicationIds([...passApplicationIds!, id]);
  };

  const unpassId = (id: number) => {
    setPassApplicationIds(passApplicationIds!.filter((it) => it !== id));
  };

  return { passApplicationIds, passId, unpassId };
};

export default usePassedApplicationIds;
