import {Inter} from 'next/font/google'
import Calculator from "@/app/components/Calculator";

const inter = Inter({subsets: ['latin']})

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function Page({
                                 searchParams,
                             }: {
    searchParams: { [key: string]: string | string[] | undefined }
}) {

    let playSound = false;
    if (searchParams) {
        // @ts-ignore
        playSound = searchParams.playSound === 'true'
        // @ts-ignore
        delete searchParams.playSound;
    }
    //create an array of objects from search params
    const articles = Object.keys(searchParams).map((key) => {
        const price = searchParams[key]
        if (typeof price === 'string') {
            return {name: key, price: parseFloat(price)}
        }
    })

    // @ts-ignore
    return <Calculator articles={articles} playSound={playSound}/>

}
