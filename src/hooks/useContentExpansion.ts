
import { useState, useEffect } from 'react';

interface UseContentExpansionProps {
  initialExpanded?: boolean;
  onResultChange?: unknown;
}

export function useContentExpansion({ initialExpanded = false, onResultChange }: UseContentExpansionProps = {}) {
  const [showContentIndicator, setShowContentIndicator] = useState(true);
  const [expandContent, setExpandContent] = useState(initialExpanded);

  useEffect(() => {
    if (onResultChange) {
      setExpandContent(false);
      setShowContentIndicator(true);
    }
  }, [onResultChange]);

  const toggleContent = () => {
    setExpandContent(prevExpanded => !prevExpanded);
  };

  return {
    showContentIndicator,
    setShowContentIndicator,
    expandContent,
    setExpandContent,
    toggleContent
  };
}
