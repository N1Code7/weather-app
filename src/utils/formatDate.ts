export const formatDate = (entryDate: string) => {
  const date = entryDate.split("T")[0].split("-");
  const time = entryDate.split("T")[1].slice(0, 5);

  return `${date[2]}/${date[1]}/${date[0]} à ${time}`;
};
