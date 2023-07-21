import Image from "next/image";
import styles from "./page.module.css";
import { DataTable } from "@/components/DataTable";
export type Data = {
  timeStamp: string;
  purchaseId: string;
  mail: string;
  name: string;
  source: string;
  status: string;
  select: string;
};
export default async function Page() {
  const data: Data[] = await getData();
  console.log(Object.keys(data[0]));
  return (
    <main className={styles.main}>
      <DataTable
        rows={data}
        caption="Boookings"
        headers={Object.keys(data[0])}
      />
    </main>
  );
}
async function getData() {
  const response = await fetch("https://trypapi.aryagidwani.repl.co");
  if (!response.ok) {
    throw new Error("enable to fetch data");
  }

  return response.json();
}
