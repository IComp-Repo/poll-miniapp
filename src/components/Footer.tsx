import styles from '@/styles/useGlobal.module.css';

function FooterPage() {
    var date = new Date();
    var year = date.getFullYear();
    return (
        <footer className={styles.footer}>
            <p>© {year} Knowledge Check Bot. Todos os direitos reservados.</p>
        </footer>
    );
}

export default FooterPage;