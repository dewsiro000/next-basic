import Head from "next/head"
import Image from "next/image"
import styles from "@/styles/Product.module.css"
import Link from "next/link"

//ดึงข้อมูลจาก Api 


//  => async รอ ข้อมูลมาครบก่อนจึงไปทำงานที่ตัว Component
export async function getStaticProps() {
    const res = await fetch("https://dummyjson.com/products?limit=12")  // ?limit=12 ต้องการสินค้า 12 รายการ
    const data = await res.json() // => ทำให้ข้อมูลที่ไป response มา เป็นรูปแบบของ json
    return {  // ชื่อ props ตั้งชื่อว่า porduct    
        props: { products: data.products }
    }
}

// นำ props ที่ไปดึงมาจาก Api ไปแสดงบน Component

export default function Index({ products }) {
    return (
        <>
            <Head>
                <title>สินค้าทั้งหมด | KongRuksiam</title>
                <meta name="keywords" content="kongruksiam,ร้านค้า,ขายเสื้อผ้า" />
            </Head>
            <div className={styles.container}>
                {products.map(item => (
                    <div key={item.id}>
                        <Link href={'/products/' + item.id}>
                            <h2 className={styles.title}>{item.title}</h2>
                            <Image src={item.thumbnail} width={300} height={300} alt={item.title} />
                        </Link>
                    </div>
                ))}
            </div>
        </>
    )
}