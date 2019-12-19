export default (name, couplet) => ({
  validate: couplet.predicate,
  gen: couplet.generator
});
