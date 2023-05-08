import {supabase} from "../infrastructure/api";

let familyMembers = null;
export const getFamilyMembers = async () => {
    if (familyMembers) {
        return familyMembers;
    }

    const {data} = await supabase
        .from('family_member')
        .select('*');

    familyMembers = data;

    return familyMembers;
}