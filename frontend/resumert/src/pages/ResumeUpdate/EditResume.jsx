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
  LuTrash2,
} from "react-icons/lu";
import toast from "react-hot-toast";
import DashboardLayout from '../../components/layouts/DashboardLayout';
import TitleInput from '../../components/Inputs/TitleInput';


const EditResume = () => {
  const {resumeId} = useParams();
  const navigate = useNavigate();

  const resumeRef = useRef(null);
  const resumeDownloadRef = useRef(null);

  const [baseWidth, setbaseWidth] = useState(800);
  const [openThemeSelector, setopenThemeSelector] = useState(false);
  const [openPreviewModa, setopenPreviewModa] = useState(false);
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
    certification: [
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

  const renderForm = () => {};

  const updateSection = (section, key, value) => {};

  const updateArrayItem = (section, index, key, value) => {};

  const addArrayItem = (section, newItem) => {};

  const removeArrayItem = (section, index) => {};

  const fetchResumeDetailsById = async() => {};

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
        </div>
      </div>
    </DashboardLayout>
  )
}

export default EditResume