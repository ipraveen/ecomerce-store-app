import React from 'react';
import { FaroProfiler } from '@grafana/faro-react';

interface PageProfilerProps {
  name: string;
  children: React.ReactNode;
}

export function PageProfiler({ name, children }: PageProfilerProps) {
  return (
    <FaroProfiler name={name} updateProps={{}}>
      {children}
    </FaroProfiler>
  );
}
