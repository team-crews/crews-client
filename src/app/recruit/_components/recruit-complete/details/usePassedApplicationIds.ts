import { useEffect, useState } from 'react';
import { IApplicationOverview } from '../../../../../lib/model/i-application.ts';

const usePassedApplicationIds = (data: IApplicationOverview[] | null) => {
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
