import NavigationBar from 'app/_components/navigation/NavigationBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <NavigationBar title="관심 도시 설정" />
      <div className="w-full h-[calc(100vh-50px)] pt-[30px] px-[16px]">
        {children}
      </div>
    </>
  );
};

export default Layout;
