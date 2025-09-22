import FilterCloseButton from 'app/search/result/filter-university/_components/header/FilterCloseButton';
import NavigationBar from 'components/navigation/NavigationBar';

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <NavigationBar
        title="대학교 검색"
        showBackButton={false}
        renderOptionButtons={<FilterCloseButton />}
      />
      {children}
    </>
  );
};

export default Layout;
