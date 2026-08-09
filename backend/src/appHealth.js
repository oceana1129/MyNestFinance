app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    environment: process.env.NODE_ENV,
  });
});
