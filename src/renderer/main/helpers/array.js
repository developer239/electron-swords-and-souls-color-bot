export const Uint8ToBase64 = (u8Arr) => {
  const length = u8Arr.length
  const CHUNK_SIZE = 0x8000 // arbitrary number

  let index = 0
  let slice
  let result = ''

  while (index < length) {
    slice = u8Arr.subarray(index, Math.min(index + CHUNK_SIZE, length))
    result += String.fromCharCode.apply(null, slice)
    index += CHUNK_SIZE
  }

  return btoa(result)
}
