import TEMPLATE_ONE_IMG from '../assets/template-one.png'
import TEMPLATE_TWO_IMG from '../assets/template-two.png'
import TEMPLATE_THREE_IMG from '../assets/template-three.png'

export const resumeTemplates = [
    {
        id:'01',
        thumbnailImg: TEMPLATE_ONE_IMG,
        colorPaletteCode: 'themeOne'
    },
    {
        id:'02',
        thumbnailImg: TEMPLATE_TWO_IMG,
        colorPaletteCode: 'themeTwo'
    },
    {
        id:'03',
        thumbnailImg: TEMPLATE_THREE_IMG,
        colorPaletteCode: 'themeThree'
    },
]

export const themeColorPalette = {
  themeOne: [
    ["#E8FDFF", "#A1F4FD", "#CEFAFE", "#00B8DB", "#4A5565"],
    ["#E9FBF8", "#B4EFE7", "#93E2DA", "#2AC9A0", "#3DC45A"],
    ["#F9F5FF", "#E0D8FF", "#C9C2F8", "#82579D", "#A84BCA"],
    ["#F0FAFF", "#D6F0FF", "#AFDEFF", "#3399FF", "#5A5361"],
    ["#FFF5F7", "#FFE0EC", "#FAC6D4", "#F6729C", "#A53A5A"],
    ["#F9FAFB", "#E4E7EB", "#CBD5E0", "#F9FCF5", "#2D3748"],
    ["#F4FFFD", "#D3FDF2", "#B0E9D4", "#34C79D", "#38BC48"],
    ["#FFF7F0", "#FFD9B3", "#FFDBA2", "#FF9561", "#A64743"],
    ["#FDFDFF", "#E3F1F9", "#C0DDEE", "#06AC6F", "#464554"],
    ["#FFF0FF", "#FFD6FF", "#E7C4FF", "#802787", "#2B3342"],
    ["#F7F7F7", "#E4E4E4", "#CFCFCF", "#A4A4A4", "#222222"],
    ["#E3F2FD", "#90CAF9", "#8AD2F4", "#1E88E5", "#0D47A1"]
  ]
};


export const DUMMY_RESUME_DATA = {
  "profileInfo": {
    "profileImg": null,
    "profilePreviewUrl": "",
    "fullName": "John Doe",
    "designation": "Full Stack Developer",
    "summary": "Passionate developer with 5+ years of experience in building web applications using modern technologies."
  },
  "contactInfo": {
    "email": "john.doe@example.com",
    "phone": "+1-234-567-8901",
    "location": "San Francisco, CA",
    "linkedin": "https://linkedin.com/in/johndoe",
    "github": "https://github.com/johndoe",
    "website": "https://johndoe.dev"
  },
  "workExperience": [
    {
      "company": "Tech Corp",
      "role": "Senior Software Engineer",
      "startDate": "2021-03",
      "endDate": "Present",
      "description": "Leading a team of developers to build scalable full-stack applications using React, Node.js, and PostgreSQL."
    },
    {
      "company": "CodeBase",
      "role": "Frontend Developer",
      "startDate": "2018-06",
      "endDate": "2021-02",
      "description": "Developed responsive web interfaces and optimized performance using React and Redux."
    }
  ],
  "education": [
    {
      "degree": "B.Tech in Computer Science",
      "institution": "University of California",
      "startDate": "2014-08",
      "endDate": "2018-05"
    }
  ],
  "skills": [
    {
      "name": "JavaScript",
      "progress": 90
    },
    {
      "name": "React",
      "progress": 85
    },
    {
      "name": "Node.js",
      "progress": 80
    }
  ],
  "projects": [
    {
      "title": "Portfolio Website",
      "description": "A personal portfolio to showcase projects and skills. Built using Next.js and Tailwind CSS.",
      "github": "https://github.com/johndoe/portfolio",
      "liveDemo": "https://johndoe.dev"
    },
    {
      "title": "Task Manager App",
      "description": "A full-stack application to manage tasks with user authentication and real-time updates.",
      "github": "https://github.com/johndoe/task-manager",
      "liveDemo": "https://tasky.app"
    }
  ],
  "certification": [
    {
      "title": "AWS Certified Developer",
      "issuer": "Amazon Web Services",
      "year": "2022"
    },
    {
      "title": "Frontend Developer Certification",
      "issuer": "freeCodeCamp",
      "year": "2020"
    }
  ],
  "languages": [
    {
      "name": "English",
      "progress": 100
    },
    {
      "name": "Spanish",
      "progress": 60
    }
  ],
  "interests": [
    "Open Source",
    "Traveling",
    "Gaming"
  ]
}