import React, { Component } from 'react';

import { Appear, ComponentPlayground, Deck, Heading, List, ListItem, Slide } from 'spectacle';

import CodeSlide from 'spectacle-code-slide'

import createTheme from 'spectacle/lib/themes/default';


require('normalize.css');
require("spectacle/lib/themes/default/index.css");
require('./index.css')

const theme = createTheme({
  secondary: 'black',
  primary: "#ff4081",
  important: '#FFC43D'
});


let last = 0
const next = (len = 1, off = 0) => {
  const ret = [last + off, last + len + off]
  last = last + len + off
  return ret
}
const start = (len = 1, offset = 0) => {
  last = len + offset
  return [offset, len + offset]
}
const same = (len = 1, offset = 1) => [last - offset, last + len - offset]

export default class Presentation extends Component {
  render() {
    return (
      <Deck transition={["zoom", "slide"]} theme={theme} transitionDuration={500}>
        <Slide transition={['zoom']} bgColor="primary" notesOld={
          (
            <div>
              <ul>
                <li>Hi, my name is Aeneas Rekkas</li>
                <li>I've been developing software for over 15 years now and work primarily in go and react since about 4
                  or 5 years
                </li>
                <li>My company ORY maintains popular open source projects with about 14.000 github stars - everything is
                  react and go. Our focus is application security, and sometimes we give sessions like the one today.
                </li>
                <li>
                  I wrote about 10 different libraries or services in Go and React and while I did that, I learned
                  best practices (the hard way, so by spending a lot of time doing this)
                </li>
              </ul>
            </div>
          )}>
          <Heading size={1} fit caps textColor="white">
            BEST PRACTICES
          </Heading>
          <Heading size={2} caps textColor="white">
            FOR GO & REACT
          </Heading>
          <Heading size={5} textColor="black" style={{ marginTop: '2rem' }}>
            Aeneas Rekkas
          </Heading>
        </Slide>

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notesOld={
          (
            <div>
              Let's start with Go. I think you can learn more from me in Go than in React, because React is heavily
              dependent
              on use case, environment, and toolchain
            </div>
          )}>>
          <Heading size={1} textColor="tertiary">
            GO
          </Heading>
        </Slide>

        <CodeSlide transition={['slide']}
                   ranges={[{ loc: [0, 8] }]}
                   lang="go"
                   code={require('raw-loader!./assets/go/interfaces0.go')} notesOld={
          (
            <ul>
              <li>
                Let's start with an easy one...Here we have a function that, apparently, executes a job by printing it
              </li>
              <li>We don't really care which printer which is why we use the print.Printer interface to abstract that
                away
              </li>
              <li>You will see this quite often, especially from developres that worked primarily with OOP languages,
                especially in Java
              </li>
            </ul>
          )}
        />

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notesOld={
          (
            <div>
              In Go however, we try to define interfaces at the consumer, not in the provider.
            </div>
          )}>>
          <Heading size={1} textColor="tertiary">
            Define interfaces at consumer
          </Heading>
        </Slide>

        <CodeSlide transition={['slide']}
                   ranges={[{ loc: [0, 10] }]}
                   lang="go"
                   code={require('raw-loader!./assets/go/interfaces1.go')} notesOld={
          (
            <ul>
              <li>
                Let's look at that code again, but this time the printer interface is defined locally
              </li>
              <li>Why is this possible, and why would this be superior to the previous approach? (question audience)
              </li>
              <li>no dependency whatsoever</li>
              <li>only declare what we really need</li>
              <li>allows us to easily implement an alternative, because we only need one function</li>
              <li>duck typing</li>
            </ul>
          )}
        />

        <CodeSlide transition={['slide']}
                   ranges={[{ loc: [0, 14] }]}
                   lang="go"
                   code={require('raw-loader!./assets/go/interfaces2.go')}
                   notesOld={
                     (
                       <ul>
                         <li>
                           In our main program, which executes the job and initializes the printer - we orchestrate
                           everything
                           without even noticing that print has no direct dependency on go-print (other than maybe
                           downloading
                           less code)
                         </li>
                         <li>
                           of course, there are still valid cases where you'd want to define an interface in your
                           library (in
                           this example go-print).
                         </li>
                         <li>
                           This can be for convenience or for internal use (if you have multiple implementations but
                           only one
                           test suite for the interface, for example)
                         </li>
                       </ul>
                     )}
        />

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notesOld={
          (
            <ul>
              <li>Every gopher loves to talk about error handling</li>
              <li>New developers to go usually don't like it that much but get used to it over time</li>
              <li>IU hated it in the beginning and looked for X ways to make error handling with less boilerplate code
              </li>
              <li>At some point I accepted it, and now I love it</li>
              <li>But you're already using Go, so you probably already had the same journey as I - let's look at some
                things you can do to seriously enhance error handling
              </li>
            </ul>
          )}>
          <Heading size={1} textColor="tertiary">
            Errors
          </Heading>
        </Slide>

        <CodeSlide transition={['slide']}
                   lang="go"
                   code={require('raw-loader!./assets/go/errors_nested.go')}
                   ranges={[
                     { loc: start(1) },
                     { loc: next(2) },
                     { loc: next(3, 2) },
                     { loc: next(2) },
                     { loc: next(1) },
                   ]} notesOld={
          (
            <ul>
              <li>So this one is obvious and basically just learning how to avoid huge if nesting</li>
              <li>Also, we overwrite the error type all the time. this isn't problemativ here, but it can become
                problematic under certain circumstances
              </li>
              <li>So here we check for nil equality and have to nest deeper with every call</li>
            </ul>
          )}
        />
        <CodeSlide transition={['slide']}
                   ranges={[
                     { loc: start(1) },
                     { loc: next(3) },
                     { loc: next(3, 1) },
                     { loc: next(17, 2) },
                     { loc: next(13, 1) },
                     { loc: next(1, 1) },
                     { loc: next(4) },
                     { loc: next(1, 1) },
                     { loc: next(1) },
                     { loc: next(2) },
                   ]}
                   lang="go"
                   code={require('raw-loader!./assets/go/errors.go')}
                   notesOld={
                     (
                       <ul>
                         <li>Obviously, we don't want to do that</li>
                         <li>instead we check for not nil - which typically indicates an error that will bubble up (or
                           be handled
                           properly)
                         </li>
                         <li>also, we like to define the error within the if itself - it's scoped and well contained and
                           won't be
                           overwritten accidentally
                         </li>
                         <li>what sometimes happens is that you have an argument which defines if function a or b gets
                           executed,
                           the result types being the same
                         </li>
                         <li>so here we scope all the variables, check, return</li>
                         <li>go really punishes you for nesting - that's why they have tabs with 4 spaces - adding
                           nesting should
                           hurt visually
                         </li>
                         <li>Here we see the issues of scoping, we define the error and - accidentally (this is a bug) -
                           use the
                           error in the bar statement, because e.g. copy and paste or just "routine" error handling
                         </li>
                         <li>This has happened to me at least 5 times so far, and it's especially annoying if err is nil
                           but
                           you're accessing it with e.g. this Error()
                         </li>
                         <li>then you get a nil pointer exception - so with this I want to make my point that scoping is
                           really
                           helpful
                         </li>
                         <li>if you scope properly, the compile will throw an error here!</li>
                       </ul>
                     )}

        />
        <CodeSlide transition={['slide']}
                   ranges={[
                     {
                       loc: start(1),
                       title: 'Errors with stacktraces'
                     },
                     { loc: next(3, 1), },
                     { loc: next(5, 1), },
                     { loc: next(7, 1), },
                   ]}
                   lang="go"
                   code={require('raw-loader!./assets/go/errors2.go')}
                   notesOld={
                     (
                       <ul>
                         <li>Go's error type is very primitive by design</li>
                         <li>But it can be enhanced, and there are some libraries</li>
                         <li>pkg/errors is the one I use everywhere</li>
                         <li>So all you have to do is import that package instead of the "errors" package</li>
                         <li>Then you use it as you would with the normal errors package</li>
                         <li>The function WithStack allows you to add a stack trace to errors that don't have one, for
                           example
                           errors coming from standard libraries
                         </li>
                         <li>There's also a function to help you enhance your error with information</li>
                       </ul>
                     )}
        />
        <CodeSlide transition={['slide']}
                   ranges={[
                     {
                       loc: start(4),
                     }, {
                       loc: next(10, 1),
                     }
                   ]}
                   lang="go"
                   code={require('raw-loader!./assets/go/errors_http.go')}
                   notesOld={
                     (
                       <ul>
                         <li>I think it's very useful - in the context of http apis - to have errors that already
                           transport error
                           codes and additional debug information
                         </li>
                         <li>All you have to do for that is define an interface of what the error should be capable of
                         </li>
                         <li>You can also create more complex "context carriers" like this one</li>

                       </ul>
                     )}
        />

        <CodeSlide transition={['slide']}
                   ranges={[
                     {
                       loc: start(1),
                     },
                     {
                       loc: next(6),
                     },
                     {
                       loc: next(3),
                     },
                   ]}
                   lang="go"
                   code={require('raw-loader!./assets/go/errors_ta.go')}
                   notesOld={
                     (
                       <ul>
                         <li>And then you simply do a type assertion</li>
                       </ul>
                     )}
        />


        <CodeSlide transition={['slide']}
                   ranges={[
                     { loc: start(6), },
                     { loc: next(1, 2), },
                     { loc: next(1), },
                   ]}
                   lang="go"
                   code={require('raw-loader!./assets/go/stacktrace.go')}
                   notesOld={
                     (
                       <ul>
                         <li>Phew - ok - that was a lot of talking about errors</li>
                         <li>One last slide tho - let's look at the output of such a stack trace</li>
                         <li>To get the stack trace, use "%+v". "%s" will only print the error message</li>
                       </ul>
                     )}


        />
        <CodeSlide transition={['slide']}
                   ranges={[
                     { loc: start(1), },
                     { loc: next(1), },
                     { loc: next(7), },
                   ]}
                   lang="bash"
                   code={require('raw-loader!./assets/go/stacktrace.txt')}

                   notesOld={
                     (
                       <ul>
                         <li>Here you see, the first output is just the error message</li>
                         <li>The second is the error message plus the stack trace</li>
                       </ul>
                     )}

        />

        <CodeSlide transition={['slide']}
                   ranges={[
                     { loc: start(1), title: "Test suites" },
                     { loc: next(1, 3) },
                     { loc: next(1, 3) },
                     { loc: next(1), note: "Runs tests in parallel" },
                     { loc: next(3, 1), note: "Anonymous struct as test case type" },
                     { loc: next(1), note: "Shorthand declaration" },
                     { loc: next(3, 2) },
                   ]}
                   lang="go"
                   code={require('raw-loader!./assets/go/testcases.go')}

                   notesOld={
                     (
                       <ul>
                         <li>Ok, let's touch another important topic - tests</li>
                         <li>First of all, I really like this library testify, I use it in all of my projects. The API
                           is clear,
                           never had even one breaking change, and it's capabale of expressing almost any assertion
                         </li>
                         <li>What I like to do is write a generic test that runs a bunch of "sub tests" with different
                           inputs and
                           expected outputs
                         </li>
                         <li>If you do that and these tests are not dependent on one another, you can also run them in
                           parallel
                         </li>
                         <li>So what I usually do is use range on an anonymous struct</li>
                         <li>An anonymous struct lets me define the structure of the test case inline</li>
                         <li>And then I use a shorthand to define each test case</li>
                         <li>And finally, you simply execute a sub test - that's it!</li>
                       </ul>
                     )}


        />

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notesOld={
          (
            <div>
              Personally, i hate mocking language level API calls (e.g. interfaces) - there's a couple of reasons
              <ul>
                <li>It's always very close to the original code - so for example with things like "once" or
                  "everytime"
                </li>
                <li>This leads to very tight coupling between tests and code and can be extremely annoyoing during
                  refactoring
                </li>
                <li>Typically used for databases or http servers - but we don't actually check our code against the
                  database but against a representation with potentially wrong assumptions
                </li>
                <li>of course, there are some valid use cases for mocking, for example here</li>
              </ul>
            </div>
          )}>>
          <Heading size={1} textColor="tertiary">
            I avoid mocking
          </Heading>
        </Slide>

        <CodeSlide transition={['slide']}
                   ranges={[
                     { loc: start(19, 2) },
                   ]}
                   lang="go"
                   code={require('raw-loader!./assets/go/okmock.go')}

                   notesOld={
                     (
                       <ul>
                         <li>We have a function which returns a variety of errors</li>
                         <li>Just mocking this would already be very useful</li>
                         <li>Of course, this isn't an ideal example because we could write it like this - but I wanted
                           to prove a
                           point here, not have the most real-life use case
                         </li>
                       </ul>
                     )}
        />

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notesOld={
          (
            <div>
              <ul>
                <li>Ok, so before we go a step further and look at how you can avoid mocking and get equal or even more
                  insightful test results, let's look at our typical CRUD server
                </li>
                <li>So, typically we have an HTTP handler</li>
                <li>A DBAL</li>
                <li>An implementation of the DBAL for example for PG or an in memory adapter for testing</li>
                <li>Good developers document their APIs with swagger or openapi spec</li>
                <li>And if you have that you can easily generate an http client for any language</li>
                <li>And it even makes sense to have one for Go because you can quickly (like in a few hours) write together a CLI that helps devs use your API</li>
                <li>So if we have all of that in place - my personal opinion is to avoid unit tests here</li>
                <li>Why should we unit test the http handler? wouldn't it make more sense to actually have an integration test here? like test everything from proper en/decoding up to database storage</li>
              </ul>
            </div>
          )}>>
          <Heading size={1} fit textColor="tertiary">
            Approaching CRUD APIs
          </Heading>
          <List textColor="tertiary">
            <Appear>
              <ListItem>HTTP Handler</ListItem>
            </Appear>
            <Appear>
              <ListItem>DBAL</ListItem>
            </Appear>
            <Appear>
              <ListItem>Database Adapter (e.g. PostgreSQL and In Memory)</ListItem>
            </Appear>
            <Appear>
              <ListItem>OpenAPI Spec (Swagger)</ListItem>
            </Appear>
            <Appear>
              <ListItem>HTTP Client</ListItem>
            </Appear>
            <Appear>
              <ListItem>CLI</ListItem>
            </Appear>
          </List>
        </Slide>

        <CodeSlide transition={['slide']}
                   ranges={[
                     { loc: start(1), title: "httptest" },
                     { loc: next(1, 3) },
                     { loc: next(4, 6) },
                     { loc: next(3, 1) },
                   ]}
                   lang="go"
                   code={require('raw-loader!./assets/go/mock_http.go')}
                   notesOld={
                     (
                       <ul>
                         <li>The Go authors see that similarly which is why they included helpers for integration tests but not mocking in the stdlib</li>
                         <li>So, if we want to avoid mocking language-level API calls, we need to use something else
                         </li>
                         <li>I use httptest everywhere, typically, I wire everything up from the client making the
                           request, to the http server, to the http handler function, to the database connectivity, to
                           the database
                         </li>
                         <li>This ensures that everything runs together rather smoothly</li>
                         <li>And then I use a few limited (unit) tests to test units which really need it - e.g.
                           algorithms, validators, ...
                         </li>
                         <li>So using http test is really straight forward - it's even in the stdlib</li>
                         <li>We import it, we set up the server with the handler (you could use any router here)</li>
                         <li>And then you simply call the get function... that's it!</li>
                         <li>So now, instead of mocking this or doing other crazy things - we can actually see: did the
                           headers work, does the response status look correct? what about decoding and encoding?
                         </li>
                         <li>Setting this up is sometimes cumbersome - especially if authorization is involved - but
                           it's worth the extra time, because you save so much time by not unit testing everything and
                           compiling and setting up hundreds of mocks
                         </li>
                       </ul>
                     )}
        />
        <CodeSlide transition={['slide']}
                   ranges={[
                     { loc: start(1), title: "dockertest" },
                     { loc: next(2, 2) },
                     { loc: next(2, 1) },
                     { loc: next(9, 1) },
                     { loc: next(9, 1) },
                   ]}
                   lang="go"
                   code={require('raw-loader!./assets/go/dockertest.go')}
                   notesOld={
                     (
                       <ul>
                         <li>When we come to database adapters it always gets tricky</li>
                         <li>In go, no decent ORM exists, because it's a bit difficult to achieve that with a
                           not-so-straight-forward OOP language
                         </li>
                         <li>Instead, you typically write SQL statements</li>
                         <li>So how do you test that? well, you boot up a database in docker, conenct to it, and see if
                           it works.
                         </li>
                         <li>To do that, I wrote dockertest which is available on github</li>
                         <li>With dockertest, you can boot up any service available to docker</li>
                         <li>Here we need a sql database</li>
                         <li>We set up the docker connectivity pool</li>
                         <li>Run the image</li>
                         <li>And connect to it</li>
                         <li>That's it - you have docker running. it's independent of your environment (well you need
                           docker but who doesn't have docker but go?) and it works on CIs
                         </li>
                       </ul>
                     )}
        />

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notesOld={
          (
            <ul>
              <li>So this is ... a bit annoying</li>
              <li>There's always a discussion around "is it idiomatic go or not"?</li>
              <li>I think people should use whatever they want to use and if it makes sense in the project's scope</li>
              <li>But personally, I really avoid full-stack frameworks. This doesn't neccessarily come from my distaste
                for what the go ecosystem full-stack MVC offers
              </li>
              <li>But rather from previous, bad experiences around full-stack frameworks in other languages</li>
              <li>They often have steep learning curves, are hard to optimize, opinionated, and hard to "bend to your
                will"
              </li>
              <li>Go has such a greatly designed standard library, that using the tools that integrate with that makes
                much more sense - and fun!
              </li>
              <li>so here's a list of libraries I use to make my life easier and not reinvent the wheel every time</li>
            </ul>
          )}>>
          <Heading fit size={1} textColor="tertiary">
            I avoid "full-stack" frameworks
          </Heading>
          <List>
            <Appear>
              <ListItem textColor="tertiary">
                github.com/julienschmidt/httprouter
              </ListItem>
            </Appear>
            <Appear>
              <ListItem textColor="tertiary">
                github.com/urfave/negroni
              </ListItem>
            </Appear>
            <Appear>
              <ListItem textColor="tertiary">
                github.com/asaskevich/govalidator
              </ListItem>
            </Appear>
            <Appear>
              <ListItem textColor="tertiary">
                github.com/ory/herodot
              </ListItem>
            </Appear>
            <Appear>
              <ListItem textColor="tertiary">
                github.com/sirupsen/logrus
              </ListItem>
            </Appear>
            <Appear>
              <ListItem textColor="tertiary">
                github.com/jmoiron/sqlx
              </ListItem>
            </Appear>
          </List>
        </Slide>


        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notesOld={
          (
            <ul>
              <li>there is of course more to best practices in go, but I don't want to blow this out of proportion
                here
              </li>
            </ul>
          )}>
          <Heading size={1} textColor="tertiary">
            There's more ...
          </Heading>
          <List textColor="tertiary">
            <Appear><ListItem>Naming</ListItem></Appear>
            <Appear><ListItem>Buffers</ListItem></Appear>
            <Appear><ListItem>Adapters</ListItem></Appear>
            <Appear><ListItem>Packages / Namespaces</ListItem></Appear>
            <Appear><ListItem>Concurrency</ListItem></Appear>
          </List>
        </Slide>


        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notesOld={
          (
            <div>
            </div>
          )}>>
          <Heading size={1} textColor="tertiary">
            ReactJS
          </Heading>
        </Slide>

        <CodeSlide transition={['slide']} notesOld={
          (
            <ul>
              <li>Static type checking saved my ass so often, that it definitely outweighs the additional work involved
                in learning and applying the type system
              </li>
              <li>There's two frameworks that are popular</li>
              <li>
                <a href="https://flow.org/try/">https://flow.org/try/</a>
              </li>
              <li>
                <a
                  href="https://www.typescriptlang.org/play/index.html">https://www.typescriptlang.org/play/index.html</a>
              </li>
              <li>
                flow-type seems more evolved around react and react-related libraries. but both are fine and it comes
                down to preference.
              </li>
            </ul>
          )}
                   ranges={[
                     { loc: start(1), title: 'static type checking' },
                     { loc: next(3) },
                     { loc: next(1, 1) },
                   ]}
                   lang="js"
                   code={require('raw-loader!./assets/js/flowtype.jst')}
        />

        <CodeSlide transition={['slide']}
                   notesOld={<div>
                     <ul>
                       <li>I don't like linting that much</li>
                       <li>The linting process should be automated - similar to go fmt - and should simply fix issues
                         instead of how stupid I am for making a mistake there and then telling me to fix them
                       </li>
                       <li>I'm also very annoyed by "Is it double or single quotes? One tab two tabs three tabs? Spaces?
                         Just shut up and use a standard
                       </li>
                       <li>You can add this tool to your pre-commit hook or even your CI</li>
                       <li>This is a simple example, there's obviously more to it - like replacing quotes, removing
                         trailing commas or semi colons, and so on
                       </li>
                     </ul>
                   </div>}
                   ranges={[
                     { loc: start(1), title: 'Opinionated Code Formatting' },
                     { loc: next(1, 1), note: 'github.com/prettier/prettier' },
                     { loc: next(10, 1) },
                   ]}
                   lang="js"
                   code={require('raw-loader!./assets/js/prettier1.jst')}
        />

        <CodeSlide transition={['slide']}
                   notesOld={<div>
                     <ul>
                       <li>Avoiding webpack and in general JS toolchains is quite important IMHO</li>
                       <li>React has good stability and most libraries around it as well (maybe to the exception of
                         react-router)
                       </li>
                       <li>But webpack and its loaders constantly change. For some, babel is cool, for others, they'd
                         like to
                         use some other toolchain, ....
                       </li>
                       <li>Constant breaking changes somewhere, pinning dependencies only option -> deprecation and
                         security
                         issues
                       </li>
                     </ul>
                   </div>}
                   ranges={[
                     { loc: start(1), title: 'Avoid webpack / boilerplates' },
                     { loc: next(1), },
                     { loc: next(1), },
                     { loc: next(1), note: 'Done!' },
                   ]}

                   lang="bash"
                   code={`$ npm i -g create-react-app
$ create-react-app my-app
$ cd my-app
$ npm start`}
        />

        <Slide maxWidth="90%"
               notesOld={<div>
                 <ul>
                   <li>Ok, we're almost done, this last one is a small exercise around best practices for react
                     components
                   </li>
                   <li>We have a small react app here which updates some text when we enter somethin gin that input
                     box
                   </li>
                   <li>Your task is to tell me how these components can be improved</li>
                 </ul>
               </div>}>
          <ComponentPlayground
            code={require('raw-loader!./assets/js/optimize.txt')}
            theme="dark"
            style={{ fontSize: "14px" }}
          />
        </Slide>


        <Slide maxWidth="90%"
               notesOld={<div>
                 <ul>
                   <li>A good idea is to bubble up the state handling and write primitive components that take, for
                     example, callbacks to update state
                   </li>
                   <li>This is quite common if you use state management like redux</li>
                   <li>Another good practice is to use functional components (which are a bit faster) if you don't need
                     access to react's lifecycle methods
                   </li>
                   <li>Another one is to define functions outside of the render function as to avoid re-initialization
                     of that function on every render call
                   </li>
                   <li>And I really like to write abstract change handlers like here</li>
                 </ul>
               </div>}>
          <ComponentPlayground
            code={require('raw-loader!./assets/js/optimize2.txt')}
            theme="dark"
            style={{ fontSize: "14px" }}
          />
        </Slide>

        <CodeSlide transition={['slide']}
                   notesOld={<div>
                     <ul>
                       <li>The last topic I want to briefly touch is testing components</li>
                       <li>This can be very hard because I think that testing view logic is subject to so much change
                       </li>
                       <li>While structure shouldn't really dictate layout - it's just the way HTML + CSS works</li>
                       <li>So often we end up writing a component, test it, and a few weeks later have to refactor it
                         completely, also rendering the tests unusable
                       </li>
                       <li>There are also different ways of testing react components - some are just checking for
                         structure of the component
                       </li>
                       <li>I use enzyme from airbnb which allows me to render single components up to a full
                         application
                       </li>
                       <li>This really helps with writing integration tests</li>
                       <li>For example, writing a click test is very easy</li>
                     </ul>
                   </div>}
                   ranges={[
                     { loc: start(1), title: 'Testing Components' },
                     { loc: next(1), note: 'github.com/airbnb/enzyme' },
                     { loc: next(1, 4) },
                     { loc: next(1) },
                     { loc: next(3) },
                     { loc: next(1) },
                     { loc: next(1) },
                     { loc: next(4, 2) },
                   ]}
                   lang="js"
                   code={require('raw-loader!./assets/js/enzyme.jst')}
        />

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notesOld={
          (
            <ul>
              <li>Here too, we have a ton of topics that I haven't touched. Maybe we can address some of them in the
                Q&A
              </li>
              <li>I think you could do a whole day on react state management alone</li>
              <li>and of course redux</li>
            </ul>
          )}>>
          <Heading size={1} textColor="tertiary">
            There's more ...
          </Heading>
          <List textColor="tertiary">
            <Appear><ListItem>State Management</ListItem></Appear>
            <Appear><ListItem>Redux</ListItem></Appear>
            <Appear><ListItem>JSX</ListItem></Appear>
            <Appear><ListItem>Performance Tweaks</ListItem></Appear>
            <Appear><ListItem>Monorepos</ListItem></Appear>
            <Appear><ListItem>Dependency Management</ListItem></Appear>
            <Appear><ListItem>PureComponent</ListItem></Appear>
          </List>
        </Slide>

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notesOld={
          (
            <div>
            </div>
          )}>>
          <Heading size={1} textColor="tertiary" fit>
            Q&A
          </Heading>
        </Slide>
      </Deck>
    );
  }
}
