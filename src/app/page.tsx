"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import Link from "next/link";

interface FormData {
  valueProposition: string;
  targeting: {
    gender: string;
    ageGroups: string[];
    region: string;
    interests: string[];
  };
  platform: string;
  generationOptions: {
    length: string;
    tone: string;
    ctaStyle: string;
    emotionKeywords: string[];
    count: number;
    forbiddenWords: string[];
  };
}

const PLATFORMS = [
  { id: "instagram", name: "인스타그램", icon: "📸", description: "해시태그 포함, 시각적 콘텐츠" },
  { id: "facebook", name: "페이스북", icon: "📘", description: "긴 형태, 커뮤니티 중심" },
  { id: "youtube", name: "유튜브", icon: "🎥", description: "썸네일용, 동영상 콘텐츠" },
  { id: "blog", name: "블로그/웹사이트", icon: "📝", description: "상세한 정보, SEO 최적화" },
  { id: "email", name: "이메일 마케팅", icon: "📧", description: "개인화된 메시지" },
  { id: "kakao", name: "카카오톡/문자", icon: "💬", description: "간결하고 직접적인 메시지" }
];

const LENGTH_OPTIONS = [
  { id: "short", name: "짧음", description: "1-2문장, 소셜미디어용" },
  { id: "medium", name: "보통", description: "3-5문장, 일반적" },
  { id: "long", name: "길음", description: "6-10문장, 상세설명용" }
];

const TONE_OPTIONS = [
  { id: "casual", name: "친근하고 캐주얼한", description: "편안하고 친근한 톤" },
  { id: "professional", name: "전문적이고 신뢰감 있는", description: "전문성과 신뢰성 강조" },
  { id: "emotional", name: "감정적이고 호소력 있는", description: "감정적 공감과 설득력" },
  { id: "humorous", name: "유머러스하고 재미있는", description: "재미있고 기억에 남는" },
  { id: "urgent", name: "긴급하고 액션 지향적인", description: "즉시 행동 유도" }
];

const CTA_STYLES = [
  { id: "direct", name: "직접적", description: "지금 구매하세요" },
  { id: "indirect", name: "간접적", description: "알아보세요" },
  { id: "curiosity", name: "호기심 유발", description: "궁금하지 않으세요?" },
  { id: "benefit", name: "혜택 강조", description: "놓치지 마세요" }
];

const EMOTION_KEYWORDS = [
  { id: "trust", name: "신뢰", color: "bg-blue-100 text-blue-800" },
  { id: "interest", name: "흥미", color: "bg-purple-100 text-purple-800" },
  { id: "safety", name: "안전", color: "bg-green-100 text-green-800" },
  { id: "convenience", name: "편리", color: "bg-orange-100 text-orange-800" },
  { id: "innovation", name: "혁신", color: "bg-indigo-100 text-indigo-800" },
  { id: "premium", name: "프리미엄", color: "bg-yellow-100 text-yellow-800" }
];

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    valueProposition: "",
    targeting: {
      gender: "all",
      ageGroups: [],
      region: "all",
      interests: []
    },
    platform: "",
    generationOptions: {
      length: "medium",
      tone: "casual",
      ctaStyle: "direct",
      emotionKeywords: [],
      count: 3,
      forbiddenWords: []
    }
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [forbiddenWordsInput, setForbiddenWordsInput] = useState("");

  const handleValuePropositionChange = (value: string) => {
    setFormData(prev => ({ ...prev, valueProposition: value }));
  };

  const handleGenderChange = (value: string) => {
    setFormData(prev => ({ ...prev, targeting: { ...prev.targeting, gender: value } }));
  };

  const handleAgeGroupChange = (ageGroup: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      targeting: {
        ...prev.targeting,
        ageGroups: checked 
          ? [...prev.targeting.ageGroups, ageGroup]
          : prev.targeting.ageGroups.filter(age => age !== ageGroup)
      }
    }));
  };

  const handleRegionChange = (value: string) => {
    setFormData(prev => ({ ...prev, targeting: { ...prev.targeting, region: value } }));
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      targeting: {
        ...prev.targeting,
        interests: checked 
          ? [...prev.targeting.interests, interest]
          : prev.targeting.interests.filter(i => i !== interest)
      }
    }));
  };

  const handlePlatformChange = (value: string) => {
    setFormData(prev => ({ ...prev, platform: value }));
  };

  const handleLengthChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      generationOptions: { ...prev.generationOptions, length: value } 
    }));
  };

  const handleToneChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      generationOptions: { ...prev.generationOptions, tone: value } 
    }));
  };

  const handleCtaStyleChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      generationOptions: { ...prev.generationOptions, ctaStyle: value } 
    }));
  };

  const handleEmotionKeywordChange = (keyword: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      generationOptions: {
        ...prev.generationOptions,
        emotionKeywords: checked 
          ? [...prev.generationOptions.emotionKeywords, keyword]
          : prev.generationOptions.emotionKeywords.filter(k => k !== keyword)
      }
    }));
  };

  const handleCountChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      generationOptions: { ...prev.generationOptions, count: parseInt(value) } 
    }));
  };

  const handleForbiddenWordsAdd = () => {
    if (forbiddenWordsInput.trim()) {
      setFormData(prev => ({
        ...prev,
        generationOptions: {
          ...prev.generationOptions,
          forbiddenWords: [...prev.generationOptions.forbiddenWords, forbiddenWordsInput.trim()]
        }
      }));
      setForbiddenWordsInput("");
    }
  };

  const handleForbiddenWordsRemove = (word: string) => {
    setFormData(prev => ({
      ...prev,
      generationOptions: {
        ...prev.generationOptions,
        forbiddenWords: prev.generationOptions.forbiddenWords.filter(w => w !== word)
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    try {
      const response = await fetch('/api/generate-marketing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (data.success) {
        setResults(data.data.marketingCopies);
      } else {
        console.error('Generation failed:', data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const characterCount = formData.valueProposition.length;
  const isFormValid = formData.valueProposition.length >= 10 && formData.platform;

  return (
    <Container size="lg" padding="lg">
      <Section spacing="lg">
        {/* 헤더 */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">
            🚀 AI 마케팅 문구 생성기
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            타겟과 플랫폼에 따른 맞춤형 마케팅 문구를 자동으로 생성하세요
          </p>
          
          {/* 디자인 시스템과 고급 마케팅 기능 링크 */}
          <div className="flex justify-center gap-4">
            <Link href="/design-system">
              <Button variant="outline" size="sm">
                🎨 디자인 시스템 보기
              </Button>
            </Link>
            <Link href="/advanced-marketing">
              <Button variant="outline" size="sm">
                🚀 고급 마케팅 기능
              </Button>
            </Link>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* 가치 제언 입력 섹션 */}
          <Card>
            <CardHeader>
              <CardTitle>💡 가치 제언 입력</CardTitle>
              <CardDescription>
                제품/서비스의 핵심 가치와 혜택을 명확하게 설명해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="valueProposition">가치 제언 *</Label>
                <div className="relative">
                  <Textarea
                    id="valueProposition"
                    placeholder="예시: 건강한 식습관으로 더 멋진 20대 되어보세요! 나에게 꼭 맞는 영양 관리 서비스로 쉽고 편리하게 시작해보세요."
                    value={formData.valueProposition}
                    onChange={(e) => handleValuePropositionChange(e.target.value)}
                    className="min-h-[120px] resize-none"
                    maxLength={500}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                    {characterCount}/500
                  </div>
                </div>
                {characterCount < 10 && characterCount > 0 && (
                  <p className="text-sm text-destructive">
                    최소 10자 이상 입력해주세요
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* 타겟팅 옵션 섹션 */}
          <Card>
            <CardHeader>
              <CardTitle>🎯 타겟팅 옵션</CardTitle>
              <CardDescription>
                마케팅 문구를 받을 타겟 고객을 정의하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 성별 */}
              <div className="space-y-3">
                <Label>성별</Label>
                <RadioGroup value={formData.targeting.gender} onValueChange={handleGenderChange}>
                  <div className="flex gap-4">
                    {[
                      { id: "all", name: "전체" },
                      { id: "male", name: "남성" },
                      { id: "female", name: "여성" },
                      { id: "other", name: "기타" }
                    ].map(gender => (
                      <div key={gender.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={gender.id} id={gender.id} />
                        <Label htmlFor={gender.id}>{gender.name}</Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* 연령대 */}
              <div className="space-y-3">
                <Label>연령대</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: "10s", name: "10대" },
                    { id: "20s", name: "20대" },
                    { id: "30s", name: "30대" },
                    { id: "40s", name: "40대" },
                    { id: "50s", name: "50대" },
                    { id: "60s", name: "60대 이상" }
                  ].map(age => (
                    <div key={age.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={age.id}
                        checked={formData.targeting.ageGroups.includes(age.id)}
                        onCheckedChange={(checked) => 
                          handleAgeGroupChange(age.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={age.id}>{age.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 지역 */}
              <div className="space-y-3">
                <Label>지역</Label>
                <Select value={formData.targeting.region} onValueChange={handleRegionChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="지역을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전국</SelectItem>
                    <SelectItem value="seoul">수도권</SelectItem>
                    <SelectItem value="local">지방</SelectItem>
                    <SelectItem value="overseas">해외</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* 관심분야 */}
              <div className="space-y-3">
                <Label>관심분야</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    { id: "beauty", name: "뷰티" },
                    { id: "fashion", name: "패션" },
                    { id: "it", name: "IT" },
                    { id: "health", name: "건강" },
                    { id: "education", name: "교육" },
                    { id: "travel", name: "여행" },
                    { id: "food", name: "음식" },
                    { id: "sports", name: "스포츠" },
                    { id: "culture", name: "문화" },
                    { id: "other", name: "기타" }
                  ].map(interest => (
                    <div key={interest.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={interest.id}
                        checked={formData.targeting.interests.includes(interest.id)}
                        onCheckedChange={(checked) => 
                          handleInterestChange(interest.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={interest.id}>{interest.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 플랫폼 선택 섹션 */}
          <Card>
            <CardHeader>
              <CardTitle>📱 플랫폼 선택</CardTitle>
              <CardDescription>
                마케팅 문구를 사용할 플랫폼을 선택하세요
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={formData.platform} onValueChange={handlePlatformChange}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {PLATFORMS.map(platform => (
                    <div key={platform.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:border-primary transition-colors">
                      <RadioGroupItem value={platform.id} id={platform.id} />
                      <div className="flex-1">
                        <Label htmlFor={platform.id} className="text-lg font-medium cursor-pointer">
                          {platform.icon} {platform.name}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {platform.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* 생성 옵션 섹션 */}
          <Card>
            <CardHeader>
              <CardTitle>⚙️ 생성 옵션</CardTitle>
              <CardDescription>
                마케팅 문구의 스타일과 특성을 설정하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 문구 분량 */}
              <div className="space-y-3">
                <Label>문구 분량</Label>
                <RadioGroup value={formData.generationOptions.length} onValueChange={handleLengthChange}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {LENGTH_OPTIONS.map(option => (
                      <div key={option.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:border-primary transition-colors">
                        <RadioGroupItem value={option.id} id={option.id} />
                        <div className="flex-1">
                          <Label htmlFor={option.id} className="font-medium cursor-pointer">
                            {option.name}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* 어조/톤 */}
              <div className="space-y-3">
                <Label>어조/톤</Label>
                <Select value={formData.generationOptions.tone} onValueChange={handleToneChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="어조를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    {TONE_OPTIONS.map(tone => (
                      <SelectItem key={tone.id} value={tone.id}>
                        {tone.name} - {tone.description}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 콜투액션 스타일 */}
              <div className="space-y-3">
                <Label>콜투액션 스타일</Label>
                <RadioGroup value={formData.generationOptions.ctaStyle} onValueChange={handleCtaStyleChange}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CTA_STYLES.map(style => (
                      <div key={style.id} className="flex items-start space-x-3 p-4 border rounded-lg hover:border-primary transition-colors">
                        <RadioGroupItem value={style.id} id={style.id} />
                        <div className="flex-1">
                          <Label htmlFor={style.id} className="font-medium cursor-pointer">
                            {style.name}
                          </Label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {style.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* 고급 옵션 섹션 */}
          <Card>
            <CardHeader>
              <CardTitle>🔧 고급 옵션</CardTitle>
              <CardDescription>
                더 세밀한 마케팅 문구 생성을 위한 추가 설정
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 감정 키워드 */}
              <div className="space-y-3">
                <Label>감정 키워드</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {EMOTION_KEYWORDS.map(keyword => (
                    <div key={keyword.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={keyword.id}
                        checked={formData.generationOptions.emotionKeywords.includes(keyword.id)}
                        onCheckedChange={(checked) => 
                          handleEmotionKeywordChange(keyword.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={keyword.id} className="cursor-pointer">
                        <Badge variant="outline" className={keyword.color}>
                          {keyword.name}
                        </Badge>
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 생성 개수 */}
              <div className="space-y-3">
                <Label>생성 개수</Label>
                <Select 
                  value={formData.generationOptions.count.toString()} 
                  onValueChange={handleCountChange}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map(count => (
                      <SelectItem key={count} value={count.toString()}>
                        {count}개
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 금지 단어 */}
              <div className="space-y-3">
                <Label>금지 단어</Label>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="금지할 단어를 입력하세요"
                      value={forbiddenWordsInput}
                      onChange={(e) => setForbiddenWordsInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleForbiddenWordsAdd())}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={handleForbiddenWordsAdd}
                    >
                      추가
                    </Button>
                  </div>
                  {formData.generationOptions.forbiddenWords.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.generationOptions.forbiddenWords.map((word, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {word}
                          <button
                            type="button"
                            onClick={() => handleForbiddenWordsRemove(word)}
                            className="ml-1 hover:text-destructive"
                          >
                            ×
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 생성 버튼 */}
          <div className="text-center">
            <Button 
              type="submit" 
              size="lg" 
              disabled={!isFormValid || isGenerating}
              className="px-8 py-3"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  생성 중...
                </>
              ) : (
                "🚀 마케팅 문구 생성하기"
              )}
            </Button>
          </div>
        </form>

        {/* 결과 출력 영역 */}
        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>✨ 생성된 마케팅 문구</CardTitle>
              <CardDescription>
                {results.length}개의 마케팅 문구가 생성되었습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {results.map((result, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {PLATFORMS.find(p => p.id === result.platform)?.icon} 
                        {PLATFORMS.find(p => p.id === result.platform)?.name}
                      </Badge>
                      <Badge variant="secondary">
                        {result.characterCount}자
                      </Badge>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(result.content)}
                    >
                      📋 복사
                    </Button>
                  </div>
                  <p className="text-lg leading-relaxed">{result.content}</p>
                  {result.hashtags && result.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {result.hashtags.map((tag: string, tagIndex: number) => (
                        <Badge key={tagIndex} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </Section>
    </Container>
  );
}
