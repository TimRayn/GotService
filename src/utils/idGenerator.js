function idGenerator() {
  return (Date.now() * Math.random() * 1000000).toString(36);
};

export default idGenerator;