import React from 'react'
import { useNavigate } from 'react-router-dom';
import {useRef, useState} from "react";
import { useParams } from 'react-router-dom';
import { API_PATHS } from '../../utils/apiPaths';
import {uploadImage} from "../../utils/uploadImage";
import {
  LuArrowLeft,
  LuCircleAlert,
  LuDownload,
  LuPalette,
  LuSave,
  LuTrash,
  LuTrash2,
} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TitleInput from '../../components/Inputs/TitleInput';
import {useReactToPrint} from "react-to-print";
import { useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import StepProgress from '../../components/StepProgress';
import ProfileInfoCard from '../../components/Cards/ProfileInfoCard';
import ProfileInfoForm from './Forms/ProfileInfoForm';
import ContactInfoForm from './Forms/ContactInfoForm';
import WorkExperienceForm from './Forms/WorkExperienceForm';


const EditResume = () => {
  const {resumeId} = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setbaseWidth] = useState(800);
  const [openThemeSelector, setopenThemeSelector] = useState(false);
  const [openPreviewModal, setopenPreviewModal] = useState(false);
  const [currentPage, setcurrentPage] = useState("work-experience");
  const [progress, setprogress] = useState(0);
  const [resumeData, setresumeData] = useState({
    title: "",
    thumbnailLink: "",
    profileInfo: {
      profileImg: null,
      previewUrl: "",
      fullName: "",
      designation: "",
      summary: "",
    },
    template: {
      theme: "",
      colorPalette: "",
    },
    contactInfo: {
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      website: "",
    },
    workExperience: [
      {
          company: "",
          role: "",
          startDate: "",
          endDate: "",
          description: "",
      }
    ],
    education: [
      {
          degree: "",
          institution: "",
          startDate: "",
          endDate: "",
      },
    ],
    skills: [
      {
        name: "",
        progress: 0,
      }
    ],
    projects: [
      {
          title: "",
          description: "",
          github: "",
          liveDemo: ""
      }
    ],
    certifications: [
        {
            title: "",
            issuer: "",
            year: "",
        }
    ],
    languages: [
        {
            name: "",
            progress: 0,
        }
    ],
    interests: [""]
  });

  const [errorMsg, seterrorMsg] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const validateAndNext = (e) => {};

  const goToNextStep = () => {};

  const goBack = () => {};

  const renderForm = () => {
    switch(currentPage) {
      case "profile-info":
        return (
          <ProfileInfoForm
            profileData = {resumeData?.profileInfo}
            updateSection = {(key,value) => {
              updateSection("profileInfo", key, value);
            }}
            onNext={validateAndNext}
          />
        );

      case "contact-info":
        return (
          <ContactInfoForm
            contactData = {resumeData?.contactInfo}
            updateSection = {(key,value) => {
              updateSection("contactInfo", key, value);
            }}
          />
        );

      case "work-experience":
        return(
          <WorkExperienceForm
            contactInfo={resumeData?.workExperience}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("workExperience", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("workExperience", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("workExperience", index);
            }}
          />
        );

      default:
        return null;
    }
  };

  const updateSection = (section, key, value) => {
    setresumeData((prevState) => ({
      ...prevState,
      [section]: {
        ...prevState[section],
        [key]: value,
      },
    }));
  };

  const updateArrayItem = (section, index, key, value) => {
    setresumeData((prev) => {
      const updatedArray = [...prev[section]];

      if(key === null) {
        updatedArray[index] = value;
      } else {
        updatedArray[index] = {
          ...updatedArray[index],
          [key]: value
        };
      }

      return {
        ...prev,
        [section]: updatedArray,
      };
    })
  };

  const addArrayItem = (section, newItem) => {
    setresumeData((prev) => ({
      ...prev,
      [section]: [...prev[section], newItem],
    }));
  };

  const removeArrayItem = (section, index) => {
    setresumeData((prev) => {
      const updatedArray = [...prev[section]];
      updatedArray.splice(index, 1);
      return {
        ...prev,
        [section]: updatedArray,
      };
  })}

  const fetchResumeDetailsById = async() => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.RESUME.GET_BY_ID(resumeId)
      );

      if(response.data && response.data.profileInfo) {
        const resumeInfo = response.data;

        setresumeData((prevState) => ({
          ...prevState,
          title: resumeInfo?.title || "Untitled",
          template: resumeInfo?.template || prevState?.template,
          profileInfo: resumeInfo?.profileInfo || prevState?.profileInfo,
          contactInfo: resumeInfo?.contactInfo || prevState?.contactInfo,
          workExperience: resumeInfo?.workExperience || prevState?.workExperience,
          education: resumeInfo?.education || prevState?.education,
          skills: resumeInfo?.skills || prevState?.skills,
          projects: resumeInfo?.projects || prevState?.projects,
          certifications: resumeInfo?.certifications || prevState?.certifications,
          languages: resumeInfo?.languages || prevState?.languages,
          interests: resumeInfo?.interests || prevState?.interests
        }));
      }
    } catch (error) {
      console.error("Error fetching resume details:", error);
    }
  };

  const uploadResumeImages = async() => {};

  const updateResumeDetails = async(thumbnailLink, profilePreviewUrl) => {};

  const handleDeleteResume = async() => {};

  const reactToPrintFn = useReactToPrint({ contentRef: resumeDownloadRef});

  const updateBaseWidth = () => {};

  useEffect(() => {
    updateBaseWidth();
    window.addEventListener("resize", updateBaseWidth);

    if(resumeId){
      fetchResumeDetailsById();
    }
  
    return () => {
      window.removeEventListener("resize", updateBaseWidth);
    }
  }, [])
  


  return (
    <DashboardLayout>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between gap-5 bg-white rounded-lg border border-purple-100 py-3 px-4 mb-4'>
          <TitleInput
            title={resumeData.title}
            setTitle={(value) =>
              setresumeData((prevState) => ({
                ...prevState,
                title: value,
              }))
            }
          />

          <div className='flex items-center gap-4'>
            <button
              className='btn-small-light'
              onClick={() => setopenThemeSelector(true)}
            >
              <LuPalette className='text-[16px]'/>
              <span className='hidden md:block'>Change Theme</span>
            </button>

            <button className='btn-small-light' onClick={handleDeleteResume}>
              <LuTrash2 className='text-[16px]'/>
              <span className='hidden md:block'>Delete</span>
            </button>

            <button
              className='btn-small-light'
              onClick={() => setopenPreviewModal(true)}
            >
              <LuDownload className='text-[16px]'/>
              <span className='hidden md:block'>Preview & Download</span>
            </button>
          </div>
        </div>


        <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
          <div className='bg-white rounded-lg border border-purple-100 overflow-hidden'>

            <StepProgress progress={0}/>

            {renderForm()}

            <div className='mx-5'>
              {errorMsg && (
                <div className='flex items-center gap-2 text-[11px] font-medium text-amber-600 bg-amber-100 px-2 py-0.5 my-1 rounded'>
                  <LuCircleAlert className='text-md'/> {errorMsg}
                </div>
              )}

              <div className='flex items-end justify-end gap-3 mt-3 mb-5'>
                <button
                  className='btn-small-light'
                  onClick={goBack}
                  disabled={isLoading}
                >
                  <LuArrowLeft className='text-[16px]'/>
                  Back
                </button>
                <button
                  className='btn-small-light'
                  onClick={uploadResumeImages}
                  disabled={isLoading}
                >
                  <LuSave className='text-[16px]'/>
                  {isLoading ? "Updating..." : "Save & Exit"}
                </button>
                <button
                  className='btn-small'
                  onClick={validateAndNext}
                  disabled={isLoading}
                >
                  {currentPage === 'additionalInfo' && (
                    <LuDownload className='text-[16px]'/>
                  )}

                  {currentPage === 'additionalInfo'
                    ? "Preview & Download"
                    : "Next Step"}
                  
                  {currentPage !== "additionalInfo" && (
                    <LuArrowLeft className='text-[16px] rotate-180'/>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div ref={resumeRef} className='h-[100vh]'>
                  
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EditResume