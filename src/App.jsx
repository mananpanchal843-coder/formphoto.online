import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import PhotoResizer from './PhotoResizer';
import SignatureResizer from './SignatureResizer';
import CompressPhoto from './CompressPhoto';
import BackgroundRemover from './BackgroundRemover';
import ImageToPdf from './ImageToPdf';
import PdfCompress from './PdfCompress';
import Privacy from './Privacy';
import Terms from './Terms';
import About from './About';
import Contact from './Contact';
import ExamRequirements from './ExamRequirements';
import ApplicationChecker from './ApplicationChecker';
import ExamLandingPage from './ExamLandingPage';
import GuidePage from './GuidePage';
import GuidesIndex from './GuidesIndex';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Navbar />
      <main id="main-content" className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/photo-resizer" element={<PhotoResizer />} />
          <Route path="/signature-resizer" element={<SignatureResizer />} />
          <Route path="/compress" element={<CompressPhoto />} />
          <Route path="/compress-photo" element={<CompressPhoto />} />
          <Route path="/background-remover" element={<BackgroundRemover />} />
          <Route path="/image-to-pdf" element={<ImageToPdf />} />
          <Route path="/pdf-compress" element={<PdfCompress />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/exam-requirements" element={<ExamRequirements />} />
          <Route path="/application-checker" element={<ApplicationChecker />} />
          <Route path="/application/:appId" element={<ApplicationChecker />} />
          <Route path="/ssc-cgl-photo-signature-resizer" element={<ExamLandingPage />} />
          <Route path="/upsc-cse-photo-signature-size" element={<ExamLandingPage />} />
          <Route path="/neet-photo-resizer-2026" element={<ExamLandingPage />} />
          <Route path="/ibps-po-clerk-photo-signature" element={<ExamLandingPage />} />
          <Route path="/rrb-ntpc-group-d-photo-resizer" element={<ExamLandingPage />} />
          <Route path="/jee-main-photo-signature" element={<ExamLandingPage />} />
          <Route path="/guides" element={<GuidesIndex />} />
          <Route path="/ssc-cgl-photo-signature-size-complete-guide-2026" element={<GuidePage />} />
          <Route path="/why-exam-photo-gets-rejected-and-how-to-fix" element={<GuidePage />} />
          <Route path="/how-to-resize-signature-under-20kb" element={<GuidePage />} />
          <Route path="/upsc-vs-ssc-photo-requirements" element={<GuidePage />} />
          <Route path="/passport-size-vs-exam-photo" element={<GuidePage />} />
          <Route path="/compress-photo-exact-kb-indian-forms" element={<GuidePage />} />
          <Route path="/neet-vs-jee-photo-size" element={<GuidePage />} />
          <Route path="/remove-background-exam-photo-guide" element={<GuidePage />} />
          <Route path="/ibps-vs-sbi-photo-signature" element={<GuidePage />} />
          <Route path="/rrb-photo-signature-preparation-guide" element={<GuidePage />} />
          <Route path="/faq" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
