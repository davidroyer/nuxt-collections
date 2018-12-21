export function orderByDate (posts) {
  return posts.sort((a, b) => b.matter.attributes.date.valueOf() - a.matter.attributes.date.valueOf());
}
exports.orderByDate = orderByDate;
