type StatusItemProps = {
    statusTitle: string;
    date: string;
    statusCompleted: boolean;
    icon: any;
}

export default function StatusItem(props : StatusItemProps) {
    return (
        <div className="flex flex-col items-center w-12">
            <div className={`w-full aspect-square rounded-full duration-300 fill-white p-2 ${props.statusCompleted ? "bg-green-700" : "bg-gray-400"}`}>
                <img src={props.icon} />
            </div>
            <span className="font-medium text-nowrap text-center mb-1">{props.statusTitle}</span>
            <span className="font-light text-center text-sm">{props.date}</span>
        </div>
    );
}