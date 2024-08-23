interface FooterContainerProps {
  children?: React.ReactNode;
}

const FooterContainer = ({ children }: FooterContainerProps) => {
  return (
    <div className="fixed bottom-0 left-0 w-screen border-t border-crews-b02 bg-crews-w01 px-[1.25rem] py-[0.625rem]">
      {children}
    </div>
  );
};

export default FooterContainer;
