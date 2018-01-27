export const findNonZeroMatches = (matrix, neighbourSize = 3) => {
  const matches = []
  const nonZeroMatches = matrix.findNonZero()

  nonZeroMatches.forEach(nonZeroMatch => {
    let hasNoNeighbours = true

    matches.forEach(match => {
      if (
        nonZeroMatch.x - match.x - neighbourSize < 0
        && nonZeroMatch.y - match.y - neighbourSize < 0
      ) {
        hasNoNeighbours = false
      }
    })

    if (hasNoNeighbours) {
      matches.push({
        x: nonZeroMatch.x,
        y: nonZeroMatch.y,
      })
    }
  })

  return matches
}
