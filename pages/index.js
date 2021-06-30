import { motion } from "framer-motion";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import nookies from "nookies";
import { parseCookies } from "nookies";
import { useEffect, useState } from "react";
import AddItem from "../comps/AddItem/AddItem";
import ItemList from "../comps/ItemList/ItemList";
import Total from "../comps/Total/Total";
import Circular from "../comps/Total/progress/Circular";
import styles from "../styles/Home.module.css";
import axios from "axios";
import Filters from "../comps/Filters/Filters";

export async function getServerSideProps(ctx) {
  const cookies = nookies.get(ctx);
  const response = await fetch("http://localhost:1337/transactions", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${cookies.jwt}`,
    },
  });
  const transactions = await response.json();
  return {
    props: {
      cookies: cookies,
      transactions: transactions,
    },
  };
}

export default function Home({ cookies, transactions }) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      setUser(JSON.parse(cookies.user));
    } catch (error) {
      console.log(error);
      router.push("/auth/login");
    }
  }, []);

  //  const user = JSON.parse(cookies.user);
  // const user = JSON.parse(cookies.user);
  // console.log(user);

  /* const [tab, setTab] = useState(0);
  const [tabPos, setTabPos] = useState(0);
  const updateTab = (tabNum, tabPosNum) => {
    setTab(tabNum);
    setTabPos(tabPosNum);
  };*/

  return (
    <motion.section
      initial={{ x: "-100%" }}
      animate={{ x: "0" }}
      exit={{ x: "-100%" }}
      transition={{ type: "tween" }}
      className={styles.container}
    >
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Circular />
      <main className={styles.main}>
        <Filters /* tab={tab} updateTab={updateTab} */ />
        <ItemList cookies={cookies} transactions={transactions} />
      </main>
    </motion.section>
  );
}
