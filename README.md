# REACTionary Canary

A variation on my project "Canary Compliments" done using the React JS framework. I used a tutorial on the MERN stack which can be found [here](https://medium.com/@bryantheastronaut/ok-here-we-go-b9f683c5a00c). I also used a some code from the above mentioned [project](https://github.com/lukerollins/Canary_Compliments) for the backend. It does the basic CRUD operations. 

In order to run this project:

1. Clone the repository.
2. Download the dependencies;

    1. In the main folder (the one named REACTionary_Canary, that has all the other folders and files in it) and run `npm install` as well as `yarn install`.
    2. Go into the `client` folder and do the same.


3. Make sure you have Mongo Database (`mongod`) installed on your system. If you don't, download it on to your system the start `mongod` in whatever manner necessary for your operating system.

4. After starting Mongo Database, make sure you're in the main directory (REACTionary_Canary, as mentioned above), and run `yarn run start:dev`. A window for your default browser (or tab, if you're already running your default browser) should open displaying the project.

**Heads up for those of you running Ubuntu 18.10:** If you get an error while running `yarn run start:dev` and get an `EPOSPC`
error, running this code worked for me: `echo fs.inotify.max_user_watches=2048000 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`. For more info on this error go [here](https://github.com/facebook/jest/issues/3254).
     