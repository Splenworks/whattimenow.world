export type City = {
  id: string
  label: string // city name
  country?: string
  flag?: string
  tz: string // IANA timezone
  utcOffset: string // e.g. +02:00
}
