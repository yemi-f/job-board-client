import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faExclamation } from '@fortawesome/free-solid-svg-icons';

export const CheckCircle = () => <FontAwesomeIcon icon={faCheckCircle} />
export const Exclamation = ({ color, className }) => {
    return (
        <FontAwesomeIcon icon={faExclamation}
            color="white"
            size="2x"
            style={{
                backgroundColor: "#f0ad4e", width: "28px"
                , paddingTop: "4px", paddingBottom: "4px", borderRadius: 4
            }}
        />
    )
}