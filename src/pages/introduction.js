import visualize from "../visualizer";

export default visualize`
suite that shows us how to t

it goes through the points to teach itself (we're already learning 🤓)
- run some actions and assertions that we can do

some actions and assertions that we can do steps
- click div.selector[data-test="im testid"]
// You can use a shortcut for your testids ([data-testid="im testid"])
- click $im testid

it now knows how to click and that $hmm is a way to write queries like $[data-testid="hmm"]
it promises to use as much test ids as possible so everything will be easier to maintain
it also acknowledges how there are almost no limits to what is a valid syntax 🤯 (get them typos ready 🐛)

some actions that we can do explained with steps
- reload
// no inline comments for now, but we can still use whole line comments
- bind $an element to something
// we can use @something in this 'it' to reference it
- visit /any/page/you/like
- force click element[data-testid="like a true jedi"]
// warning: don't use me if you don't want to be visited by siths
// also selectors change, names don't
- this guy contains or at least should contain ohhhhhhh
- input you probabbly know what's up into $a random input with 😂 testid
- does $👻 exist
// only in your head
- capture request /api/call it
- wait for @it
- is page /where/am/i
- chain lets build on top of cypress on $an element
// whoooo double "on", this is really liberal. BUT be causious, errors never sleep
// - run some actions that we can do explained with
// JK, someone already tried it and is now in a learning loop for ethernity

chain lets build on top of cypress
> first
> children
> should have.css background-color 'rgb(255, 205, 63)'
// hmm why do you ''? because spaces can't exist in in chain steps. There have to be at least some constraints :(
// was this idea in the core of cypress all along?

it can also detect errors and recover from them
- see this makes no sense

// some problems are just to hard to solve with t
// but we can always fall back to JS inline 😇
${() =>
  it("is impossible to write this without JS", () => {
    // and you also get prettier and linting :D (in your favourite editor. JS only)
    let message = 'prettier add " and ;';
  })}

it asks itself how to make just one step of JS between others 
- click $an element
- ${() => {
  // some assert
  cy.log("I can do this");
}}

// i'm just going to leave this here
it opens a new dimension with modules
- run reality.is far bigger
`;
