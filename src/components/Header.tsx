import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            {/* 왼쪽: 로고 */}
            <NavLink to="/" className={styles.logoZone}>
                <span className={styles.logoText}>한국의 전통색 아카이브</span>
                <span className={styles.subText}>Traditional Korean Colors</span>
            </NavLink>

            {/* 오른쪽: 네비게이션 */}
            <nav className={styles.navMenu}>

                <NavLink
                    to="/archive"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.navLink} ${styles.active}`
                            : styles.navLink
                    }
                >
                    전체 색상
                </NavLink>
                <NavLink
                    to="/search"
                    className={({ isActive }) =>
                        isActive
                            ? `${styles.navLink} ${styles.active}`
                            : styles.navLink
                    }
                >
                    전통색 검색
                </NavLink>



                <a
                    href="https://drive.google.com/file/d/1vPbNr1U8TQBKe2LuMl6OsAD8EXdkdGFx/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                >
                    가이드
                </a>
                <a
                    href="https://kr.pinterest.com/songye_pattern/personal-archive-2018-%ED%95%9C%EA%B5%AD%EC%9D%98-%EC%A0%84%ED%86%B5%EC%83%89-%EA%B8%B0%EB%A1%9D/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                >
                    컬러칩
                </a>
                <a
                    href="https://docs.google.com/spreadsheets/d/18hadh3p_th-FTRwrJMJOCArV0XOiDvidN-HfE9W2rHw/edit?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.navLink}
                >
                    스프레드시트
                </a>
            </nav>
        </header>
    );
}