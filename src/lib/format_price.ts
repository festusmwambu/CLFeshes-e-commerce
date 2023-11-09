const formatPrice = (price: number) => {
  const formattedPrice = (price / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formattedPrice;
};

export default formatPrice;
