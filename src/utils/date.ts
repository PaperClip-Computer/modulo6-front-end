export function formatDate(dateString: string) {
  dateString = dateString.replaceAll('Z', '');
  const date = new Date(dateString);

  if (!date) {
    return undefined;
  }

  return [
    date.getDate().toString().padStart(2, '0'),
    (date.getMonth() + 1).toString().padStart(2, '0'),
    date.getFullYear(),
  ].join('/');
}

export function createUTCDate(date: string) {
  const dateFormats = [
    {
      test: /\d{2}\/\d{2}\/\d{4}/,
      parse: (text: string) => {
        const [day, month, year] = text.split('/');
        return { day, month, year };
      },
    },
    {
      test: /\d{4}-\d{2}-\d{2}/,
      parse: (text: string) => {
        const [year, month, day] = text.split('-');
        return { day, month, year };
      },
    },
  ];
  const { year, month, day } =
    dateFormats.find(format => date.match(format.test))?.parse(date) ?? {};

  if (!year || !month || !day) {
    return undefined;
  }

  return new Date(`${year}-${month}-${day}T00:00`);
}
