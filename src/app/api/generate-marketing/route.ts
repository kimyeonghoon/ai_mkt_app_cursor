import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// OpenAI 클라이언트 초기화
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // 요청 본문 파싱
    const body = await request.json();
    
    // 기본 검증
    if (!body.valueProposition || body.valueProposition.length < 10) {
      return NextResponse.json(
        { error: '가치 제언은 최소 10자 이상 입력해주세요.' },
        { status: 400 }
      );
    }

    // 모델 선택 (비용 효율성을 위해 저렴한 모델 사용)
    const model = body.model || "gpt-3.5-turbo-instruct"; // 더 저렴한 모델

    // OpenAI API 호출
    let generatedText = '';
    
    if (model === "gpt-3.5-turbo-instruct") {
      // gpt-3.5-turbo-instruct는 completion API 사용
      const completion = await openai.completions.create({
        model: "gpt-3.5-turbo-instruct",
        prompt: `당신은 전문적인 마케팅 문구 작성자입니다. 
        
제품/서비스: ${body.valueProposition}
타겟: ${body.targeting?.gender || '전체'} / ${body.targeting?.ageGroups?.join(', ') || '전체 연령'}
플랫폼: ${body.platform || '일반'}

위 정보를 바탕으로 타겟과 플랫폼에 맞는 매력적인 마케팅 문구를 한국어로 생성해주세요.

요구사항:
- 자연스럽고 매력적인 문구
- 타겟 고객층에 맞는 톤앤매너
- 플랫폼 특성에 적합한 형식
- 한국어로 작성
- 100-200자 내외로 작성`,
        max_tokens: 300,
        temperature: 0.7,
      });
      
      generatedText = completion.choices[0]?.text?.trim() || '문구 생성에 실패했습니다.';
    } else {
      // gpt-3.5-turbo는 chat completions API 사용
      const chatCompletion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `당신은 전문적인 마케팅 문구 작성자입니다. 
            주어진 제품/서비스의 가치 제언을 바탕으로 
            타겟과 플랫폼에 맞는 매력적인 마케팅 문구를 생성해주세요.
            
            요구사항:
            - 자연스럽고 매력적인 문구
            - 타겟 고객층에 맞는 톤앤매너
            - 플랫폼 특성에 적합한 형식
            - 한국어로 작성
            - 100-200자 내외로 작성`
          },
          {
            role: "user",
            content: `제품/서비스: ${body.valueProposition}
            
            타겟: ${body.targeting?.gender || '전체'} / ${body.targeting?.ageGroups?.join(', ') || '전체 연령'}
            플랫폼: ${body.platform || '일반'}
            
            위 정보를 바탕으로 마케팅 문구를 생성해주세요.`
          }
        ],
        max_tokens: 300,
        temperature: 0.7,
      });
      
      generatedText = chatCompletion.choices[0]?.message?.content || '문구 생성에 실패했습니다.';
    }

    // 응답 데이터 구성
    const response = {
      success: true,
      data: {
        marketingCopies: [
          {
            id: 1,
            content: generatedText,
            platform: body.platform || 'general',
            hashtags: body.platform === 'instagram' ? ['#마케팅', '#광고', '#프로모션'] : [],
            characterCount: generatedText.length,
            model: model, // 사용된 모델 정보 추가
          }
        ],
        generatedAt: new Date().toISOString(),
        requestId: `req_${Date.now()}`,
        costInfo: {
          model: model,
          estimatedCost: model === "gpt-3.5-turbo-instruct" ? "약 $0.0002" : "약 $0.0004",
          note: "비용은 토큰 수에 따라 달라질 수 있습니다."
        }
      },
      error: null,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('API Error:', error);
    
    // OpenAI API 키 관련 에러 처리
    if (error instanceof Error && error.message.includes('401')) {
      return NextResponse.json(
        { error: 'OpenAI API 키가 유효하지 않습니다. API 키를 확인해주세요.' },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { error: '마케팅 문구 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.' },
      { status: 500 }
    );
  }
}
