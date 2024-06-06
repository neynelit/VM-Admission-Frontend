import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navebar from './Navebar';
import Home from './Components/Home';
import InstituteDashboard from './Components/Institute/InstituteDashboard';
import IntakeCapacity from './Components/IntakeCapacity';
import MeritList from './Components/MeritList';
import KnowResult from './Components/KnowResult';
import PaymentStatus from './Components/PaymentStatus';
import Login from './Components/Login';
import StudentDetails from './Components/StudentDetails';
import StudentsEdit from './Components/StudentsEdit';
import SabpaisaPage from './Components/SabpaisaPage';
import SabpaisaStatus from './Components/SabpaisaStatus';
import StudentReview from './Components/StudentReview';
import AdmittedStudents from './Components/Institute/AdmittedStudents';
import NonadmittedStudent from './Components/Institute/NonadmittedStudent';
import ExamPaid from './Components/Institute/ExamPaid';
import ExamNonpaid from './Components/Institute/ExamNonpaid';
import AdmissionFees from './Components/Institute/AdmissionFees';
import ExaminationFees from './Components/Institute/ExaminationFees';
import ManageStudent from './Components/Institute/ManageStudent';
import AddManager from './Components/Institute/AddManager';
import Notice from './Components/Institute/Notice';
import FeesManagement from './Components/Institute/FeesManagement';
import OpenClose from './Components/Institute/OpenClose';
import QuestionPaper from './Components/Institute/QuestionPaper';
import Schedule from './Components/Institute/Schedule';
import Intake from './Components/Institute/Intake';
import DashboardSms from './Components/Institute/DashboardSms';
import SettingSms from './Components/Institute/SettingSms';
import Sms from './Components/Institute/Sms';
import ReportSms from './Components/Institute/ReportSms';
import SettingEmail from './Components/Institute/SettingEmail';
import EmailSms from './Components/Institute/EmailSms';
import ReportEmail from './Components/Institute/ReportEmail';
import PayReceipt from './Components/Institute/PayReceipt';
import ApplicationForm from './Components/Institute/ApplicationForm';
import PaymentSlip from './Components/PaymentSlip';
import EditStudent from './Components/Institute/EditStudent';
import EditManager from './Components/Institute/EditManager';
import EditFees from './Components/Institute/EditFees';
import ExcelFile from './Components/Institute/ExcelFile';
import SamplePage from './Components/Institute/SamplePage';
import ApplicationFilledForm from './Components/ApplicationFilledForm';
import StudentAttachment from './Components/StudentAttachment';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navebar />}>
          
            {/* home page route */}
            <Route index element={<Home />} />
            <Route path='/intake-capacity' element={<IntakeCapacity />} />
            <Route path='/merit-list' element={<MeritList />} />
            <Route path='/know-your-result' element={<KnowResult />} />
            <Route path='/view-payment-status' element={<PaymentStatus />} />
            
            {/* student routes */}
            <Route path='/login' element={<Login />} />
            <Route path='/student-details' element={<StudentDetails />} />
            <Route path='/student-details-edit' element={<StudentsEdit />} />
            <Route path='/student-attachments' element={<StudentAttachment />} />
            <Route path='/student-details-review/:registration_no' element={<StudentReview />} />

            {/* institute page routes */}
              {/* dashboard */}
              <Route path='/institute/dashboard' element={<InstituteDashboard />} />

              {/* admission */}
              <Route path='/institute/admitted-student' element={<AdmittedStudents />} />
              <Route path='/institute/non-admitted-student' element={<NonadmittedStudent />} />

              {/* examination */}
              <Route path='/institute/paid-student' element={<ExamPaid />} />
              <Route path='/institute/non-paid-student' element={<ExamNonpaid />} />

              {/* report */}
              <Route path='/institute/admission-fees' element={<AdmissionFees />} />
              <Route path='/institute/examination-fees' element={<ExaminationFees />} />

              {/* institution */}
              <Route path='/institute/manage-student' element={<ManageStudent />} />
              <Route path='/institute/edit-student/:registration_no' element={<EditStudent />} />
              <Route path='/institute/admitted-student-profile' element={<ApplicationForm />} />
              <Route path='/institute/add-manager' element={<AddManager />} />
              <Route path='/institute/edit-manager/:postId' element={<EditManager />} />
              <Route path='/institute/notice' element={<Notice />} />
              <Route path='/institute/fees-management' element={<FeesManagement />} />
              <Route path='/institute/edit-fees/:postId' element={<EditFees />} />
              <Route path='/institute/open-and-close' element={<OpenClose />} />
              <Route path='/institute/question-paper' element={<QuestionPaper />} />
              <Route path='/institute/schedule' element={<Schedule />} />
              <Route path='/institute/intake' element={<Intake />} />
              <Route path='/institute/excel' element={<ExcelFile />} />
              <Route path='/institute/sample' element={<SamplePage />} />

              {/* sms */}
              <Route path='/institute/sms-dashboard' element={<DashboardSms />} />
              <Route path='/institute/sms-setting' element={<SettingSms />} />
              <Route path='/institute/sms' element={<Sms />} />
              <Route path='/institute/sms-report' element={<ReportSms />} />

              {/* email sms */}
              <Route path='/institute/email-sms-setting' element={<SettingEmail />} />
              <Route path='/institute/email-sms' element={<EmailSms />} />
              <Route path='/institute/email-sms-report' element={<ReportEmail />} />

            {/* payment route */}
            <Route path='/payment' element={<SabpaisaPage />} />
            <Route path='/response' element={<SabpaisaStatus />} />
            <Route path='/pay-receipt' element={<PayReceipt />} />
            <Route path='/payment-slip/:registration_no' element={<PaymentSlip />} />
            <Route path='/application-filled-from/:registration_no' element={<ApplicationFilledForm />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
