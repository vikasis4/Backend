import React, {useContext} from 'react'
import GoogleDocsViewer from 'react-google-docs-viewer'
import ProfileContext from '../../context/profile/ProfileContext';

const PdfViewer = () => {
    const profile = useContext(ProfileContext);
    return (
        <div className="pdf-viewer">
            <div className="videopage-gap"></div>
            <GoogleDocsViewer
                width="100%"
                height= {screen.width < 480 ? "76vh" : "85vh" }
                fileUrl={profile.pdfurl}
            />
        </div>
    )
}

export default PdfViewer