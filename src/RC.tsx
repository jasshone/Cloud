

export default function RC(){
    
    return (
        <div id="error-page">
        <img src = "https://platform.vox.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/15788040/20150428-cloud-computing.0.1489222360.jpg?quality=90&strip=all&crop=12.5,0,75,100" className="logo"></img>
          <h1>Cloud Resume Challenge</h1>
          <h2>I've been working on the cloud resume challenge, here's what I learned.</h2>
          <h3>My background</h3>
          <p>
            I completed a web dev course back in this January, so I had some prior experience with web dev which helped a lot.
            My primary knowledge is in the <strong>MERN stack</strong>, most of which I continued using during this challenge, except for using <strong>typescript</strong> instead of <strong>javascript</strong>.
            I haven't completed the entire challenge yet but I believe I will also use a different database instead of <strong>Mongo DB</strong>.
          </p>
          <h3>Step 1: Basic Setup</h3>
          <p>
            Step 1 of the course was to get a website set up and running on AWS. A couple things I learned: 1. AWS account setup + authentication, 2. How to manage organizations and setup different accounts with different permissions on AWS, 3. How to start running a S3 static site on AWS, 4. How to add HTTPS protection to the site through Cloudfront, 5. How to link the website to a domain name using Route 53.
            <br/>
            One big challenge was that AWS kept throwing an error when I was trying to register my domain name :( This is not yet resolved, unfortunately. (followup, the person I reached out to from AWS said they resolved my issue but it wasn't resolved so...)
            It was also fun to refresh my knowledge of web dev + learn a bit of typescript, which is more similar to javascript than I thought.
            This step was mostly not that hard and pretty fun.
          </p>
          <h3>Step 2: Custom API Endpoint</h3>
          <p>
            The next thing I did was create a custom API endpoint for my website to show a website counter. My initial attempt consisted of using only the AWS CLI to do everything (including coding in Python on the CLI) and then after I finished everything, I tried using a React hook to display the result of the API call. I'm not too sure now since I'm a bit removed from this stage, but I believe my API wasn't working properly, and also I was told in the challenge to do everything using SAM instead. 
            As such, I had to redo basically all of my work and start from scratch to programmatically accomplish the same thing.
            The main technologies I used was AWS SAM, Lambda, DynamoDb, and API Gateway.
          </p>
          <h3>Step 2.1: Funny Errors</h3>
          <p>
            The SAM CLI setup/usage was very annoying because I kept running into a permissions error when doing initial setup. To fix this, I had to change the permissions from PowerUserAccess to Administrator. 
            Another really weird issue that took me a long time to resolve was that I defined my API programmatically but I thought I needed to enable Lambda proxy integration/change the API directly from the gateway.
            However, I couldn't find any of the things like the CloudFormation stack or APIs or lambda function on my account. I also didn't see anything online despite digging around about this kind of really weird error.
            Turns out that my AWS CLI was set to the us-west-2 region but my accounts were on us-east-2, and AWS regions are separated on both the IAM and in resources! I guess this makes sense for large organizations, but for my one person organization this caused a large amount of confusion.
            While I was trying to figure out this problem, I had to shut down my IAM Identity Center at least 3 times to change the region, because initially I was going to just migrate everything to us-west-2 but apparently AWS checks your local time against the server time and throws an error if they don't match.
            Another issue which I alluded to previously was that the input to my lambda function (event) was blank. To resolve this, I redefined my API to follow Http to set up Lambda proxy integration and then changed the key I used from the event JSON from "httpMethod" to "routeKey" instead. 
          </p>
          <h3>Step 3: Automatic CI/CD</h3>
          <p>
            Not going to lie, this step was really cool when it was finished. Basically, I built an automatic pipeline such that when I pushed to Github, there were some automatic tests run and then the website would be automatically updated in the S3 bucket. 
            The way that I did this was through Github Actions + Playwright + pytest. Originally, I tried a lot more complicated methods but they didn't work because the guides were usually somewhat outdated. For example, I almost finished doing an automatic deployment through Docker/Dockerhub but then the github action kept not going through. After I checked Dockerhub, I saw that there was something like "automatic pushes are for premium".
            The end solution I went with was a lot more simple, which is maybe why it worked well. I generated a security key and used Github secrets to allow access. Then, I created a ci.yml script and automated the login and the S3 dumping process. It was really cool seeing the website change after I pushed to git (and a lot more convenient for development)!
            After this, I integrated some unit tests of my API backend in python, and added pytest automatic testing to my ci.yml script. 
            Finally, I tried Playwright for the first time, which was really cool. I have used Selenium before but Playwright is a lot more streamlined/easy to use. For example, you can just specify that there's a button with a certain text and Playwright will find it and click it for you.
            I also used Playwright for integration testing for my API by calling the API and checking the response.
            I think this automated testing before deployment is called smoke testing, and it was really cool to see Github check all of these things automatically. 
          </p>
          <h3>Step 4: Wrapping Up + Extensions</h3>
          <p>
            One thing I had some issues with was that I kept getting an error on my CloudFront but not my S3 website link. I thought it was a website issue and tried to fix the bug, but then I found out that apparently CloudFront doesn't update very frequently from the S3 website. I tried a new CloudFront link and it worked. 
            At this point, I have most of the ideas down for how to work with AWS, and the rest is more for hobby/for fun. I think what I will work on will include something like doing a unique visitor counter, random quote generator (maybe with an SQL database instead of DynamoDb), and maybe trying to work more with Docker.
          </p>
          <div className="card">
            <a href = "/"><button >Home
            </button></a>
            </div>
        </div>
        
        
      );
}