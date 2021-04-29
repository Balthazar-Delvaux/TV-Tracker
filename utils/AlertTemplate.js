
const AlertTemplate = ({ message, options, style, close }) => {
    const alertStyle = {
        fontFamily: ['ui-sans-serif', 'system-ui'],
        color: 'white',
        paddingRight: '1.5rem',
        paddingLeft: '1.5rem',
        paddingBottom: '1rem',
        paddingTop: '1rem',
        borderWidth: '0px',
        borderRadius: '0.25rem',
        position: 'relative',
        backgroundColor: 'rgba(52, 211, 153)'
    };

    const buttonStyle = {
        backgroundColor: 'transparent',
        fontSize: '1.5rem',
        fontWeight: 600,
        outline: '2px solid transparent',
        outlineOffset: '2px',
        verticalAlign: 'middle',
        marginLeft: '1.5rem'
    };

    return (
        <div style={{ ...style, ...alertStyle } }>
            <span style={{ verticalAlign: 'middle' }}>
                {message}
            </span>
            <button style={{ ...buttonStyle }} onClick={close}>
                <span>×</span>
            </button>
        </div>
    );
};

export default AlertTemplate;
