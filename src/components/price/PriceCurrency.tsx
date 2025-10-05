import { CurrencyType } from 'types/Product';

interface Props {
  currencyType: CurrencyType;
}

const PriceCurrency = ({ currencyType }: Props) => {
  if (currencyType === 'USD') {
    return <span>$</span>;
  }

  return <span>원</span>;
};

export default PriceCurrency;
