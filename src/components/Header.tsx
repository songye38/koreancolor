import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css'; // 헤더 전용 CSS Module

export default function Header() {
  return (
    <header className={styles.header}>
      {/* 왼쪽: 브랜드 로고 및 타이틀 */}
      <div className={styles.logoZone}>
        <span className={styles.logoText}>한국의 전통색 아카이브</span>
        <span className={styles.subText}>Traditional Korean Colors</span>
      </div>

      {/* 오른쪽: 네비게이션 탭 메뉴 */}
      <nav className={styles.navMenu}>
        <NavLink 
          to="/" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          조각보 메인
        </NavLink>
        <NavLink 
          to="/archive" 
          className={({ isActive }) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}
        >
          색상 아카이브
        </NavLink>
      </nav>
    </header>
  );
}