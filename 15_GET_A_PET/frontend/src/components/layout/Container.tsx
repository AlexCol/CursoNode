import { ReactNode } from "react";
import styles from "./Container.module.css";

function Container({
  children,
}: Readonly<{ children: ReactNode; }>) {
  return (
    <main className={styles.container}>
      {children}
    </main>
  );
}

export default Container