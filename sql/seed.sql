insert into site_settings (site_name, site_description, operator_name, business_name, representative_name, media_registration_status, contact_email, contact_phone)
values ('생활경제저널', '생활경제, 지역상권, 교육, 시니어, 건강, 창업 현장의 브랜드와 사람을 기록하는 생활경제 전문 미디어입니다.', 'Vision Media', '비전미디어', '박예준', 'unregistered', 'contact@example.com', '000-0000-0000')
on conflict do nothing;

insert into categories (name, slug, description, sort_order) values
('생활경제', 'life-economy', '생활경제 현장과 소비 트렌드', 1),
('지역상권', 'local-business', '지역 상권과 생활서비스', 2),
('교육·학원', 'education', '교육기관과 학원 운영 현장', 3),
('시니어·요양', 'senior-care', '요양, 돌봄, 시니어 서비스', 4),
('건강·뷰티', 'health-beauty', '건강, 뷰티, 웰니스 서비스', 5),
('창업·프랜차이즈', 'startup-franchise', '창업과 프랜차이즈 정보', 6),
('브랜드 인터뷰', 'brand-interview', '브랜드와 대표자의 이야기', 7)
on conflict (slug) do nothing;

insert into products (name, slug, price, description, features, sort_order) values
('브랜드 인터뷰', 'brand-interview', 490000, '대표자 인터뷰 기사와 홍보용 링크를 제공하는 기본 상품입니다.', array['대표자 인터뷰 기사','업체 사진 반영','사이트 내 발행','홍보용 링크 제공'], 1),
('우수 브랜드 기획전', 'featured-brand-series', 890000, '브랜드 인터뷰와 기획전 노출, 블로그 재가공 원고를 포함합니다.', array['브랜드 인터뷰','기획전 섹션 노출','디지털 인증 이미지 문구','블로그 재가공 원고'], 2),
('프리미엄 광고 패키지', 'premium-ad-package', 1490000, '인터뷰, 배너, 카드뉴스 문구, 플레이스 소개문까지 포함한 패키지입니다.', array['인터뷰 기사','배너 광고 1개월','카드뉴스 문구','네이버 플레이스 소개문','상패/인증서 문구'], 3),
('월 광고주 패키지', 'monthly-advertiser', 390000, '월간 콘텐츠와 소식 문구를 제공하는 관리형 상품입니다.', array['월 1~2회 콘텐츠','배너 노출','이벤트/소식 문구','블로그/SNS 재가공 콘텐츠'], 4)
on conflict (slug) do nothing;

insert into articles (title, slug, summary, content, category_id, article_type, status, author_name, published_at, tags)
select '요양센터 선택 전 보호자가 확인해야 할 7가지 기준', 'senior-care-checklist', '요양센터 선택 전 보호자가 확인하면 좋은 기준을 정리했습니다.', '요양센터를 선택할 때는 시설 환경, 상담 응대, 프로그램 구성, 보호자 소통 방식, 안전 관리 체계 등을 종합적으로 확인해야 합니다.\n\n무엇보다 중요한 것은 가족이 안심할 수 있는 설명과 투명한 운영 방식입니다.', id, 'normal', 'published', '편집부', now(), array['요양센터','시니어','보호자'] from categories where slug='senior-care'
on conflict (slug) do nothing;

insert into articles (title, slug, summary, content, category_id, article_type, status, author_name, published_at, tags)
select '학원 선택에서 학부모가 가장 먼저 보는 것은 무엇인가', 'education-choice-criteria', '학부모가 학원 선택 전 확인하는 신뢰 요소를 정리했습니다.', '학부모는 학원 선택 전 강사진, 커리큘럼, 상담 방식, 후기, 운영 철학을 확인합니다.\n\n좋은 교육기관일수록 교육 철학과 학습 관리 방식이 분명하게 정리되어 있습니다.', id, 'normal', 'published', '편집부', now(), array['학원','교육','학부모'] from categories where slug='education'
on conflict (slug) do nothing;

insert into articles (title, slug, summary, content, category_id, article_type, status, author_name, published_at, tags)
select '브랜드 인터뷰: 지역에서 신뢰를 쌓아온 교육기관의 운영 철학', 'brand-interview-education-sample', '지역 교육기관의 운영 철학과 고객 신뢰 포인트를 담은 브랜드 인터뷰 샘플입니다.', '본 콘텐츠는 브랜드 인터뷰 샘플입니다.\n\n지역에서 오래 운영되는 교육기관은 단순한 강의 제공을 넘어 학부모와 학생의 신뢰를 관리합니다. 대표자의 교육 철학, 상담 방식, 학습 관리 체계는 고객이 기관을 선택하는 중요한 기준이 됩니다.', id, 'brand_interview', 'published', '편집부', now(), array['브랜드인터뷰','교육기관','제휴콘텐츠'] from categories where slug='brand-interview'
on conflict (slug) do nothing;

insert into templates (title, type, content, variables) values
('브랜드 인터뷰 첫 안내문', 'email', '{{업체명}} 대표님, 안녕하세요. 생활경제저널 브랜드 인터뷰 담당자입니다. 대표님의 운영 철학과 서비스 강점을 인터뷰 콘텐츠로 소개하는 제휴 콘텐츠 상품을 안내드립니다.', array['업체명']),
('자료 요청문', 'email', '브랜드 인터뷰 제작을 위해 업체 소개, 대표자 사진, 서비스 사진, 주요 강점, 고객층 정보를 보내주세요.', array['업체명','대표자명']),
('납품 안내문', 'delivery', '기사 발행이 완료되었습니다. 기사 링크: {{기사링크}}', array['기사링크'])
on conflict do nothing;
