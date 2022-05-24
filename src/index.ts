setInterval(() => {
  console.log(window.location.host);
  if (window.getSelection) {
    console.log(window.getSelection());
  }
}, 5000);
