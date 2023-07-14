'use client';

import {useState} from "react";
import Button from "@/app/components/Button";
import {Dialog} from "@headlessui/react";


const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'EUR',

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
});


type ButtonElement = {
    name: string;
    price: number;
    [key: string]: any;
};


function playSound() {
    const audio = new Audio('/openBeer.mp3');
    audio.play();
}

const Calculator = ({articles} : {articles: [{name: string, price: number}]}) => {
    // @ts-ignore
    const buttonElements: ButtonElement[] = articles
    const defaultOrder = buttonElements.reduce((acc, buttonElement) => {
        return {...acc, [buttonElement.name]: 0}
    }, {})
    const [currentOrder, setCurrentOrder] = useState(defaultOrder as { [key: string]: number });
    const [sum, setSum] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    function settle() {
        setIsOpen(true);
    }

    return (<>
            <div className="h-full">
                <div className="flex flex-col h-full">
                    {buttonElements.map((buttonElement: { name: string, price: number }, index) => {
                        const currentAmount = currentOrder[buttonElement.name] ? currentOrder[buttonElement.name] : 0
                        return (<div
                                key={buttonElement.name}
                                className="flex flex-row h-full">
                                <Button className={`${BUTTON_COLORS[index % (BUTTON_COLORS.length)]} opacity-80 min-w-[25%]`}
                                        disabled={currentAmount === 0}
                                        onClick={() => {
                                            setSum(sum - buttonElement.price)
                                            setCurrentOrder({
                                                ...currentOrder,
                                                // @ts-ignore
                                                [buttonElement.name]: currentOrder[buttonElement.name] ? currentOrder[buttonElement.name] - 1 : 1
                                            })
                                        }}
                                    // @ts-ignore
                                >-</Button>

                                <Button className={`${BUTTON_COLORS[index % (BUTTON_COLORS.length)]} grow`}
                                        onClick={() => {
                                            setSum(sum + buttonElement.price)
                                            setCurrentOrder({
                                                ...currentOrder,
                                                // @ts-ignore
                                                [buttonElement.name]: currentOrder[buttonElement.name] ? currentOrder[buttonElement.name] + 1 : 1
                                            })
                                        }}
                                    // @ts-ignore
                                >{buttonElement.name} ({currentOrder[buttonElement.name]})</Button>
                            </div>
                        )
                    })}
                    <Button className="h-full bg-white text-black" onClick={() => {
                        playSound();
                        settle()
                        setIsOpen(true);
                    }}>Abrechnen ({formatter.format(sum)})</Button>
                </div>
                <Dialog open={isOpen}
                        onClose={() => {
                            setIsOpen(false);
                            setSum(0);
                            setCurrentOrder(defaultOrder);
                        }
                        }
                        className="relative z-50">
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="bg-white px-16 py-12">
                            <Dialog.Title>
                                <div className="text-8xl text-black">
                                    {formatter.format(sum)}
                                </div>
                            </Dialog.Title>
                        </Dialog.Panel>
                    </div>
                </Dialog>
            </div>
        </>
    )
}


export default Calculator;


const BUTTON_COLORS = [
    "bg-[#931576] text-white",
    "bg-[#0f519e] text-white"
]
