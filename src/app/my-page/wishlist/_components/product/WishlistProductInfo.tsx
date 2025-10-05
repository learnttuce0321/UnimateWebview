import PriceCurrency from 'components/price/PriceCurrency';
import { CurrencyType } from 'types/Product';
import { formatNumber } from 'utils/formatNumber';
import WishlistProductMetadata from './WishlistProductMetadata';
import WishlistProductTitle from './WishlistProductTitle';
import WishlistProductPrice from './WishlistProductPrice';

interface Props {
  title: string;
  universityName: string;
  price: number;
  currencyType: CurrencyType;
}

const WishlistProductInfo = ({
  title,
  universityName,
  price,
  currencyType,
}: Props) => {
  return (
    <div className="">
      <WishlistProductTitle title={title} />
      <WishlistProductMetadata universityName={universityName} />
      <WishlistProductPrice price={price} currencyType={currencyType} />
    </div>
  );
};

export default WishlistProductInfo;
