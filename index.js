const arr1 = 'abcdefghijklmnopqrstuvwxyz'.split('')
const arr2 = 'zyxwvutsrqponmlkjihgfedcba'.split('')
const arr3 = 'zyxwvutsrrponmlkjihgfedcba'.split('')

const option1 = (a, b) => {
  const aSorted = a.sort()
  const bSorted = b.sort()
  const length = bSorted.length
  for (let i = 0; i < length; i++) {
    if (aSorted[i] !== bSorted[i]) {
      return false
    }
  }
  return true
}

const option2 = (a, b) => {
  return a.sort().toString() === b.sort().toString()
}

const option3 = (a, b) => {
  if (a.length !== b.length) {
    return false
  }

  for (const item of a) {
    if (b.indexOf(item) === -1) {
      return false
    }
  }

  return true
}

const getRunTime = (fn) => {
  const start = process.hrtime()
  fn()
  return process.hrtime(start)
}

const getNRuns = (count, fn) => {
  const results = []
  while (count--) {
    results.push(getRunTime(fn))
  }
  return results
}

const runs = 100
const option1Runs = getNRuns(runs, () => option1(arr1, arr2))
const option2Runs = getNRuns(runs, () => option2(arr1, arr2))
const option3Runs = getNRuns(runs, () => option3(arr1, arr2))
const option1NotMatched = getNRuns(runs, () => option1(arr1, arr3))
const option2NotMatched = getNRuns(runs, () => option2(arr1, arr3))
const option3NotMatched = getNRuns(runs, () => option3(arr1, arr3))

const average = (hrtimes) => {
  const sum = hrtimes.reduce((acc, [, ns]) => {
    return acc + ns
  }, 0)
  return sum / hrtimes.length
}

console.log('option1, same', average(option1Runs))
console.log('option2, same', average(option2Runs))
console.log('option3, same', average(option3Runs))
console.log('option1, !same', average(option1NotMatched))
console.log('option2, !same', average(option2NotMatched))
console.log('option3, !same', average(option3NotMatched))
