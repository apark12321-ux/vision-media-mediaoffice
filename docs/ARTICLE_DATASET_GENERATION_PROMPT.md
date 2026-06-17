# 생활경제저널 기사 데이터셋 생성 지시서

이 문서는 생활경제저널의 기사 초안을 만들 때 쓰는 기준이다. 생성 결과물은 바로 공개하지 않고 관리자 검수 상태로 저장한다.

## 출력 형식

`seeds/articles.generated.json` 파일은 JSON Array로 만든다.

```json
[
  {
    "category": "senior-care",
    "title": "기사 제목",
    "subtitle": "부제",
    "summary": "핵심 요약",
    "content": "[리드]\n...\n\n[배경]\n...\n\n[현장 맥락]\n...\n\n[독자 영향]\n...\n\n[전망과 과제]\n...",
    "author_name": "편집부",
    "article_type": "normal",
    "status": "review",
    "editorial_status": "review",
    "scheduled_at": "2026-06-18T09:30:00+09:00",
    "source_urls": ["https://example.com/source"],
    "source_note": "참고 자료의 핵심 쟁점을 재구성함",
    "fact_checked": false,
    "thumbnail_url": null,
    "image_source_name": null,
    "image_license": null,
    "tags": ["시니어", "요양", "생활경제"]
  }
]
```

## 카테고리 slug

- `life-economy`: 생활경제
- `local-business`: 지역상권
- `education`: 교육·학원
- `senior-care`: 시니어·요양
- `health-beauty`: 건강·뷰티
- `startup-franchise`: 창업·프랜차이즈
- `brand-interview`: 브랜드 인터뷰
- `opinion`: 오피니언
- `press-release`: 보도자료

## 기사 구조

```text
[리드]
핵심 사실과 독자에게 의미 있는 쟁점을 먼저 쓴다.

[배경]
이 사안이 나온 배경을 정책, 시장, 소비자 변화 관점에서 설명한다.

[현장 맥락]
업계, 지역, 소상공인, 소비자에게 어떤 변화가 있는지 풀어쓴다.

[독자 영향]
독자가 확인해야 할 선택 기준, 비용, 절차, 유의점을 정리한다.

[전망과 과제]
앞으로의 흐름과 추가 확인이 필요한 지점을 정리한다.
```

## 생성 규칙

1. 각 기사 본문은 최소 1,000자 이상으로 작성한다.
2. 문체는 객관적 보도체를 사용한다.
3. 과장, 단정, 보장 표현을 사용하지 않는다.
4. 최신 이슈 기사에는 참고 출처 URL을 포함한다.
5. AI 초안은 `status = review`로 둔다.
6. 예약 발행은 `scheduled_at`에 기록한다.
7. 공개 전에는 사람이 출처와 사실관계를 확인한다.
8. 이미지가 필요한 경우 `thumbnail_url`, `image_source_name`, `image_license`를 함께 기록한다.
