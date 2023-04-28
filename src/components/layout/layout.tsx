import { setToken } from "@/app/slices/authSlice";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../footer/footer";
import Navbar from "../navbar/navbar";
import Aside from "../aside/aside";
import { useAppSelector } from "@/app/hooks";
import {
  useAddProfileImageMutation,
  useEditUserProfileMutation,
  useGetUserInfQuery,
} from "@/api/user/api";
import Popup from "../popup/popup";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";
import { AiOutlineMail, AiOutlineUser, AiOutlineEdit } from "react-icons/ai";
import { CiSaveDown1 } from "react-icons/ci";
import { CiMobile1 } from "react-icons/ci";
import { formatPhoneNumber } from "@/utils/convert-number";
import {
  setProfileData,
  toggleIsEdit,
  toggleIsOpen,
} from "@/app/slices/user.slice";
import { Field, Form, Formik } from "formik";
import { profileInputData } from "@/data/navbar/profile-input-data";
import { useRefreshTokenQuery } from "@/api/register/api";
interface layoutProps {
  children: React.ReactElement | React.ReactElement[];
}

const Layout: React.FC<layoutProps> = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const getToken =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("e-book") as any)
      : null;

  useEffect(() => {
    dispatch(setToken(getToken?.token));
  }, [router, dispatch, getToken]);
  // const {
  //   data: refreshToken,
  //   isLoading: isLoadingRefreshToken,
  //   isSuccess: isSuccessRefreshToken,
  //   error: errorRefreshToken,
  // } = useRefreshTokenQuery({});
  // console.log({ refreshToken });

  const isOpen = useAppSelector((state) => state.user.isOpen);
  const isEdit = useAppSelector((state) => state.user.isEdit);
  const profilePopupData = useAppSelector((state) => state.user.profileData);
  const handleEdit = () => {
    dispatch(toggleIsOpen(false));
    dispatch(toggleIsEdit(true));
  };

  const [editProfile, { data, isLoading, error, isSuccess }]: any =
    useEditUserProfileMutation();

  const [uploadedImage, setUploadedImage] = useState<
    string | ArrayBuffer | null
  >();
  const onUploadFile = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const image = reader.result;
        setUploadedImage(image);
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  };
  const [
    addProfileImage,
    {
      data: imageData,
      isSuccess: isSuccessUploadImage,
      isLoading: isLoadingUploadImage,
    },
  ] = useAddProfileImageMutation();
  const handleAddImage = () => {
    addProfileImage({ profilePhoto: uploadedImage });
    setUploadedImage(null);
  };

  console.log({ isLoadingUploadImage });

  useEffect(() => {
    if (isSuccess) {
      dispatch(toggleIsOpen(true));
      dispatch(toggleIsEdit(false));
    }
  }, [isSuccess]);

  return (
    <>
      <Popup open={isOpen}>
        <div className="flex items-center md:flex-row flex-col gap-4">
          <div className="h-[250px] py-[10px] pl-2 flex justify-between flex-col flex-1">
            <div>
              <div className="mb-[10px]">
                <h3 className="text-[26px] flex items-center gap-2 font-bold text-yellow-500">
                  {profilePopupData?.firstName}-{profilePopupData?.lastName}
                </h3>
                <span className="text-bothColor font-[500] flex items-center gap-2">
                  {profilePopupData?.gender === "Male" ? (
                    <BsGenderMale className="font-[500]" />
                  ) : (
                    <BsGenderFemale className="font-[500]" />
                  )}
                  {profilePopupData?.gender}
                </span>
              </div>
              <div className="flex flex-col gap-2 text-[18px] font-[500]">
                <span className="flex items-center gap-2">
                  <AiOutlineMail /> {profilePopupData?.email}
                </span>
                <span className="flex items-center gap-2">
                  <CiLocationOn /> {profilePopupData?.address}
                </span>
                <span className="flex items-center gap-2">
                  <CiMobile1 />{" "}
                  {formatPhoneNumber(profilePopupData?.phoneNumber)}
                </span>
              </div>
            </div>
            <div className="flex gap-1">
              <button
                disabled={isLoadingUploadImage ? true : false}
                className="btn gap-2 capitalize text-[18px]"
                onClick={() => handleEdit()}>
                <AiOutlineEdit /> Edit profile
              </button>
              {uploadedImage ? (
                <>
                  <button
                    className={`btn gap-2 capitalize text-[18px]`}
                    onClick={() => handleAddImage()}>
                    <CiSaveDown1 /> Save
                  </button>
                </>
              ) : (
                <label
                  htmlFor="upload-Image"
                  className="btn gap-2 capitalize text-[18px]">
                  <AiOutlineUser />
                  {profilePopupData?.profilePhoto ? "Edit Image" : "Add image"}
                </label>
              )}
              <input
                type="file"
                id="upload-Image"
                onChange={onUploadFile}
                hidden
              />
            </div>
          </div>

          <div className="flex-1">
            <div className="relative flex justify-center items-center">
              <img
                src={
                  profilePopupData?.profilePhoto
                    ? profilePopupData?.profilePhoto
                    : "/images/avatar.jpeg"
                }
                alt="User-Image"
                className="w-[180px] h-[180px] rounded-full object-cover"
              />
              {isLoadingUploadImage && (
                <div className="absolute w-[180px] h-[180px] rounded-full flex items-center justify-center bg-[rgba(0,0,0,0.2)]">
                  <div role="status">
                    <svg
                      aria-hidden="true"
                      className="w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Popup>
      <Popup open={isEdit}>
        <Formik
          initialValues={{
            username: profilePopupData?.userName,
            email: profilePopupData?.email,
            firstName: profilePopupData?.firstName,
            lastName: profilePopupData?.lastName,
            phoneNumber: profilePopupData?.phoneNumber,
            address: profilePopupData?.address,
            gender: profilePopupData?.gender === "Male" ? 0 : 1,
          }}
          onSubmit={(values) => {
            editProfile(values);
          }}>
          <Form>
            <div className="p-4 grid grid-cols-12 gap-2 w-full">
              {profileInputData?.map((phoneData, key) => {
                return (
                  <div className={`${phoneData.grid} form-control`} key={key}>
                    <label className="label">
                      <span className="label-text text-[18px] font-[500]">
                        {phoneData.label}
                      </span>
                    </label>
                    <Field
                      type={phoneData.type}
                      placeholder={phoneData.placeholder}
                      name={phoneData.name}
                      className="input input-bordered input-primary w-full max-w-xs"
                      disabled={phoneData.disabled}
                    />
                  </div>
                );
              })}
              <div className="col-span-12">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-[18px] font-[500]">
                      Select Your Gender
                    </span>
                  </label>
                  <Field
                    as="select"
                    className="select select-primary w-full"
                    name="gender">
                    <option disabled selected>
                      Pick one
                    </option>
                    <option value={0}>Male</option>
                    <option value={1}>Female</option>
                  </Field>
                </div>
              </div>
              <div className="col-span-12">
                <div className="form-control mt-4">
                  {isLoading ? (
                    <button
                      className="btn dark:glass btn-primary loading"
                      type="submit"></button>
                  ) : (
                    <>
                      {error ? (
                        <div className="flex justify-center items-center">
                          <span className="label text-[#c44444] text-[16px]">
                            {error?.data}
                          </span>
                        </div>
                      ) : null}
                      <button
                        className="btn dark:glass btn-primary capitalize"
                        type="submit">
                        Edit
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Form>
        </Formik>
      </Popup>
      <Navbar />
      <Aside />
      <main>{props.children}</main>
      <Footer />
      <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 left-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform -z-[0]"></div>
    </>
  );
};

export default Layout;
