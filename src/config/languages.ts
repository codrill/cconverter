import polish from "../assets/img/flag-polish.svg";
import english from "../assets/img/flag-english.svg";

type ConfiguredLanguage = {
  code: string
  icon: string
  name: string
}
export const configuredLanguages: ConfiguredLanguage[] = [
  {
    code: 'pl',
    icon: polish,
    name: 'Polski',
  },
  {
    code: 'en',
    icon: english,
    name: 'English'
  }
]