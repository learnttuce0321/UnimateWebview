import { UserUniversity } from 'types/User';
import MateTooltip from './MateTooltip';

interface Props {
  university: UserUniversity | undefined;
}

const MateUniversity = ({ university }: Props) => {
  return (
    <div>
      {university?.name && (
        <div className="flex gap-[22px]">
          <div className="flex w-[96px] items-center gap-[4px]">
            <p className="text-[14px] font-semibold leading-[14px] text-blue_gray-900">
              학교
            </p>
            <MateTooltip>
              <img
                src="/images/svg/mate/information.svg"
                width={16}
                height={16}
                alt=""
              />
            </MateTooltip>
          </div>

          <div className="flex items-center gap-[8px]">
            <img
              src="/images/svg/mate/badgeIcon.svg"
              width={14}
              height={14}
              alt=""
            />
            <span className="mr-[4px] text-[14px] font-medium leading-[14px] text-blue_gray-600">
              {university.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MateUniversity;
