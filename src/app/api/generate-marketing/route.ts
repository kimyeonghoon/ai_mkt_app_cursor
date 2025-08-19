import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import * as yup from 'yup';

// Rate limiting을 위한 간단한 메모리 저장소
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting 설정
const RATE_LIMIT = {
  MAX_REQUESTS: 10, // 분당 최대 요청 수
  WINDOW_MS: 60 * 1000, // 1분
};

// 입력 데이터 검증 스키마
const apiSchema = yup.object({
  valueProposition: yup
    .string()
    .required("가치 제언이 필요합니다")
    .min(10, "가치 제언은 최소 10자 이상이어야 합니다")
    .max(500, "가치 제언은 최대 500자까지 가능합니다"),
  targeting: yup.object({
    gender: yup.string().required("성별 선택이 필요합니다"),
    ageGroups: yup.array().min(1, "최소 1개 이상의 연령대를 선택해야 합니다"),
    region: yup.string().required("지역 선택이 필요합니다"),
    interests: yup.array().min(1, "최소 1개 이상의 관심분야를 선택해야 합니다")
  }),
  platform: yup.string().required("플랫폼 선택이 필요합니다"),
  generationOptions: yup.object({
    length: yup.string().required("문구 분량 선택이 필요합니다"),
    tone: yup.string().required("어조/톤 선택이 필요합니다"),
    ctaStyle: yup.string().required("콜투액션 스타일 선택이 필요합니다"),
    emotionKeywords: yup.array().of(yup.string()),
    count: yup.number().min(1).max(5).required("생성 개수는 1-5개 사이여야 합니다"),
    forbiddenWords: yup.array().of(yup.string())
  })
});

// Rate limiting 체크 함수
function checkRateLimit(identifier: string): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now();
  const userLimit = rateLimitStore.get(identifier);

  if (!userLimit || now > userLimit.resetTime) {
    // 새로운 윈도우 시작
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + RATE_LIMIT.WINDOW_MS
    });
    return { allowed: true, remaining: RATE_LIMIT.MAX_REQUESTS - 1, resetTime: now + RATE_LIMIT.WINDOW_MS };
  }

  if (userLimit.count >= RATE_LIMIT.MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetTime: userLimit.resetTime };
  }

  // 요청 수 증가
  userLimit.count++;
  return { allowed: true, remaining: RATE_LIMIT.MAX_REQUESTS - userLimit.count, resetTime: userLimit.resetTime };
}

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 플랫폼별 프롬프트 생성 함수
function generatePlatformPrompt(platform: string, options: any): string {
  const basePrompt = `다음 가치 제언을 바탕으로 마케팅 문구를 생성해주세요:
가치 제언: "${options.valueProposition}"

타겟: ${options.targeting.gender === 'all' ? '전체' : options.targeting.gender === 'male' ? '남성' : options.targeting.gender === 'female' ? '여성' : '기타'}, ${options.targeting.ageGroups.join(', ')}대, ${options.targeting.region === 'all' ? '전국' : options.targeting.region === 'seoul' ? '수도권' : options.targeting.region === 'local' ? '지방' : '해외'}, 관심분야: ${options.targeting.interests.join(', ')}

스타일: ${options.generationOptions.length === 'short' ? '짧고 임팩트 있는' : options.generationOptions.length === 'medium' ? '적당한 길이의' : '상세하고 긴'}, ${options.generationOptions.tone === 'casual' ? '친근하고 캐주얼한' : options.generationOptions.tone === 'professional' ? '전문적이고 신뢰감 있는' : options.generationOptions.tone === 'emotional' ? '감정적이고 호소력 있는' : options.generationOptions.tone === 'humorous' ? '유머러스하고 재미있는' : '긴급하고 액션 지향적인'}, ${options.generationOptions.ctaStyle === 'direct' ? '직접적인 행동 유도' : options.generationOptions.ctaStyle === 'indirect' ? '간접적인 행동 유도' : options.generationOptions.ctaStyle === 'curiosity' ? '호기심 유발' : '혜택 강조'}`;

  switch (platform) {
         case 'instagram':
       return `${basePrompt}
 
 인스타그램용으로 다음 요구사항을 만족하는 마케팅 문구를 ${options.generationOptions.count}개 생성해주세요:
 - 해시태그 포함 (3-5개)
 - 시각적이고 임팩트 있는 표현
 - 150자 이내
 - 이모지 적절히 사용
 - 젊고 트렌디한 톤
 
 ${options.generationOptions.emotionKeywords.length > 0 ? `감정 키워드: ${options.generationOptions.emotionKeywords.join(', ')}` : ''}
 ${options.generationOptions.forbiddenWords.length > 0 ? `금지 단어: ${options.generationOptions.forbiddenWords.join(', ')}` : ''}
 
 ${options.generationOptions.count}개의 마케팅 문구를 JSON 형식으로 응답해주세요:
 {
   "marketingCopies": [
     {
       "content": "마케팅 문구 내용 1",
       "hashtags": ["#해시태그1", "#해시태그2"],
       "characterCount": 숫자
     },
     {
       "content": "마케팅 문구 내용 2",
       "hashtags": ["#해시태그3", "#해시태그4"],
       "characterCount": 숫자
     }
   ]
 }`;

         case 'facebook':
       return `${basePrompt}
 
 페이스북용으로 다음 요구사항을 만족하는 마케팅 문구를 ${options.generationOptions.count}개 생성해주세요:
 - 커뮤니티 중심의 친근한 톤
 - 상세한 정보와 스토리텔링
 - 300자 이내
 - 참여를 유도하는 질문 포함
 - 신뢰감 있는 표현
 
 ${options.generationOptions.emotionKeywords.length > 0 ? `감정 키워드: ${options.generationOptions.emotionKeywords.join(', ')}` : ''}
 ${options.generationOptions.forbiddenWords.length > 0 ? `금지 단어: ${options.generationOptions.forbiddenWords.join(', ')}` : ''}
 
 ${options.generationOptions.count}개의 마케팅 문구를 JSON 형식으로 응답해주세요:
 {
   "marketingCopies": [
     {
       "content": "마케팅 문구 내용 1",
       "hashtags": ["#해시태그1", "#해시태그2"],
       "characterCount": 숫자
     },
     {
       "content": "마케팅 문구 내용 2",
       "hashtags": ["#해시태그3", "#해시태그4"],
       "characterCount": 숫자
     }
   ]
 }`;

         case 'youtube':
       return `${basePrompt}
 
 유튜브용으로 다음 요구사항을 만족하는 마케팅 문구를 ${options.generationOptions.count}개 생성해주세요:
 - 썸네일과 설명에 적합
 - 동영상 콘텐츠 특성 반영
 - 200자 이내
 - 클릭을 유도하는 표현
 - 구체적인 혜택 명시
 
 ${options.generationOptions.emotionKeywords.length > 0 ? `감정 키워드: ${options.generationOptions.emotionKeywords.join(', ')}` : ''}
 ${options.generationOptions.forbiddenWords.length > 0 ? `금지 단어: ${options.generationOptions.forbiddenWords.join(', ')}` : ''}
 
 ${options.generationOptions.count}개의 마케팅 문구를 JSON 형식으로 응답해주세요:
 {
   "marketingCopies": [
     {
       "content": "마케팅 문구 내용 1",
       "hashtags": ["#해시태그1", "#해시태그2"],
       "characterCount": 숫자
     },
     {
       "content": "마케팅 문구 내용 2",
       "hashtags": ["#해시태그3", "#해시태그4"],
       "characterCount": 숫자
     }
   ]
 }`;

     case 'blog':
       return `${basePrompt}
 
 블로그/웹사이트용으로 다음 요구사항을 만족하는 마케팅 문구를 ${options.generationOptions.count}개 생성해주세요:
 - SEO 최적화된 키워드 포함
 - 상세하고 정보가 풍부한 내용
 - 400자 이내
 - 전문적이고 신뢰감 있는 톤
 - 구체적인 데이터나 통계 언급
 
 ${options.generationOptions.emotionKeywords.length > 0 ? `감정 키워드: ${options.generationOptions.emotionKeywords.join(', ')}` : ''}
 ${options.generationOptions.forbiddenWords.length > 0 ? `금지 단어: ${options.generationOptions.forbiddenWords.join(', ')}` : ''}
 
 ${options.generationOptions.count}개의 마케팅 문구를 JSON 형식으로 응답해주세요:
 {
   "marketingCopies": [
     {
       "content": "마케팅 문구 내용 1",
       "hashtags": ["#해시태그1", "#해시태그2"],
       "characterCount": 숫자
     },
     {
       "content": "마케팅 문구 내용 2",
       "hashtags": ["#해시태그3", "#해시태그4"],
       "characterCount": 숫자
     }
   ]
 }`;

     case 'email':
       return `${basePrompt}
 
 이메일 마케팅용으로 다음 요구사항을 만족하는 마케팅 문구를 ${options.generationOptions.count}개 생성해주세요:
 - 개인화된 메시지
 - 명확한 제목과 본문
 - 250자 이내
 - 행동 유도가 명확한 CTA
 - 전문적이면서도 친근한 톤
 
 ${options.generationOptions.emotionKeywords.length > 0 ? `감정 키워드: ${options.generationOptions.emotionKeywords.join(', ')}` : ''}
 ${options.generationOptions.forbiddenWords.length > 0 ? `금지 단어: ${options.generationOptions.forbiddenWords.join(', ')}` : ''}
 
 ${options.generationOptions.count}개의 마케팅 문구를 JSON 형식으로 응답해주세요:
 {
   "marketingCopies": [
     {
       "content": "마케팅 문구 내용 1",
       "hashtags": ["#해시태그1", "#해시태그2"],
       "characterCount": 숫자
     },
     {
       "content": "마케팅 문구 내용 2",
       "hashtags": ["#해시태그3", "#해시태그4"],
       "characterCount": 숫자
     }
   ]
 }`;

     case 'kakao':
       return `${basePrompt}
 
 카카오톡/문자용으로 다음 요구사항을 만족하는 마케팅 문구를 ${options.generationOptions.count}개 생성해주세요:
 - 간결하고 직접적인 메시지
 - 100자 이내
 - 즉시 행동 유도
 - 친근하고 신뢰감 있는 톤
 - 구체적인 혜택과 기한 명시
 
 ${options.generationOptions.emotionKeywords.length > 0 ? `감정 키워드: ${options.generationOptions.emotionKeywords.join(', ')}` : ''}
 ${options.generationOptions.forbiddenWords.length > 0 ? `금지 단어: ${options.generationOptions.forbiddenWords.join(', ')}` : ''}
 
 ${options.generationOptions.count}개의 마케팅 문구를 JSON 형식으로 응답해주세요:
 {
   "marketingCopies": [
     {
       "content": "마케팅 문구 내용 1",
       "hashtags": ["#해시태그1", "#해시태그2"],
       "characterCount": 숫자
     },
     {
       "content": "마케팅 문구 내용 2",
       "hashtags": ["#해시태그3", "#해시태그4"],
       "characterCount": 숫자
     }
   ]
 }`;

     default:
       return `${basePrompt}
 
 일반적인 마케팅 문구를 ${options.generationOptions.count}개 생성해주세요.
 
 ${options.generationOptions.emotionKeywords.length > 0 ? `감정 키워드: ${options.generationOptions.emotionKeywords.join(', ')}` : ''}
 ${options.generationOptions.forbiddenWords.length > 0 ? `금지 단어: ${options.generationOptions.forbiddenWords.join(', ')}` : ''}
 
 ${options.generationOptions.count}개의 마케팅 문구를 JSON 형식으로 응답해주세요:
 {
   "marketingCopies": [
     {
       "content": "마케팅 문구 내용 1",
       "hashtags": ["#해시태그1", "#해시태그2"],
       "characterCount": 숫자
     },
     {
       "content": "마케팅 문구 내용 2",
       "hashtags": ["#해시태그3", "#해시태그4"],
       "characterCount": 숫자
     }
   ]
 }`;
  }
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting 체크
    const clientIP = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const rateLimit = checkRateLimit(clientIP);
    
    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: `Rate limit exceeded. Maximum ${RATE_LIMIT.MAX_REQUESTS} requests per minute. Please try again in ${Math.ceil((rateLimit.resetTime - Date.now()) / 1000)} seconds.`
        },
        { 
          status: 429,
          headers: {
            'X-RateLimit-Limit': RATE_LIMIT.MAX_REQUESTS.toString(),
            'X-RateLimit-Remaining': rateLimit.remaining.toString(),
            'X-RateLimit-Reset': rateLimit.resetTime.toString()
          }
        }
      );
    }

    // 요청 본문 파싱
    const body = await request.json();

    // 입력 데이터 검증
    let validatedData;
    try {
      validatedData = await apiSchema.validate(body, { abortEarly: false });
    } catch (validationError) {
      if (validationError instanceof yup.ValidationError) {
        const errors = validationError.errors.join(', ');
        console.error('Validation error:', errors);
        return NextResponse.json(
          { success: false, error: `입력 데이터 검증 실패: ${errors}` },
          { status: 400 }
        );
      }
      throw validationError;
    }

    // OpenAI API 호출 - 여러 개 생성
    const prompt = generatePlatformPrompt(validatedData.platform, validatedData);
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // 안정적인 모델 사용
      messages: [
        {
          role: "system",
          content: `당신은 전문적인 마케팅 문구 작성자입니다. 주어진 요구사항에 맞는 창의적이고 효과적인 마케팅 문구를 ${validatedData.generationOptions.count}개 생성해주세요. 응답은 반드시 JSON 형식으로 제공해주세요.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
             max_tokens: Math.min(1000 * validatedData.generationOptions.count, 4000), // 토큰 수를 생성 개수에 맞게 조정하되 최대 4000으로 제한
      temperature: 0.7,
    });

    const responseText = completion.choices[0]?.message?.content;
    
    if (!responseText) {
      throw new Error('OpenAI API에서 응답을 받지 못했습니다.');
    }

    // JSON 응답 파싱
    let parsedResponse;
    try {
      // JSON 코드 블록이 있는 경우 추출
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/) || 
                       responseText.match(/\{[\s\S]*\}/);
      
      if (jsonMatch) {
        parsedResponse = JSON.parse(jsonMatch[1] || jsonMatch[0]);
      } else {
        throw new Error('JSON 형식이 아닙니다');
      }
    } catch (parseError) {
      console.error('JSON 파싱 에러:', parseError);
      console.error('원본 응답:', responseText);
      
      // JSON 파싱 실패 시 기본 형식으로 변환
      parsedResponse = {
        content: responseText.trim(),
        hashtags: [],
        characterCount: responseText.length
      };
    }

    // 응답 데이터 검증 및 정리
    let marketingCopies = [];
    
    if (parsedResponse.marketingCopies && Array.isArray(parsedResponse.marketingCopies)) {
      // 새로운 형식: marketingCopies 배열
      marketingCopies = parsedResponse.marketingCopies.map((copy: any, index: number) => ({
        id: Date.now() + index,
        content: copy.content || `마케팅 문구 ${index + 1}`,
        platform: validatedData.platform,
        hashtags: copy.hashtags || [],
        characterCount: copy.characterCount || (copy.content || '').length,
        model: "gpt-3.5-turbo",
        generatedAt: new Date().toISOString(),
        requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }));
    } else {
      // 기존 형식: 단일 응답 (하위 호환성)
      marketingCopies = [{
        id: Date.now(),
        content: parsedResponse.content || responseText.trim(),
        platform: validatedData.platform,
        hashtags: parsedResponse.hashtags || [],
        characterCount: parsedResponse.characterCount || (parsedResponse.content || responseText.trim()).length,
        model: "gpt-3.5-turbo",
        generatedAt: new Date().toISOString(),
        requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
      }];
    }

    // 성공 응답
    return NextResponse.json({
      success: true,
      data: {
        marketingCopies: marketingCopies,
        generatedAt: new Date().toISOString(),
        requestId: `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        rateLimit: {
          remaining: rateLimit.remaining,
          resetTime: rateLimit.resetTime
        }
      },
      error: null
    });

  } catch (error) {
    console.error('API 에러:', error);
    
    // 에러 타입별 처리
    if (error instanceof OpenAI.APIError) {
      if (error.status === 401) {
        return NextResponse.json(
          { success: false, error: 'OpenAI API 키가 유효하지 않습니다.' },
          { status: 401 }
        );
      } else if (error.status === 429) {
        return NextResponse.json(
          { success: false, error: 'OpenAI API 요청 한도를 초과했습니다. 잠시 후 다시 시도해주세요.' },
          { status: 429 }
        );
      } else if (error.status >= 500) {
        return NextResponse.json(
          { success: false, error: 'OpenAI 서비스에 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.' },
          { status: 503 }
        );
      }
    }

    // 일반적인 에러
    return NextResponse.json(
      { 
        success: false, 
        error: '마케팅 문구 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' 
      },
      { status: 500 }
    );
  }
}
