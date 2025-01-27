function constant(x) {
  return function constant() {
    return x;
  };
}

export { constant as default };
