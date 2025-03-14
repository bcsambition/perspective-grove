
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | Thoughts & Analysis</title>
        <meta name="description" content="Privacy policy for Thoughts & Analysis personal website." />
        <meta property="og:title" content="Privacy Policy | Thoughts & Analysis" />
        <meta property="og:description" content="Privacy policy for Thoughts & Analysis personal website." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://example.com/privacy" />
        <meta name="twitter:card" content="summary" />
        <link rel="canonical" href="https://example.com/privacy" />
      </Helmet>

      <section className="py-12">
        <div className="container-custom max-w-3xl">
          <h1 className="text-center mb-8">Privacy Policy</h1>
          
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p>Last Updated: October 1, 2023</p>
            
            <h2>Introduction</h2>
            <p>
              This Privacy Policy explains how I collect, use, disclose, and safeguard your information when you visit my personal website, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the "Site").
            </p>
            
            <h2>Information Collection</h2>
            <p>I may collect information about you in a variety of ways including:</p>
            
            <h3>Personal Data</h3>
            <p>
              When you subscribe to the newsletter, I collect your email address. This is the only personally identifiable information I intentionally collect.
            </p>
            
            <h3>Analytics</h3>
            <p>
              I use privacy-focused analytics to collect information about your browsing behaviors. This data is anonymized and only used to understand general traffic patterns and improve the Site.
            </p>
            
            <h2>Use of Your Information</h2>
            <p>Having accurate information about you permits me to provide you with a smooth, efficient, and customized experience. Specifically, I may use information collected about you via the Site to:</p>
            <ul>
              <li>Send you a newsletter if you've subscribed</li>
              <li>Increase the efficiency and operation of the Site</li>
              <li>Monitor and analyze usage and trends to improve your experience with the Site</li>
            </ul>
            
            <h2>Third-Party Service Providers</h2>
            <p>
              I may share your information with third parties that perform services for me or on my behalf, including newsletter delivery and analytics.
            </p>
            
            <h2>Cookies and Web Beacons</h2>
            <p>
              I may use cookies, web beacons, tracking pixels, and other tracking technologies on the Site to help customize the Site and improve your experience. Most browsers are set to accept cookies by default. You can remove or reject cookies, but be aware that such action could affect the availability and functionality of the Site.
            </p>
            
            <h2>Security of Your Information</h2>
            <p>
              I use administrative, technical, and physical security measures to help protect your personal information. While I have taken reasonable steps to secure the personal information you provide, please be aware that no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
            </p>
            
            <h2>Policy for Children</h2>
            <p>
              I do not knowingly solicit information from or market to children under the age of 13. If you become aware of any data I have collected from children under age 13, please contact me.
            </p>
            
            <h2>Contact</h2>
            <p>
              If you have questions or comments about this Privacy Policy, please contact me at: <a href="mailto:your.email@example.com">your.email@example.com</a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Privacy;
