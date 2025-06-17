import {BaseModal} from "./BaseModal";
import "./ModalStyles.css";

export interface CharacterCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  role: string;
  image: string;
  qualifications: string;
    className?: string;
}

export default function CharacterCardModal({
  isOpen,
  onClose,
  name,
  role,
  image,
  qualifications,
                                               className
}: CharacterCardModalProps) {
  return (
      <BaseModal isOpen={isOpen} onClose={onClose} title={undefined} className={className}>
          <div className="character-modal-content">
              <img
                  src={image}
                  alt={name}
                  className="character-modal-image"
              />
              <h2 className="character-modal-name">{name}</h2>
              <h4 className="character-modal-role">{role}</h4>
              <p className="character-modal-qualifications">{qualifications}</p>
      </div>
      </BaseModal>
  );
}
