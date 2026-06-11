import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css'; // 레이아웃 전용 CSS Module
import Header from './Header';

export default function Layout() {
  return (
    <div className={styles.wrapper}>
      {/* 상단 네비게이션 헤더 바 고정 */}
      <Header />

      {/* 헤더 아래 영역에 라우팅된 페이지(Main 또는 Archive)가 렌더링됨 */}
      <div className={styles.contentArea}>
        <Outlet />
      </div>
    </div>
  );
}