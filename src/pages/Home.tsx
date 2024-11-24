import { HomeImage } from "../assets";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import Delivery from "./Delivery";

export default function Home() {
    const [deliveryId, setDeliveryId] = useState("");
    const [error, setError] = useState("");
    const intervalError = useRef<ReturnType<typeof setTimeout>>();
    const [deliveryInfo, setDeliveryInfo] = useState<any>([]);

    const getDeliverydeliveryInfo = async () => {
        try {
            setDeliveryInfo(null);
            setError("");
            const resp = await fetch(`${window.location.origin}:8501/status?id=${deliveryId}`);
            
            if(resp.status === 404) {
                setError("Número de rastreamento não encontrado.");
                setDeliveryInfo([]);
                return;
            }

            const json = await resp.json();
            console.log(json.length)
            setDeliveryInfo(json);
        } catch(error) {
            console.log(error);
        }
    }

    const searchDelivery = () => {
        getDeliverydeliveryInfo();
    }

    useEffect(() => {
        intervalError.current = setTimeout(() => {
            setError("");
        }, 5000);

        return () => {
            clearTimeout(intervalError.current);
        }
    }, [error]);

    return (
        <>
            <section className="px-24 pb-8 max-w-[1280px] mx-auto">
                <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
                    <div className="">
                        <h1 className="text-4xl mb-6" style={{ lineHeight: "48px" }}>Solução rápida e confiável de <span className="text-primary font-medium">armazenamento</span> e <span className="text-primary font-medium">logística</span>.</h1>
                        <p className="font-light text-zinc-800 mb-12">A FastLog oferece um atendimento inigualável ao cliente por meio de equipes dedicadas, pessoas engajadas trabalhando em uma cultura ágil e uma presença global.</p>
                        <div className="flex flex-col gap-2 relative">
                            <h1>Insira o número de rastreamento do seu pedido:</h1>
                            <div className="flex">
                                <input
                                    className="flex-grow px-4 py-2 border-zinc-400 border rounded-l-lg outline-none uppercase"
                                    style={{letterSpacing: "0.5em"}}
                                    type="number"
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => {setDeliveryId(e.currentTarget.value)}}
                                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {e.key === "Enter" && searchDelivery()}}
                                    value={deliveryId}
                                />
                                <button className="px-4 py-2 bg-terciary text-white font-light rounded-r-lg" onClick={searchDelivery}>Verificar entrega</button>
                            </div>
                            {
                                error &&
                                <p className="text-red-700 absolute -bottom-8 text-sm left-3">{error}</p>
                            }
                        </div>
                    </div>
                    <div className="w-full lg:w-3/4">
                        <img className="not-sr-only" src={HomeImage} />
                    </div>
                </div>
            </section>
            {
                deliveryInfo && deliveryInfo.tracking_number &&
                (
                    <Delivery
                        deliveryInfo={deliveryInfo}
                    />
                )
            }
            {
                !deliveryInfo &&
                (
                    <div className="w-fit mx-auto flex flex-col items-center gap-4">
                        <div className="w-20 aspect-square rounded-full animate-spin border-8 border-t-primary"></div>
                        <span className="animate-pulse">Consultando informações do pedido...</span>
                    </div>
                )
            }
        </>
    );
}