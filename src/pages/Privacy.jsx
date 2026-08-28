const privacyContent = {
  hero: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    description:
      "Information about how Hindus of Georgia PAC (HiPAC) collects, uses, and handles information provided through this website.",
    backgroundImage:
      "https://hindusofgeorgia.com/wp-content/uploads/2024/09/Blue-and-White-Modern-Civil-Right-Day-A4-Flyer.png",
  },

  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      content: (
        <p>
          Our website address is:{" "}
          <a
            href="http://hindusofgeorgia.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://hindusofgeorgia.com
          </a>
          .
        </p>
      ),
    },

    {
      id: "comments",
      title: "Comments",
      content: (
        <>
          <p>
            When visitors leave comments on the site we collect the
            data shown in the comments form, and also the visitor’s
            IP address and browser user agent string to help spam
            detection.
          </p>

          <p>
            An anonymized string created from your email address
            (also called a hash) may be provided to the Gravatar
            service to see if you are using it. The Gravatar service
            privacy policy is available at{" "}
            <a
              href="https://automattic.com/privacy/"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://automattic.com/privacy/
            </a>
            .
          </p>

          <p>
            After approval of your comment, your profile picture is
            visible to the public in the context of your comment.
          </p>
        </>
      ),
    },

    {
      id: "media",
      title: "Media",
      content: (
        <p>
          If you upload images to the website, you should avoid
          uploading images with embedded location data (EXIF GPS)
          included. Visitors to the website can download and extract
          any location data from images on the website.
        </p>
      ),
    },

    {
      id: "cookies",
      title: "Cookies",
      content: (
        <>
          <p>
            If you leave a comment on our site you may opt-in to
            saving your name, email address and website in cookies.
            These are for your convenience so that you do not have
            to fill in your details again when you leave another
            comment. These cookies will last for one year.
          </p>

          <p>
            If you visit our login page, we will set a temporary
            cookie to determine if your browser accepts cookies.
            This cookie contains no personal data and is discarded
            when you close your browser.
          </p>

          <p>
            When you log in, we will also set up several cookies to
            save your login information and your screen display
            choices. Login cookies last for two days, and screen
            options cookies last for a year. If you select
            “Remember Me”, your login will persist for two weeks. If
            you log out of your account, the login cookies will be
            removed.
          </p>

          <p>
            If you edit or publish an article, an additional cookie
            will be saved in your browser. This cookie includes no
            personal data and simply indicates the post ID of the
            article you just edited. It expires after 1 day.
          </p>
        </>
      ),
    },

    {
      id: "embedded-content",
      title: "Embedded content from other websites",
      content: (
        <>
          <p>
            Articles on this site may include embedded content
            (e.g. videos, images, articles, etc.).
          </p>

          <p>
            Embedded content from other websites behaves in the
            exact same way as if the visitor has visited the other
            website.
          </p>

          <p>
            These websites may collect data about you, use cookies,
            embed additional third-party tracking, and monitor your
            interaction with that embedded content, including
            tracking your interaction with the embedded content if
            you have an account and are logged in to that website.
          </p>
        </>
      ),
    },

    {
      id: "data-sharing",
      title: "Who we share your data with",
      content: (
        <p>
          If you request a password reset, your IP address will be
          included in the reset email.
        </p>
      ),
    },

    {
      id: "retention",
      title: "How long we retain your data",
      content: (
        <>
          <p>
            If you leave a comment, the comment and its metadata are
            retained indefinitely. This is so we can recognize and
            approve any follow-up comments automatically instead of
            holding them in a moderation queue.
          </p>

          <p>
            For users that register on our website (if any), we also
            store the personal information they provide in their user
            profile. All users can see, edit, or delete their personal
            information at any time (except they cannot change their
            username). Website administrators can also see and edit
            that information.
          </p>
        </>
      ),
    },

    {
      id: "your-rights",
      title: "What rights you have over your data",
      content: (
        <p>
          If you have an account on this site, or have left
          comments, you can request to receive an exported file of
          the personal data we hold about you, including any data
          you have provided to us. You can also request that we erase
          any personal data we hold about you. This does not include
          any data we are obliged to keep for administrative, legal,
          or security purposes.
        </p>
      ),
    },

    {
      id: "data-use",
      title: "Where your data is Used",
      content: (
        <>
          <p>
            Visitor comments may be checked through an automated
            spam detection service.
          </p>

          <p>
            If you sign up to receive text messages from us, we will
            use it to send you text message updates from Hindus of
            Georgia PAC (aka HiPAC).
          </p>

          <p>
            We may also collect, store, and use your mobile phone
            number to send you other text messages from HiPAC.
          </p>

          <p>
            We will also collect and store other personally
            identifiable information, such as your name, address,
            phone number, mobile phone number, e-mail address,
            username, and/or similar information you may choose to
            provide to us.
          </p>

          <p>
            In addition, as noted above, we may share this
            information, including your mobile phone number, with
            our affiliates, partners, and other organizations or
            entities.
          </p>

          <p>
            However, text messaging originator opt-in data and
            consent will not be shared with any non-associated
            and/or non-related third-party individual, brand, or
            entity except for with vendors, consultants and other
            service providers who need access to such information to
            carry out work on our behalf (and who will not use such
            information for their own purposes).
          </p>
        </>
      ),
    },
  ],
};

export default function Privacy() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hipac-brown">
        <div className="absolute inset-0">
          <img
            src={privacyContent.hero.backgroundImage}
            alt=""
            className="h-full w-full object-cover opacity-25"
          />

          <div className="absolute inset-0 bg-hipac-brown/85" />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.25em] text-hipac-orange">
              {privacyContent.hero.eyebrow}
            </p>

            <h1 className="mt-4 font-heading text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
              {privacyContent.hero.title}
            </h1>

            <p className="mt-6 max-w-2xl font-body text-lg leading-8 text-white/75">
              {privacyContent.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-hipac-warm-white px-5 py-16 lg:px-8 lg:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[240px_1fr]">
          {/* Table of contents */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-heading text-xs font-bold uppercase tracking-[0.2em] text-hipac-orange">
              On this page
            </p>

            <nav className="mt-5">
              <ul className="space-y-3">
                {privacyContent.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="font-body text-sm text-hipac-muted transition-colors hover:text-hipac-orange"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Policy */}
          <article className="min-w-0 rounded-2xl border border-hipac-border bg-white px-6 py-8 shadow-card sm:px-10 sm:py-12 lg:px-14">
            <div className="mb-10 border-b border-hipac-border pb-8">
              <p className="font-body text-sm leading-6 text-hipac-muted">
                Please review the following information regarding
                privacy and data handling on this website.
              </p>
            </div>

            <div className="space-y-12">
              {privacyContent.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-24"
                >
                  <h2 className="font-heading text-2xl font-extrabold tracking-tight text-hipac-brown sm:text-3xl">
                    {section.title}
                  </h2>

                  <div className="mt-5 space-y-5 font-body text-sm leading-7 text-hipac-muted sm:text-base sm:leading-8">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}