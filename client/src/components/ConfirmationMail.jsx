
function ConfirmationMail() {
const email = "example@example.com";
const subject = "Demande d'informations";
const body = "Bonjour,\n\nJ'aimerais avoir plus d'informations sur votre produit.";

return (
    <a 
    href={mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}} 
    style={{ textDecoration: 'none' }}
    >
    <button style={buttonStyle}>Envoyer un Email</button>
    </a>
);
};

export default ConfirmationMail;