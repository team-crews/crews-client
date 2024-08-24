import { cn } from "../../lib/utils";

interface FooterContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const FooterContainer = ({ children,className }: FooterContainerProps) => {
  return (
    <div className={cn("fixed bottom-0 left-0 w-screen border-t border-crews-b02 bg-crews-w01 px-[1.25rem] py-[0.625rem]", className)}>
      {children}
    </div>
  );
};

export default FooterContainer;
