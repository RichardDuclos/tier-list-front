export interface ApiErrorInterface {
  property: string;
  value: string | number;
  constraints: {[key: string]: string} //ex: IsIn: 'wrong-value'
  contexts: {
    [key: string]: {
      [key: string]: string
    }
  }
}
