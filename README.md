# LocationPro

<p align="center">
  <img src="https://pyslarash.com/wp-content/uploads/2023/05/locationpro-350.gif" />
</p>

### About

It started as a final project for [4Geeks Academy](https://www.github.com/4GeeksAcademy).

The development of this version spanned approximately three weeks, with the central component of the project—the database—being completed in just three days. It should be noted that it is still a working prototype, exhibiting occasional issues and in need of further UI/UX refinement. Nonetheless, the core concept of this application is evident.

LocationPro was born out of the pervasive housing issue in the United States. During the COVID-19 pandemic, a significant population shift occurred towards the "Sun Belt" states. This mass migration sparked a considerable surge in housing costs for both homeowners and renters. As the founder of Not Your Average Logistics, I, Alex, had the opportunity to explore 48 states (excluding the largest and smallest) and discovered numerous remarkable mid-sized towns which hold immense potential for many individuals.

Regrettably, most people gravitate towards large cities, often overlooking these mid-sized towns. These overlooked locations, however, can offer superior cost of living, reduced traffic, and an overall more enjoyable residential experience.

LocationPro is designed to help people discover these hidden gems.

Now, let's delve into more detail about the build process.

#### The Database

The construction of our database was completed in a period of three days, fueled by extensive research across a myriad of open sources. Numerous Excel tables were meticulously consolidated to generate a comprehensive dataset. We then embarked on a rigorous data cleansing process to eliminate any redundancies, resulting in a robust database encompassing approximately 20,000 items.

Initially, our work was based on the PostgreSQL database system. However, due to its superior flexibility and enhanced performance with large data sets, we eventually transitioned to MySQL. This strategic shift was aimed at optimizing our data management practices to effectively handle the vast amounts of information integral to our project.

#### Front End

Our front-end framework is built around React.js, a powerful and versatile JavaScript library renowned for its scalability and efficiency in building user interfaces. The choice of Material UI further bolsters our design strategy, offering a sleek, contemporary aesthetic and an array of robust components that enhance the user experience.

Of note, Redux was employed for state management, providing a reliable and efficient way to handle changes in the application's state over time. We also made extensive use of core web technologies: HTML, CSS, and JavaScript. These foundational elements allowed us to create a more engaging and dynamic user interface, enriching the overall user interaction with our platform.

#### Back End

Our backend architecture operates on Python, a highly readable and versatile programming language renowned for its broad applicability in a variety of domains. We utilize Flask, a lightweight yet robust web framework, for creating our API endpoints. The streamlined nature of Flask makes it an ideal choice for our project, allowing for quick and efficient development of backend services.

A standout feature of our backend is the implementation of a sophisticated filtering solution. This component, designed with meticulous attention to detail, enables swift and precise retrieval of information from our extensive database. By employing such a tool, we ensure a seamless and efficient user experience when interacting with our platform, making data access quick and effortless.

### Technologies Used

<img height=50 src="https://user-images.githubusercontent.com/25181517/192158954-f88b5814-d510-4564-b285-dff7d6400dad.png" /><img height=50 src="https://user-images.githubusercontent.com/25181517/183898674-75a4a1b1-f960-4ea9-abcb-637170a00a75.png" /><img height=50 src="https://user-images.githubusercontent.com/25181517/117447155-6a868a00-af3d-11eb-9cfe-245df15c9f3f.png" /><img height=50 src="https://user-images.githubusercontent.com/25181517/183897015-94a058a6-b86e-4e42-a37f-bf92061753e5.png" /><img height=50 src="https://user-images.githubusercontent.com/25181517/187896150-cc1dcb12-d490-445c-8e4d-1275cd2388d6.png" /><img height=50 src="https://user-images.githubusercontent.com/25181517/189716630-fe6c084c-6c66-43af-aa49-64c8aea4a5c2.png" /><img height=50 src="https://user-images.githubusercontent.com/25181517/183423507-c056a6f9-1ba8-4312-a350-19bcbc5a8697.png" /><img height=50 src="https://user-images.githubusercontent.com/25181517/183423775-2276e25d-d43d-4e58-890b-edbc88e915f7.png" /><img height=50 src="https://user-images.githubusercontent.com/25181517/183896128-ec99105a-ec1a-4d85-b08b-1aa1620b2046.png" /><img height=50 src="https://user-images.githubusercontent.com/25181517/117208740-bfb78400-adf5-11eb-97bb-09072b6bedfc.png" />

### Installation
=======
This is a little JavaScript app I created following the tutorial by WebDev Simplified. It's a fully-working calculator app that can perform all the basic functions such as addition, substraction, multiplication, and division.

The app is using object-oriented programming.

You can watch the full tutorial here: 
```
https://www.youtube.com/watch?v=j59qQ7YWLxw
```

### Technologies Used

<img height=50 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" /><img height=50 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" />
<img height=50 src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" />

### Installation
```
$ git clone https://github.com/pyslarash/calculator.git
$ cd /backend
$ pip install pipenv
$ pipenv shell
$ python app.py
$ cd ..
$ npm install
$ npm run start
```