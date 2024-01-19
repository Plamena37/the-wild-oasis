import supabase from "./supabase";

export const getSettings = async () => {
  const { data, error } = await supabase.from("settings").select("*").single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }
  return data;
};

// object that looks like {setting: newValue}
export const updateSetting = async (newSetting) => {
  const { data, error } = await supabase
    .from("settings")
    .update(newSetting)
    // there is only ONE row of settings, and it has the ID=1
    .eq("id", 1)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Settings could not be updated");
  }
  return data;
};
