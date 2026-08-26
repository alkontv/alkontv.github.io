import { FooterLink } from "../types";

export const FOOTER_LINKS: FooterLink[] = [
  {
    name: 'Cases',
    hoverText: { en: 'Selected work', ru: 'Избранные работы' },
    icon: 'icons/chevrons-left-right.svg',
    url: './',
  },
  {
    name: 'Telegram',
    hoverText: { en: 'Message me', ru: 'Написать' },
    icon: 'icons/telegram.svg',
    url: 'https://t.me/jdm_as_fuck',
  },
  {
    name: 'GitHub',
    hoverText: { en: 'Open source', ru: 'Открытый код' },
    icon: 'icons/github.svg',
    url: 'https://github.com/alkontv',
  },
  {
    name: 'Instagram',
    hoverText: { en: '@alkontv', ru: '@alkontv' },
    icon: 'icons/instagram.svg',
    url: 'https://www.instagram.com/alkontv/',
  },
  {
    name: 'Resume',
    hoverText: { en: 'Download CV', ru: 'Скачать резюме' },
    icon: 'icons/file.svg',
    url: './Alan-CV-en.pdf',
    urlByLang: { en: './Alan-CV-en.pdf', ru: './Alan-CV-ru.pdf' },
  },
];
