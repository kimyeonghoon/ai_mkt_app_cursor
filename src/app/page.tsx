"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

// Yup에서 추론된 타입
type FormDataSchema = yup.InferType<typeof formSchema>;

// Yup 검증 스키마 정의
const formSchema = yup.object({
  valueProposition: yup
    .string()
    .required("가치 제언을 입력해주세요")
    .min(10, "최소 10자 이상 입력해주세요")
    .max(500, "최대 500자까지 입력 가능합니다"),
  targeting: yup.object({
    gender: yup.string().required("성별을 선택해주세요"),
    ageGroups: yup.array().min(1, "최소 1개 이상의 연령대를 선택해주세요"),
    region: yup.string().required("지역을 선택해주세요"),
    interests: yup.array().min(1, "최소 1개 이상의 관심분야를 선택해주세요")
  }),
  platform: yup.string().required("플랫폼을 선택해주세요"),
  generationOptions: yup.object({
    length: yup.string().required("문구 분량을 선택해주세요"),
    tone: yup.string().required("어조/톤을 선택해주세요"),
    ctaStyle: yup.string().required("콜투액션 스타일을 선택해주세요"),
    emotionKeywords: yup.array().of(yup.string()),
    count: yup.number().min(1).max(5).required("생성 개수를 선택해주세요"),
    forbiddenWords: yup.array().of(yup.string())
  })
});

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
  const [isGenerating, setIsGenerating] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [forbiddenWordsInput, setForbiddenWordsInput] = useState("");
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid, isDirty }
  } = useForm<FormDataSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
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
    },
    mode: "onChange" // 실시간 검증
  });

  const watchedValues = watch();

  const handleAgeGroupChange = (ageGroup: string, checked: boolean) => {
    const currentAgeGroups = watchedValues.targeting.ageGroups || [];
    const newAgeGroups = checked 
      ? [...currentAgeGroups, ageGroup]
      : currentAgeGroups.filter(age => age !== ageGroup);
    
    setValue("targeting.ageGroups", newAgeGroups, { shouldValidate: true });
  };

  const handleInterestChange = (interest: string, checked: boolean) => {
    const currentInterests = watchedValues.targeting.interests || [];
    const newInterests = checked 
      ? [...currentInterests, interest]
      : currentInterests.filter(i => i !== interest);
    
    setValue("targeting.interests", newInterests, { shouldValidate: true });
  };

  const handleEmotionKeywordChange = (keyword: string, checked: boolean) => {
    const currentKeywords = watchedValues.generationOptions.emotionKeywords || [];
    const newKeywords = checked 
      ? [...currentKeywords, keyword]
      : currentKeywords.filter(k => k !== keyword);
    
    setValue("generationOptions.emotionKeywords", newKeywords);
  };

  const handleForbiddenWordsAdd = () => {
    if (forbiddenWordsInput.trim()) {
      const currentWords = watchedValues.generationOptions.forbiddenWords || [];
      const newWords = [...currentWords, forbiddenWordsInput.trim()];
      setValue("generationOptions.forbiddenWords", newWords);
      setForbiddenWordsInput("");
    }
  };

  const handleForbiddenWordsRemove = (word: string) => {
    const currentWords = watchedValues.generationOptions.forbiddenWords || [];
    const newWords = currentWords.filter(w => w !== word);
    setValue("generationOptions.forbiddenWords", newWords);
  };

  const onSubmit = async (data: FormDataSchema) => {
    setIsGenerating(true);
    setApiError(null);
    
    try {
      const response = await fetch('/api/generate-marketing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (result.success) {
        setResults(result.data.marketingCopies);
      } else {
        setApiError(result.error || '마케팅 문구 생성에 실패했습니다.');
        console.error('Generation failed:', result.error);
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '알 수 없는 오류가 발생했습니다.';
      setApiError(errorMessage);
      console.error('Error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const characterCount = watchedValues.valueProposition?.length || 0;

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

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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
                    {...register("valueProposition")}
                    className={`min-h-[120px] resize-none ${
                      errors.valueProposition ? "border-destructive focus:border-destructive" : ""
                    }`}
                    maxLength={500}
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
                    {characterCount}/500
                  </div>
                </div>
                {errors.valueProposition && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.valueProposition.message}
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
                <Label>성별 *</Label>
                <RadioGroup 
                  value={watchedValues.targeting?.gender || "all"} 
                  onValueChange={(value) => setValue("targeting.gender", value, { shouldValidate: true })}
                >
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
                {errors.targeting?.gender && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.targeting.gender.message}
                  </p>
                )}
              </div>

              {/* 연령대 */}
              <div className="space-y-3">
                <Label>연령대 *</Label>
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
                        checked={watchedValues.targeting?.ageGroups?.includes(age.id) || false}
                        onCheckedChange={(checked) => 
                          handleAgeGroupChange(age.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={age.id}>{age.name}</Label>
                    </div>
                  ))}
                </div>
                {errors.targeting?.ageGroups && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.targeting.ageGroups.message}
                  </p>
                )}
              </div>

              {/* 지역 */}
              <div className="space-y-3">
                <Label>지역 *</Label>
                <Select 
                  value={watchedValues.targeting?.region || "all"} 
                  onValueChange={(value) => setValue("targeting.region", value, { shouldValidate: true })}
                >
                  <SelectTrigger className={errors.targeting?.region ? "border-destructive" : ""}>
                    <SelectValue placeholder="지역을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전국</SelectItem>
                    <SelectItem value="seoul">수도권</SelectItem>
                    <SelectItem value="local">지방</SelectItem>
                    <SelectItem value="overseas">해외</SelectItem>
                  </SelectContent>
                </Select>
                {errors.targeting?.region && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.targeting.region.message}
                  </p>
                )}
              </div>

              {/* 관심분야 */}
              <div className="space-y-3">
                <Label>관심분야 *</Label>
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
                        checked={watchedValues.targeting?.interests?.includes(interest.id) || false}
                        onCheckedChange={(checked) => 
                          handleInterestChange(interest.id, checked as boolean)
                        }
                      />
                      <Label htmlFor={interest.id}>{interest.name}</Label>
                    </div>
                  ))}
                </div>
                {errors.targeting?.interests && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.targeting.interests.message}
                  </p>
                )}
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
              <RadioGroup 
                value={watchedValues.platform || ""} 
                onValueChange={(value) => setValue("platform", value, { shouldValidate: true })}
              >
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
              {errors.platform && (
                <p className="text-sm text-destructive flex items-center gap-1 mt-3">
                  <span className="text-red-500">⚠️</span>
                  {errors.platform.message}
                </p>
              )}
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
                <Label>문구 분량 *</Label>
                <RadioGroup 
                  value={watchedValues.generationOptions?.length || "medium"} 
                  onValueChange={(value) => setValue("generationOptions.length", value, { shouldValidate: true })}
                >
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
                {errors.generationOptions?.length && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.generationOptions.length.message}
                  </p>
                )}
              </div>

              {/* 어조/톤 */}
              <div className="space-y-3">
                <Label>어조/톤 *</Label>
                <Select 
                  value={watchedValues.generationOptions?.tone || "casual"} 
                  onValueChange={(value) => setValue("generationOptions.tone", value, { shouldValidate: true })}
                >
                  <SelectTrigger className={errors.generationOptions?.tone ? "border-destructive" : ""}>
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
                {errors.generationOptions?.tone && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.generationOptions.tone.message}
                  </p>
                )}
              </div>

              {/* 콜투액션 스타일 */}
              <div className="space-y-3">
                <Label>콜투액션 스타일 *</Label>
                <RadioGroup 
                  value={watchedValues.generationOptions?.ctaStyle || "direct"} 
                  onValueChange={(value) => setValue("generationOptions.ctaStyle", value, { shouldValidate: true })}
                >
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
                {errors.generationOptions?.ctaStyle && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.generationOptions.ctaStyle.message}
                  </p>
                )}
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
                        checked={watchedValues.generationOptions?.emotionKeywords?.includes(keyword.id) || false}
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
                <Label>생성 개수 *</Label>
                <Select 
                  value={watchedValues.generationOptions?.count?.toString() || "3"} 
                  onValueChange={(value) => setValue("generationOptions.count", parseInt(value), { shouldValidate: true })}
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
                {errors.generationOptions?.count && (
                  <p className="text-sm text-destructive flex items-center gap-1">
                    <span className="text-red-500">⚠️</span>
                    {errors.generationOptions.count.message}
                  </p>
                )}
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
                  {watchedValues.generationOptions?.forbiddenWords && watchedValues.generationOptions.forbiddenWords.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {watchedValues.generationOptions.forbiddenWords.map((word, index) => (
                        <Badge key={index} variant="secondary" className="gap-1">
                          {word}
                          <button
                            type="button"
                            onClick={() => word && handleForbiddenWordsRemove(word)}
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
              disabled={!isValid || isGenerating}
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
            
            {/* 폼 상태 표시 */}
            <div className="mt-4 text-sm text-muted-foreground">
              {!isDirty && "폼을 작성해주세요"}
              {isDirty && !isValid && "모든 필수 항목을 입력해주세요"}
              {isValid && "✅ 폼이 완성되었습니다!"}
            </div>
          </div>
        </form>

        {/* 결과 출력 영역 */}
        {isGenerating && (
          <Card>
            <CardHeader>
              <CardTitle>🔄 마케팅 문구 생성 중...</CardTitle>
              <CardDescription>
                AI가 당신의 요구사항에 맞는 마케팅 문구를 생성하고 있습니다
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 스켈레톤 UI */}
              <div className="space-y-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-3 animate-pulse">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-6 bg-muted rounded"></div>
                        <div className="w-16 h-6 bg-muted rounded"></div>
                      </div>
                      <div className="w-16 h-8 bg-muted rounded"></div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded w-3/4"></div>
                      <div className="h-4 bg-muted rounded w-1/2"></div>
                    </div>
                    <div className="flex gap-2">
                      <div className="w-16 h-6 bg-muted rounded"></div>
                      <div className="w-20 h-6 bg-muted rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 진행률 표시 */}
              <div className="text-center py-4">
                <div className="inline-flex items-center gap-2 text-muted-foreground">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                  <span>AI가 창의적인 마케팅 문구를 작성하고 있습니다...</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 에러 메시지 */}
        {apiError && (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                <span>⚠️</span>
                마케팅 문구 생성 실패
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-destructive mb-4">{apiError}</p>
              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">문제 해결 방법:</h4>
                <ul className="text-sm space-y-1">
                  <li>• 인터넷 연결을 확인해주세요</li>
                  <li>• 입력한 내용을 다시 확인해주세요</li>
                  <li>• 잠시 후 다시 시도해주세요</li>
                  <li>• 문제가 지속되면 관리자에게 문의해주세요</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 결과 출력 영역 */}
        {results.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span>✨</span>
                생성된 마케팅 문구
                <Badge variant="secondary" className="ml-2">
                  {results.length}개
                </Badge>
              </CardTitle>
              <CardDescription>
                AI가 생성한 맞춤형 마케팅 문구입니다. 각 문구를 복사하여 사용하세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {results.map((result, index) => (
                <div key={index} className="p-6 border rounded-lg space-y-4 hover:shadow-md transition-all duration-200 bg-gradient-to-r from-background to-muted/30">
                  {/* 헤더 영역 */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {/* 플랫폼 배지 */}
                      <Badge variant="outline" className="text-sm px-3 py-1">
                        {PLATFORMS.find(p => p.id === result.platform)?.icon || "📱"} 
                        {PLATFORMS.find(p => p.id === result.platform)?.name || "플랫폼"}
                      </Badge>
                      
                      {/* 메타데이터 */}
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Badge variant="secondary" className="text-xs">
                          {result.characterCount}자
                        </Badge>
                        {result.model && (
                          <Badge variant="outline" className="text-xs">
                            {result.model === "gpt-3.5-turbo-instruct" ? "GPT-3.5 Turbo" : result.model}
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    {/* 액션 버튼들 */}
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(result.content)}
                        className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        📋 복사
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          const textToCopy = `${result.content}\n\n${result.hashtags?.join(' ') || ''}`;
                          navigator.clipboard.writeText(textToCopy);
                        }}
                        className="hover:bg-primary hover:text-primary-foreground transition-colors"
                      >
                        📝 전체 복사
                      </Button>
                    </div>
                  </div>
                  
                  {/* 마케팅 문구 내용 */}
                  <div className="space-y-3">
                    <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                      <p className="text-lg leading-relaxed font-medium">{result.content}</p>
                    </div>
                    
                    {/* 해시태그 */}
                    {result.hashtags && result.hashtags.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-sm font-medium text-muted-foreground">해시태그</h4>
                        <div className="flex flex-wrap gap-2">
                          {result.hashtags.map((tag: string, tagIndex: number) => (
                            <Badge key={tagIndex} variant="outline" className="text-xs hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* 하단 정보 */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      {result.generatedAt && (
                        <span>생성: {new Date(result.generatedAt).toLocaleString('ko-KR')}</span>
                      )}
                      {result.requestId && (
                        <span>ID: {result.requestId}</span>
                      )}
                    </div>
                    
                    {/* 추가 액션 */}
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          // 좋아요 기능 (향후 구현)
                          console.log('좋아요:', result.id);
                        }}
                        className="text-xs hover:text-primary"
                      >
                        👍 좋아요
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => {
                          // 공유 기능 (향후 구현)
                          console.log('공유:', result.id);
                        }}
                        className="text-xs hover:text-primary"
                      >
                        🔗 공유
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* 결과 요약 */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-primary">{results.length}</div>
                    <div className="text-sm text-muted-foreground">생성된 문구</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">
                      {Math.round(results.reduce((sum, r) => sum + (r.characterCount || 0), 0) / results.length)}
                    </div>
                    <div className="text-sm text-muted-foreground">평균 글자수</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">
                      {results.reduce((sum, r) => sum + (r.hashtags?.length || 0), 0)}
                    </div>
                    <div className="text-sm text-muted-foreground">총 해시태그</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-600">
                      {new Set(results.map(r => r.platform)).size}
                    </div>
                    <div className="text-sm text-muted-foreground">플랫폼 수</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </Section>
    </Container>
  );
}
