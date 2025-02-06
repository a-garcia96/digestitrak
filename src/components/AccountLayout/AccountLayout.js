import Image from "next/image";
import Link from "next/link";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import { useState } from "react";
import { useStore } from "@/store";
import { createClient } from "@/utils/supabase/component";

export default function AccountLayout() {
  const supabase = createClient();

  const [updatingName, setUpdatingName] = useState(false);
  const [updatingProfilePic, setUpdatingProfilePic] = useState(false);
  const [uploadingProfilePic, setUploadingProfilePic] = useState(false);

  const user = useStore((state) => state.user);
  const userData = useStore((state) => state.userData);
  const updateUserData = useStore((state) => state.updateUserData);

  const [updatedName, setUpdatedName] = useState(userData.name);
  const [profileImage, setProfileImage] = useState(null);
  const [imageIsTooLarge, setImageIsTooLarge] = useState(false);

  const handleNameUpdate = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from("user_data")
      .update({ name: updatedName })
      .eq("id", user.id)
      .select();

    if (!error) {
      updateUserData(data[0]);
      setUpdatingName(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    e.preventDefault();
    const maxSize = 2 * 1024 * 1024; // 2MB limit
    if (profileImage.size <= maxSize) {
      setImageIsTooLarge(false);
      setUploadingProfilePic(true);

      const { data: uploadResponse, error } = await supabase.storage
        .from("avatars")
        .upload(`${profileImage.name}`, profileImage);

      if (!error) {
        const { data: urlResponseData } = await supabase.storage
          .from("avatars")
          .getPublicUrl(uploadResponse.path);

        const { data, error } = await supabase
          .from("user_data")
          .update({ avatar: urlResponseData.publicUrl })
          .eq("id", user.id)
          .select();

        if (!error) {
          updateUserData({ ...userData, avatar: urlResponseData.publicUrl });

          setUploadingProfilePic(false);
          setUpdatingProfilePic(false);
        } else {
          console.log(error);
        }
      } else {
        console.log(error);
      }
    } else {
      setImageIsTooLarge(true);
    }
  };

  return (
    <>
      <div className="px-4 sm:px-0">
        <h3 className="text-base/7 font-semibold text-gray-900">My Profile</h3>
        <p className="mt-1 max-w-2xl text-sm/6 text-gray-500">
          Review and update your personal details.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Profile Image
            </dt>
            <dd className="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="grow">
                {updatingProfilePic ? (
                  <form onSubmit={handlePhotoUpload}>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={(e) => setProfileImage(e.target.files[0])}
                    />
                    {uploadingProfilePic ? (
                      <div className="inline-block">
                        <LoadingSpinner />
                      </div>
                    ) : (
                      <button className="font-medium text-evening-sea-950 hover:text-green-500">
                        Submit
                      </button>
                    )}
                    <p className="bg-blue-50 text-blue-600 font-medium mt-3 rounded px-1">
                      Please upload a file in jpeg or png format no larger than
                      2MB.
                    </p>
                    {imageIsTooLarge && (
                      <p className="bg-red-50 text-red-600 font-medium mt-3 rounded px-1">
                        Image is over 2MB. Please choose another image.
                      </p>
                    )}
                  </form>
                ) : (
                  <Image src={userData.avatar} width={48} height={48} />
                )}
              </span>
              <span className="ml-4 shrink-0">
                {updatingProfilePic ? (
                  <button
                    onClick={() => setUpdatingProfilePic(false)}
                    className="rounded-md bg-white font-medium text-evening-sea-900 hover:text-evening-sea-500"
                  >
                    Cancel
                  </button>
                ) : (
                  <button
                    type="button"
                    className="rounded-md bg-white font-medium text-evening-sea-900 hover:text-evening-sea-500"
                    onClick={() => setUpdatingProfilePic(true)}
                  >
                    Update
                  </button>
                )}
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
            <dd className="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              {updatingName ? (
                <span className="grow inline-block">
                  <form className="space-x-2" onSubmit={handleNameUpdate}>
                    <input
                      type="text"
                      className="border-none outline outline-1 rounded p-0 w-1/2 px-2"
                      value={updatedName}
                      autoFocus
                      onChange={(e) => setUpdatedName(e.target.value)}
                    />
                    <button className="font-medium hover:text-green-500">
                      Save
                    </button>
                    <button
                      onClick={() => setUpdatingName(false)}
                      className="font-medium hover:text-yellow-500"
                    >
                      Cancel
                    </button>
                  </form>
                </span>
              ) : (
                <span className="grow">
                  {userData.name ? userData.name : ""}
                </span>
              )}
              <span className="ml-4 shrink-0">
                {!updatingName && (
                  <button
                    type="button"
                    className="rounded-md bg-white font-medium text-evening-sea-900 hover:text-evening-sea-500"
                    onClick={() => setUpdatingName(true)}
                  >
                    {userData.name ? "Update" : "Add"}
                  </button>
                )}
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="grow">{user.email}</span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm/6 font-medium text-gray-900">Password</dt>
            <dd className="mt-1 flex text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="grow">******************</span>
              <span className="ml-4 shrink-0">
                <Link
                  href="/my-profile/change-password"
                  className="rounded-md bg-white font-medium text-evening-sea-900 hover:text-evening-sea-500"
                >
                  Change
                </Link>
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
