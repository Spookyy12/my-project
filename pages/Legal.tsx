import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Legal: React.FC = () => {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl bg-white/80 backdrop-blur-md p-10 md:p-16 rounded-[2rem] shadow-sm border border-white/60">
        <h1 className="text-4xl font-serif text-slate-800 mb-10 border-b border-sand-200 pb-6">Legal Information</h1>

        <section id="privacy" className="mb-12 scroll-mt-28">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Privacy Policy</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            At <strong>Our Ears Are Open</strong>, your privacy is our top priority. We are committed to maintaining the confidentiality of all conversations that take place on our platform.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
            <li>We do not record audio calls.</li>
            <li>Chat logs are automatically deleted from our servers 24 hours after a session ends.</li>
            <li>We do not sell your personal information to third parties.</li>
            <li>Payment information is processed securely through our payment providers (Stripe/PayPal) and is not stored on our servers.</li>
          </ul>
        </section>

        <section id="terms" className="mb-12 scroll-mt-28">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Terms of Service</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            By using our website and services, you agree to the following terms:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
            <li>You must be at least 18 years of age to use this service.</li>
            <li>This service is for peer support only and is not a substitute for professional mental health care.</li>
            <li>We reserve the right to terminate access for users who are abusive to our volunteers.</li>
            <li>Fees paid for sessions are non-refundable unless a session is cancelled due to technical issues on our end.</li>
          </ul>
        </section>

        <section id="agreement" className="scroll-mt-28">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Volunteer Agreement</h2>
          <p className="text-slate-600 mb-4 leading-relaxed">
            Our volunteers are the heart of our mission. By applying to be a listener, you agree to:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600">
            <li>Maintain strict confidentiality regarding all user conversations.</li>
            <li>Treat all users with respect, empathy, and without judgment.</li>
            <li>Report any immediate threats to life (suicide or homicide) to the appropriate authorities as per our crisis protocol.</li>
            <li>Maintain a professional boundary; do not share personal contact information with users.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Legal;