export function streetFraming(width, height, view = 'full') {
  const close = width <= 760 && view !== 'full';
  const scale = (close ? Math.max : Math.min)(width / 1536, height / 1024);
  const artWidth = 1536 * scale, artHeight = 1024 * scale;
  let center = close ? view === 'magic' ? 420 : 1130 : 768;
  if (close) center = Math.max(width / scale / 2, Math.min(1536 - width / scale / 2, center));
  const horizontal = width / height >= 1.5;
  return { scale, artWidth, artHeight, left: width / 2 + (768 - center) * scale, top: height / 2,
    close, horizontal, surroundWidth: horizontal ? artWidth * 2 : artWidth,
    surroundHeight: horizontal ? artHeight : artWidth * 2.25,
    feather: close || Math.abs(width / height - 1.5) < .002 ? 0 : Math.min(64, scale * 76) };
}
