import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}
const CommonLayout = ({ children }: IProps) => {
  return (
    <div>
      {/* <Navbar /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default CommonLayout;
