"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import ABTestPanel from "@/components/marketing/ab-test-panel";
import PerformanceDashboard from "@/components/marketing/performance-dashboard";
import TemplateSystem from "@/components/marketing/template-system";
import FeedbackSystem from "@/components/marketing/feedback-system";

export default function AdvancedMarketingPage() {
  const [activeTab, setActiveTab] = useState("ab-test");

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 섹션 */}
      <Section spacing="lg" background="primary" align="center">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-foreground">
            🚀 고급 마케팅 기능
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl">
            3단계에서 구현한 A/B 테스트, 성과 분석, 템플릿 시스템, 피드백 시스템을 통합하여 테스트해보세요
          </p>
        </div>
      </Section>

      <Container size="lg" padding="lg">
        {/* 기능 개요 */}
        <Section spacing="lg">
          <Card>
            <CardHeader>
              <CardTitle>🎯 3단계 구현 완료 기능들</CardTitle>
              <CardDescription>
                고급 마케팅 자동화를 위한 핵심 기능들을 확인하고 테스트해보세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="text-center p-4">
                  <div className="text-3xl mb-2">🧪</div>
                  <h3 className="font-semibold mb-2">A/B 테스트</h3>
                  <p className="text-sm text-muted-foreground">
                    다양한 마케팅 문구 버전 생성 및 성과 비교
                  </p>
                </Card>
                <Card className="text-center p-4">
                  <div className="text-3xl mb-2">📊</div>
                  <h3 className="font-semibold mb-2">성과 분석</h3>
                  <p className="text-sm text-muted-foreground">
                    마케팅 문구 성과 지표 및 트렌드 분석
                  </p>
                </Card>
                <Card className="text-center p-4">
                  <div className="text-3xl mb-2">📋</div>
                  <h3 className="font-semibold mb-2">템플릿 시스템</h3>
                  <p className="text-sm text-muted-foreground">
                    자주 사용하는 마케팅 문구 패턴 저장 및 재사용
                  </p>
                </Card>
                <Card className="text-center p-4">
                  <div className="text-3xl mb-2">💬</div>
                  <h3 className="font-semibold mb-2">피드백 시스템</h3>
                  <p className="text-sm text-muted-foreground">
                    사용자 피드백 수집 및 개선점 도출
                  </p>
                </Card>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* 통합 테스트 탭 */}
        <Section spacing="lg">
          <Card>
            <CardHeader>
              <CardTitle>🔧 통합 기능 테스트</CardTitle>
              <CardDescription>
                각 기능을 탭으로 구분하여 개별적으로 테스트하고 전체 워크플로우를 확인하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="ab-test">A/B 테스트</TabsTrigger>
                  <TabsTrigger value="performance">성과 분석</TabsTrigger>
                  <TabsTrigger value="templates">템플릿</TabsTrigger>
                  <TabsTrigger value="feedback">피드백</TabsTrigger>
                </TabsList>

                <TabsContent value="ab-test" className="mt-6">
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold mb-2">🧪 A/B 테스트 패널</h2>
                      <p className="text-muted-foreground">
                        다양한 마케팅 문구 버전을 생성하고 성과를 비교해보세요
                      </p>
                    </div>
                    <ABTestPanel />
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="mt-6">
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold mb-2">📊 성과 분석 대시보드</h2>
                      <p className="text-muted-foreground">
                        마케팅 문구의 성과를 분석하고 인사이트를 도출하세요
                      </p>
                    </div>
                    <PerformanceDashboard />
                  </div>
                </TabsContent>

                <TabsContent value="templates" className="mt-6">
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold mb-2">📋 마케팅 템플릿 시스템</h2>
                      <p className="text-muted-foreground">
                        자주 사용하는 마케팅 문구 패턴을 저장하고 재사용하세요
                      </p>
                    </div>
                    <TemplateSystem />
                  </div>
                </TabsContent>

                <TabsContent value="feedback" className="mt-6">
                  <div className="space-y-4">
                    <div className="text-center mb-6">
                      <h2 className="text-2xl font-bold mb-2">💬 사용자 피드백 시스템</h2>
                      <p className="text-muted-foreground">
                        생성된 마케팅 문구에 대한 피드백을 수집하고 개선점을 도출하세요
                      </p>
                    </div>
                    <FeedbackSystem />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </Section>

        {/* 워크플로우 가이드 */}
        <Section spacing="lg">
          <Card>
            <CardHeader>
              <CardTitle>🔄 전체 워크플로우 가이드</CardTitle>
              <CardDescription>
                3단계 고급 마케팅 기능의 전체적인 사용 흐름을 안내합니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">1단계: 마케팅 문구 생성</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">1</span>
                        메인 페이지에서 기본 마케팅 문구 생성
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">2</span>
                        A/B 테스트로 다양한 버전 생성
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs">3</span>
                        템플릿 시스템에서 기존 패턴 활용
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">2단계: 성과 분석 및 최적화</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">4</span>
                        성과 분석 대시보드에서 지표 확인
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">5</span>
                        A/B 테스트 결과로 최적 버전 선택
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">6</span>
                        성과가 좋은 문구를 템플릿으로 저장
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">3단계: 피드백 수집 및 개선</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">7</span>
                        사용자 피드백 시스템으로 의견 수집
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">8</span>
                        피드백 분석을 통한 개선점 도출
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-xs">9</span>
                        개선된 문구로 재생성 및 테스트
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">4단계: 지속적 최적화</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs">10</span>
                        성과 지표 모니터링 및 트렌드 분석
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs">11</span>
                        새로운 마케팅 전략 및 템플릿 개발
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs">12</span>
                        데이터 기반 의사결정으로 ROI 향상
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* 기술적 특징 */}
        <Section spacing="lg">
          <Card>
            <CardHeader>
              <CardTitle>⚡ 기술적 특징 및 장점</CardTitle>
              <CardDescription>
                3단계에서 구현된 고급 기능들의 기술적 특징과 비즈니스 가치를 설명합니다
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">🔧 기술적 특징</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      TypeScript 기반 타입 안전성
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      React Hook Form을 통한 효율적인 폼 관리
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      Tailwind CSS 기반 반응형 디자인
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      컴포넌트 기반 모듈화 아키텍처
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                      실시간 데이터 업데이트 및 상태 관리
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">💼 비즈니스 가치</h3>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      A/B 테스트를 통한 마케팅 효과 최적화
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      데이터 기반 의사결정으로 ROI 향상
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      템플릿 재사용으로 작업 효율성 증대
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      사용자 피드백을 통한 지속적 개선
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                      마케팅 자동화로 인력 비용 절약
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>
      </Container>
    </div>
  );
}
