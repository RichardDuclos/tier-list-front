export function priceFormater(price: number | string) {
  if(typeof price === 'string') {
    price = Number(price);
  }
  let euros = Intl.NumberFormat('fr-Fr', {
    style: 'currency',
    currency: 'EUR',
  });
  return euros.format(price);
}
