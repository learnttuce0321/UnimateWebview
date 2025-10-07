import { CurrencyType } from 'types/Product';
import LikedProductMetadata from './LikedProductMetadata';
import LikedProductPrice from './LikedProductPrice';
import LikedProductTitle from './LikedProductTitle';

interface Props {
  title: string;
  universityName: string;
  price: number;
  currencyType: CurrencyType;
}

const LikedProductInfo = ({
  title,
  universityName,
  price,
  currencyType,
}: Props) => {
  return (
    <div className="">
      <LikedProductTitle title={title} />
      <LikedProductMetadata universityName={universityName} />
      <LikedProductPrice price={price} currencyType={currencyType} />
    </div>
  );
};

export default LikedProductInfo;
