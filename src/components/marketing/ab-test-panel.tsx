"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";

interface ABTestVariant {
  id: string;
  name: string;
  content: string;
  platform: string;
  hashtags: string[];
  characterCount: number;
  performance?: {
    clicks?: number;
    conversions?: number;
    engagement?: number;
  };
}

interface ABTestConfig {
  baseContent: string;
  variants: number;
  testType: "tone" | "length" | "cta" | "hashtag" | "mixed";
  platforms: string[];
  targetAudience: string[];
}

export default function ABTestPanel() {
  const [testConfig, setTestConfig] = useState<ABTestConfig>({
    baseContent: "",
    variants: 3,
    testType: "tone",
    platforms: ["instagram"],
    targetAudience: ["20s", "30s"]
  });

  const [variants, setVariants] = useState<ABTestVariant[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null);

  const handleGenerateVariants = async () => {
    if (!testConfig.baseContent.trim()) return;
    
    setIsGenerating(true);
    
    try {
      // 실제로는 API 호출을 통해 다양한 버전 생성
      const generatedVariants: ABTestVariant[] = [];
      
      for (let i = 0; i < testConfig.variants; i++) {
        const variant: ABTestVariant = {
          id: `variant-${i + 1}`,
          name: `버전 ${i + 1}`,
          content: generateVariantContent(testConfig.baseContent, testConfig.testType, i),
          platform: testConfig.platforms[0],
          hashtags: generateHashtags(testConfig.targetAudience, i),
          characterCount: 0,
          performance: {
            clicks: Math.floor(Math.random() * 1000),
            conversions: Math.floor(Math.random() * 100),
            engagement: Math.floor(Math.random() * 20) + 80
          }
        };
        variant.characterCount = variant.content.length;
        generatedVariants.push(variant);
      }
      
      setVariants(generatedVariants);
      setSelectedVariant(generatedVariants[0]?.id || null);
    } catch (error) {
      console.error("A/B 테스트 변형 생성 실패:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const generateVariantContent = (baseContent: string, testType: string, variantIndex: number): string => {
    const tones = [
      "친근하고 따뜻한 톤으로",
      "전문적이고 신뢰감 있는 톤으로",
      "재미있고 경쾌한 톤으로",
      "감성적이고 공감되는 톤으로",
      "직설적이고 임팩트 있는 톤으로"
    ];
    
    const ctas = [
      "지금 바로 시작하세요!",
      "무료로 체험해보세요!",
      "특별한 혜택을 놓치지 마세요!",
      "지금 문의하시면 할인!",
      "한정 수량이니 서둘러주세요!"
    ];
    
    switch (testType) {
      case "tone":
        return `${tones[variantIndex % tones.length]} ${baseContent}`;
      case "cta":
        return `${baseContent} ${ctas[variantIndex % ctas.length]}`;
      case "length":
        if (variantIndex === 0) return baseContent;
        if (variantIndex === 1) return baseContent.substring(0, Math.floor(baseContent.length * 0.7));
        return baseContent.substring(0, Math.floor(baseContent.length * 0.5));
      default:
        return baseContent;
    }
  };

  const generateHashtags = (targetAudience: string[], variantIndex: number): string[] => {
    const baseHashtags = ["#마케팅", "#광고", "#프로모션"];
    const audienceHashtags = targetAudience.map(age => `#${age}대`);
    const variantHashtags = [
      ["#트렌디", "#인기", "#핫"],
      ["#신뢰", "#전문", "#품질"],
      ["#즉시", "#빠른", "#효과"]
    ];
    
    return [...baseHashtags, ...audienceHashtags, ...variantHashtags[variantIndex % variantHashtags.length]];
  };

  const getPerformanceColor = (value: number, maxValue: number): string => {
    const percentage = (value / maxValue) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    if (percentage >= 40) return "text-orange-600";
    return "text-red-600";
  };

  return (
    <Container size="lg" padding="lg">
      <Section spacing="lg">
        <Card>
          <CardHeader>
            <CardTitle>🧪 A/B 테스트 패널</CardTitle>
            <CardDescription>
              다양한 마케팅 문구 버전을 생성하고 성과를 비교해보세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* A/B 테스트 설정 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">테스트 설정</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">기본 콘텐츠</label>
                  <Textarea
                    placeholder="테스트할 기본 마케팅 문구를 입력하세요..."
                    value={testConfig.baseContent}
                    onChange={(e) => setTestConfig(prev => ({ ...prev, baseContent: e.target.value }))}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">테스트 유형</label>
                    <Select
                      value={testConfig.testType}
                      onValueChange={(value: any) => setTestConfig(prev => ({ ...prev, testType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tone">톤 & 어조</SelectItem>
                        <SelectItem value="length">길이</SelectItem>
                        <SelectItem value="cta">행동 유도</SelectItem>
                        <SelectItem value="hashtag">해시태그</SelectItem>
                        <SelectItem value="mixed">혼합</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">변형 개수: {testConfig.variants}</label>
                    <Slider
                      value={[testConfig.variants]}
                      onValueChange={(value) => setTestConfig(prev => ({ ...prev, variants: value[0] }))}
                      min={2}
                      max={5}
                      step={1}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button
                  onClick={handleGenerateVariants}
                  disabled={isGenerating || !testConfig.baseContent.trim()}
                  loading={isGenerating}
                  size="lg"
                >
                  {isGenerating ? "변형 생성 중..." : "A/B 테스트 변형 생성"}
                </Button>
              </div>
            </div>

            {/* 생성된 변형들 */}
            {variants.length > 0 && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">생성된 변형들</h3>
                
                <Tabs value={selectedVariant || ""} onValueChange={setSelectedVariant}>
                  <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${variants.length}, 1fr)` }}>
                    {variants.map((variant) => (
                      <TabsTrigger key={variant.id} value={variant.id} className="text-xs">
                        {variant.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  
                  {variants.map((variant) => (
                    <TabsContent key={variant.id} value={variant.id} className="space-y-4">
                      <Card>
                        <CardHeader>
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-lg">{variant.name}</CardTitle>
                              <CardDescription>
                                {variant.platform} • {variant.characterCount}자
                              </CardDescription>
                            </div>
                            <Badge variant="outline">{variant.platform}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-4 bg-muted rounded-lg">
                            <p className="text-foreground leading-relaxed">{variant.content}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            {variant.hashtags.map((tag, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          
                          <Separator />
                          
                          {/* 성과 지표 */}
                          <div className="grid grid-cols-3 gap-4">
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${getPerformanceColor(variant.performance?.clicks || 0, 1000)}`}>
                                {variant.performance?.clicks || 0}
                              </div>
                              <div className="text-xs text-muted-foreground">클릭수</div>
                            </div>
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${getPerformanceColor(variant.performance?.conversions || 0, 100)}`}>
                                {variant.performance?.conversions || 0}
                              </div>
                              <div className="text-xs text-muted-foreground">전환율</div>
                            </div>
                            <div className="text-center">
                              <div className={`text-2xl font-bold ${getPerformanceColor(variant.performance?.engagement || 0, 100)}`}>
                                {variant.performance?.engagement || 0}%
                              </div>
                              <div className="text-xs text-muted-foreground">참여도</div>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              📋 복사
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              ⭐ 좋아요
                            </Button>
                            <Button variant="outline" size="sm" className="flex-1">
                              📊 상세 분석
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>
              </div>
            )}
          </CardContent>
        </Card>
      </Section>
    </Container>
  );
}
