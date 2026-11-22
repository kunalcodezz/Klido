import type { BlockStyles, BlockAnimations, BlockResponsive } from '../schemas/styles';

export function compileBlockStyles(styles?: BlockStyles): React.CSSProperties {
  if (!styles) return {};
  const css: React.CSSProperties = {};

  if (styles.backgroundColor) css.backgroundColor = styles.backgroundColor;
  if (styles.textColor) css.color = styles.textColor;
  if (styles.paddingTop) css.paddingTop = styles.paddingTop;
  if (styles.paddingBottom) css.paddingBottom = styles.paddingBottom;
  if (styles.marginTop) css.marginTop = styles.marginTop;
  if (styles.marginBottom) css.marginBottom = styles.marginBottom;
  if (styles.borderRadius) css.borderRadius = styles.borderRadius;
  if (styles.borderWidth) css.borderWidth = styles.borderWidth;
  if (styles.borderColor) css.borderColor = styles.borderColor;

  return css;
}

export function compileBlockClassNames(
  styles?: BlockStyles,
  animations?: BlockAnimations,
  responsive?: BlockResponsive
): string {
  const classes: string[] = [];

  if (styles?.customClassName) {
    classes.push(styles.customClassName);
  }

  if (responsive?.hideOnMobile) classes.push('hidden sm:block');
  if (responsive?.hideOnTablet) classes.push('sm:hidden md:block');
  if (responsive?.hideOnDesktop) classes.push('lg:hidden');

  return classes.join(' ');
}
