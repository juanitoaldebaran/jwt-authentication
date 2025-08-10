interface AlertProps {
    message: string;
    type: "success" | "error" | "info";
    onClose: () => void;
}


const Alert: React.FC<AlertProps> = ({message, type, onClose}) => {
    const baseClasses = "p-4 rounded-md mb-4 flex justify-between items-center";
    const typeClasses = {
        success: "bg-green-100 border border-green-400 text-green-700",
        error: "bg-red-100 border border-red-400 text-red-700",
        info: "bg-blue-100 border border-blue-400 text-blue-700",
    };

    return (
        <div className={`${baseClasses} ${typeClasses[type]}`}>
            <span>{message}</span>
            {onClose && (
                <button
                onClick={onClose}
                className="ml-4 text-lg font-semibold hover:opacity-75"
                >
                </button>
            )}
        </div>
    )
}

export default Alert;