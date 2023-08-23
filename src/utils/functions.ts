export const formatDate = (entryDate: string, outputFormat?: number) => {
  const date = entryDate.split("T")[0].split("-"); // [year, month, day]
  const time = entryDate.split("T")[1].slice(0, 5);

  if (outputFormat === 2) {
    return `${getDayOfWeek(entryDate)} ${date[2]} ${getMonthOfYear(entryDate)} ${date[0]}`;
  } else {
    return `${date[2]}/${date[1]}/${date[0]} à ${time}`;
  }
};

export const getDayOfWeek = (entryDate: string, format = "long") => {
  const days = [
    { short: "Dim", long: "dimanche" },
    { short: "Lun", long: "lundi" },
    { short: "Mar", long: "mardi" },
    { short: "Mer", long: "mercredi" },
    { short: "Jeu", long: "jeudi" },
    { short: "Ven", long: "vendredi" },
    { short: "Sam", long: "samedi" },
  ];

  const dayNumber = new Date(entryDate).getDay();

  if (format === "long") {
    return days[dayNumber].long;
  }
  return days[dayNumber].short;
};

export const getMonthOfYear = (entryDate: string, format = "long") => {
  const months = [
    { short: "Jan", long: "janvier" },
    { short: "Fev", long: "février" },
    { short: "Mar", long: "mars" },
    { short: "Avr", long: "avril" },
    { short: "Mai", long: "mai" },
    { short: "Jun", long: "juin" },
    { short: "Jui", long: "juillet" },
    { short: "Aou", long: "août" },
    { short: "Sep", long: "septembre" },
    { short: "Oct", long: "octobre" },
    { short: "Nov", long: "novembre" },
    { short: "Dec", long: "décembre" },
  ];

  const monthNumber = new Date(entryDate).getMonth();

  if (format === "long") {
    return months[monthNumber].long;
  }
  return months[monthNumber].short;
};

export const findWindDirection = (degree: number) => {
  if (degree > 22.5 && degree < 67.5) {
    return ["NE", "Nord Ouest"];
  } else if (degree > 67.5 && degree < 112.5) {
    return ["E", "Est"];
  } else if (degree > 112.5 && degree < 157.5) {
    return ["SE", "Sud Est"];
  } else if (degree > 157.5 && degree < 202.5) {
    return ["S", "Sud"];
  } else if (degree > 202.5 && degree < 247.5) {
    return ["SW", "Sud Ouest"];
  } else if (degree > 247.5 && degree < 292.5) {
    return ["W", "Ouest"];
  } else if (degree > 292.5 && degree < 337.5) {
    return ["NW", "Nord Ouest"];
  } else {
    return ["N", "Nord"];
  }
};

export const convertSpeed = (speed: number) => (speed * 3600) / 1000;

export const getSaintFromCookie = () => {
  const cookies = document.cookie.split(";");
  console.log(cookies);

  let saint = "";
  cookies.forEach((cookie) => {
    if (cookie.split("=")[0].includes("saintOfTheDay")) {
      saint = cookie.split("=")[1];
    }
  });

  if (saint === "") return null;
  console.log(saint);

  return saint;
};

export const getTomorrowMidnight = () => {
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));
  tomorrow.setHours(0);
  tomorrow.setMinutes(0);
  tomorrow.setSeconds(0);
  return tomorrow;
};
