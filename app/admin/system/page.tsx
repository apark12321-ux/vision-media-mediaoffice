import { AdminModulePage } from '@/components/admin/admin-module-page';

const items = [
  { title: '기사 작성 CMS', description: '제목, 부제, 요약, 본문, 대표 이미지, 본문 중간 이미지, 캡션, 태그, 제휴 고지를 관리합니다.', status: '핵심' },
  { title: '예약 발행·엠바고', description: '기사 상태를 draft, review, scheduled, published 흐름으로 관리하고 공개 전 검수 절차를 둡니다.', status: '편집' },
  { title: '카테고리·메뉴 편성', description: '생활경제, 지역상권, 교육·학원, 시니어·요양, 건강·뷰티, 창업·프랜차이즈 등 섹션을 관리합니다.', status: '편성' },
  { title: '미디어·이미지 관리', description: '대표 이미지와 본문 삽입 이미지의 출처, 라이선스, 캡션, 권리 확인 여부를 저장합니다.', status: '이미지' },
  { title: '제보·보도자료 접수', description: '독자 제보, 기관 보도자료, 광고 문의를 구분해 검수하고 기사화 여부를 판단합니다.', status: '접수' },
  { title: '기자·운영자 계정', description: '발행인, 편집인, 기자, 운영자의 역할과 접근 권한을 분리합니다.', status: '권한' },
  { title: '광고·제휴 CRM', description: '브랜드 인터뷰, 제휴 콘텐츠, 배너, 월관리 상품의 상담부터 납품까지 추적합니다.', status: '영업' },
  { title: '컴플라이언스 체크', description: '기사형 광고 고지, 금지 표현, 저작권·초상권, 개인정보, 과장 광고 표현을 검수합니다.', status: '법무' },
  { title: '애드센스 준비', description: '승인 전 광고 미노출, 승인 후 슬롯 활성화, ads.txt, 정책 페이지, 콘텐츠 품질을 관리합니다.', status: '수익화' },
  { title: '뉴스레터·메일링', description: '독자와 광고주에게 발행 소식, 제휴 안내, 납품 안내를 발송할 수 있도록 준비합니다.', status: '확장' },
  { title: '통계·리포트', description: '조회수, 카테고리별 발행량, 문의 전환, 광고주 진행 상태를 운영 지표로 확인합니다.', status: '분석' },
  { title: '사이트 등록정보', description: '제호, 운영사, 사업자등록번호, 통신판매업신고번호, 인터넷신문 등록번호, 책임자를 관리합니다.', status: '설정' }
];

export default function AdminSystemPage() {
  return (
    <AdminModulePage
      eyebrow="MediaOffice System"
      title="인터넷매체 운영 시스템"
      description="생활경제저널은 공개 사이트와 관리자 시스템을 분리해 운영합니다. 이 화면은 인터넷신문 운영에 필요한 기능 모듈을 한눈에 확인하는 관리용 기능 보드입니다."
      items={items}
      primaryHref="/admin/articles/new"
      primaryLabel="기사 작성하기"
    />
  );
}
