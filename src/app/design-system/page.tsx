"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";

export default function DesignSystemPage() {
  const [switchValue, setSwitchValue] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [progressValue, setProgressValue] = useState(33);

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 섹션 */}
      <Section spacing="lg" background="primary" align="center">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-foreground">
            🎨 디자인 시스템
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            2단계에서 구현한 색상 팔레트, 타이포그래피, 간격 시스템, 그리고 고도화된 UI 컴포넌트들을 확인해보세요
          </p>
        </div>
      </Section>

      <Container size="lg" padding="lg">
        {/* 색상 팔레트 시스템 */}
        <Section spacing="lg">
          <Card>
            <CardHeader>
              <CardTitle>🎨 색상 팔레트 시스템</CardTitle>
              <CardDescription>
                Primary, Neutral, Success, Warning, Error 색상 팔레트
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Primary 색상 */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Primary 색상</h3>
                <div className="grid grid-cols-10 gap-2">
                  {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                    <div key={shade} className="text-center">
                      <div 
                        className={`w-12 h-12 rounded-lg border shadow-sm mb-1`}
                        style={{ backgroundColor: `hsl(var(--color-primary-${shade}))` }}
                      />
                      <span className="text-xs text-muted-foreground">{shade}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Success, Warning, Error 색상 */}
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <h4 className="font-medium mb-2 text-green-600">Success</h4>
                  <div className="space-y-2">
                    {[50, 100, 500, 600, 700].map((shade) => (
                      <div key={shade} className="flex items-center gap-2">
                        <div 
                          className="w-8 h-4 rounded border"
                          style={{ backgroundColor: `hsl(var(--color-success-${shade}))` }}
                        />
                        <span className="text-sm">{shade}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-yellow-600">Warning</h4>
                  <div className="space-y-2">
                    {[50, 100, 500, 600, 700].map((shade) => (
                      <div key={shade} className="flex items-center gap-2">
                        <div 
                          className="w-8 h-4 rounded border"
                          style={{ backgroundColor: `hsl(var(--color-warning-${shade}))` }}
                        />
                        <span className="text-sm">{shade}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2 text-red-600">Error</h4>
                  <div className="space-y-2">
                    {[50, 100, 500, 600, 700].map((shade) => (
                      <div key={shade} className="flex items-center gap-2">
                        <div 
                          className="w-8 h-4 rounded border"
                          style={{ backgroundColor: `hsl(var(--color-error-${shade}))` }}
                        />
                        <span className="text-sm">{shade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* 타이포그래피 시스템 */}
        <Section spacing="lg">
          <Card>
            <CardHeader>
              <CardTitle>📝 타이포그래피 시스템</CardTitle>
              <CardDescription>
                폰트 크기, 굵기, 줄 높이 시스템
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h1 className="text-6xl font-black">Heading 1 (6xl)</h1>
                <h2 className="text-5xl font-bold">Heading 2 (5xl)</h2>
                <h3 className="text-4xl font-semibold">Heading 3 (4xl)</h3>
                <h4 className="text-3xl font-medium">Heading 4 (3xl)</h4>
                <h5 className="text-2xl font-normal">Heading 5 (2xl)</h5>
                <h6 className="text-xl font-light">Heading 6 (xl)</h6>
                <p className="text-lg">본문 Large (lg)</p>
                <p className="text-base">본문 Base (base)</p>
                <p className="text-sm">본문 Small (sm)</p>
                <p className="text-xs">본문 Extra Small (xs)</p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <p className="font-thin">Font Weight: Thin (100)</p>
                <p className="font-light">Font Weight: Light (300)</p>
                <p className="font-normal">Font Weight: Normal (400)</p>
                <p className="font-medium">Font Weight: Medium (500)</p>
                <p className="font-semibold">Font Weight: Semibold (600)</p>
                <p className="font-bold">Font Weight: Bold (700)</p>
                <p className="font-extrabold">Font Weight: Extrabold (800)</p>
                <p className="font-black">Font Weight: Black (900)</p>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* 간격 시스템 */}
        <Section spacing="lg">
          <Card>
            <CardHeader>
              <CardTitle>📏 간격 시스템 (4px 단위 기반)</CardTitle>
              <CardDescription>
                4px 단위로 체계화된 간격 시스템
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-4">
                  <span className="w-16 text-sm">4px (1)</span>
                  <div className="w-1 h-4 bg-primary rounded"></div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-16 text-sm">8px (2)</span>
                  <div className="w-2 h-4 bg-primary rounded"></div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-16 text-sm">12px (3)</span>
                  <div className="w-3 h-4 bg-primary rounded"></div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-16 text-sm">16px (4)</span>
                  <div className="w-4 h-4 bg-primary rounded"></div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-16 text-sm">24px (6)</span>
                  <div className="w-6 h-4 bg-primary rounded"></div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-16 text-sm">32px (8)</span>
                  <div className="w-8 h-4 bg-primary rounded"></div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-16 text-sm">48px (12)</span>
                  <div className="w-12 h-4 bg-primary rounded"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Button 컴포넌트 테스트 */}
        <Section spacing="lg">
          <Card>
            <CardHeader>
              <CardTitle>🔘 Button 컴포넌트 (고도화됨)</CardTitle>
              <CardDescription>
                새로운 variant, size, loading 상태 등을 포함한 Button 컴포넌트
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Variants */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Variants</h3>
                <div className="flex flex-wrap gap-2">
                  <Button variant="default">Default</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="success">Success</Button>
                  <Button variant="warning">Warning</Button>
                  <Button variant="info">Info</Button>
                  <Button variant="gradient">Gradient</Button>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Sizes</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="xs">XS</Button>
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="xl">XL</Button>
                  <Button size="2xl">2XL</Button>
                </div>
              </div>

              {/* Icon Buttons */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Icon Buttons</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Button size="icon-sm">🚀</Button>
                  <Button size="icon">🚀</Button>
                  <Button size="icon-lg">🚀</Button>
                  <Button size="icon-xl">🚀</Button>
                </div>
              </div>

              {/* Rounded Options */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Rounded Options</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Button rounded="none">None</Button>
                  <Button rounded="default">Default</Button>
                  <Button rounded="lg">Large</Button>
                  <Button rounded="xl">XL</Button>
                  <Button rounded="full">Full</Button>
                </div>
              </div>

              {/* Loading States */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Loading States</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Button loading>Loading</Button>
                  <Button variant="outline" loading>Loading</Button>
                  <Button variant="destructive" loading>Loading</Button>
                </div>
              </div>

              {/* With Icons */}
              <div>
                <h3 className="text-lg font-semibold mb-3">With Icons</h3>
                <div className="flex flex-wrap items-center gap-2">
                  <Button leftIcon="🚀">Launch</Button>
                  <Button rightIcon="➡️">Next</Button>
                  <Button leftIcon="💾" rightIcon="✅">Save</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Container & Section 컴포넌트 테스트 */}
        <Section spacing="lg">
          <Card>
            <CardHeader>
              <CardTitle>📦 Container & Section 컴포넌트</CardTitle>
              <CardDescription>
                레이아웃을 위한 새로운 Container와 Section 컴포넌트
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Container Sizes */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Container Sizes</h3>
                <div className="space-y-4">
                  <Container size="sm" className="bg-muted p-4 rounded">
                    <p className="text-sm">Small Container (max-w-3xl)</p>
                  </Container>
                  <Container size="md" className="bg-muted p-4 rounded">
                    <p className="text-sm">Medium Container (max-w-4xl) - 기본값</p>
                  </Container>
                  <Container size="lg" className="bg-muted p-4 rounded">
                    <p className="text-sm">Large Container (max-w-6xl)</p>
                  </Container>
                  <Container size="xl" className="bg-muted p-4 rounded">
                    <p className="text-sm">XL Container (max-w-7xl)</p>
                  </Container>
                </div>
              </div>

              {/* Section Variants */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Section Variants</h3>
                <div className="space-y-4">
                  <Section spacing="sm" background="muted" border="bottom" className="rounded p-4">
                    <p>Small spacing, Muted background, Bottom border</p>
                  </Section>
                  <Section spacing="md" background="primary" border="both" className="rounded p-4">
                    <p>Medium spacing, Primary background, Both borders</p>
                  </Section>
                  <Section spacing="lg" background="secondary" border="top" className="rounded p-4">
                    <p>Large spacing, Secondary background, Top border</p>
                  </Section>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* 기타 UI 컴포넌트들 */}
        <Section spacing="lg">
          <Card>
            <CardHeader>
              <CardTitle>🎭 기타 UI 컴포넌트들</CardTitle>
              <CardDescription>
                Badge, Separator, Switch, Slider, Progress 등
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Badges */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Badges</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="destructive">Destructive</Badge>
                  <Badge variant="outline">Outline</Badge>
                </div>
              </div>

              {/* Switch */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Switch</h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={switchValue}
                    onCheckedChange={setSwitchValue}
                  />
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {switchValue ? 'On' : 'Off'}
                  </label>
                </div>
              </div>

              {/* Slider */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Slider</h3>
                <div className="w-full max-w-md">
                  <Slider
                    value={sliderValue}
                    onValueChange={setSliderValue}
                    max={100}
                    step={1}
                    className="w-full"
                  />
                  <p className="text-sm text-muted-foreground mt-2">
                    Value: {sliderValue[0]}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Progress</h3>
                <div className="w-full max-w-md space-y-2">
                  <Progress value={progressValue} className="w-full" />
                  <p className="text-sm text-muted-foreground">
                    Progress: {progressValue}%
                  </p>
                  <Button 
                    size="sm" 
                    onClick={() => setProgressValue(Math.min(100, progressValue + 10))}
                  >
                    +10%
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Form 컴포넌트들 */}
        <Section spacing="lg">
          <Card>
            <CardHeader>
              <CardTitle>📝 Form 컴포넌트들</CardTitle>
              <CardDescription>
                Input, Textarea, Select, Checkbox, Radio 등
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Input</label>
                  <Input placeholder="Type something..." />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Select</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                      <SelectItem value="option2">Option 2</SelectItem>
                      <SelectItem value="option3">Option 3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Textarea</label>
                <Textarea placeholder="Type a longer message..." />
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox id="terms" />
                  <label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Accept terms and conditions
                  </label>
                </div>

                <RadioGroup defaultValue="option1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option1" id="option1" />
                    <label htmlFor="option1" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Option 1
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="option2" id="option2" />
                    <label htmlFor="option2" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Option 2
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        </Section>

        {/* Tabs */}
        <Section spacing="lg">
          <Card>
            <CardHeader>
              <CardTitle>📑 Tabs 컴포넌트</CardTitle>
              <CardDescription>
                탭 기반 네비게이션
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="password">Password</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>
                <TabsContent value="account" className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Make changes to your account here. Click save when you're done.
                  </p>
                </TabsContent>
                <TabsContent value="password" className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Change your password here. After saving, you'll be logged out.
                  </p>
                </TabsContent>
                <TabsContent value="settings" className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Manage your account settings and preferences.
                  </p>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </Section>
      </Container>
    </div>
  );
}
