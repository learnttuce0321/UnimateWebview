import BackButton from 'components/navigation/BackButton';

interface Props {
  title: string;
  showBackButton?: boolean;
  renderOptionButtons?: React.ReactNode;
  className?: HTMLElement['className'];
}

const NavigationBar = ({
  title,
  showBackButton = true,
  renderOptionButtons,
  className,
}: Props) => {
  return (
    <header className={`h-[50px] relative px-[16px] py-[14px] ${className}`}>
      {showBackButton ? <BackButton className="absolute left-[14px]" /> : null}
      <h1 className="text-center h-[24px] text-[18px] font-bold text-blue_gray-900">
        {title}
      </h1>
      {renderOptionButtons ? (
        <span className="absolute right-[14px] h-[22px] top-[14px]">
          {renderOptionButtons}
        </span>
      ) : null}
    </header>
  );
};

export default NavigationBar;
