import { GroupType, TroopType } from "../apiConstants";

export type GroupTroop = {
  id: string;
  name: string;
  type: TroopType;
};

export type GroupOrSection = {
  id: string;
  name: string | null;
  types: GroupType[];
  /**
   * In case of a section, this is the ID of the group it belongs to.
   */
  belongsToGroup: string | null;
  troops: GroupTroop[];
};
