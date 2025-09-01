export function formatDate(date) {
  if (!date) return null;

  if (date.includes("/")) {
    const [month, day, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }

  if (date.includes("T")) {
    return new Date(date).toISOString().split("T")[0];
  }
}
