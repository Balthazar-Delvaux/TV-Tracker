
const AlertTemplate = ({ message, options, style, close }) => {
    return (
        <div style={{ ...style }} className="text-white px-6 py-4 border-0 rounded relative bg-green-400">
            <span className="inline-block mr-8">
                {message}
            </span>
            <button onClick={close} className="bg-transparent text-2xl font-semibold leading-none outline-none focus:outline-none">
                <span>×</span>
            </button>
        </div>
    );
};

export default AlertTemplate;
