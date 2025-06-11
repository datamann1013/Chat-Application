
export interface CharacterCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  role: string;
  image: string;
  qualifications: string;
}

export default function CharacterCardModal({
  isOpen,
  onClose,
  name,
  role,
  image,
  qualifications,
}: CharacterCardModalProps) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay" style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", zIndex: 2000, background: "rgba(0,0,0,0.5)" }} onClick={onClose}>
      <div
        className="modal-content"
        style={{ background: "#fff", margin: "5% auto", padding: 24, borderRadius: 8, maxWidth: 400, position: "relative" }}
        onClick={e => e.stopPropagation()}
      >
        <button
          className="close-btn"
          style={{ position: "absolute", top: 8, right: 8, fontSize: 24, background: "none", border: "none", cursor: "pointer" }}
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
        <img src={image} alt={name} style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", marginBottom: 16 }} />
        <h2>{name}</h2>
        <h4>{role}</h4>
        <p style={{ marginTop: 16 }}>{qualifications}</p>
      </div>
    </div>
  );
}

