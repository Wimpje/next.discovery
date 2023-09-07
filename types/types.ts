type Source = {
  name: string
  url: string
  highlights: string[]
}

type Message = {
  date: Date
  text: string
  user: string
  error?: boolean // this is used to indicate a problem in the message
  sources?: Source[]
}

export { Message, Source }
