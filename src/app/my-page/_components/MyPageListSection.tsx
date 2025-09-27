import MyPageListItem from './MyPageListItem';
import { MY_PAGE_LIST_CONFIG, MyPageConfigId } from '../_constant/myPage';

interface Props {
  sectionId: MyPageConfigId;
}

const MyPageListSection = ({ sectionId }: Props) => {
  const sectionConfig = MY_PAGE_LIST_CONFIG[sectionId];

  return (
    <div className="flex w-full flex-col gap-[24px] rounded-[10px] bg-white px-[16px] py-[16px] pb-[8px]">
      <p className="text-[16px] font-bold leading-[16px] text-blue_gray-900">
        {sectionConfig.title}
      </p>
      <div className="[&>*:not(:last-child)]:border-blue_gray-300 flex flex-col [&>*:not(:last-child)]:border-b-[0.5px]">
        {sectionConfig.listItems.map((item) => (
          <MyPageListItem
            title={item.title}
            targetUrl={item.targetUrl}
            key={item.title}
          />
        ))}
      </div>
    </div>
  );
};

export default MyPageListSection;
