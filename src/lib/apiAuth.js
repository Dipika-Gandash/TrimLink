import { supabase } from "./supabase";

export const logIn = async ({ email, password }) => {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};


export const signUp = async ({
  name,
  email,
  password,
  file,
}) => {

  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
    });

  if (error) {
    throw new Error(error.message);
  }

  const user = data.user;

  let imageUrl = "";

  if (file) {

    const fileExt =
      file.name.split(".").pop();

    const fileName =
      `${user.id}-${Date.now()}.${fileExt}`;

    const {
      error: uploadError,
    } = await supabase.storage
      .from("avatars")
      .upload(
        fileName,
        file,
        {
          contentType: file.type,
          upsert: false,
        }
      );

    if (uploadError) {
      throw new Error(
        uploadError.message
      );
    }

    const {
      data: imageData,
    } = supabase.storage
      .from("avatars")
      .getPublicUrl(
        fileName
      );

    imageUrl =
      imageData.publicUrl;
  }

  const {
    error: userError,
  } = await supabase
    .from("users")
    .insert({
      id: user.id,
      name,
      email,
      profile_image: imageUrl,
    });

  if (userError) {
    throw new Error(
      userError.message
    );
  }

  return {
    user,
    imageUrl,
  };
};


export const logOut = async () => {

  const { error } =
    await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};