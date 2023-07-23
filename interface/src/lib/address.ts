export const shortenAddress = (address: string | null | undefined) => {
  if (!address) return '';
  return address.slice(0, 6) + '...' + address.slice(-4);
};

export const isSameAddress = (
  a: string | null | undefined,
  b: string | null | undefined,
) => {
  if (!a || !b) return false;
  return a.toLowerCase() === b.toLowerCase();
};
