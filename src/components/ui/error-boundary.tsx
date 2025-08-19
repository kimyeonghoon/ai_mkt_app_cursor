"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });

    // 프로덕션에서는 에러 로깅 서비스로 전송
    if (process.env.NODE_ENV === 'production') {
      // 예: Sentry, LogRocket 등
      console.log('Production error logged:', {
        message: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack
      });
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <span>⚠️</span>
                오류가 발생했습니다
              </CardTitle>
              <CardDescription>
                예상치 못한 오류가 발생했습니다. 문제를 해결하기 위해 노력하고 있습니다.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-muted p-3 rounded-lg text-sm font-mono overflow-auto">
                  <div className="font-semibold mb-2">에러 정보 (개발 모드):</div>
                  <div className="text-destructive">{this.state.error.message}</div>
                  {this.state.error.stack && (
                    <details className="mt-2">
                      <summary className="cursor-pointer text-muted-foreground">스택 트레이스</summary>
                      <pre className="text-xs mt-2 whitespace-pre-wrap">{this.state.error.stack}</pre>
                    </details>
                  )}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button onClick={this.handleReload} className="flex-1">
                  🔄 다시 시도
                </Button>
                <Button onClick={this.handleGoHome} variant="outline" className="flex-1">
                  🏠 홈으로
                </Button>
              </div>
              
              <div className="text-xs text-muted-foreground text-center">
                문제가 지속되면 관리자에게 문의해주세요
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
