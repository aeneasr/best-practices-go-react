import React, { Component } from 'react';

import { Appear, Deck, Heading, ListItem, List, Slide, ComponentPlayground } from 'spectacle';

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
const start = (len = 1) => {
  last = len
  return [0, len]
}
const same = (len = 1, offset = 1) => [last - offset, last + len - offset]

export default class Presentation extends Component {
  render() {
    return (
      <Deck transition={["zoom", "slide"]} theme={theme} transitionDuration={500}>
        <Slide transition={['zoom']} bgColor="primary" notes={
          (
            <div>
              <ul>
                <li>Hi, my name is Aeneas Rekkas</li>
                <li>I've been developing software for over 15 years now and work primarily in go and react since about 4
                  or 5 years
                </li>
                <li>My company maintains popular open source projects with about 14.000 github stars - everything is
                  react and go
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

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notes={
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
          code={require('raw-loader!./assets/go/interfaces0.go')} notes={
          (
            <ul>
              <li>
                Let's start with an easy one...Here we have a function that, apparently, executes a job by printing it
              </li>
              <li>We don't really care which printer which is why we use the print.Printer interface to abstract that away</li>
              <li>You will see this quite often, especially from developres that worked primarily with OOP languages, especially in Java</li>
            </ul>
          )}
        />

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notes={
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
          code={require('raw-loader!./assets/go/interfaces1.go')} notes={
          (
            <ul>
              <li>
               Let's look at that code again, but this time the printer interface is defined locally
              </li>
              <li>Why is this possible, and why would this be superior to the previous approach? (question audience)</li>
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
          notes={
            (
              <ul>
                <li>
                  In our main program, which executes the job and initializes the printer - we orchestrate everything
                  without even noticing that print has no direct dependency on go-print (other than maybe downloading less code)
                </li>
                <li>
                  of course, there are still valid cases where you'd want to define an interface in your library (in this example go-print).
                </li>
                <li>
                  This can be for convenience or for internal use (if you have multiple implementations but only one test suite for the interface, for example)
                </li>
              </ul>
            )}
        />

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notes={
          (
            <ul>
              <li>Every gopher loves to talk about error handling</li>
              <li>New developers to go usually don't like it that much but get used to it over time</li>
              <li>IU hated it in the beginning and looked for X ways to make error handling with less boilerplate code</li>
              <li>At some point I accepted it, and now I love it</li>
              <li>But you're already using Go, so you probably already had the same journey as I - let's look at some things you can do to seriously enhance error handling</li>
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
            { loc: next(1) },
            { loc: next(6) },
            { loc: next(4) },
          ]} notes={
          (
            <ul>
              <li>So this one is obvious and basically just learning how to avoid huge if nesting</li>
              <li>Also, we overwrite the error type all the time. this isn't problemativ here, but it can become problematic under certain circumstances</li>
              <li>So here we check for nil equality and have to nest deeper with every call</li>
            </ul>
          )}
        />
        <CodeSlide transition={['slide']}
          ranges={[
            { loc: start(1) },
            { loc: next(3) },
            { loc: next(3, 1) },
            { loc: next(13, 2) },
          ]}
          lang="go"
          code={require('raw-loader!./assets/go/errors.go')}
          notes={
            (
              <ul>
                <li>Obviously, we don't want to do that</li>
                <li>instead we check for not nil - which typically indicates an error that will bubble up (or be handled properly)</li>
                <li>also, we like to define the error within the if itself - it's scoped and well contained and won't be overwritten accidentally</li>
                <li>in this example, err and value are defined outside the scope of the ifs, but we still </li>
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
            { loc: next(14, 1), },
          ]}
          lang="go"
          code={require('raw-loader!./assets/go/errors2.go')}


        />
        <CodeSlide transition={['slide']}
          ranges={[
            {
              loc: start(10),
            },
          ]}
          lang="go"
          code={require('raw-loader!./assets/go/stacktrace.go')}


        />
        <CodeSlide transition={['slide']}
          ranges={[
            { loc: start(1), },
            { loc: next(7), },
          ]}
          lang="bash"
          code={require('raw-loader!./assets/go/stacktrace.txt')}


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


        />

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notes={
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
            { loc: start(15) },
          ]}
          lang="go"
          code={require('raw-loader!./assets/go/okmock.go')}
        />

        <CodeSlide transition={['slide']}
          ranges={[
            { loc: start(1), title: "httptest" },
            { loc: next(1, 3) },
            { loc: next(4, 6) },
            { loc: next(3, 1) },
          ]}
          lang="go"
          code={require('raw-loader!./assets/go/mock_http.go')}
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
        />

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notes={
          (
            <div>
            </div>
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
          </List>
        </Slide>


        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notes={
          (
            <div>
            </div>
          )}>>
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


        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notes={
          (
            <div>
            </div>
          )}>>
          <Heading size={1} textColor="tertiary">
            ReactJS
          </Heading>
        </Slide>

        <CodeSlide transition={['slide']}
          notes={<div>
            Talk about Flow type and typescript
            <p>
              <a href="https://flow.org/try/">https://flow.org/try/</a>
            </p>
            <p>
              <a href="https://www.typescriptlang.org/play/index.html">https://www.typescriptlang.org/play/index.html</a>
            </p>
          </div>}
          ranges={[
            { loc: start(1), title: 'static type checking' },
            { loc: next(3) },
            { loc: next(1, 1) },
          ]}
          lang="js"
          code={require('raw-loader!./assets/js/flowtype.jst')}
        />

        <CodeSlide transition={['slide']}
          notes={<div>
            <ul>
              <li>Talk about why you don't like linting</li>
              <li>Just enforce formatting instead of throwing errors</li>
              <li>"Is it double or single quotes? One tab two tabs three tabs? Spaces? Just shut up and use the style
                of the project
              </li>
              <li>You can add this tool to your pre-commit hook or even your CI</li>
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
          notes={<div>
            <ul>
              <li>Avoiding webpack and in general JS toolchains is quite important IMHO</li>
              <li>React has good stability and most libraries around it as well (maybe to the exception of
                react-router)
              </li>
              <li>But webpack and its loaders constantly change. For some, babel is cool, for others, they'd like to
                use some other toolchain, ....
              </li>
              <li>Constant breaking changes somewhere, pinning dependencies only option -> deprecation and security
                issues
              </li>
            </ul>
          </div>}
          ranges={[
            { loc: start(1), title: 'Avoid webpack' },
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

        <Slide maxWidth="90%">
          <ComponentPlayground
            code={require('raw-loader!./assets/js/optimize.txt')}
            theme="dark"
            style={{ fontSize: "14px" }}
          />
        </Slide>


        <Slide maxWidth="90%">
          <ComponentPlayground
            code={require('raw-loader!./assets/js/optimize2.txt')}
            theme="dark"
            style={{ fontSize: "14px" }}
          />
        </Slide>

        <CodeSlide transition={['slide']}
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

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notes={
          (
            <div>
            </div>
          )}>>
          <Heading size={1} textColor="tertiary">
            There's more ...
          </Heading>
          <List textColor="tertiary">
            <Appear><ListItem>State Management</ListItem></Appear>
            <Appear><ListItem>JSX</ListItem></Appear>
            <Appear><ListItem>Performance Tweaks</ListItem></Appear>
            <Appear><ListItem>Monorepos</ListItem></Appear>
            <Appear><ListItem>Dependency Management</ListItem></Appear>
            <Appear><ListItem>PureComponent</ListItem></Appear>
          </List>
        </Slide>

        <Slide transition={['slide']} bgDarken={0.75} bgColor="secondary" notes={
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
