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
import EducationDetailsForm from './Forms/EducationDetailsForm';
import SkillInfoForm from './Forms/SkillInfoForm';
import ProjectDetailForm from './Forms/ProjectDetailForm';
import CertificationInfoForm from './Forms/CertificationInfoForm';
import AdditionalInfoForm from './Forms/AdditionalInfoForm';


const EditResume = () => {
  const {resumeId} = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setbaseWidth] = useState(800);
  const [openThemeSelector, setopenThemeSelector] = useState(false);
  const [openPreviewModal, setopenPreviewModal] = useState(false);
  const [currentPage, setcurrentPage] = useState("profile-info");
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

  const validateAndNext = (e) => {
    const errors = [];

    switch(currentPage) {
      case "profile-info":
        const {fullName, designation, summary} = resumeData?.profileInfo;
        if(!fullName.trim()) errors.push("Full Name is required");
        if(!designation.trim()) errors.push("Designation is required");
        if(!summary.trim()) errors.push("Bio is required");
        break;

      case "contact-info":
        const {email, phone} = resumeData?.contactInfo;
        if(!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) errors.push("Valid email address is required");
        if(!phone.trim()) errors.push("Valid 10-digit phone number is required");
        break;

      case "work-experience":
        resumeData.workExperience.forEach(
          ({company, role, startDate, endDate}, index) => {
            if(!company.trim())
              errors.push(`Company is required in experience ${index + 1}`);
            
          }
        )
    }
  };

  const goToNextStep = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    if(currentPage === "additionalInfo") setopenPreviewModal(true);

    const currentIndex = pages.indexOf(currentPage);
    if(currentIndex !== -1 && currentIndex < pages.length - 1) {
      const nextIndex = currentIndex + 1;
      setcurrentPage(pages[nextIndex]);

      const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
      setprogress(percent);
      windows.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    const pages = [
      "profile-info",
      "contact-info",
      "work-experience",
      "education-info",
      "skills",
      "projects",
      "certifications",
      "additionalInfo",
    ];

    if(currentPage === "additionalInfo") setopenPreviewModal(true);

    const currentIndex = pages.indexOf(currentPage);
    if(currentIndex > 0) {
      const nextIndex = currentIndex + 1;
      setcurrentPage(pages[nextIndex]);

      const percent = Math.round((nextIndex / (pages.length - 1)) * 100);
      setprogress(percent);
      windows.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

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
            workExperience={resumeData?.workExperience}
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

      case "education-info":
        return(
          <EducationDetailsForm
            educationInfo={resumeData?.education}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("education", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("education", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("education", index);
            }}
          />
        )

      case "skills":
        return(
          <SkillInfoForm
            skillsInfo={resumeData?.skills}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("skills", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("skills", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("skills", index);
            }}
          />
      )

      case "projects":
        return(
          <ProjectDetailForm
            projectInfo={resumeData?.projects}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("projects", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("projects", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("projects", index);
            }}
          />
        )

      case "certifications":
        return(
          <CertificationInfoForm
            certifications = {resumeData?.certifications}
            updateArrayItem={(index, key, value) => {
              updateArrayItem("certifications", index, key, value);
            }}
            addArrayItem={(newItem) => {
              addArrayItem("certifications", newItem);
            }}
            removeArrayItem={(index) => {
              removeArrayItem("certifications", index);
            }}
          />
        )

      case "aditionalInfo":
        return (
          <AdditionalInfoForm
            languages = {resumeData?.languages}
            interests = {resumeData?.interests}
            updateArrayItem={(section, index, key, value) => {
              updateArrayItem(section, index, key, value);
            }}
            addArrayItem={(section, newItem) => {
              addArrayItem(section, newItem);
            }}
            removeArrayItem={(section, index) => {
              removeArrayItem(section, index);
            }}
          />
        )

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