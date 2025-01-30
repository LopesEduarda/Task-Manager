export const formatDate = (isoDate: string | null | undefined) => {
  if (!isoDate) return "-";

  const date = new Date(isoDate);

  // Ajustando para o horário local corretamente
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  return localDate.toLocaleDateString("pt-BR");
};
