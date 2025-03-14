
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Thoughts & Analysis</title>
        <meta name="description" content="Privacy policy for Thoughts & Analysis website." />
        <meta property="og:title" content="Privacy Policy | Thoughts & Analysis" />
        <meta property="og:description" content="Privacy policy for Thoughts & Analysis website." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/privacy" />
        <meta name="twitter:card" content="summary" />
        <link rel="canonical" href="https://example.com/privacy" />
      </Helmet>

      <section className="py-16">
        <div className="container-custom max-w-4xl">
          <h1 className="mb-8 text-center">Privacy Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>Last updated: January 1, 2023</p>
            
            <h2>Introduction</h2>
            <p>
              This Privacy Policy describes how your personal information is collected, used, and shared when you visit 
              Thoughts & Analysis ("the Site"). We respect your privacy and are committed to protecting your personal data.
            </p>
            
            <h2>Information We Collect</h2>
            <p>
              When you visit the Site, we automatically collect certain information about your device, including information 
              about your web browser, IP address, time zone, and some of the cookies that are installed on your device.
            </p>
            <p>
              Additionally, as you browse the Site, we collect information about the individual web pages that you view, 
              what websites or search terms referred you to the Site, and information about how you interact with the Site.
            </p>
            
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Improve and optimize our Site</li>
              <li>Understand user trends and preferences</li>
              <li>Develop new features and functionality</li>
              <li>Prevent fraudulent activity and improve security</li>
              <li>Deliver content that may be of interest to you, such as newsletter updates</li>
            </ul>
            
            <h2>Sharing Your Information</h2>
            <p>
              We share your Personal Information with third parties to help us use your Personal Information, as described above.
              For example, we use Google Analytics to help us understand how our visitors use the Site. 
              You can read more about how Google uses your Personal Information here: 
              <a href="https://www.google.com/intl/en/policies/privacy/" target="_blank" rel="noopener noreferrer">
                https://www.google.com/intl/en/policies/privacy/
              </a>.
            </p>
            <p>
              We may also share your Personal Information to comply with applicable laws and regulations, to respond to a 
              subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.
            </p>
            
            <h2>Your Rights</h2>
            <p>
              If you are a European resident, you have the right to access personal information we hold about you and to ask 
              that your personal information be corrected, updated, or deleted. If you would like to exercise this right, 
              please contact us through the contact information below.
            </p>
            <p>
              Additionally, if you are a European resident we note that we are processing your information in order to 
              fulfill contracts we might have with you (for example if you make an order through the Site), or otherwise 
              to pursue our legitimate business interests listed above.
            </p>
            
            <h2>Cookies</h2>
            <p>
              We use cookies and similar technologies to improve your browsing experience, analyze site traffic, and 
              understand where our audience is coming from. You can control cookies through your browser settings and 
              other tools. By continuing to use our website, you consent to our use of cookies.
            </p>
            
            <h2>Data Retention</h2>
            <p>
              We will maintain your Personal Information for our records unless and until you ask us to delete this information.
            </p>
            
            <h2>Changes</h2>
            <p>
              We may update this privacy policy from time to time in order to reflect, for example, changes to our practices 
              or for other operational, legal or regulatory reasons.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              For more information about our privacy practices, if you have questions, or if you would like to make a 
              complaint, please contact us by e-mail at privacy@example.com.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
