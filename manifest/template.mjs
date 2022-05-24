export default {
  name: "Markdown Simple Link",
  manifest_version: 3,
  permissions: [
    "storage"
  ],
  action: {
    default_title: "Markdown Simple Link",
    default_popup: "statics/html/popup.html",
  },
  background: {
    service_worker: "index.js"
  }
};
