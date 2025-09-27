import NavigationBar from 'components/navigation/NavigationBar';
import CheckVerifiedUniversityEmailButton from './_components/CheckVerifiedUniversityEmailButton';
import VerifiedUniversityDescription from './_components/VerifiedUniversityDescription';
import VerifiedUniversityEmail from './_components/VerifiedUniversityEmail';

const Page = () => {
  return (
    <>
      <NavigationBar title="학교 인증하기" className="bg-white" />
      <div className="h-[calc(100vh-50px)] w-full bg-gray-50 px-[16px] pt-[24px]">
        <VerifiedUniversityDescription />
        <VerifiedUniversityEmail />
        <CheckVerifiedUniversityEmailButton />
      </div>
    </>
  );
};

export default Page;
