function download(link) {
  const a = document.createElement("a");

  a.setAttribute("href", link);
  a.setAttribute("download", "");
  a.setAttribute("target", "_blank");
  a.style.display = "none";

  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}

// function download(url, filename) {
//   console.log(axios);
//   fetch(url).then((res) => console.log(res));
//   // axios
//   //   .get(url, {
//   //     "Access-Control-Allow-Origin": "*",
//   //     responseType: "blob",
//   //   })
//   //   .then((res) => {
//   //     fileDownload(res.data, filename);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });
// }

// function download(url) {
//   fetch(url, {
//     mode: "no-cors",
//   })
//     .then((response) => response.blob())
//     .then((blob) => {
//       let blobUrl = window.URL.createObjectURL(blob);
//       let a = document.createElement("a");
//       a.download = url.replace(/^.*[\\\/]/, "");
//       a.href = blobUrl;
//       document.body.appendChild(a);
//       console.log(a);
//       a.click();
//       a.remove();
//     });
// }

export { download };
