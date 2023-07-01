export interface HeaderProps {
  [T: string]: K[T]
}

export interface TableProps {
  loading?: boolean
  headers: Array<HeaderProps>
  data: Array<{
    [T: string]: K[T]
  }>
}