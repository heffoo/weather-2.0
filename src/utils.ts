export function formatDate(time: number) {
  return new Date(time * 1000).toLocaleString("ru", {
    month: "long",
    day: "numeric",
  });
}
export function formatTime(time: number) {
  return new Date(time * 1000).toLocaleString("ru", {
    hour: "numeric",
    minute: "numeric",
  });
}

export function translateClouds(mainClouds: string) {
  let clouds;
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
}
