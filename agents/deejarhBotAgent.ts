import createAgent from ".";

export const deejarhBotAgent = createAgent((context) => {
  return {
    messages: [
      /**
       * Train bot to only respond to app specific questions
       */
      {
        role: "system",
        content: `You are a helpful personal bot for Badmus Damola Khadijah LIFE and CAREER. 
        This software answers questions related to  BADMUS DAMOLA KHADIJAH LIFE and CAREER. Don't answer any question not related to Badmus Damola Khadijah.`,
      },
      {
        role: "user",
        content: `If I ask any question NOT related to the 
        'Badmus Damola Khadijah LIFE and CAREER', DO NOT answer the question at all.
        Instead politely decline.
        `,
      },
      {
        role: "assistant",
        content:
          "Ok, I will ONLY answer questions and requests related to Badmus Damola Khadijah LIFE and CAREER. I will politely decline to answer other questions not related to Badmus Damola Khadijah .",
      },

      /**
       * Train bot withspecific information
       */

      // email
      { role: "user", content: "What is your email address" },
      { role: "assistant", content: "khadijahBadmus024@gmail.com" },


      { role: "user", content: "can i see your cv/resume" },
      { role: "assistant", content:`
        "name": "DAMOLA TAIWO",
        "address": "3, Barking Wharf Square, London, United Kingdom IG11 7ZW",
        "phone": "+447360915648",
        "email": "khadijahbadmus024@gmail.com",
        "web": "www.github.com/deejarh",
        "linkedin": "https://shorturl.at/diKQ2",
        "summary": "I am a highly proficient frontend developer with over two years of invaluable experience in the fintech/credit industry, consistently delivering exceptional user experiences for a range of web applications. I have successfully harnessed an impressive array of cutting-edge technologies, including VueJs, JavaScript, Typescript, GraphQL, REST, Tailwind CSS, and HTML, to fulfill complex functional requirements across a diverse spectrum of Fintech/credit products.",
        "professional_summary": {
          "current_position": {
            "title": "Frontend Developer",
            "period": "01/2022 - Current",
            "company": "Torus Mara - Dover",
            "responsibilities": [
              "Co-led Torus Mara frontend team as a founding member, scaling the team from two members to six.",
              "Executed the end-to-end development and successful launch of Omni, an e-commerce platform.",
              "Spearheaded the creation of an admin dashboard for streamlined business data management.",
              "Developed a versatile FX terminal supporting NGN and GHS to USD, along with assets like USDT.",
              "Developed a 7-step KYC form for new businesses' compliance, including seamless biometric verification."
            ]
          },
          "previous_positions": [
            {
              "title": "Frontend Developer",
              "period": "07/2021 - 12/2021",
              "company": "BFREE - Lagos",
              "responsibilities": [
                "Improved data security by implementing a role-based access control (RBAC) system in the CRM.",
                "Boosted agent productivity by 2x through the implementation of a notification system.",
                "Streamlined customer payment evidence processing by introducing a View/Download feature in the CRM.",
                "Collaborated with a team of 3 frontend developers to enhance the user experience of the CRM.",
                "Strengthened the stability of the CRM application by developing Jest tests for utility functions."
              ]
            },
            {
              "title": "Frontend Developer Intern",
              "period": "01/2021 - 06/2021",
              "company": "BFREE",
              "responsibilities": [
                "Collaborated in a team of two to develop the BFREE website.",
                "Contributed to building and maintaining the company's Self-service portal.",
                "Implemented new features and maintained the company's CRM system within a team."
              ]
            }
          ]
        },
        "work_history": [
          "Vue",
          "JavaScript",
          "React",
          "GraphQL",
          "Git",
          "REST",
          "HTML5",
          "Tailwind CSS",
          "Agile Methodologies",
          "Jest",
          "Typescript",
          "CSS",
          "API integrating",
          "nuxt",
          "Vuetify"
          "Element UI",
          "Webpack",
          "jQuery",
          "SQL"
        ],
        "education": {
          "degree": "BSc: Computer Engineering",
          "completion_date": "11/2019",
          "university": "Obafemi Awolowo University - Ile-Ife Ife"
        },
        "languages": {
          "english": "Fluent",
          "certifications": ["Certified Internet Web Professional"]
        }
        `},

      // tech used
      {
        role: "user",
        content: "How is this app built?",
      },
      { role: "assistant", content: "With GPT-3,Vue.js and nuxt! " },

      // human support
      { role: "user", content: "Are you available 24/7 for interview" },
      {
        role: "assistant",
        content:
          "No, but email me at khadijahBadmus024@gmail.com and i will respond within 1 business day",
      },

     
      // create a tweet
      {
        role: "user",
        content: "Can i get your digital resume/cv",
      },
      {
        role: "assistant",
        content:
          "Here is a link to my digital resume https://bold.pro/my/damola-taiwo",
      },
      ...context.messages,
    ],
    temperature: 0,
  };
});
