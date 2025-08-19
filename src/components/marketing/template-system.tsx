"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Switch } from "@/components/ui/switch";

interface MarketingTemplate {
  id: string;
  name: string;
  description: string;
  content: string;
  category: string;
  platform: string;
  tags: string[];
  variables: TemplateVariable[];
  usageCount: number;
  rating: number;
  createdAt: string;
  isPublic: boolean;
  author: string;
}

interface TemplateVariable {
  name: string;
  type: "text" | "number" | "select";
  placeholder: string;
  required: boolean;
  options?: string[];
  defaultValue?: string;
}

interface TemplateCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
}

export default function TemplateSystem() {
  const [templates, setTemplates] = useState<MarketingTemplate[]>([]);
  const [categories, setCategories] = useState<TemplateCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPublicOnly, setShowPublicOnly] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<MarketingTemplate | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newTemplate, setNewTemplate] = useState<Partial<MarketingTemplate>>({
    name: "",
    description: "",
    content: "",
    category: "",
    platform: "instagram",
    tags: [],
    variables: [],
    isPublic: false,
    author: "사용자"
  });

  useEffect(() => {
    generateMockData();
  }, []);

  const generateMockData = () => {
    const mockCategories: TemplateCategory[] = [
      { id: "health", name: "건강/웰빙", description: "건강 관련 제품/서비스", icon: "💪", count: 15 },
      { id: "beauty", name: "뷰티/패션", description: "뷰티 및 패션 관련", icon: "💄", count: 12 },
      { id: "tech", name: "테크/IT", description: "기술 및 IT 서비스", icon: "💻", count: 18 },
      { id: "food", name: "푸드/음료", description: "음식 및 음료 관련", icon: "🍕", count: 10 },
      { id: "education", name: "교육/학습", description: "교육 및 학습 서비스", icon: "📚", count: 8 },
      { id: "finance", name: "금융/투자", description: "금융 및 투자 서비스", icon: "💰", count: 6 }
    ];

    const mockTemplates: MarketingTemplate[] = [
      {
        id: "health-1",
        name: "건강한 라이프스타일",
        description: "건강 관련 제품의 효과를 강조하는 템플릿",
        content: "건강한 {제품명}으로 {목표}를 달성해보세요! {주요효과}를 경험하고 {혜택}을 누려보세요. {행동유도}",
        category: "health",
        platform: "instagram",
        tags: ["건강", "웰빙", "라이프스타일"],
        variables: [
          { name: "제품명", type: "text", placeholder: "제품명을 입력하세요", required: true },
          { name: "목표", type: "text", placeholder: "달성할 목표를 입력하세요", required: true },
          { name: "주요효과", type: "text", placeholder: "주요 효과를 입력하세요", required: true },
          { name: "혜택", type: "text", placeholder: "제공되는 혜택을 입력하세요", required: true },
          { name: "행동유도", type: "select", placeholder: "행동 유도 문구를 선택하세요", required: true, options: ["지금 시작하세요!", "무료로 체험해보세요!", "특별한 할인을 받아보세요!"] }
        ],
        usageCount: 45,
        rating: 4.8,
        createdAt: "2024-01-15",
        isPublic: true,
        author: "마케터A"
      },
      {
        id: "beauty-1",
        name: "뷰티 트렌드",
        description: "뷰티 제품의 트렌디함을 강조하는 템플릿",
        content: "🔥 {트렌드키워드}가 핫한 지금! {제품명}으로 {메인효과}를 경험해보세요. {특별혜택}으로 {행동유도}",
        category: "beauty",
        platform: "instagram",
        tags: ["뷰티", "트렌드", "핫"],
        variables: [
          { name: "트렌드키워드", type: "text", placeholder: "트렌드 키워드를 입력하세요", required: true },
          { name: "제품명", type: "text", placeholder: "제품명을 입력하세요", required: true },
          { name: "메인효과", type: "text", placeholder: "주요 효과를 입력하세요", required: true },
          { name: "특별혜택", type: "text", placeholder: "특별한 혜택을 입력하세요", required: true },
          { name: "행동유도", type: "select", placeholder: "행동 유도 문구를 선택하세요", required: true, options: ["지금 구매하세요!", "한정 수량이니 서둘러주세요!", "무료 샘플을 받아보세요!"] }
        ],
        usageCount: 32,
        rating: 4.6,
        createdAt: "2024-01-20",
        isPublic: true,
        author: "뷰티마스터"
      },
      {
        id: "tech-1",
        name: "테크 솔루션",
        description: "IT 서비스의 문제 해결 능력을 강조하는 템플릿",
        content: "💡 {문제상황}으로 고민하고 계신가요? {서비스명}이 {해결방법}으로 도와드립니다. {주요기능}으로 {결과}를 경험하세요.",
        category: "tech",
        platform: "linkedin",
        tags: ["테크", "솔루션", "문제해결"],
        variables: [
          { name: "문제상황", type: "text", placeholder: "해결할 문제 상황을 입력하세요", required: true },
          { name: "서비스명", type: "text", placeholder: "서비스명을 입력하세요", required: true },
          { name: "해결방법", type: "text", placeholder: "해결 방법을 입력하세요", required: true },
          { name: "주요기능", type: "text", placeholder: "주요 기능을 입력하세요", required: true },
          { name: "결과", type: "text", placeholder: "얻을 수 있는 결과를 입력하세요", required: true }
        ],
        usageCount: 28,
        rating: 4.7,
        createdAt: "2024-01-18",
        isPublic: true,
        author: "테크리더"
      }
    ];

    setCategories(mockCategories);
    setTemplates(mockTemplates);
  };

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesVisibility = !showPublicOnly || template.isPublic;
    
    return matchesCategory && matchesSearch && matchesVisibility;
  });

  const handleCreateTemplate = () => {
    if (!newTemplate.name || !newTemplate.content || !newTemplate.category) return;
    
    const template: MarketingTemplate = {
      id: `template-${Date.now()}`,
      name: newTemplate.name,
      description: newTemplate.description || "",
      content: newTemplate.content,
      category: newTemplate.category,
      platform: newTemplate.platform || "instagram",
      tags: newTemplate.tags || [],
      variables: newTemplate.variables || [],
      usageCount: 0,
      rating: 0,
      createdAt: new Date().toISOString().split('T')[0],
      isPublic: newTemplate.isPublic || false,
      author: newTemplate.author || "사용자"
    };
    
    setTemplates(prev => [template, ...prev]);
    setNewTemplate({
      name: "",
      description: "",
      content: "",
      category: "",
      platform: "instagram",
      tags: [],
      variables: [],
      isPublic: false,
      author: "사용자"
    });
    setIsCreating(false);
  };

  const handleUseTemplate = (template: MarketingTemplate) => {
    // 템플릿 사용 시 사용 횟수 증가
    setTemplates(prev => prev.map(t => 
      t.id === template.id ? { ...t, usageCount: t.usageCount + 1 } : t
    ));
    
    // 실제로는 템플릿을 마케팅 문구 생성기에 전달
    console.log("템플릿 사용:", template);
  };

  const handleRateTemplate = (templateId: string, rating: number) => {
    setTemplates(prev => prev.map(t => 
      t.id === templateId ? { ...t, rating: (t.rating + rating) / 2 } : t
    ));
  };

  return (
    <Container size="lg" padding="lg">
      <Section spacing="lg">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>📋 마케팅 템플릿 시스템</CardTitle>
                <CardDescription>
                  자주 사용하는 마케팅 문구 패턴을 저장하고 재사용하세요
                </CardDescription>
              </div>
              <Button onClick={() => setIsCreating(true)}>
                ✨ 새 템플릿 만들기
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 검색 및 필터 */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="템플릿 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">모든 카테고리</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.icon} {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={showPublicOnly}
                    onCheckedChange={setShowPublicOnly}
                  />
                  <label className="text-sm">공개 템플릿만</label>
                </div>
              </div>
            </div>

            {/* 카테고리별 요약 */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {categories.map(category => (
                <Card 
                  key={category.id} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedCategory === category.id ? 'ring-2 ring-primary' : ''
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium">{category.name}</div>
                    <div className="text-xs text-muted-foreground">{category.count}개</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 새 템플릿 생성 폼 */}
            {isCreating && (
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle>새 템플릿 만들기</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">템플릿 이름 *</label>
                      <Input
                        placeholder="템플릿 이름을 입력하세요"
                        value={newTemplate.name}
                        onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">카테고리 *</label>
                      <Select
                        value={newTemplate.category}
                        onValueChange={(value) => setNewTemplate(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="카테고리를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.icon} {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">설명</label>
                    <Input
                      placeholder="템플릿에 대한 설명을 입력하세요"
                      value={newTemplate.description}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">템플릿 내용 *</label>
                    <Textarea
                      placeholder="템플릿 내용을 입력하세요. {변수명} 형태로 변수를 사용할 수 있습니다."
                      value={newTemplate.content}
                      onChange={(e) => setNewTemplate(prev => ({ ...prev, content: e.target.value }))}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleCreateTemplate} disabled={!newTemplate.name || !newTemplate.content || !newTemplate.category}>
                      템플릿 저장
                    </Button>
                    <Button variant="outline" onClick={() => setIsCreating(false)}>
                      취소
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 템플릿 목록 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">템플릿 목록 ({filteredTemplates.length}개)</h3>
              
              {filteredTemplates.map(template => (
                <Card key={template.id} className="hover:shadow-md transition-all">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="text-lg font-semibold">{template.name}</h4>
                          <Badge variant="outline">{template.category}</Badge>
                          <Badge variant="secondary">{template.platform}</Badge>
                          {template.isPublic && <Badge variant="default">공개</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {template.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div>사용 {template.usageCount}회</div>
                        <div>평점 ⭐ {template.rating.toFixed(1)}</div>
                        <div>{template.createdAt}</div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-muted rounded-lg mb-3">
                      <p className="text-sm font-mono">{template.content}</p>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-muted-foreground">
                        작성자: {template.author}
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleUseTemplate(template)}>
                          📋 사용하기
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleRateTemplate(template.id, 5)}
                        >
                          ⭐ 평가
                        </Button>
                        <Button size="sm" variant="ghost">
                          📝 편집
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </Section>
    </Container>
  );
}
