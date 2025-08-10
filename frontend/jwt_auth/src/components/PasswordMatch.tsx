interface PasswordMatchProps {
    message: string;
    type: "error" | "success";
}

const PasswordMatch: React.FC<PasswordMatchProps> = ({message, type}) => {
    const baseClasses = "p-2 rounded-md text-sm mt-4";
    const typeClasses = {
        success: "bg-green-100 border border-green-400 text-green-700",
        error: "bg-red-100 border border-red-400 text-red-700",
    };
    
    return ( 
        <p className={`${baseClasses} ${typeClasses[type]}`}>
            {message}
        </p>
    )
}

export default PasswordMatch;