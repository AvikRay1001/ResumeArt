import React from 'react'
import {
    DUMMY_RESUME_DATA,
    resumeTemplates,
    themeColorPalette
} from '../../utils/data'
import { LuCircleCheckBig } from 'react-icons/lu'
import Tabs from '../../components/Tabs';

const TAB_DATA = [{ label: "Templates"}, {label: "Color Palettes"}];

const ThemeSelector = ({
    selectedTheme,
    setSelectedTheme,
    resumeData,
    onClose
}) => {

    const resumeRef = useRef(null);
    const [baseWidth, setbaseWidth] = useState(800);

    const [tabValue, settabValue] = useState("Templates");
    const [selectedColorPalette, setselectedColorPalette] = useState({
        colors: selectedTheme?.colorPalette,
        index: -1,
    });
    const [selectedTemplate, setselectedTemplate] = useState({
        theme: selectedTheme?.theme || "",
        index: -1,
    })

    const handleThemeSelectiion = () => {
        setSelectedTheme({
            colorPalette: selectedColorPalette?.colors,
            theme: selectedTemplate?.theme
        });
        onClose();
    }

    const updateBaseWidth = () => {
        if(resumeRef.current){
            setbaseWidth(resumeRef.current.offsetWidth);
        }
    };


    useEffect(() => {
      updateBaseWidth();
      window.addEventListener("resize", updateBaseWidth);
    
      return () => {
        window.removeEventListener("resize", updateBaseWidth);
      };
    }, []);


    
  return (
    <div>
        <div>
            <Tabs tabs={TAB_DATA} activeTab={tabValue} setActiveTab={settabValue}/>

            <button
                className=''
                onClick={() => handleThemeSelectiion()}
            >
                <LuCircleCheckBig/>
            </button>
        </div>

        <div>
            <div>
                <div>

                </div>
            </div>
            <div className='' ref={resumeRef}>

            </div>
        </div>
    </div>
  )
}

export default ThemeSelector