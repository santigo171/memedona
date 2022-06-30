function changeFavicon(favicon_url) {
  if (!favicon_url) throw new Error("No favicon url");

  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.getElementsByTagName("head")[0].appendChild(link);
  }
  link.href = favicon_url;
}

export { changeFavicon };
