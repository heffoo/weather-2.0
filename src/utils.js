

export function formatDate(time) {
  return new Date(time * 1000).toLocaleString("ru", {
    month: "long",
    day: "numeric",
  });
}
export function formatTime(time) {
  return new Date(time * 1000).toLocaleString("ru", {
    hour: "numeric",
    minute: "numeric",
  });
}

let clouds;
export function translateClouds(mainClouds) {
  
  if (mainClouds === "Clouds") {
    clouds = "Облачно";
  } else if (mainClouds === "Rain") {
    clouds = "Дождь";
  } else if (mainClouds === "Clear") {
    clouds = "Солнечно";
  } else if (mainClouds === "Smoke") {
    clouds = "Дымка";
  } else if (mainClouds === "Mist") {
    clouds = "Туман";
  } else if (mainClouds === "Drizzle") {
    clouds = "Морось";
  } else if (mainClouds === "Snow") {
    clouds = "Снег";
  } else {
    clouds = mainClouds;
  }
  return clouds;
};
