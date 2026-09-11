import styles from "./SectionTitle.module.css";

interface Props {
    subtitle: string;
    title: string;
    center?: boolean;
}

export default function SectionTitle({
    subtitle,
    title,
    center = false,
}: Props) {
    return (
        <div
            className={`${styles.sectionTitle} ${
                center ? styles.center : ""
            }`}
        >
            <p className={styles.subtitle}>
                {subtitle}
            </p>

            <h2 className={styles.title}>
                {title}
            </h2>
        </div>
    );
}