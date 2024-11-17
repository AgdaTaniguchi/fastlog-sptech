type InputLabelFloat = {
    label: string;
    id: string;
}

export default function InputLabelFloat({label, id}: InputLabelFloat) {
    return (
        <div className="relative">
            <input type="text" id={id} className="px-4 py-4 outline-none border border-terciary peer placeholder:invisible rounded-lg" placeholder={label} />
            <label htmlFor={id} className="absolute bg-white text-black/80 px-2 text-sm -top-3 left-2 peer-placeholder-shown:text-black/70 peer-placeholder-shown:absolute peer-placeholder-shown:left-4 peer-placeholder-shown:top-5 peer-focus:text-sm peer-focus:-top-3 peer-focus:left-2 duration-150 peer-focus:bg-white peer-focus:text-black/100 cursor-text">{label}</label>
        </div>
    );
}