import React, { useRef } from "react";
import { LuGithub, LuMail, LuMapPin, LuMapPinHouse, LuPhone, LuRss, LuUser } from "react-icons/lu";
import { useState, useEffect } from "react";
import ContactInfo from "../ResumeSections/ContactInfo";
import {RiLinkedinLine} from "react-icons/ri"
import EducationInfo from "../ResumeSections/EducationInfo";
import {formatYearMonth} from "../../utils/helper"
import LanguageSection from "../ResumeSections/LanguageSection";
import WorkExperienceForm from "./../../pages/ResumeUpdate/Forms/WorkExperienceForm";
import WorkExperience from "../ResumeSections/WorkExperience";
import ProjectInfo from "../ResumeSections/ProjectInfo";
import SkillSection from "../ResumeSections/SkillSection";
import CertificationInfo from "../ResumeSections/CertificationInfo";

const DEFAULT_THEME = ["#EBFDFF", "#A1F4FD", "#CEFAFE", "#00B8D8", "#4A5565"];

const Title = ({ text, color }) => {
  return (
    <div className="relative w-fit mb-2.5">
      <span
        className="absolute bottom-0 left-0 w-full h-2"
        style={{ backgroundColor: color }}
      ></span>
      <h2 className={`relative text-md font-bold`}>{text}</h2>
    </div>
  );
};

const TemplateThree = ({ resumeData, colorPalette, containerWidth }) => {
  const themeColors = colorPalette?.length > 0 ? colorPalette : DEFAULT_THEME;

  const resumeRef = useRef(null);
  const [baseWidth, setbaseWidth] = useState(800);
  const [scale, setscale] = useState(1);

  useEffect(() => {
    const actualBaseWidth = resumeRef.current.offsetWidth;
    setbaseWidth(actualBaseWidth);
    setscale(containerWidth / baseWidth);
  }, [containerWidth]);

  return (
    <div
      ref={resumeRef}
      className="p-3 bg-white"
      style={{
        transform: containerWidth > 0 ? `scale(${scale})` : `none`,
        transformOrigin: "top left",
        width: containerWidth > 0 ? `${baseWidth}px` : "auto",
        height: "auto",
      }}
    >

      <div className="flex items-start gap-5 px-2 mb-5">
        {resumeData.profileInfo.profilePreviewUrl && (
              <div
                className="w-[100px] h-[100px] max-w-[110px] max-h-[110px] rounded-full flex items-center justify-center"
                style={{ backgroundColor: themeColors[1] }}
              >
                <img
                  src={resumeData.profileInfo.profilePreviewUrl}
                  className="w-[90px] h-[90px] rounded-full"
                />
              </div>
            )}


        <div>
            <div className="grid grid-cols-12 items-center">
                <div className="col-span-8">
                    <h2 className="text-2xl font-bold">
                        {resumeData.profileInfo.fullName}
                    </h2>
                    <p className="text-[15px] font-semibold mb-2">
                        {resumeData.profileInfo.designation}
                    </p>

                    <ContactInfo
                        icon={<LuMapPinHouse/>}
                        iconBG={themeColors[2]}
                        value={resumeData.contactInfo.location}
                    />
                </div>

                <div className="col-span-4 flex flex-col gap-5 mt-2">
                    <ContactInfo
                        icon={<LuMail/>}
                        iconBG={themeColors[2]}
                        value={resumeData.contactInfo.email}
                    />

                    <ContactInfo
                        icon={<LuPhone/>}
                        iconBG={themeColors[2]}
                        value={resumeData.contactInfo.phone}
                    />
                </div>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div
          className="col-span-4 py-10"
          style={{ backgroundColor: themeColors[0] }}
        >
          <div className="my-[-14px] mx-6">
            <div className="flex flex-col gap-4">

              {resumeData.contactInfo.linkedin && (
                <ContactInfo
                  icon={<RiLinkedinLine/>}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo.linkedin}
                />
              )}
              
              {resumeData.contactInfo.github && (
                <ContactInfo
                  icon={<LuGithub/>}
                  iconBG={themeColors[2]}
                  value={resumeData.contactInfo.github}
                />
              )}


              {resumeData.contactInfo.website && <ContactInfo
                icon={<LuRss/>}
                iconBG={themeColors[2]}
                value={resumeData.contactInfo.website}
              />}
            </div>

            <div className="mt-5">
              <Title text="Education" color={themeColors[1]} />

              {resumeData.education.map((data, index) => (
                <EducationInfo
                  key={`education_${index}`}
                  degree={data.degree}
                  institution={data.institution}
                  duration={`${formatYearMonth(
                    data.startDate
                  )} - ${formatYearMonth(data.endDate)}`}
                />
              ))}
            </div>

            <div>
              <Title text="Languages" color={themeColors[1]} />

              <LanguageSection
                languages={resumeData.languages}
                accentColor={themeColors[3]}
                bgColor={themeColors[2]}
              />
            </div>
          </div>
        </div>

        <div className="col-span-8 pt-10 mr-10 pb-5">
          <div>
            <Title text="Professional Summary" color={themeColors[1]} />
            <p className="text-sm font-medium">
              {resumeData.profileInfo.summary}
            </p>
          </div>

          <div className="mt-4">
            <Title text="Work Experiance" color={themeColors[1]}/>

            {resumeData.workExperience.map((data, index) => (
              <WorkExperience
                key={`work_${index}`}
                company={data.company}
                role={data.role}
                duration={`${formatYearMonth(
                  data.startDate
                )} - ${data.endDate == "Present" ? "Present" : formatYearMonth(data.endDate)}`}
                durationColor={themeColors[4]}
                description={data.description}
              />
            ))}
          </div>

          <div className="mt-4">
            <Title text="Projects" color={themeColors[1]}/>

            {resumeData.projects.map((data, index) => (
              <ProjectInfo
                key={`project_${index}`}
                title={data.title}
                description={data.description}
                githubLink={data.github}
                liveDemoUrl={data.liveDemo}
                bgColor={themeColors[2]}
              />
            ))}
          </div>

          <div className="mt-4">
            <Title text="Skills" color={themeColors[1]}/>

            <SkillSection
              skills={resumeData.skills}
              accentColor={themeColors[3]}
              bgColor={themeColors[2]}
            />
          </div>

          <div className="mt-4">
            <Title text="Certifications" color={themeColors[1]}/>

            <div className="grid grid-cols-2 gap-2">
              {resumeData.certifications.map((data, index) => (
                <CertificationInfo
                  key={`cert_${index}`}
                  title={data.title}
                  issuer={data.issuer}
                  year={data.year}
                  bgColor={themeColors[2]}
                />
              ))}
            </div>
          </div>

          {resumeData.interests.length > 0 && resumeData.interests[0] != "" && (<div className="mt-4">
              <Title text="Interests" color={themeColors[1]}/>

              <div className="flex items-center flex-wrap gap-3 mt-4">
                {resumeData.interests.map((interest, index) => {
                  if(!interest) return null;
                  return (
                    <div
                      key={`interest_${index}`}
                      className="text-[10px] font-medium py-1 px-3 rounded-lg"
                      style={{ backgroundColor: themeColors[2] }}
                    >
                      {interest}
                    </div>
                  )
                })}
              </div>
          </div>)}
        </div>
      </div>
    </div>
  );
};

export default TemplateThree;
