import HeaderSection from './header-section.tsx';
import Container from '../../../../components/shared/container.tsx';
import ApplicantSection from './applicant-section.tsx';
import DeadlineSection from './deadline-section.tsx';
import FooterContainer from '../../../../components/shared/footer-container.tsx';
import { Button } from '../../../../components/ui/button.tsx';
import useAdminApi from '../../../../apis/admin-api.ts';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import QueryWrapper from '../../../../components/wrapper/query-wrapper.tsx';
import CopyCodeButton from '../../../../components/shared/copy-code-button.tsx';
import { useState } from 'react';

const RecruitWaitPage = () => {
  const [recruiting, setRecruiting] = useState<boolean>(true);
  const stopRecruiting = () => setRecruiting(false);

  const { readRecruitmentInProgressDetail } = useAdminApi();
  const queryResults = useQuery({
    queryKey: ['recruitmentInProgressDetail'],
    queryFn: readRecruitmentInProgressDetail,
    refetchInterval: 3600000,
    refetchIntervalInBackground: true,
    enabled: recruiting,
  });

  const queryClient = useQueryClient();
  const handleEvaluateRecruitmentClick = async () => {
    await queryClient.invalidateQueries({
      queryKey: ['recruitmentProgress'],
    });
  };

  return (
    <QueryWrapper
      queryResults={queryResults}
      queryFnName="readRecruitmentInProgressDetail"
    >
      {queryResults.data && (
        <Container className="flex flex-col">
          <HeaderSection />
          <div className="my-8 flex flex-1 flex-col justify-center gap-12">
            <ApplicantSection
              applicationCount={queryResults.data.applicationCount}
            />
            <DeadlineSection
              recruiting={recruiting}
              stopRecruiting={stopRecruiting}
              deadline={new Date(queryResults.data.deadline)}
            />
          </div>
          <FooterContainer className="flex w-full justify-end">
            {/*
          TODO
          - 버튼 클릭 시 연장 시간 선택하는 모달창 나와야 할 것 같음
          - 해당 UI는 지원서 생성 시 시간 선택과 비슷할 것이기 때문에 우선 보류
          */}
            <div className="flex items-center gap-4">
              <CopyCodeButton
                variant="gray"
                size="lg"
                code={queryResults.data.code}
              />
              {recruiting ? (
                <Button size="lg">마감기간 연장</Button>
              ) : (
                <Button size="lg" onClick={handleEvaluateRecruitmentClick}>
                  지원서 평가
                </Button>
              )}
            </div>
          </FooterContainer>
        </Container>
      )}
    </QueryWrapper>
  );
};

export default RecruitWaitPage;
