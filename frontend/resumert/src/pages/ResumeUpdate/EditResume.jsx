import React from 'react'

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
  })


  return (
    <div>EditResume</div>
  )
}

export default EditResume