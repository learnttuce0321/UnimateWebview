import NavigationBar from 'components/navigation/NavigationBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <NavigationBar title="관심 도시 설정" />
      <div className="min-h-[calc(100vh-50px)] w-full px-[16px] pt-[30px]">
        {children}
      </div>
    </>
  );
};

export default Layout;
