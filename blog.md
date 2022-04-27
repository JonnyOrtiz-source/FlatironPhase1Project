# General Javascript Coding Best Practices

### by Jonny Ortiz | 2022-04-24

"Luke, trust me" - the final words from Obi Wan before Luke Skywalker successfully destroys the Death Star in Star Wars, A New Hope. Why am I reciting these words at this moment? Although I'm no Obi Wan, I still want the best for you before you jump in and start coding a Javascript project. Trust me. Here are 5 general Javascript coding best practices you'll want to adopt:

1. Know your objective
2. Write pseudocode
3. Code in a tight feedback loop
4. Refactor your code
5. WWJCD

## Know Your Objective

Knowing your objective means having a clear understanding of exactly what's expected from the users' perspective. It's essential for a developer to gather and know those expectations. The best tool to get their perspective is to collect their user stories. User stories describe the type of user, the action they want to take, the expectations from that action, and why they want to take an action. These serve as a means to document the requirements of the application. By sifting through the details of user stories and requirements documentation, you'll gain the general understanding you need before writing a single line of code. When you can explain the expectations of an application back to your users in your own words, you know your objective. It's all about the users.

## Write Pseudocode

Undoubtedly, it's difficult to resist the urge to start coding as soon as you know your objective for newbie developers. But resist you must (in my Yoda voice). The saying "a journey of a thousand miles begins with a single step" (derived from a Chinese proverb) are wise words to live by in development that can serve as a mantra when you get stuck (and you will get stuck). Your next step is to write pseudocode. Pseudocode is an informal way of describing the general steps your program will take to achieve the objective. It doesn't require any strict adherence to a programming language's syntax. It's used to create an outline or a rough draft of your program. Pseudocode summarizes your program's flow but excludes underlying details. For example, the pseudocode for a program that calculates the sum of 2 numbers may look like this:
`// get number 1 and number 2`
`// add number 1 and 2`
`// print the sum`

Spending some time thinking through what you want to code in pseudocode, step-by-step, will make writing the actual code much easier. We've all made the mistake of starting to code a project without pseudocode, then getting hung up on different approaches to an algorithm while coding. That's the value of pseudocode - you figure out how to meet the objective in general terms so you can code with confidence. Writing pseudocode requires patience, practice, and discipline until it becomes second nature. It's a vital best practice that will ease you into writing your code.

## Code in a tight feedback loop

Coding is not for the faint of heart. You have user stories, requirements, and your pseudocode - the moment of truth has arrived. Begin coding by writing a couple of lines of code only, then immediately validating your code with your expectations using console.log() for example. To continue using the program that sums 2 numbers project, you may code in Javascript the following:
`const num1 = prompt('Enter the first number to sum.');`
`console.log(num1);`
This is what it means to code in a tight feedback loop. It enables you to take an iterative approach to coding so you can make the necessary coding changes immediately and mitigate the number of bugs you'll write and writing bugs you will (Yoda is haunting me). Writing bugs is like death and taxes: inevitable. While coding in this tight feedback loop may seem tedious, coding requires painstaking attention to detail. The old cliche "inspect what you expect" becomes a continuous process as you code your project to ultimately achieve the objective and meet the expectations of users.

## Refactor your code

Once you get your code working, it's time to refactor it to industry best practices. For a complete list of best practices, check out https://www.w3.org/wiki/JavaScript_best_practices. This makes the code more maintainable and easier to understand. A few best practices to keep in mind are:
Use brief and easy-to-understand variable and function names. For example, for the previously mentioned program that sums 2 numbers, variable names num1 and num2 suffice. An example of what you wouldn't want to use as variables names is numberToBeAdded1 or numberToBeAdded2.
Modularize your functions so that each function performs one and only one task. To oversimplify using the program that sums 2 numbers, you would have one function that performs the sum calculation and another function that performs the print.
Comment as needed but not more. The acronym K.I.S.S. for keep it simple, sweetie comes to mind (keeping this blog G-rated). A comment for a line of code that assigns a constant value to a variable is not needed. A comment for a line of code like
`const newEntry = Object.fromEntries(new FormData(e.target).entries())`
could warrant the comment
`// convert all values from a form into an object`
Some of these are directional. There's no exact rule on the number of characters for a function or variable name. Or, how many comments are the right number of comments. Think, if I have to come back to this code 2 years from now, will my future self say "good thing I made that comment", or "these function and variable names are short and easy for me to understand their purpose by their name". But making sure that you create functions that fulfill one job at a time is straightforward. This makes it easy for your future self to debug and change your code without having to review all the code to figure out the logic of multiple code blocks.

## WWJCD

Google is an invaluable resource for developers and the first tool to be used in a moment of crisis and rightfully so. But what would a Javascript Cohort do? The online coding community is happy to share what they know because they know it better than anyone else! And they know that knowledge shared is knowledge squared. Don't be shy about sharing your code with a trusted cohort to review. This type of interaction is mutually beneficial: you get the direction you need to keep moving forward on your project and your friend reinforces their knowledge by articulating it to you. Ultimately, you may find yourself giving a demonstration of the features of your application to the users for them to sign off.

## Conclusion

Following these general Javascript coding best practices will help you ensure that you achieve the objective and meet your users' expectations. If you're like me, it may even boost your self-confidence in coding to live your best coding life. Writing code is like being a Jedi using the Force (final Star Wars reference, maybe). I do not doubt that your future self is a stud developer. Stay persistent and consistent and your future self will pat you on the back and say "great job, self!" Now go get it, Padawan!

## Jonny Ortiz

Jonny is a freelance full stack web developer with over 20 years of business consulting experience in the retail and manufacturing industries. He has extensive experience leading business process improvement and business intelligence initiatives. Jonny also serves as an Operations Consultant for the Education Foundation of Sarasota County with a focus on student scholarships and teacher grants for the county's high schools.
