// use chalk to print text in rainbow colors
import chalk from 'chalk';

function hslToRgb(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;

  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) =>
    l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return [
    Math.round(255 * f(0)),
    Math.round(255 * f(8)),
    Math.round(255 * f(4)),
  ];
}

function rainbowGradient(text: string) {
  return text
    .split('')
    .map((char, i) => {
      const hue = (i / text.length) * 360;
      const [r, g, b] = hslToRgb(hue, 100, 50);
      return chalk.rgb(r as number, g as number, b as number)(char);
    })
    .join('');
}

export default rainbowGradient;
