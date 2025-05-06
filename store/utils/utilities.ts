const strongPasswordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?\d)(?=.*?[#?!@$%^&*-]).{8,}$/;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const dateFormatRo = new Intl.DateTimeFormat("ro", {
  timeStyle: "medium",
  dateStyle: "short",
});
const dateFormatEn = new Intl.DateTimeFormat("en-GB", {
  timeStyle: "medium",
  dateStyle: "short",
});

const formatDateTime = (
  locale: string,
  dateString: string | undefined | null
) => {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return locale == "en" ? dateFormatEn.format(date) : dateFormatRo.format(date);
};

const formatDate = (locale: string, dateString: string | undefined | null) => {
  const date = formatDateTime(locale, dateString);
  return date.substring(0, 10);
};

export { emailRegex, formatDate, formatDateTime, strongPasswordRegex };

