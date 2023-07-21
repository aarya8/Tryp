import { Data } from "@/app/page";
import styles from "./dataItem.module.css";

export const DataItem = ({ data }: { data: Data }) => {
  function timestampToTimeAgo(timestamp: string): string {
    const now: Date = new Date();
    const eventTime: Date = new Date(timestamp);
    const diffInMilliseconds: number = now.getTime() - eventTime.getTime();
    const diffInSeconds: number = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes: number = Math.floor(diffInSeconds / 60);
    const diffInHours: number = Math.floor(diffInMinutes / 60);
    const diffInDays: number = Math.floor(diffInHours / 24);
    const diffInMonths: number = Math.floor(diffInDays / 30);

    if (diffInMonths >= 1) {
      return `${diffInMonths} month${diffInMonths > 1 ? "s" : ""} ago`;
    } else if (diffInDays >= 1) {
      return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
    } else if (diffInHours >= 1) {
      return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
    } else if (diffInMinutes >= 1) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
    } else {
      return "just now";
    }
  }

  return (
    <>
      <p>{timestampToTimeAgo(data.timeStamp)}</p>
      <p>{data.purchaseId}</p>
      <p>{data.mail}</p>
      <p>{data.name}</p>
      <p>{data.source}</p>
      <p>
        <span className={styles[data.status]}>{data.status}</span>
      </p>
      <button className={styles.selectButton}>Select</button>
    </>
  );
};
