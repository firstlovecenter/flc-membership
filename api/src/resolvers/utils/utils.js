export const throwError = (message, error) => {
  let errorVar = ''
  if (error) {
    errorVar = error
  }
  console.error(error)
  if (error?.response?.data?.message) {
    errorVar = error?.response?.data?.message
  }
  if (error?.response?.statusText) {
    errorVar = `${error.response.status} ${error.response.statusText}`
  }
  throw new Error(`${message} ${errorVar}`)
}
export const noEmptyArgsValidation = (args) => {
  if (!args.length) {
    throwError('Argument not in Array', Error('Args must be passed in array'))
  }
  args.forEach((argument, index) => {
    if (!argument) {
      throwError(
        'No Empty Arguments Allowed',
        Error(`${args[index - 1]} Argument Cannot Be Empty`)
      )
    }
  })
}
