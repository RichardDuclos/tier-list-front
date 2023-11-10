export function frenchDateFormatter(date: Date | string | null | undefined) {
  if(!date) {
    return '';
  }
  if(typeof date === 'string') {
    date = new Date(date);
  }
  const day = date.getDate().toString().padStart(2, '0'); // Récupère le jour et le formate sur deux chiffres
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Récupère le mois (attention, les mois sont indexés à partir de 0) et le formate sur deux chiffres
  const year = date.getFullYear().toString(); // Récupère l'année
  return `${day}/${month}/${year}`;
}
