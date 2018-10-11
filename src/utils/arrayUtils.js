export const orderBy = (array, identity, order) => {

  const compare = (a, b, order) => {
    if (a > b) {
      return order === 'asc' ? 1 : -1;
    } else if (a < b) {
      return order === 'asc' ? -1 : 1;
    } else {
      return 0;
    }
  }

  return array.sort((a,b) => {
    for (let idx = 0; idx < identity.length; idx++) {
      let res = compare(a[identity[idx]], b[identity[idx]], order[idx])
      if (res !== 0) {
        return res
      }
    }
    return 0
  })
}