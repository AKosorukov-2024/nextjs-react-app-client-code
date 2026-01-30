import Link from "next/link";
import "./globals.css";
import styles from "./page.module.css";

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <header>
                    <table className={styles.table}>
                        <tbody>
                            <tr>
                                <td colSpan={3} className={styles.apptitle}>
                                    React & Next.JS
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={3} className={styles.apptitle}>
                                <nav>
                                        <Link className="nav-link" href="/superstore/products">
                                        Products
                                        </Link>
                                </nav>
                                </td>
                            </tr>
                            <tr>
                                <td className={styles.buttonContainerFlex}>
                                    <Link href="/superstore/computers" className={styles.button}>
                                        <button className={styles.button}>Computers</button>
                                        </Link>
                                    <Link href="/superstore/cars" className={styles.button}>
                                        <button className={styles.button}>Cars</button>
                                        </Link>
                                    <Link href="/superstore/cafeteria" className={styles.button}>
                                        <button className={styles.button}>Cafeteria</button>
                                        </Link>
                                </td >
                            </tr >
                        </tbody>
                    </table >
                </header>

                <main>{children}</main>
            </body>
        </html>
    );
}
