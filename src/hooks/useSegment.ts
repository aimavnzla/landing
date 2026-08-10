import { useState, useEffect, useCallback } from 'react';
import type { Segment } from '../data/segments';

const SEGMENT_KEY = 'aima_segment';

export function useSegment() {
  const [segment, setSegmentState] = useState<Segment>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(SEGMENT_KEY) as Segment;
      if (stored && ['tradicional', 'luxury', 'admin'].includes(stored)) {
        return stored;
      }
    }
    return 'tradicional';
  });

  const setSegment = useCallback((newSegment: Segment) => {
    setSegmentState(newSegment);
    if (typeof window !== 'undefined') {
      localStorage.setItem(SEGMENT_KEY, newSegment);
    }
  }, []);

  return { segment, setSegment };
}