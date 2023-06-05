import React from "react";
import styles from "./Loader.module.css";

export const Loader = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.loading}>
				<span className={styles.loader}></span>
				<span className={styles.loader}></span>
				<span className={styles.loader}></span>
			</div>
		</div>
	);
};
