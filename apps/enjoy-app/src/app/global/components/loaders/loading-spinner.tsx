import React from 'react';
import { useTheme } from '@emotion/react';
import { PulseLoader } from 'react-spinners';

interface IInlineLoaderProps {
  className?: string;
  color?: string;
  loading?: boolean;
  size?: number;
}

function LoadingSpinner({
  className = 'undefined',
  color = undefined,
  loading = true,
  size = 4,
}: IInlineLoaderProps) {
  const theme = useTheme();

  return (
    <div className={className} role="progressbar">
      <PulseLoader
        size={size}
        color={color || theme.colours.primary}
        loading={loading}
      />
    </div>
  );
}

export default LoadingSpinner;
