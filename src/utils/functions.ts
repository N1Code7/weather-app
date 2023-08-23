export const formatDate = (entryDate: string) => {
  const date = entryDate.split("T")[0].split("-");
  const time = entryDate.split("T")[1].slice(0, 5);

  return `${date[2]}/${date[1]}/${date[0]} à ${time}`;
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
