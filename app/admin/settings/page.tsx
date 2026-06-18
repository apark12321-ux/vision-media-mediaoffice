import { AdminModulePage } from '@/components/admin/admin-module-page';

export default function SettingsPage() {
  return (
    <AdminModulePage
      eyebrow="Site Registry"
      title="사이트 설정·등록정보"
      description="생활경제저널의 제호, 운영사, 사업자등록번호, 통신판매업신고번호, 인터넷신문 등록번호, 발행인·편집인·책임자 정보를 관리합니다."
      items={[
        { title: '제호·운영사', description: '제호는 생활경제저널, 운영사는 알고파트너스로 분리해 표시합니다.', status: '기본' },
        { title: '사업자 정보', description: '사업자등록번호, 통신판매업신고번호, 주소, 대표자 정보를 푸터와 정책 페이지에 반영합니다.', status: '공식' },
        { title: '인터넷신문 등록', description: '등록 전에는 등록번호를 숨기고, 등록 후 번호와 등록일을 노출합니다.', status: '승인' },
        { title: '책임자 정보', description: '발행인, 편집인, 청소년보호책임자, 개인정보보호책임자를 관리합니다.', status: '책임' },
        { title: '연락처', description: '대표 이메일과 전화번호를 기사제보, 광고문의, 반론·정정보도 요청 창구에 연결합니다.', status: '문의' },
        { title: '푸터 고지', description: '불필요한 사업 분야 설명은 줄이고 언론사형 하단 고지로 간결하게 표시합니다.', status: '푸터' }
      ]}
      primaryHref="/"
      primaryLabel="공개 사이트 보기"
    />
  );
}
