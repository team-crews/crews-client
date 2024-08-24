import Typography from '../../shared/typography';

const ClipboardSection = () => {
  return (
    <section className="flex justify-center">
      {/* TODO: add auth code copy logic */}
      <Typography className="cursor-pointer text-[1.375rem] font-bold text-crews-b06 underline">
        여기
      </Typography>
      <Typography className="text-[1.375rem]">
        를 눌러 모집코드를 복사하세요.
      </Typography>
    </section>
  );
};

export default ClipboardSection;
