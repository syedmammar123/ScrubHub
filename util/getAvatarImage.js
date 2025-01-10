import avatar1 from "@/assets/avatar1.png";
import avatar2 from "@/assets/avatar2.png";
import avatar3 from "@/assets/avatar3.png";
import avatar4 from "@/assets/avatar4.png";
import avatar5 from "@/assets/avatar5.png";
import avatar6 from "@/assets/avatar6.png";
import avatar7 from "@/assets/avatar7.png";
import avatar0 from "@/assets/avatar0.png";

export const getAvatarImage = (avatarId) => {
    switch (avatarId) {
      case 1:
        return avatar1;
      case 2:
        return avatar2;
      case 3:
        return avatar3;
      case 4:
        return avatar4;
      case 5:
        return avatar5;
      case 6:
        return avatar6;
      case 7:
        return avatar7;
      default:
        return avatar0; // Default avatar if no match is found
    }
  };