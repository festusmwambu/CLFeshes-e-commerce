import formatPrice from "@/lib/format_price";

interface PriceTagProps {
  price: number;
  className?: string;
}

const PriceTag = ({ price, className }: PriceTagProps) => {
  return <span className={`badge ${className}`}>{formatPrice(price)}</span>;
};

export default PriceTag;
