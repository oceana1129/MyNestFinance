# **MyNest Finance App**
[Live App](https://mynestfinance.netlify.app/)

[Repo](https://github.com/oceana1129/MyNestFinance)


## **General Information**
### **Introduction**
![empty dashboard](https://res.cloudinary.com/oceana-web-designs/image/upload/v1786328248/Screenshot_2026-08-09_at_7.13.02_PM_eedwne.png)

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;MyNest is a full-stack budgeting and financial planning web application designed to help young adults organize and manage their finances in a way that feels approachable, supportive, and adaptable. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The app is designed with neurodivergent users in mind. My research indicated that cognitive load, organization, and maintaining financial routines can create challenges while managing finances. MyNest focuses on breaking financial information into manageable sections while providing support, structure, and personalization. The app will let users create and manage custom income, expense, and debt items. They can compare their planned budget with actual spending, organize their financial data, and gain visual insights through their dashboard.


## **Research**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Initially before beginning the project, I wanted to do research to determine gaps found in existing financial web apps and determine what neurodivergent individuals needed from financial web apps. And then translate those findings into the visuals for the application.

### **Competitive Analysis**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I reviewed several budgeting and financial tracking platforms to understand design patterns, strengths, and pain points in existing budget applications. I focused on analyzing onboarding, organization, customization, financial visuals, and the ease of creating and managing budgets. Here are the findings on the platforms I looked at:
 - **YNAB:** had the strongest overall experience and was the closest to the direction I wanted for MyNest. It had strong onboarding, customizable categories, planned expenses, and the ability to budget across different time periods.
 - **BudgetBakers:** Had a simple, clean, and readable interface with an intuitive onboarding experience. I liked how users could make account types to distinguish between income, expenses, and transfers. However, some critical features were difficult to find and utilize. I also didn’t like the lack of budget customization.
 - **EveryDollar:** Had the most straightforward onboarding experiences. Adding expenses was simple and intuitive. It also had premade groups and categories to help users quickly establish a budget. However, this app was lacking in customization.
 - **Fudget:** was simple and intuitive with good onboarding and strong user settings. The import and export functionality was very strong and useful. However, its use of data visualization was lacking.
 - **GoodBudget:** It had a debt management system that stood out to me as a useful feature, but the overall interface was unintuitive and difficult to manage.
 - **Toshl Finance:** Had a helpful onboarding experience and strong visual feedback for budget insights. However, I found its use of a timeline confusing and felt its categorization and separation of income and expenses could be improved.
 - **Finch:** Though not a budgeting platform, it is a well loved mental health platform to help neurodivergent users feel motivated to build good habits. It has a strong visual hierarchy and provides strong personalization through its onboarding process.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The competitive analysis helped reinforce the directions I took to make MyNest simple, customizable, and approachable. I wanted to combine the guided onboarding structure seen from YNAB and EveryDollar with the customization found in Finch.

### **Academic Research**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I conducted research into the financial challenges faced by autistic and neurodivergent individuals. I also delved into approaches into financial planning and user onboarding. The research highlighted the importance of reducing cognitive load, providing clear visual information, and giving users structure and guidance to manage their finances. Here were some of the key findings summarized.
 - **Financial Management:** Research found that financial planning can be challenging, especially when users have limited experience and or insufficient resources. Maintaining routines and having clear systems can make financial planning manageable [link].
 - **Cognitive Overload:** Cognitive overload occurs when the amount of information needed for a task goes past your working limit. Managing finances can require significant mental effort and constant attention. This indicated that a strong financial interface should avoid unnecessary information or interactions to reduce mental load [link](https://journals.sagepub.com/doi/full/10.1177/13623613231191594).
 - **Visual Design:** Research into visual design for autistic users indicated stronger preferences for softer colors, visual organization, and a clear visual hierarchy. Research identified blues, greens, and pastels as commonly preferred colors [link](https://ir.uitm.edu.my/id/eprint/71264/). Strong reds and yellows were found visually displeasing [link](https://www.proquest.com/docview/2884489452?fromopenview=true&parentSessionId=8DM0Gb4%2BCJGrAcugkXsKaRZOFeu9Ntp0Xs4Pw2W9WD8%3D&accountid=12826&sourcetype=Scholarly%20Journals).
 - **Organization:** Creating categories and subcategories were relevant for a strong budgeting experience. Thereby, providing users with a structured way to break large financial tasks into smaller pieces was noted as important. This influenced MyNests hierarchy of months into categories into items into activities [link](https://www.politesi.polimi.it/handle/10589/175204?mode=complete).
 - **Onboarding:** Research into onboarding emphasized the need and want for clarity, concise information, personalization, and helping users understand the value of the product early into the experience. This influenced the need for MyNest to implement a strong and personalized onboarding process [link](https://www.politesi.polimi.it/handle/10589/175204?mode=complete).
 - **Reminders:** Research indicated the importance of providing support and reminders when managing finances. This indicated to me that future implementations of the application should incorporate support features and notifications for users [link](https://www.politesi.polimi.it/handle/10589/175204?mode=complete).



### **Key Features**
Here are some of the features of the app:
#### **Authentication and Personalization**
![onboarding image](https://res.cloudinary.com/oceana-web-designs/image/upload/v1786328246/Screenshot_2026-08-09_at_6.45.36_PM_vehjjd.png)

 - **Account Creation:** users can create accounts, log in and manage existing accounts.
 - Email Authentication:** user accounts are authenticated via Firebase.
 - **User Preferences:** users can save preferences to their account for how their financial information is displayed including currency and decimal values.
 - **Personalized Onboarding:** users go through onboarding to create personalized budgeting categories and recommendations, or skip recommendations altogether.
 - **Continued Onboarding:** users can leave and resume onboarding where they left off.

#### **Budget Management**
![user dashboard looking at an item](https://res.cloudinary.com/oceana-web-designs/image/upload/v1786328249/Screenshot_2026-08-09_at_7.10.16_PM_jgmx77.png)

 - **Monthly Budgets:** users can create and manage budgets for each month.
 - **Toggle Between Budgets:** users can navigate between their different monthly budgets.
 - **Budget Categories:** users can separate their budget into different financial categories such as transportation, rent, food, income, etc.
 - **Budget Items:** users can create buckets for items they spend in their budgets, such as groceries, dining out, and delivery under Food.
 - **Customizable Visuals:** users can set categories and items to have specific visuals. They can visually separate items by colors and icons.
 - **Monthly Insights:** users can view monthly spending activity, income and expense summaries, planned versus actual spending, and personalized budget insights.

#### **Financial Activity**
 - **Log Financial Activity:** users can log financial activity such as paychecks, purchases, payments, and other transactions.
 - **Activity Details:** users can include information such as transaction amounts, dates, and notes.
 - **Activity History:** users can view previously recorded activity for each budget item.

#### **Insights**
![user with filled out dashboard and insights](https://res.cloudinary.com/oceana-web-designs/image/upload/v1786328249/Screenshot_2026-08-09_at_7.09.44_PM_nuoevi.png)

 - **Budget Dashboard:** users can view monthly financial data and gain insights over their monthly spending habits
 - **Planned vs. Actual:** users can compare planned amounts against actual spending at the budget, category, and item levels.
 - **Monthly Insights:** users can view recent spending activity, income, expenses, remaining budget, and other monthly insights.
 - **Category and Item Insights:** users can view their categories and items to see more detailed spending information.
 - **Dashboard Navigation:** users can navigate from the monthly overview, to category, to item, to activity to progressively explore their financial data.

### **How to Use MyNest**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Go to the live application here: [myNestFinance](https://mynestfinance.netlify.app/). View the homepage to get a general idea of the application. Sign up and create an account. Go through the onboarding to set up a budget for yourself or skip onboarding altogether and create a budget from scratch. Create a budget for the month. Set up categories for the month such as Transportation and Food. Add items inside the categories to break it down further such as Groceries under a Food category. Then add any recent activity logs to your budget. You can customize your financial data at any time by adding, editing, or removing information. You can log out or manage your account at any time.


## **How it’s Made**
**Technologies used:** *JavaScript, React, Tailwind CSS, MongoDB, Mongoose, Express, Node.js, Firebase Authentication, and Jest*
![system architecture](https://res.cloudinary.com/oceana-web-designs/image/upload/v1786329300/212fdc2f-9c90-4ed0-a83c-1f3547b61d1b.png)


### **Frontend**
 - **React:** built visual frontend with reusable UI components using React state, props, and component based architecture.
 - **Tailwind CSS:** used to stylize the application and create a consistent visual system for all visuals and create more responsive layouts.
 - **Firebase Authentication:** handles user auth and maintains user auth sessions.
 - **Rest API:** frontend communicates with Express to create, read, update, and delete data.
 - **State Management:** manage states for budgets, categories, items, activities, user settings, navigation, and inspector navigation.
 - **Components:** reusable components for lists, forms, buttons, dialogs, and sections.

### **Backend**
 - **Node.js/Express:** built REST API and organizes endpoints into routes and controllers.
 - **MongoDB/Mongoose:** store users, budgets, categories, items, logs, and more.
 - **Authentication/Authorization:** verifies Firebase tokens and ensures users can only access their own financial data.
 - **CRUD Operations:** implemented endpoints for creating, reading, updating, and deleting budgets, categories, items, and activities.
 - **Validation/Error Handling:** added validation, auth checks, duplicate object handling, and appropriate HTTP error responses.
 - **Jest/Supertest:** used to test backend controllers, API endpoints, CRUD operations, authorization, and cascades.

### **Deployment**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Frontend deployed with Netlify. Backend deployed on Render. Database deployed on MongoDB Atlas. Authentication added to Firebase Authentication.


## **Optimizations**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As a project with a large scale and limited time scope, there are many features and improvements I would love to continue adding and refining.

#### **Frontend**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Overall, there are several improvements I would like to make to the frontend.There are still some visual bugs, especially prominent on the dashboard, such as deleted items sometimes remaining visible even though they’ve been successfully removed from the backend. Some components could also be decomposed further to make them more reusable and easier to maintain. Some systems, such as the Lucide icon system, were introduced later in development, making it too time consuming to refactor some of the earlier hard coded implementations. 

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I would definitely like to add more thorough code documentation throughout the frontend. I would also like to develop frontend tests to catch UI and component issues without having to rely entirely on manual testing.

#### **Backend**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The backend is in an overall strong state, so there are fewer improvements I would make to it. I would add more tests for edge cases, additional error handling and status codes, more documentation, and additional endpoints to generate financial insights.

#### **Additional Features**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;There were several features that did not fit into the scope of an MVP. Here are some of the major ones I wanted to include:
 - **Insights Page:** A page where you can see your finances visualized with charts. This would include specific insights into a year and particular budget months. The idea would be that a user could see additional insights not seen on their dashboard page.
 - **Import Page:** A page where you could download a financial excel sheet template. Users could fill it out and upload it to the platform to seamlessly create budgets.
 - **Debt Insights:** Users can currently add debt items, but they are treated the same as a typical expense. There are already backend endpoints in place to create additional insights, but the front end components had not been created to connect them.
 - **Recurring Expenses:** I wanted users to be able to mark if an item or activity log was recurring so that way they wouldn’t have to manually add redundant items such as rent or a utility which is the same each month.
 - **Reorder Categories and Items:** I wanted users to have the ability to reorder their categories and items within the categories around for further customization.
 - **Copied Budget Categories:** I wanted to create an option where when creating a new category, you could copy over a previous month to save the user time.
 - **Light and Dark Mode:** A way for the user to toggle between light and dark modes.
 - **Notifications:** I would have liked to add email or in-app notifications so the user could be reminded of upcoming payments and whatnot.
 - **Email Verification:** When signing up a new user, I would have liked to use the email verification process provided by Firebase.
 - **Mobile Responsiveness:** More than half of users use their phone when navigating web pages. Having a responsive view for users is something I was unable to incorporate for all screens and components.

#### **Accessibility**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Accessibility was another area I would have liked to spend more time improving. Especially given the target demographic often rely on accessibility tools to navigate online. Here are some major improvements I would have liked to include:
 - **Keyboard Navigation:** Ensuring users can navigate the platform with only a keyboard.
 - **Screen Readers:** Improving overall semantic HTML, labels, and ARIA attributes so important information can be communicated to screen readers.
 - **Color Contrast:** Reviewing the color system to ensure text, icons, buttons, and other visual elements have enough contrast.
 - **Focus States:** Adding clear focus states for all visual elements.

#### **User Research**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;As with any good product, MyNest should be designed around the needs, expectations, and behaviors of its users. Given I had more time, I would have liked to have done more extensive user research during the design process. I wanted to better understand how users approach budgeting, where they experience friction when managing their finances, and how different visual presentations affect their perception of financial information.
 - **Usability Tests:** I would have liked to set up tests and determine if users are able to complete tasks as given. I wanted to determine any pain points and issues users would have while creating a budget, completing onboarding, adding a new category, adding an expense, and viewing their monthly spending. Ideally, I would have combined these tests with cognitive walkthroughs to evaluate if the UI provided enough information to the users to figure out the intended interactions themselves.
 - **Interviews:** I wanted to set up interviews with users who fit the target demographic. I already had some individuals who gave me consent for interviews who fit the target demographic. But given time constraints, I was unable to go forward with interviewing them. Given additional time to do so, I would have liked to determine what their personal preferences are when using financial applications. What are the features they find helpful and what they find reductive. Determine how they personally organize their budget. And if they don’t budget, what stops them from doing so. These insights could have helped validate particular assumptions I made during research and identified feature opportunities I hadn’t considered.
 - **A/B tests:** When coming up with the design for the application, there were several different visual directions to take to present visual information. Particularly when it came to visuals for a user's budget and insights over their spending. What I would have liked to have done is see which particular sets of visuals had the most visual clarity to users. Another additional concern I had was to see if certain visual information was too harsh for users. For example, it was important to present any ‘over budget’ state using warning colors, but this could’ve potentially made the experience feel harsh or discouraging.
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The goal of this research would have been to not just determine if users could use MyNest, but if the application made budgeting feel clear, manageable, and approachable.

## **Lessons Learned**
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;There were a lot of things I learned throughout this project. The integral thing I learned throughout this process was how to develop a strong system architecture for a project from scratch. I have previously worked to design full visual systems that were handed off to development teams. But this was my first time designing the whole visual design, frontend, backend, and deployment process for a full stack application from conception to completion.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This meant delving deep to determine what technologies, components, services, and systems were necessary to make the MVP possible. Having full reign over design and development decisions showed me how closely these two areas need to work together.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;I gained experience with technologies I had not worked with extensively before, particularly MongoDB and Tailwind CSS and have become much more comfortable building applications with them.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Throughout development, I also learned to implement concepts I had previously only encountered in discussions and learning, such as protected routes, progressive rendering, user authentication, Rest APIs, and full-stack state management. Implementing these systems gave me a much better understanding of how they work together to build a real application.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;This project also served as a lesson on how important documentation or organization was to the management of the application. It became important to maintain clear structures for components, endpoints, models, and application states. The more I could create components or reusable systems for the application, the better off I was in developing. Conversely, areas that were built quickly without enough consideration for reuse or documentation became more difficult to modify later.

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Overall, the project taught me that building a full stack application is not just about getting individual features working. It taught me that architecture, organization, reusability, and planning have a significant impact on how manageable a project becomes as it grows.
