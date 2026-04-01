const logger = {
  log: function (...data: any[]) {
    if (process.env.NODE_ENV !== "test") {
      console.log(...data);
    }
  },
};

export default logger;
