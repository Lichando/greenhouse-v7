export function formatPrice(price: number | string, currency: string = 'ARS'): string {
  const numPrice = Number(price);
  
  const currencyFormatter = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return currencyFormatter.format(numPrice);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
