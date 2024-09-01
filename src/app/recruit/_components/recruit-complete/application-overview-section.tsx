import { IApplicationOverview } from '../../../../lib/model/i-application.ts';
import OverviewCard from './overveiw-card.tsx';

const mockData: IApplicationOverview[] = [
  {
    id: 1,
    studentNumber: '20191234',
    name: '정인영',
    major: '아트앤테크놀로지학과',
    outcome: 'PASS',
  },
  {
    id: 2,
    studentNumber: '20191235',
    name: '김예은',
    major: '컴퓨터공학과',
    outcome: 'FAIL',
  },
  {
    id: 3,
    studentNumber: '20191236',
    name: '홍진우',
    major: '경제학과',
    outcome: 'FAIL',
  },
  {
    id: 4,
    studentNumber: '20191237',
    name: '한서진',
    major: '국문학과',
    outcome: 'PASS',
  },
  {
    id: 5,
    studentNumber: '20191238',
    name: '장근우',
    major: '전자공학과',
    outcome: 'PENDING',
  },
  {
    id: 6,
    studentNumber: '20191234',
    name: '정인영',
    major: '아트앤테크놀로지학과',
    outcome: 'PASS',
  },
  {
    id: 7,
    studentNumber: '20191235',
    name: '김예은',
    major: '컴퓨터공학과',
    outcome: 'FAIL',
  },
  {
    id: 8,
    studentNumber: '20191236',
    name: '홍진우',
    major: '경제학과',
    outcome: 'FAIL',
  },
  {
    id: 9,
    studentNumber: '20191237',
    name: '한서진',
    major: '국문학과',
    outcome: 'PASS',
  },
  {
    id: 10,
    studentNumber: '20191238',
    name: '장근우',
    major: '전자공학과',
    outcome: 'PENDING',
  },
  {
    id: 11,
    studentNumber: '20191234',
    name: '정인영',
    major: '아트앤테크놀로지학과',
    outcome: 'PASS',
  },
  {
    id: 12,
    studentNumber: '20191235',
    name: '김예은',
    major: '컴퓨터공학과',
    outcome: 'FAIL',
  },
  {
    id: 13,
    studentNumber: '20191236',
    name: '홍진우',
    major: '경제학과',
    outcome: 'FAIL',
  },
  {
    id: 14,
    studentNumber: '20191237',
    name: '한서진',
    major: '국문학과',
    outcome: 'PASS',
  },
  {
    id: 15,
    studentNumber: '20191238',
    name: '장근우',
    major: '전자공학과',
    outcome: 'PENDING',
  },
];

const ApplicationOverviewSection = () => {
  return (
    <section>
      <p className="font-semibold text-crews-bk01">
        지원서 리스트 <span className="text-crews-b05">11</span>
      </p>
      <div className="my-4 grid grid-cols-4 gap-4">
        {mockData.map((item) => (
          <OverviewCard key={item.id} applicationOverview={item} />
        ))}
      </div>
    </section>
  );
};

export default ApplicationOverviewSection;
