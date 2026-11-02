// Run the production Next.js server, including the reservation API.
process.env.RESERVATION_DATA_DIR ||= require("node:path").resolve(__dirname, "../.data");
process.argv = [
  process.execPath,
  require.resolve("next/dist/bin/next"),
  "start",
  "--port",
  "3100",
  "--hostname",
  "127.0.0.1",
];
require("next/dist/bin/next");
