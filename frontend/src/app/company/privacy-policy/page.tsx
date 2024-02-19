"use client"

import React from "react";
import { useTranslation } from "react-i18next";

const Page = () => {
const {t} = useTranslation()
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
    <p className="mb-4">
      Please read our Privacy Policy carefully as it explains the following:
    </p>
    <p className="mb-4">
      In order to use the App, you must first acknowledge and agree to our
      Privacy Policy. You cannot use the App without first accepting our
      Privacy Policy.
    </p>
    <h2 className="text-2xl font-bold mt-8 mb-4">General</h2>
    <p className="mb-4">
      We provide the NGMP Application which is a marketplace app provides
      users with a platform to seamlessly engage in peer-to-peer commerce.
      Users can effortlessly upload images and descriptions of items they wish
      to sell, facilitating clear communication with potential buyers through
      an integrated chat feature. The app also streamlines the process of
      arranging meetings for item inspection or exchange. Moreover, it offers
      secure payment processing functionality, allowing transactions to be
      completed within the app environment with confidence.
    </p>
    <p className="mb-4">
      We ("Individual", "us", "we" or "our") recognizes and understand the
      importance of the privacy of its users ("User", "you" or "your") and want
      to respect their desire to store and access personal information in a
      private and secure manner. This Privacy Policy applies to our application
      and describes how we manage, store, and utilize your Personal Data
      through its Products.
    </p>
    <p className="mb-4">
      In order to use our app, we require you to consent to the collection and
      processing of your Personal Data before you start using the app. If you
      do not agree with the terms of this Privacy Policy, you may not use in any
      manner the app.
    </p>
    <p className="mb-4">
      We are committed to protecting the privacy of all of its user’s Personal
      Data and providing a secure, user-controlled environment for the use of
      the app.
    </p>
    <h2 className="text-2xl font-bold mt-8 mb-4">Personal Data You Provide</h2>
    <p className="mb-4">
      <strong>Account Credentials.</strong> In order to use the NGMP App Services,
      you are required to log in with an Account Authentication Mechanism (Full
      Name, Phone Number and Email Address, or any third-party login such as
      Google Sign-in, Apple Sign-in).
    </p>
    <p className="mb-4">
      In case of Vendor registration, you have to provide us Email Address, Phone
      Number, Brand Name, Business Model or any other business detail that
      required for us. When creating an account, NGMP stores a hashed version of
      your Account Authentication Mechanism for authentication and/or verification
      purposes. We use a third-party service provider for verification and authentication.
    </p>
    <p className="mb-4">
      <strong>Profile Information.</strong> When you create an account, you choose
      to provide us with Personal Data about yourself. For example, in the NGMP
      App, you may provide your Personal Data, such as name, email address, and
      any other information that is required to positively identify the user.
    </p>
    <p className="mb-4">
      <strong>Photos, Videos, and Audio.</strong> If you upload a photo or video,
      while using the NGMP App Services, you will be required to permit NGMP to
      access your camera, photo gallery, and microphone in which case NGMP will
      have access to the photos and videos stored in your photo gallery.
    </p>
    <p className="mb-4">
      <strong>Location and Distance Information.</strong> When you use the NGMP App,
      we collect your precise location (e.g. your latitude and longitude) ("Location")
      to determine the distance in feet or meters (“Distance Information”). Should
      you choose not to allow the NGMP App to access your location, certain features
      (such as displaying nearby user profiles or features that include Live Location
      Sharing) of the NGMP Services will not function properly. You may also revoke
      this permission and disable the location services on your device. You can do
      so on an iPhone by going to Settings, Privacy, Location Services, NGMP; and on
      Android, by going to Settings, NGMP App, Permissions, Location.
    </p>
    <p className="mb-4">
      <strong>Feedback/Support.</strong> If you provide us feedback or contact customer
      support, we collect your name and e-mail address and possibly other Personal Data
      (e.g. IP address), as well as any other content that you send to us in order to
      reply and address any issue. If you contact customer support, we also collect and
      retain certain technical diagnostic data, such as your phone model. We may keep
      records of our communication with you, including any complaints we receive from
      you about other users (and from other users about you).
    </p>
    <div className="">
      <h2 className="text-2xl font-bold mb-4">Permissions Required</h2>
      <ul className="list-disc ml-8 mb-4">
        <li>INTERNET</li>
        <li>NOTIFICATION</li>
        <li>CAMERA</li>
        <li>GPS LOCATION</li>
        <li>STORAGE</li>
        <li>MICROPHONE</li>
        <li>CONTACTS</li>
      </ul>
      <h2 className="text-2xl font-bold mb-4">Link to Third-Party Service Providers</h2>
      <ul className="list-disc ml-8 mb-4">
        <li>Google App Store Services</li>
        <li>Apple App Store Services</li>
      </ul>
      <h2 className="text-2xl font-bold mb-4">Log Data</h2>
      <p className="mb-4">
        We want to inform you that whenever you use our Service, in case of an error in the app, we collect data and information (through third-party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing our Service, the time and date of your use of the Service, and other statistics.
      </p>
      <h2 className="text-2xl font-bold mb-4">General Data Protection Regulation (GDPR)</h2>
      <p className="mb-4">
        We are a Data Controller of your information. NGMP legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Information we collect and the specific context in which we collect the information:
      </p>
      <ul className="list-disc ml-8 mb-4">
        <li>NGMP needs to perform a contract with you</li>
        <li>You have given NGMP permission to do so</li>
        <li>Processing your personal information is in NGMP legitimate interests</li>
        <li>NGMP needs to comply with the law</li>
      </ul>
      <p className="mb-4">
        NGMP will retain your personal information only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
      </p>
      <p className="mb-4">
        If you are a resident of the European Economic Area (EEA), you have certain data protection rights. If you wish to be informed what Personal Information, we hold about you and if you want it to be removed from our systems, please contact us.
      </p>
      <h3 className="text-xl font-bold mb-4">You are entitled to the following rights under applicable laws:</h3>
      <ol className="list-decimal ml-8 mb-4">
        <li>The right to access: you may at any time request to access your personal data. Upon request, we will provide a copy of your personal data in a commonly used electronic form.</li>
        <li>The right to rectification: you are entitled to obtain rectification of inaccurate personal data and to have incomplete personal data completed.</li>
        <li>The right to erase: under certain circumstances (including processing on the basis of your consent), you may request us to delete your User Data. Please note that this right is not unconditional. Therefore, an attempt to invoke the right might not lead to an action from us.</li>
        <li>The right to object: to certain processing activities conducted by the us in relation to your personal data, such as our processing of your personal data based on our legitimate interest. The right to object also applies to the processing of your personal data for direct marketing purposes.</li>
        <li>The right to data portability: you are entitled to receive your personal data (or have your personal data directly transmitted to another data controller) in a structured, commonly used and machine-readable format.</li>
      </ol>
    </div>
    <div className="">
    
    
     
      {/* CalOPPA section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">California Privacy Protection Act (CalOPPA)</h2>
      <p className="mb-4">
        CalOPPA is the first state law in the nation to require commercial websites and online services to post a privacy policy.
      </p>
      <p className="mb-4">
        According to CalOPPA, we agree to the following:
      </p>
      <ul className="list-disc ml-8 mb-4">
        <li>Users can visit our site anonymously;</li>
        <li>Our Privacy Policy link includes the word “Privacy”, and can easily be found on the home page of our website;</li>
        <li>Users will be notified of any privacy policy changes on our Privacy Policy Page;</li>
        <li>Users are able to change their personal information by emailing us at Info@nilegmp.com.</li>
      </ul>
      {/* Do Not Track Signals section */}
      {/* ... */}
      {/* CCPA section */}
      <h2 className="text-2xl font-bold mt-8 mb-4">Our Policy on “Do Not Track” Signals</h2>
      <p className="mb-4">
        We honor Do Not Track signals and do not track, plant cookies, or use advertising when a Do Not Track browser mechanism is in place. Do Not Track is a preference you can set in your web browser to inform websites that you do not want to be tracked.
      </p>
      <p className="mb-4">
        You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">California Consumer Privacy Act (CCPA)</h2>
      <p className="mb-4">
        If you are a California resident, you are entitled to learn what data we collect about you, ask to delete your data and not to sell (share) it. To exercise your data protection rights, you can make certain requests and ask us:
      </p>
      <ol className="list-decimal ml-8 mb-4">
        <li>
          <strong>What personal information do we have about you?</strong> If you make this request, we will return to you:
          <ul className="list-disc ml-8">
            <li>The categories of personal information we have collected about you.</li>
            <li>The categories of sources from which we collect your personal information.</li>
            <li>The business or commercial purpose for collecting or selling your personal information.</li>
            <li>The categories of third parties with whom we share personal information.</li>
            <li>The specific pieces of personal information we have collected about you.</li>
            <li>A list of categories of personal information that we have sold, along with the category of any other company we sold it to. If we have not sold your personal information, we will inform you of that fact.</li>
            <li>A list of categories of personal information that we have disclosed for a business purpose, along with the category of any other company we shared it with.</li>
          </ul>
          Please note, you are entitled to ask us to provide you with this information up to two times in a rolling twelve-month period. When you make this request, the information provided may be limited to the personal information we collected about you in the previous 12 months.
        </li>
        <li>
          <strong>To delete your personal information.</strong> If you make this request, we will delete the personal information we hold about you as of the date of your request from our records and direct any service providers to do the same. In some cases, deletion may be accomplished through de-identification of the information. If you choose to delete your personal information, you may not be able to use certain functions that require your personal information to operate.
        </li>
        <li>
          <strong>To stop selling your personal information.</strong> We don’t sell or rent your personal information to any third parties for any purpose. We do not sell your personal information for monetary consideration. However, under some circumstances, a transfer of personal information to a third party, or within our family of companies, without monetary consideration may be considered a “sale” under California law. You are the only owner of your Personal Data and can request disclosure or deletion at any time.
          If you submit a request to stop selling your personal information, we will stop making such transfers.
        </li>
      </ol>
      <p className="mb-4">
        Please note, if you ask us to delete or stop selling your data, it may impact your experience with us, and you may not be able to participate in certain programs or membership services which require the usage of your personal information to function. But in no circumstances, we will discriminate against you for exercising your rights.
      </p>
      <p className="mb-4">
        To exercise your California data protection rights described above, please send your request(s) by email: Info@nilegmp.com.
      </p>
      <p className="mb-4">
        Your data protection rights, described above, are covered by the CCPA, short for the California Consumer Privacy Act. To find out more, visit the official California Legislative Information website.
      </p>
      <h2 className="text-2xl font-bold mt-8 mb-4">PERSONAL INFORMATION PROTECTION AND ELECTRONIC DOCUMENTS ACT (PIPEDA)</h2>
      <p className="mb-4">
        NGMP protects the security of information in its possession. NGMP (Board of Directors, sections, volunteers, employees) adheres to the NGMP app Privacy of Information Policy. The Policy is based on the protection of privacy issues that face by the customers, the Canadian Code of Ethics, and the Personal Information Protection and Electronic Documents Act (PIPEDA).
      </p>
      <p className="mb-4">
        According to PIPEDA, personal information includes "any factual or subjective information, recorded or not, about an individual. This includes information in any form, such as age, name, email address, address, phone number."
      </p>
      <p className="mb-4">
        NGMP's Privacy of Information Policy is based on the ten principles set out in the PIPEDA.
      </p>
      <ul className="list-disc ml-8 mb-4">
        <li>
          <strong>Access:</strong> NGMP gives individuals access to their personal information in order to ensure accuracy and that the information is being used for the purposes for which it was intended.
        </li>
        <li>
          <strong>Accountability:</strong> NGMP has developed a Privacy of Information Policy and appointed a Privacy Officer.
        </li>
        <li>
          <strong>Accuracy:</strong>
          <ul className="list-disc ml-8">
            <li>NGMP makes every effort to ensure the personal information collected is accurate.</li>
            <li>The Association gives individuals reasonable opportunity to review and correct personal information in its possession.</li>
          </ul>
        </li>
        <li>
          <strong>Consent:</strong>
          <ul className="list-disc ml-8">
            <li>Implied and express consent is sought before information is shared. Customer can withdraw consent in general or as it relates to a specific activity at any time to appeal us.</li>
            <li>There may be situations in which information can and must be shared without express or implied consent. These situations include, for example, where required by law, where consent can't be reasonably obtained, where there exists a danger to others or where the information is publicly available.</li>
          </ul>
        </li>
        <li>
          <strong>Identifying the purpose for Collecting Personal Information:</strong>
          <ul className="list-disc ml-8">
            <li>NGMP collects and maintains information for internal use.</li>
            <li>Information is shared in relation to some of NGMP's ongoing activities, such as the referral service, marketing etc.</li>
          </ul>
        </li>
      <li>

      <strong>Limiting Collection</strong>
      <p className="mb-4">
        NGMP limits the collection of personal information to that information specifically needed for identified purposes.
      </p>

      </li>
      {/* Limiting Use, Disclosure and Retention */}
      <li>

      <strong>Limiting Use, Disclosure and Retention</strong>
      <ul className="list-disc ml-8 mb-4">
        <li>Information is used and/or disclosed for the purposes it is collected.</li>
        <li>Information is retained for a reasonable amount of time and destroyed when no longer of use for the purposes it is collected.</li>
      </ul>
      </li>

      {/* Openness */}
      <li>

      <strong>Openness</strong>
      <ul className="list-disc ml-8 mb-4">
        <li>NGMP makes personal information open for inspection by the person who owns the information.</li>
        <li>Requests to review personal information, change/correct personal information, or make a complaint to NGMP about the collection and/or use of personal information are directed to the NGMP Privacy Officer.</li>
      </ul>

      </li>
      {/* Provide Recourse */}
      <li>

      <strong>Provide Recourse</strong>
      <ul className="list-disc ml-8 mb-4">
        <li>All complaints about the collection and use of private information by NGMP are directed to the NGMP Privacy Officer.</li>
        <li>All complaints will be discussed with the complainant, investigated thoroughly and a timely response given to the complainant.</li>
        <li>Every effort will be made to address the issues that constitute the complaint.</li>
        <li>Individuals will be informed of the Office of the Information and Privacy Commissioner.</li>
      </ul>
      </li>

      {/* Security */}
      <li>

      <strong>Security</strong>
      <ul className="list-disc ml-8 mb-4">
        <li>Personal information is managed and stored in a secure fashion.</li>
        <li>NGMP employees are aware of and follow the NGMP Privacy of Information Policy.</li>
      </ul>
      </li>

      </ul>
      <h2 className="text-2xl font-bold mb-4">YOUR PERSONAL DATA</h2>
      <p className="mb-4">
        We are using a strong backend for our NGMP App. In the backend, all the content will be stored. All Data will remain safe and secure. No, any single information/data will send anywhere.
      </p>

      {/* SECURITY */}
      <h2 className="text-2xl font-bold mb-4">SECURITY</h2>
      <p className="mb-4">
        We value your trust in providing us with your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
      </p>

      {/* SERVICE PROVIDERS */}
      <h2 className="text-2xl font-bold mb-4">SERVICE PROVIDERS</h2>
      <p className="mb-4">
        We may employ third-party companies and individuals due to the following reasons:
      </p>
      <ul className="list-disc ml-8 mb-4">
        <li>To facilitate our Service;</li>
        <li>To provide the Service on our behalf;</li>
        <li>To perform Service-related services; or</li>
        <li>To assist us in analyzing how our Service is used.</li>
      </ul>
      <p>
        We want to inform users of this Service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.
      </p>

      {/* UPDATES OR CHANGES TO OUR PRIVACY POLICY */}
      <h2 className="text-2xl font-bold mb-4">UPDATES OR CHANGES TO OUR PRIVACY POLICY</h2>
      <p className="mb-4">
        Occasionally, we may change or update this Privacy Policy to allow us to use or share your previously collected Personal Data for other purposes. If we would use your Personal Data in a manner materially different from that stated at the time of the collection, we will provide you with a notice on our Website and in our NGMP Mobile Application indicating that the Privacy Policy has been changed or updated and request you to agree with the updated or changed Privacy Policy.
      </p>

      {/* CONTACT US */}
      <h2 className="text-2xl font-bold mb-4">CONTACT US</h2>
      <p>
        If you have any questions about this Privacy Policy, please contact us at Info@nilegmp.com.
      </p>
     </div>
  </div>
  );
};

export default Page;
