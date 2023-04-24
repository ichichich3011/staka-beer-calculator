'use client';

import {useState} from "react";
import Button from "@/app/components/Button";
import {Dialog} from "@headlessui/react";


function format(sum: number) {
    return `${sum},00€`;
}

const Calculator = () => {
    const buttonElements = [{
        name: 'Bier',
        price: process.env.NEXT_PUBLIC_BEER_PRICE ? parseInt(process.env.NEXT_PUBLIC_BEER_PRICE) : 3,
    }, {
        name: 'Pfand',
        price: process.env.NEXT_PUBLIC_DEPOSIT_PRICE ? parseInt(process.env.NEXT_PUBLIC_DEPOSIT_PRICE) : 1,
    }]
    const [currentOrder, setCurrentOrder] = useState({})
    const [sum, setSum] = useState(0)
    const [isOpen, setIsOpen] = useState(true)

    function settle() {
        setIsOpen(true);
    }

    return (
        <div className="h-full">
            <div className="flex flex-col h-full">
                {buttonElements.map((buttonElement, index) => (
                    <Button key={buttonElement.name} className={BUTTON_COLORS[index]}
                            onClick={() => {
                                setSum(sum + buttonElement.price)
                                setCurrentOrder({
                                    ...currentOrder,
                                    [buttonElement.name]: currentOrder[buttonElement.name] ? currentOrder[buttonElement.name] + 1 : 1
                                })
                            }}
                    >{buttonElement.name} {currentOrder[buttonElement.name] && `(${currentOrder[buttonElement.name]})`}</Button>
                ))}
                <Button onClick={() => {
                    settle()
                    setIsOpen(true);
                }}>Abrechnen ({format(sum)})</Button>
            </div>
            <Dialog open={isOpen}
                    onClose={() => {
                        setIsOpen(false);
                        setSum(0);
                        setCurrentOrder({});
                    }
                    }
                    className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="bg-white px-16 py-12">
                        <Dialog.Title>
                            <div className="text-8xl">
                                {format(sum)}
                            </div>
                        </Dialog.Title>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    )
}


export default Calculator;


const BUTTON_COLORS = [
    "bg-[#931576] text-white",
    "bg-[#0f519e] text-white"
]
