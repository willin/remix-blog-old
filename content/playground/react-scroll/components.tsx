import { useScrollPixel } from './use-scroll';

export function Pixel() {
  const [scrollRef, scrollPixel, height] = useScrollPixel();
  return (
    <div ref={scrollRef}>
      {/* Simulate overflowing content */}
      <div id='test1' style={{ height: '300px' }} />

      {/* Display scroll percentage */}
      <h1>{`${scrollPixel}px, of total ${height}px`}</h1>
    </div>
  );
}
