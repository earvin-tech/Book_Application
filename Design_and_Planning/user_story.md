## User Stories

# User Story Example

 "**As a** frequent reader who loves exploring new books,<br>
 **I want** to receive personalized book recommendations based on my reading history and preferences,<br>
**so that I** can easily discover books I’m likely to enjoy without spending hours searching."

1. **User/Persona**
 - "Frequent reader who loves exploring new books."

- This persona represents a user who is actively engaged in reading and values discovering new books.

2. **Need/Justification:**

- "I can easily discover books I’m likely to enjoy without spending hours searching."

- This highlights the user’s need for a more efficient way to find books tailored to their interests.

3. **Want/Feature/Function:**

- "Receive personalized book recommendations based on my reading history and preferences."

- This describes the specific feature the user wants, which is a recommendation system powered by their activity and preferences.

## How This User Story Translates to Development

- **Feature:** Implement a recommendation engine that analyzes the user’s reading history, ratings, and preferences to suggest books. (e.g book rated over 3 stars will be generate similar books)

- **Backend:** The server processes the user’s data and generates recommendations using algorithms (e.g., collaborative filtering or content-based filtering).

- **Frontend:** The client displays the recommendations in an easy-to-navigate section of the app (e.g., a "Recommended for You" carousel). 

---

 
"**As a** busy professional who struggles to find time to read,<br>
**I want** to set reading goals and track my progress,<br>
**so that** I can stay motivated and ensure I’m making time for reading."

1. **User/Persona:**

- "Busy professional who struggles to find time to read."

- This persona represents a user with limited free time who values structured reading habits. (e.g reading goal of 5-10 pages a night)

2. **Need/Justification:**

- "Stay motivated and ensure I’m making time for reading."

- this highlights the user’s need for a tool to help them prioritize reading in their busy schedule. (e.g reward pop-up congratulating for reaching goal)

3. **Want/Feature/Function:**

- "Set reading goals and track my progress."

- This describes the specific feature the user wants, which is a reading progress tracker with goal-setting functionality.

## How This User Story Translates to Development ## 
- **Feature**: Implement a reading progress tracker that allows users to set goals (e.g., "Read 20 pages per day") and track their progress (e.g., percentage completed, pages read).

- **Backend:** The server stores the user’s goals and progress data in the database and calculates metrics like completion percentage.

- **Frontend:** The client displays the progress visually (e.g., a progress bar or checklist) and sends reminders or notifications to keep the user on track.

### **Account Creation and Authentication**

**User Story:** As a new user, I would like to be able to simply create an account by using my email address, social media, or a username and password. This would allow me to access my personalized reading environment in a secure manner.

- **Need/Justification:** When it comes to user adoption and confidence, security and simplicity of access are extremely important factors. In order to respond to the preferences of users and improve accessibility, providing different sign-up alternatives is essential.

- **Want/Feature/Function:** It should be possible for users to sign up for the app and log in using their email addresses, social media accounts, or a username that is accompanied by a password.

- **Development Translation:**  The use of OAuth for social media integrations, a secure email verification mechanism, and encrypted password storage are all desirable features. Create an authentication module for users that can accommodate a variety of different login methods.

### **Book Rating System**

**User Story:** Being a bookworm, I want to evaluate books I have read using a 1-5 rating system and give reviews so I may share my thoughts with the community and impact book suggestions.

- **Need/Justification:** Users are able to browse and express their thoughts on books through rating systems, which helps to cultivate a community of readers and provides assistance with decision-making capabilities.

- **Want/Feature/Function:** In addition to being able to post written reviews, users are also able to evaluate books on a scale ranging from one to five stars.

- **Development Translation:** Create a database schema that includes user IDs, book IDs, ratings, and reviews. Implement front-end components for users to submit ratings and reviews and backend logic to calculate average ratings and display reviews.

### **User feed/Activity stream**

**User Story:** As a reader who likes to discuss books with friends, I would like to be able to see what my friends are reading and recommending, as well as what they rate their books. This would allow me to seek other options of books and know what my friends are interested in too.

- **Need/Justification:** To fulfil the social aspect of this app, allowing users to see their friends activity is a must-have feature.

- **Want/Feature/Function:** Users should be able to see recommended books from friends and rating of books.

- **Development Translation:**  We use the engine developed to analyze a user’s reading history, ratings, and preferences to suggest books. However we now make it public for the user's friends so that recommendations come through a feed. We also allow friends data to be seen by the user. This data will all be requested from the server. It will be displayed to the client randomized to similar to other social media feeds.