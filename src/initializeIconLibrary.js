import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faBuilding,
  faCheckCircle,
  faMapMarkerAlt,
  faExclamation,
  faProjectDiagram,
  faExternalLinkAlt,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
const initializeIconLibrary = () => {
  library.add(
    faCheckCircle,
    faExclamation,
    faMapMarkerAlt,
    faBuilding,
    faProjectDiagram,
    faExternalLinkAlt,
    faAngleDoubleLeft,
    faAngleDoubleRight,
    faAngleLeft,
    faAngleRight
  );
};

export default initializeIconLibrary;
