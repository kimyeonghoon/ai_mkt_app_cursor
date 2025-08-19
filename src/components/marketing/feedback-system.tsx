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
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";

interface MarketingCopy {
  id: string;
  content: string;
  platform: string;
  hashtags: string[];
  characterCount: number;
  createdAt: string;
  author: string;
}

interface UserFeedback {
  id: string;
  copyId: string;
  userId: string;
  userName: string;
  rating: number;
  category: "clarity" | "engagement" | "conversion" | "creativity" | "overall";
  comment: string;
  tags: string[];
  isHelpful: boolean;
  createdAt: string;
  status: "pending" | "reviewed" | "implemented";
}

interface FeedbackAnalytics {
  totalFeedback: number;
  averageRating: number;
  ratingDistribution: { [key: number]: number };
  categoryPerformance: { [key: string]: number };
  topIssues: string[];
  improvementSuggestions: string[];
  responseRate: number;
}

export default function FeedbackSystem() {
  const [marketingCopies, setMarketingCopies] = useState<MarketingCopy[]>([]);
  const [feedbacks, setFeedbacks] = useState<UserFeedback[]>([]);
  const [analytics, setAnalytics] = useState<FeedbackAnalytics>({
    totalFeedback: 0,
    averageRating: 0,
    ratingDistribution: {},
    categoryPerformance: {},
    topIssues: [],
    improvementSuggestions: [],
    responseRate: 0
  });
  
  const [selectedCopy, setSelectedCopy] = useState<string>("all");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [isAddingFeedback, setIsAddingFeedback] = useState(false);
  const [newFeedback, setNewFeedback] = useState<Partial<UserFeedback>>({
    rating: 5,
    category: "overall",
    comment: "",
    tags: [],
    isHelpful: false
  });

  useEffect(() => {
    generateMockData();
  }, []);

  useEffect(() => {
    calculateAnalytics();
  }, [feedbacks]);

  const generateMockData = () => {
    // 마케팅 문구 데이터 생성
    const mockCopies: MarketingCopy[] = [
      {
        id: "copy-1",
        content: "건강한 식습관으로 더 멋진 20대 되어보세요! 나에게 꼭 맞는 영양 관리 서비스로 쉽고 편리하게 시작해보세요.",
        platform: "Instagram",
        hashtags: ["#건강한20대", "#영양관리", "#마케팅"],
        characterCount: 89,
        createdAt: "2024-01-15",
        author: "마케터A"
      },
      {
        id: "copy-2",
        content: "🔥 트렌디한 뷰티 제품으로 당신만의 매력을 발견하세요! 특별한 할인 혜택을 놓치지 마세요.",
        platform: "Facebook",
        hashtags: ["#뷰티", "#트렌드", "#할인"],
        characterCount: 67,
        createdAt: "2024-01-16",
        author: "뷰티마스터"
      },
      {
        id: "copy-3",
        content: "💡 비즈니스 문제를 해결하는 IT 솔루션! 전문가들이 추천하는 서비스로 효율성을 극대화하세요.",
        platform: "LinkedIn",
        hashtags: ["#IT솔루션", "#비즈니스", "#효율성"],
        characterCount: 78,
        createdAt: "2024-01-17",
        author: "테크리더"
      }
    ];

    // 피드백 데이터 생성
    const mockFeedbacks: UserFeedback[] = [
      {
        id: "feedback-1",
        copyId: "copy-1",
        userId: "user-1",
        userName: "김마케터",
        rating: 4,
        category: "clarity",
        comment: "메시지가 명확하고 이해하기 쉽습니다. 다만 CTA가 더 강력하면 좋겠어요.",
        tags: ["명확함", "이해도", "CTA개선"],
        isHelpful: true,
        createdAt: "2024-01-18",
        status: "pending"
      },
      {
        id: "feedback-2",
        copyId: "copy-1",
        userId: "user-2",
        userName: "이영업팀장",
        rating: 5,
        category: "engagement",
        comment: "20대 타겟에게 매우 적합한 톤입니다. 해시태그도 잘 선택되었어요.",
        tags: ["타겟적합성", "톤", "해시태그"],
        isHelpful: true,
        createdAt: "2024-01-19",
        status: "reviewed"
      },
      {
        id: "feedback-3",
        copyId: "copy-2",
        userId: "user-3",
        userName: "박뷰티매니저",
        rating: 3,
        category: "conversion",
        comment: "트렌디함은 좋지만 구체적인 혜택이 부족합니다. 할인율이나 기간을 명시하면 좋겠어요.",
        tags: ["트렌드", "혜택부족", "구체성"],
        isHelpful: false,
        createdAt: "2024-01-20",
        status: "pending"
      }
    ];

    setMarketingCopies(mockCopies);
    setFeedbacks(mockFeedbacks);
  };

  const calculateAnalytics = () => {
    if (feedbacks.length === 0) return;

    const totalFeedback = feedbacks.length;
    const averageRating = feedbacks.reduce((sum, f) => sum + f.rating, 0) / totalFeedback;
    
    // 평점 분포 계산
    const ratingDistribution: { [key: number]: number } = {};
    for (let i = 1; i <= 5; i++) {
      ratingDistribution[i] = feedbacks.filter(f => f.rating === i).length;
    }

    // 카테고리별 성과 계산
    const categoryPerformance: { [key: string]: number } = {};
    const categories = ["clarity", "engagement", "conversion", "creativity", "overall"];
    categories.forEach(cat => {
      const catFeedbacks = feedbacks.filter(f => f.category === cat);
      if (catFeedbacks.length > 0) {
        categoryPerformance[cat] = catFeedbacks.reduce((sum, f) => sum + f.rating, 0) / catFeedbacks.length;
      }
    });

    // 주요 이슈 및 개선 제안 추출
    const topIssues = feedbacks
      .filter(f => f.rating <= 3)
      .flatMap(f => f.tags)
      .filter((tag, index, arr) => arr.indexOf(tag) === index)
      .slice(0, 5);

    const improvementSuggestions = feedbacks
      .filter(f => f.comment.includes("개선") || f.comment.includes("하면 좋겠어요"))
      .map(f => f.comment)
      .slice(0, 3);

    const responseRate = (feedbacks.filter(f => f.status !== "pending").length / totalFeedback) * 100;

    setAnalytics({
      totalFeedback,
      averageRating,
      ratingDistribution,
      categoryPerformance,
      topIssues,
      improvementSuggestions,
      responseRate
    });
  };

  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesCopy = selectedCopy === "all" || feedback.copyId === selectedCopy;
    const matchesCategory = selectedCategory === "all" || feedback.category === selectedCategory;
    const matchesSearch = feedback.comment.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feedback.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         feedback.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = !showPendingOnly || feedback.status === "pending";
    
    return matchesCopy && matchesCategory && matchesSearch && matchesStatus;
  });

  const handleAddFeedback = () => {
    if (!selectedCopy || selectedCopy === "none" || !newFeedback.comment) return;
    
    const feedback: UserFeedback = {
      id: `feedback-${Date.now()}`,
      copyId: selectedCopy,
      userId: "current-user",
      userName: "현재 사용자",
      rating: newFeedback.rating || 5,
      category: newFeedback.category || "overall",
      comment: newFeedback.comment,
      tags: newFeedback.tags || [],
      isHelpful: false,
      createdAt: new Date().toISOString().split('T')[0],
      status: "pending"
    };
    
    setFeedbacks(prev => [feedback, ...prev]);
    setNewFeedback({
      rating: 5,
      category: "overall",
      comment: "",
      tags: [],
      isHelpful: false
    });
    setIsAddingFeedback(false);
  };

  const handleUpdateStatus = (feedbackId: string, status: "pending" | "reviewed" | "implemented") => {
    setFeedbacks(prev => prev.map(f => 
      f.id === feedbackId ? { ...f, status } : f
    ));
  };

  const handleToggleHelpful = (feedbackId: string) => {
    setFeedbacks(prev => prev.map(f => 
      f.id === feedbackId ? { ...f, isHelpful: !f.isHelpful } : f
    ));
  };

  const getCategoryLabel = (category: string): string => {
    const labels: { [key: string]: string } = {
      clarity: "명확성",
      engagement: "참여도",
      conversion: "전환율",
      creativity: "창의성",
      overall: "전체"
    };
    return labels[category] || category;
  };

  const getStatusBadgeVariant = (status: string): "default" | "secondary" | "destructive" => {
    switch (status) {
      case "implemented": return "default";
      case "reviewed": return "secondary";
      case "pending": return "destructive";
      default: return "secondary";
    }
  };

  const getStatusLabel = (status: string): string => {
    const labels: { [key: string]: string } = {
      pending: "검토 대기",
      reviewed: "검토 완료",
      implemented: "구현 완료"
    };
    return labels[status] || status;
  };

  return (
    <Container size="lg" padding="lg">
      <Section spacing="lg">
        <Card>
          <CardHeader>
            <CardTitle>💬 사용자 피드백 시스템</CardTitle>
            <CardDescription>
              생성된 마케팅 문구에 대한 피드백을 수집하고 분석하여 개선점을 도출하세요
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 피드백 분석 요약 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">피드백 분석 요약</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-primary">{analytics.totalFeedback}</div>
                    <div className="text-sm text-muted-foreground">총 피드백</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-blue-600">{analytics.averageRating.toFixed(1)}</div>
                    <div className="text-sm text-muted-foreground">평균 평점</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-green-600">{analytics.responseRate.toFixed(1)}%</div>
                    <div className="text-sm text-muted-foreground">응답률</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-purple-600">{feedbacks.filter(f => f.status === "pending").length}</div>
                    <div className="text-sm text-muted-foreground">검토 대기</div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* 평점 분포 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">평점 분포</h3>
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map(rating => (
                  <div key={rating} className="flex items-center gap-3">
                    <div className="w-8 text-sm font-medium">{rating}점</div>
                    <div className="flex-1 bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${analytics.ratingDistribution[rating] ? (analytics.ratingDistribution[rating] / analytics.totalFeedback) * 100 : 0}%` 
                        }}
                      />
                    </div>
                    <div className="w-12 text-sm text-muted-foreground">
                      {analytics.ratingDistribution[rating] || 0}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 카테고리별 성과 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">카테고리별 성과</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {Object.entries(analytics.categoryPerformance).map(([category, score]) => (
                  <Card key={category}>
                    <CardContent className="p-4 text-center">
                      <div className="text-lg font-semibold text-primary">{score.toFixed(1)}</div>
                      <div className="text-sm text-muted-foreground">{getCategoryLabel(category)}</div>
                      <Progress value={score} max={5} className="w-full mt-2" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* 주요 이슈 및 개선 제안 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🚨 주요 이슈</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analytics.topIssues.map((issue, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="text-sm">{issue}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">💡 개선 제안</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {analytics.improvementSuggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                        <span className="text-sm">{suggestion}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 검색 및 필터 */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="피드백 검색..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedCopy || "all"} onValueChange={setSelectedCopy}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="문구 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">모든 문구</SelectItem>
                    {marketingCopies.map(copy => (
                      <SelectItem key={copy.id} value={copy.id}>
                        {copy.platform} - {copy.content.substring(0, 30)}...
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">모든 카테고리</SelectItem>
                    <SelectItem value="clarity">명확성</SelectItem>
                    <SelectItem value="engagement">참여도</SelectItem>
                    <SelectItem value="conversion">전환율</SelectItem>
                    <SelectItem value="creativity">창의성</SelectItem>
                    <SelectItem value="overall">전체</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={showPendingOnly}
                    onCheckedChange={setShowPendingOnly}
                  />
                  <label className="text-sm">검토 대기만</label>
                </div>
              </div>
            </div>

            {/* 새 피드백 추가 */}
            <div className="flex justify-center">
              <Button onClick={() => setIsAddingFeedback(true)}>
                ✨ 새 피드백 추가
              </Button>
            </div>

            {isAddingFeedback && (
              <Card className="border-2 border-primary">
                <CardHeader>
                  <CardTitle>새 피드백 추가</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">마케팅 문구 선택 *</label>
                      <Select value={selectedCopy || "none"} onValueChange={setSelectedCopy}>
                        <SelectTrigger>
                          <SelectValue placeholder="문구를 선택하세요" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="none">문구를 선택하세요</SelectItem>
                          {marketingCopies.map(copy => (
                            <SelectItem key={copy.id} value={copy.id}>
                              {copy.platform} - {copy.content.substring(0, 30)}...
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">평점 *</label>
                      <Select
                        value={newFeedback.rating?.toString() || "5"}
                        onValueChange={(value) => setNewFeedback(prev => ({ ...prev, rating: parseInt(value) }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[5, 4, 3, 2, 1].map(rating => (
                            <SelectItem key={rating} value={rating.toString()}>
                              {rating}점
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">카테고리 *</label>
                    <Select
                      value={newFeedback.category || "overall"}
                      onValueChange={(value: any) => setNewFeedback(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clarity">명확성</SelectItem>
                        <SelectItem value="engagement">참여도</SelectItem>
                        <SelectItem value="conversion">전환율</SelectItem>
                        <SelectItem value="creativity">창의성</SelectItem>
                        <SelectItem value="overall">전체</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">피드백 내용 *</label>
                    <Textarea
                      placeholder="구체적인 피드백을 입력해주세요..."
                      value={newFeedback.comment}
                      onChange={(e) => setNewFeedback(prev => ({ ...prev, comment: e.target.value }))}
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button onClick={handleAddFeedback} disabled={!selectedCopy || !newFeedback.comment}>
                      피드백 등록
                    </Button>
                    <Button variant="outline" onClick={() => setIsAddingFeedback(false)}>
                      취소
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* 피드백 목록 */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">피드백 목록 ({filteredFeedbacks.length}개)</h3>
              
              {filteredFeedbacks.map(feedback => {
                const copy = marketingCopies.find(c => c.id === feedback.copyId);
                return (
                  <Card key={feedback.id} className="hover:shadow-md transition-all">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="text-lg font-semibold">{feedback.userName}</h4>
                            <Badge variant="outline">{getCategoryLabel(feedback.category)}</Badge>
                            <Badge variant="secondary">{feedback.rating}점</Badge>
                            <Badge variant={getStatusBadgeVariant(feedback.status)}>
                              {getStatusLabel(feedback.status)}
                            </Badge>
                          </div>
                          {copy && (
                            <div className="p-3 bg-muted rounded-lg mb-2">
                              <p className="text-sm text-muted-foreground">
                                <strong>{copy.platform}</strong>: {copy.content}
                              </p>
                            </div>
                          )}
                          <p className="text-sm mb-2">{feedback.comment}</p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {feedback.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="text-right text-sm text-muted-foreground">
                          <div>{feedback.createdAt}</div>
                          <div className="flex items-center gap-1 mt-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleToggleHelpful(feedback.id)}
                            >
                              {feedback.isHelpful ? "👍" : "👍"}
                            </Button>
                            <span className="text-xs">{feedback.isHelpful ? "도움됨" : "도움됨"}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-xs text-muted-foreground">
                          ID: {feedback.id}
                        </div>
                        <div className="flex gap-2">
                          <Select
                            value={feedback.status}
                            onValueChange={(value: any) => handleUpdateStatus(feedback.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">검토 대기</SelectItem>
                              <SelectItem value="reviewed">검토 완료</SelectItem>
                              <SelectItem value="implemented">구현 완료</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button size="sm" variant="outline">
                            📝 답변
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </Section>
    </Container>
  );
}
