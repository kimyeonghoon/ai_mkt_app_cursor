"use client";

import { useEffect, useState } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  bundleSize: string;
  memoryUsage: number;
  renderTime: number;
}

export function PerformanceOptimizer() {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);

  useEffect(() => {
    // 페이지 로드 시간 측정
    const loadTime = performance.now();
    
    // 메모리 사용량 측정 (Chrome에서만 지원)
    const memoryInfo = (performance as any).memory;
    const memoryUsage = memoryInfo ? Math.round(memoryInfo.usedJSHeapSize / 1024 / 1024 * 100) / 100 : 0;
    
    // 번들 크기 추정 (실제로는 webpack-bundle-analyzer 사용 권장)
    const bundleSize = "약 500KB";
    
    setMetrics({
      loadTime: Math.round(loadTime),
      bundleSize,
      memoryUsage,
      renderTime: 0
    });
  }, []);

  if (!metrics) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-background border rounded-lg p-3 shadow-lg text-xs opacity-75 hover:opacity-100 transition-opacity">
      <div className="font-medium mb-2">성능 모니터링</div>
      <div className="space-y-1">
        <div>로드: {metrics.loadTime}ms</div>
        <div>번들: {metrics.bundleSize}</div>
        <div>메모리: {metrics.memoryUsage}MB</div>
      </div>
    </div>
  );
}
