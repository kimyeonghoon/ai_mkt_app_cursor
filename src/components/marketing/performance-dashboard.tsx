"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Progress } from "@/components/ui/progress";

interface PerformanceMetrics {
  totalCopies: number;
  totalClicks: number;
  totalConversions: number;
  averageEngagement: number;
  topPerformingPlatform: string;
  bestPerformingCopy: string;
  conversionRate: number;
  clickThroughRate: number;
}

interface PlatformPerformance {
  platform: string;
  copies: number;
  clicks: number;
  conversions: number;
  engagement: number;
  conversionRate: number;
}

interface TrendData {
  date: string;
  copies: number;
  clicks: number;
  conversions: number;
  engagement: number;
}

export default function PerformanceDashboard() {
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    totalCopies: 0,
    totalClicks: 0,
    totalConversions: 0,
    averageEngagement: 0,
    topPerformingPlatform: "",
    bestPerformingCopy: "",
    conversionRate: 0,
    clickThroughRate: 0
  });

  const [platformPerformance, setPlatformPerformance] = useState<PlatformPerformance[]>([]);
  const [trendData, setTrendData] = useState<TrendData[]>([]);

  useEffect(() => {
    // 실제로는 API 호출을 통해 데이터 가져오기
    generateMockData();
  }, [timeRange, selectedPlatform]);

  const generateMockData = () => {
    // 전체 성과 지표 생성
    const mockMetrics: PerformanceMetrics = {
      totalCopies: Math.floor(Math.random() * 1000) + 500,
      totalClicks: Math.floor(Math.random() * 50000) + 10000,
      totalConversions: Math.floor(Math.random() * 5000) + 1000,
      averageEngagement: Math.floor(Math.random() * 30) + 70,
      topPerformingPlatform: "Instagram",
      bestPerformingCopy: "건강한 식습관으로 더 멋진 20대 되어보세요!",
      conversionRate: Math.floor(Math.random() * 15) + 5,
      clickThroughRate: Math.floor(Math.random() * 8) + 2
    };

    // 플랫폼별 성과 데이터 생성
    const platforms = ["Instagram", "Facebook", "YouTube", "Twitter"];
    const mockPlatformData: PlatformPerformance[] = platforms.map(platform => ({
      platform,
      copies: Math.floor(Math.random() * 300) + 100,
      clicks: Math.floor(Math.random() * 15000) + 5000,
      conversions: Math.floor(Math.random() * 1500) + 500,
      engagement: Math.floor(Math.random() * 40) + 60,
      conversionRate: Math.floor(Math.random() * 20) + 5
    }));

    // 트렌드 데이터 생성
    const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    const mockTrendData: TrendData[] = Array.from({ length: days }, (_, i) => ({
      date: new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      copies: Math.floor(Math.random() * 50) + 10,
      clicks: Math.floor(Math.random() * 2000) + 500,
      conversions: Math.floor(Math.random() * 200) + 50,
      engagement: Math.floor(Math.random() * 30) + 70
    }));

    setMetrics(mockMetrics);
    setPlatformPerformance(mockPlatformData);
    setTrendData(mockTrendData);
  };

  const getPerformanceColor = (value: number, maxValue: number): string => {
    const percentage = (value / maxValue) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    if (percentage >= 40) return "text-orange-600";
    return "text-red-600";
  };

  const getPerformanceBadgeVariant = (value: number, maxValue: number): "default" | "secondary" | "destructive" => {
    const percentage = (value / maxValue) * 100;
    if (percentage >= 80) return "default";
    if (percentage >= 60) return "secondary";
    return "destructive";
  };

  return (
    <Container size="lg" padding="lg">
      <Section spacing="lg">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>📊 성과 분석 대시보드</CardTitle>
                <CardDescription>
                  마케팅 문구의 성과를 분석하고 인사이트를 도출하세요
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7d">최근 7일</SelectItem>
                    <SelectItem value="30d">최근 30일</SelectItem>
                    <SelectItem value="90d">최근 90일</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">모든 플랫폼</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 전체 성과 지표 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">전체 성과 요약</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{metrics.totalCopies.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">생성된 문구</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{metrics.totalClicks.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">총 클릭수</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{metrics.totalConversions.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">총 전환수</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{metrics.averageEngagement}%</div>
                    <div className="text-sm text-muted-foreground">평균 참여도</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 주요 지표 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">주요 성과 지표</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">전환율</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-green-600">{metrics.conversionRate}%</span>
                      <Badge variant={getPerformanceBadgeVariant(metrics.conversionRate, 20)}>
                        {metrics.conversionRate >= 15 ? "우수" : metrics.conversionRate >= 10 ? "양호" : "개선 필요"}
                      </Badge>
                    </div>
                    <Progress value={metrics.conversionRate} max={20} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      목표 대비 {(metrics.conversionRate / 20 * 100).toFixed(1)}% 달성
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">클릭률 (CTR)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-blue-600">{metrics.clickThroughRate}%</span>
                      <Badge variant={getPerformanceBadgeVariant(metrics.clickThroughRate, 10)}>
                        {metrics.clickThroughRate >= 7 ? "우수" : metrics.clickThroughRate >= 5 ? "양호" : "개선 필요"}
                      </Badge>
                    </div>
                    <Progress value={metrics.clickThroughRate} max={10} className="w-full" />
                    <p className="text-sm text-muted-foreground">
                      목표 대비 {(metrics.clickThroughRate / 10 * 100).toFixed(1)}% 달성
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 플랫폼별 성과 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">플랫폼별 성과</h3>
              <div className="space-y-4">
                {platformPerformance.map((platform) => (
                  <Card key={platform.platform}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Badge variant="outline">{platform.platform}</Badge>
                          <div className="text-sm text-muted-foreground">
                            {platform.copies}개 문구 • {platform.clicks.toLocaleString()} 클릭
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold">{platform.conversionRate}%</div>
                          <div className="text-xs text-muted-foreground">전환율</div>
                        </div>
                      </div>
                      <div className="mt-3 grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-sm font-medium">참여도</div>
                          <div className={`text-lg font-bold ${getPerformanceColor(platform.engagement, 100)}`}>
                            {platform.engagement}%
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">전환수</div>
                          <div className="text-lg font-bold text-green-600">
                            {platform.conversions.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-sm font-medium">효율성</div>
                          <div className="text-lg font-bold text-purple-600">
                            {((platform.conversions / platform.clicks) * 100).toFixed(1)}%
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 트렌드 분석 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">트렌드 분석</h3>
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-4">
                    {trendData.slice(-7).map((data, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground w-20">{data.date}</span>
                        <div className="flex-1 mx-4">
                          <div className="flex justify-between text-xs text-muted-foreground mb-1">
                            <span>문구: {data.copies}개</span>
                            <span>클릭: {data.clicks.toLocaleString()}</span>
                            <span>전환: {data.conversions.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(data.engagement / 100) * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-sm font-medium w-16 text-right">{data.engagement}%</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 인사이트 및 권장사항 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">인사이트 및 권장사항</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">🎯 최고 성과 문구</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      {metrics.bestPerformingCopy}
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="success">전환율 {metrics.conversionRate}%</Badge>
                      <Badge variant="outline">{metrics.topPerformingPlatform}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">💡 개선 제안</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      Instagram에서 더 많은 해시태그 활용
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      CTA 문구 다양화로 전환율 향상
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      YouTube용 긴 형태 콘텐츠 확대
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </Section>
    </Container>
  );
}
