import { useState } from "react";
import ReactDom from "react-dom";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import Backdrop from "../backdrop/backdrop";
import "./cv_modal.scss";

const pdfFile = new URL(
  "../../../public/assets/cv.pdf",
  import.meta.url
).toString();
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
  standardFontDataUrl: "standard_fonts/",
};

const CVModal = ({ handleClose }: any) => {
  const [file] = useState(pdfFile);
  const [numPages, setNumPages] = useState(0);

  return ReactDom.createPortal(
    <Backdrop onClick={handleClose}>
      <div className="cv_modal-container">
        <motion.div
          drag
          onClick={(e) => e.stopPropagation()}
          className="cv_modal"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="pdf_container">
            <Document
              file={file}
              options={options}
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}
              className="pdf_document"
            >
              {Array.apply(null, Array(numPages))
                .map((x, i) => i + 1)
                .map((page) => (
                  <Page pageNumber={page} />
                ))}
            </Document>
          </div>
        </motion.div>
        <div
          className="download_cv"
          onClick={() => {
            const link = document.createElement("a");
            link.setAttribute("href", file);
            link.setAttribute("download", "Tycho's CV.pdf");
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }}
        >
          <li className="fa fa-download">
            <p>Download</p>
          </li>
        </div>
      </div>
    </Backdrop>,
    document.getElementById("portal") as HTMLElement
  );
};

export default CVModal;
