const isEmailValid = (email: string): boolean => {
  const regex = new RegExp(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)

  return regex.test(email)
}

export {
  isEmailValid,
}