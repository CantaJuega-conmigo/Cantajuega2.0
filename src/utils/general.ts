export const transformDate = (date: string): string => {
  /*Esta funciión sirve para transformar las fechas de creación
    que trae la DB a formato normal o sea de este formato 2023-10-30T12:45:58.795Z a este 30/10/2023 */
  const day = new Date(date).getDate();
  const month = Number(new Date(date).getMonth() + 1);
  const year = new Date(date).getFullYear();

  return `${day}/${month}/${year}`;
};
export const getAge = (ageInMonth: number) => {
  let year = Math.floor(ageInMonth / 12);
  let months = ageInMonth % 12;

  if (year === 0) {
    return `${months} ${months > 1 ? "meses" : "mes"}`;
  } else if (months === 0) {
    return ` ${year} ${year > 1 ? "años" : "año"}`;
  } else {
    return ` ${year} ${year > 1 ? "años" : "año"} y ${months} ${
      months > 1 ? "meses" : "mes"
    }`;
  }
};
