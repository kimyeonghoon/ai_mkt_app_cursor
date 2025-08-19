"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

interface MarketingFormData {
  valueProposition: string;
  targeting: {
    gender: string;
    ageGroups: string[];
  };
  platform: string;
  model: string; // 모델 선택 추가
  generationOptions: {
    length: string;
    tone: string;
    ctaStyle: string;
  };
}

interface GeneratedCopy {
  id: number;
  content: string;
  platform: string;
  hashtags: string[];
  characterCount: number;
  model: string; // 모델 정보 추가
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedCopies, setGeneratedCopies] = useState<GeneratedCopy[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<MarketingFormData>({
    defaultValues: {
      valueProposition: "",
      targeting: {
        gender: "all",
        ageGroups: [],
      },
      platform: "instagram",
      model: "gpt-3.5-turbo-instruct", // 기본값을 저렴한 모델로 설정
      generationOptions: {
        length: "normal",
        tone: "friendly",
        ctaStyle: "direct",
      },
    },
  });

  const valueProposition = watch("valueProposition");
  const selectedPlatform = watch("platform");
  const selectedModel = watch("model");

  const onSubmit = async (data: MarketingFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-marketing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "API 호출에 실패했습니다.");
      }

      if (result.success) {
        setGeneratedCopies(result.data.marketingCopies);
      } else {
        throw new Error(result.error || "문구 생성에 실패했습니다.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* 헤더 */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">
            AI 마케팅 문구 생성기
          </h1>
          <p className="text-lg text-muted-foreground">
            타겟과 플랫폼에 따른 맞춤형 마케팅 문구를 자동으로 생성하세요
          </p>
          
          {/* 디자인 시스템 링크 */}
          <div className="flex justify-center">
            <Link href="/design-system">
              <Button variant="outline" size="sm">
                🎨 디자인 시스템 보기
              </Button>
            </Link>
          </div>
        </div>

        {/* 메인 폼 */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>마케팅 문구 생성</CardTitle>
              <CardDescription>
                제품/서비스의 가치 제언을 입력하고 타겟팅 옵션을 선택하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 가치 제언 입력 */}
              <div className="space-y-2">
                <label htmlFor="value-proposition" className="text-sm font-medium">
                  가치 제언 *
                </label>
                <Textarea
                  {...register("valueProposition", { 
                    required: "가치 제언을 입력해주세요",
                    minLength: { value: 10, message: "최소 10자 이상 입력해주세요" }
                  })}
                  id="value-proposition"
                  placeholder="제품/서비스가 제공하는 핵심 가치나 혜택을 설명해주세요 (최소 10자, 최대 500자)"
                  className="min-h-[120px] resize-none"
                  maxLength={500}
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-destructive">
                    {errors.valueProposition?.message}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {valueProposition?.length || 0} / 500
                  </span>
                </div>
              </div>

              {/* AI 모델 선택 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">AI 모델 선택</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">모델</label>
                    <Select onValueChange={(value) => setValue("model", value)} value={selectedModel}>
                      <SelectTrigger>
                        <SelectValue placeholder="AI 모델을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt-3.5-turbo-instruct">
                          GPT-3.5 Turbo Instruct (저렴함 - $0.0002)
                        </SelectItem>
                        <SelectItem value="gpt-3.5-turbo">
                          GPT-3.5 Turbo (표준 - $0.0004)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground">
                      {selectedModel === "gpt-3.5-turbo-instruct" 
                        ? "비용 효율적인 모델로 빠르고 저렴하게 생성" 
                        : "더 정교한 문구 생성을 위한 표준 모델"}
                    </p>
                  </div>
                </div>
              </div>

              {/* 타겟팅 옵션 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">타겟팅 옵션</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* 성별 */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">성별</label>
                    <Select onValueChange={(value) => setValue("targeting.gender", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="성별을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">전체</SelectItem>
                        <SelectItem value="male">남성</SelectItem>
                        <SelectItem value="female">여성</SelectItem>
                        <SelectItem value="other">기타</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* 연령대 */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">연령대</label>
                    <Select onValueChange={(value) => setValue("targeting.ageGroups", [value])}>
                      <SelectTrigger>
                        <SelectValue placeholder="연령대를 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10s">10대</SelectItem>
                        <SelectItem value="20s">20대</SelectItem>
                        <SelectItem value="30s">30대</SelectItem>
                        <SelectItem value="40s">40대</SelectItem>
                        <SelectItem value="50s">50대</SelectItem>
                        <SelectItem value="60s+">60대 이상</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* 플랫폼 선택 */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">타겟 플랫폼</h3>
                <Tabs value={selectedPlatform} onValueChange={(value) => setValue("platform", value)} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="instagram">인스타그램</TabsTrigger>
                    <TabsTrigger value="facebook">페이스북</TabsTrigger>
                    <TabsTrigger value="youtube">유튜브</TabsTrigger>
                  </TabsList>
                  <TabsContent value="instagram" className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      해시태그가 포함된 짧고 임팩트 있는 문구를 생성합니다.
                    </p>
                  </TabsContent>
                  <TabsContent value="facebook" className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      긴 형태의 상세한 마케팅 문구를 생성합니다.
                    </p>
                  </TabsContent>
                  <TabsContent value="youtube" className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      썸네일과 설명에 적합한 문구를 생성합니다.
                    </p>
                  </TabsContent>
                </Tabs>
              </div>

              {/* 생성 버튼 */}
              <div className="flex justify-center">
                <Button 
                  type="submit" 
                  size="lg" 
                  className="px-8"
                  disabled={isLoading}
                >
                  {isLoading ? "생성 중..." : "마케팅 문구 생성하기"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* 에러 메시지 */}
        {error && (
          <Card className="border-destructive">
            <CardContent className="pt-6">
              <div className="text-center text-destructive">
                <p className="font-medium">오류가 발생했습니다:</p>
                <p className="text-sm">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 결과 출력 영역 */}
        {generatedCopies.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>생성된 결과</CardTitle>
              <CardDescription>
                AI가 생성한 마케팅 문구입니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {generatedCopies.map((copy) => (
                <div key={copy.id} className="p-4 border rounded-lg bg-muted/50">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {copy.platform === 'instagram' ? '📷 인스타그램' : 
                         copy.platform === 'facebook' ? '📘 페이스북' : 
                         copy.platform === 'youtube' ? '📺 유튜브' : '🌐 일반'}
                      </span>
                      <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                        {copy.model === 'gpt-3.5-turbo-instruct' ? '저렴' : '표준'}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {copy.characterCount}자
                    </span>
                  </div>
                  <p className="text-foreground mb-3 leading-relaxed">
                    {copy.content}
                  </p>
                  {copy.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {copy.hashtags.map((tag, index) => (
                        <span key={index} className="text-sm text-primary">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* 컴포넌트 테스트 영역 */}
        <Card>
          <CardHeader>
            <CardTitle>UI 컴포넌트 테스트</CardTitle>
            <CardDescription>
              설치된 UI 컴포넌트들이 정상적으로 작동하는지 확인
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="입력 테스트" />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="선택 테스트" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">옵션 1</SelectItem>
                  <SelectItem value="option2">옵션 2</SelectItem>
                  <SelectItem value="option3">옵션 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
