import { useRef, useState, useEffect } from 'react';

function getScrollPercentage(element) {
  if (element === null) {
    return NaN;
  }
  const height = element.scrollHeight - element.clientHeight;
  return Math.round((element.scrollTop / height) * 100);
}

function getScrollPixel(element) {
  if (element === null) {
    return NaN;
  }
  // console.log(JSON.stringify(e.target.getBoundingClientRect()));

  return element.getBoundingClientRect().top;
}

export function useScrollPercentage() {
  const scrollRef = useRef(null);
  const [scrollPercentage, setScrollPercentage] = useState(NaN);

  const reportScroll = (e) => {
    setScrollPercentage(getScrollPercentage(e.target));
    console.log(e.target);
  };

  useEffect(() => {
    const node = scrollRef.current;
    if (node !== null) {
      node.addEventListener('scroll', reportScroll, { passive: true });
      if (Number.isNaN(scrollPercentage)) {
        setScrollPercentage(getScrollPercentage(node));
      }
    }
    return () => {
      if (node !== null) {
        node.removeEventListener('scroll', reportScroll);
      }
    };
  }, [scrollPercentage]);

  return [scrollRef, Number.isNaN(scrollPercentage) ? 0 : scrollPercentage];
}

export function useScrollPixel() {
  const scrollRef = useRef(null);
  const [scrollPixel, setScrollPixel] = useState(NaN);

  const reportScroll = (e) => {
    setScrollPixel(getScrollPixel(e.target));
    console.log(e.target);
  };

  useEffect(() => {
    console.log(scrollRef.current);
    const node = scrollRef.current;
    if (node !== null) {
      node.addEventListener('scroll', reportScroll);
      if (Number.isNaN(scrollPixel)) {
        setScrollPixel(getScrollPixel(node));
      }
    }
    return () => {
      if (node !== null) {
        node.removeEventListener('scroll', reportScroll);
      }
    };
  }, [scrollPixel]);

  const height =
    scrollRef.current === null ? NaN : scrollRef.current.clientHeight;

  return [
    scrollRef,
    Number.isNaN(scrollPixel) || scrollPixel < 0 ? 0 : scrollPixel,
    height
  ];
}
