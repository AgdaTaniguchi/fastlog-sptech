import StatusItem from "../components/StatusPage/StatusItem";
import { useEffect, useRef } from "react";
import { ArchiveIcon, CheckIcon, TruckIcon } from "../assets";

type DeliveryProps = {
    deliveryInfo: any;
}

export default function Delivery({
    deliveryInfo,
} : DeliveryProps) {
    const statusBar = useRef<HTMLDivElement>(null);

    const setBarWidth = (stage: 1 | 2 | 3) => {
        if(!statusBar.current) return;
        let percentage = 25;
        switch(stage) {
            case 2:
                percentage = 75;
                break;
            case 3:
                percentage = 100;
                break;
        }
        statusBar.current.style.width = `${percentage}%`;
    }

    const formatDate = (date: Date) => {
        const formattedDate = date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });

        const formattedTime = date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
        });

        return `${formattedDate} às ${formattedTime} `
    } 

    const getStatusInfo = (stage: "approved" | "shipped" | "delivered", label: "completed" | "date") => {
        const stateInfo = deliveryInfo.status?.filter((status: any) => status.delivery_status === stage)[0];

        if(label === "date") {
            return stateInfo?.updated_date || "";
        }
        else {
            return stateInfo;
        }
    }

    useEffect(() => {
        setBarWidth(deliveryInfo.status.length);
    }, [deliveryInfo.status]);

    return (
        <section className="max-w-[1280px] mx-auto px-24 py-8 space-y-8">
            <div className="space-y-2">
                <h1 className="text-xl font-bold">Pedido Nº{deliveryInfo.tracking_number}</h1>
                <p>Previsão de chegada: {formatDate(new Date(deliveryInfo.estimated_date))}</p>
            </div>
            <div className="flex justify-between relative w-3/4 mx-auto">
                <StatusItem
                    statusTitle="Pedido aprovado"
                    date={getStatusInfo("approved", "date") ? formatDate(new Date(getStatusInfo("approved", "date"))) : ""}
                    statusCompleted={getStatusInfo("approved", "completed")}
                    icon={CheckIcon}
                    />
                <StatusItem
                    statusTitle="Em trânsito"
                    date={getStatusInfo("shipped", "date") ? formatDate(new Date(getStatusInfo("shipped", "date"))) : ""}
                    statusCompleted={getStatusInfo("shipped", "completed")}
                    icon={TruckIcon}
                    />
                <StatusItem
                    statusTitle="Entregue"
                    date={getStatusInfo("delivered", "date") ? formatDate(new Date(getStatusInfo("delivered", "date"))) : ""}
                    statusCompleted={getStatusInfo("delivered", "completed")}
                    icon={ArchiveIcon}
                />
                <div className="h-1 w-[calc(100%-48px)] bg-zinc-300 absolute -translate-x-1/2 top-6 -z-10 left-1/2">
                    <div ref={statusBar} className="bg-green-700 w-0 transition-all h-full duration-300"></div>
                </div>
            </div>
        </section>
    );
}